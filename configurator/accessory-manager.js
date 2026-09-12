/* AccessoryManager — add/remove additive parts (bumpers, light bars, roof,
 * rock sliders...) without ever reloading the vehicle.
 *
 * There are no accessory .glb files yet, so vehicleConfig.accessories is
 * empty and this manager has nothing to offer today — that's intentional
 * (see vehicle-config.js). To add a real accessory later: drop a .glb in
 * canam/accessories/ and add one entry to vehicleConfig.accessories with
 * an id/model/mountPoint — no code changes needed here.
 *
 * mountPoints is a plain { name: THREE.Vector3 } map in the vehicle's
 * local space (e.g. "roof", "frontBumper", "rearBumper"). Nothing derives
 * these automatically today because there is nothing to attach yet; when
 * a real accessory is registered, compute its mount point the same way
 * WheelManager does (bounding box of the relevant region) and add it here.
 */

const GLTF_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';
const DRACO_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/DRACOLoader.js';
const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

export class AccessoryManager {
  constructor(THREE, root, accessoryRegistry, mountPoints = {}) {
    this.T = THREE;
    this.root = root;
    this.registry = new Map(accessoryRegistry.map((a) => [a.id, a]));
    this.mountPoints = mountPoints;
    this.active = new Map(); // id -> THREE.Object3D currently mounted
  }

  isActive(id) { return this.active.has(id); }

  async add(id) {
    if (this.active.has(id)) return;
    const entry = this.registry.get(id);
    if (!entry) { console.warn('[AccessoryManager] add: unknown accessory id "' + id + '"'); return; }
    if (!entry.model) { console.warn('[AccessoryManager] add: "' + id + '" has no model registered yet.'); return; }

    const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
      import(/* @vite-ignore */ GLTF_LOADER_URL),
      import(/* @vite-ignore */ DRACO_LOADER_URL),
    ]);
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath(DRACO_DECODER_PATH);
    loader.setDRACOLoader(draco);
    const full = new URL(entry.model, document.baseURI).href;
    const gltf = await new Promise((resolve, reject) => loader.load(full, resolve, undefined, reject));
    const obj = gltf.scene;

    const mount = this.mountPoints[entry.mountPoint];
    if (mount) obj.position.copy(mount);
    if (entry.positionOffset) obj.position.add(new this.T.Vector3(...entry.positionOffset));
    if (entry.rotationOffset) obj.rotation.set(...entry.rotationOffset);
    if (entry.scale) obj.scale.setScalar(entry.scale);
    obj.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

    this.root.add(obj);
    this.active.set(id, obj);
  }

  remove(id) {
    const obj = this.active.get(id);
    if (!obj) return;
    this.root.remove(obj);
    this.active.delete(id);
  }

  toggle(id) {
    if (this.isActive(id)) this.remove(id);
    else this.add(id);
  }
}
