/* WheelManager — swaps all 4 wheels together as one set.
 *
 * The real model's wheels (rim+tire fused into one mesh per corner — the
 * scan has no separate rim/tire split) are geometrically separate: 4
 * distinct meshes, in 2 mirrored left/right pairs, each pair touching the
 * ground at an opposite end of the chassis (confirmed by bounding-box
 * inspection + a color-per-mesh render). Their real positions are read
 * from the loaded model — nothing here is hardcoded.
 *
 * Today only "original" exists (the 4 scanned meshes, just toggled
 * visible/hidden). registerWheel()/vehicleConfig.wheels is the extension
 * point: drop a .glb next to this file's config entry and setWheel(id)
 * will load, clone x4, place at the 4 real mount points, mirror left/
 * right via scale.x, and hide the originals — with NO changes needed
 * here or in the rest of the configurator.
 */

const GLTF_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';
const DRACO_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/DRACOLoader.js';
const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

export class WheelManager {
  constructor(THREE, root, wheelMeshes, wheelRegistry) {
    this.T = THREE;
    this.root = root;
    this.originalWheels = wheelMeshes; // the 4 real THREE.Mesh instances
    this.registry = new Map(wheelRegistry.map((w) => [w.id, w]));
    this._replacements = []; // currently-mounted replacement objects, if any
    this._current = 'original';

    // capture each real wheel's mount transform (position/quaternion/scale,
    // expressed in `root`'s local space) so a replacement can be dropped in
    // at the exact same spot. mirrorX marks the two corners on the
    // vehicle's negative-X side, for flipping a right-side wheel model.
    this.mountPoints = wheelMeshes.map((mesh) => {
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      const local = root.worldToLocal(center.clone());
      return { mesh, position: local, mirrorX: local.x < 0 };
    });
  }

  async setWheel(id) {
    if (id === this._current) return;
    const entry = this.registry.get(id);
    if (!entry) { console.warn('[WheelManager] setWheel: unknown wheel id "' + id + '"'); return; }

    if (id === 'original') {
      this.originalWheels.forEach((m) => { m.visible = true; });
      this._clearReplacements();
      this._current = 'original';
      return;
    }

    if (!entry.model) {
      console.warn('[WheelManager] setWheel: "' + id + '" has no model registered yet — staying on current wheels.');
      return;
    }

    const template = await this._loadWheelModel(entry.model);
    this.originalWheels.forEach((m) => { m.visible = false; });
    this._clearReplacements();

    this.mountPoints.forEach((mp) => {
      const inst = template.clone(true);
      inst.position.copy(mp.position);
      inst.scale.setScalar(1);
      if (mp.mirrorX) inst.scale.x = -1; // mirror a right-authored wheel onto the left side
      inst.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      this.root.add(inst);
      this._replacements.push(inst);
    });
    this._current = id;
  }

  _clearReplacements() {
    this._replacements.forEach((o) => this.root.remove(o));
    this._replacements = [];
  }

  async _loadWheelModel(url) {
    if (this._templateCache?.url === url) return this._templateCache.obj;
    const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
      import(/* @vite-ignore */ GLTF_LOADER_URL),
      import(/* @vite-ignore */ DRACO_LOADER_URL),
    ]);
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath(DRACO_DECODER_PATH);
    loader.setDRACOLoader(draco);
    const full = new URL(url, document.baseURI).href;
    const gltf = await new Promise((resolve, reject) => loader.load(full, resolve, undefined, reject));
    this._templateCache = { url, obj: gltf.scene };
    return gltf.scene;
  }
}
