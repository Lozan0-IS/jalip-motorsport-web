/* VehicleLoader — loads the main vehicle model and normalizes it (scale,
 * center, ground it), regardless of source format. Everything downstream
 * (CameraController, MaterialController, WheelManager, AccessoryManager,
 * the UI) only ever talks to the returned { root, meshesByName, ... } —
 * none of it knows or cares whether the file was .obj or .glb.
 *
 * Today: modelUrl ends in .glb -> GLTFLoader + DRACOLoader.
 * Future: point vehicleConfig.modelUrl at canam/base.glb (already the
 * case) or add an .obj branch here (OBJLoader + MTLLoader) if a raw OBJ
 * is ever used again — callers do not change either way.
 */

const GLTF_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';
const DRACO_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/DRACOLoader.js';
const OBJ_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/OBJLoader.js';
const MTL_LOADER_URL = 'https://esm.sh/three@0.169.0/examples/jsm/loaders/MTLLoader.js';
const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

export class VehicleLoader {
  constructor(THREE, baseURI) {
    this.T = THREE;
    this.baseURI = baseURI || document.baseURI;
  }

  async load(url, { targetLength = 3.9, mobile = false } = {}) {
    const ext = url.split('.').pop().toLowerCase();
    const root = ext === 'obj' ? await this._loadObj(url) : await this._loadGltf(url);

    const T = this.T;
    root.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = !mobile;
        o.receiveShadow = true;
      }
    });

    // normalize scale from real-world units to the viewer's target footprint,
    // then center on X/Z and drop it onto the ground plane (Y=0) — computed
    // from the model's own THREE.Box3, never hardcoded positions.
    const box1 = new T.Box3().setFromObject(root);
    const size1 = box1.getSize(new T.Vector3());
    const footprint = Math.max(size1.x, size1.z) || 1;
    root.scale.setScalar(targetLength / footprint);

    const box2 = new T.Box3().setFromObject(root);
    const center2 = box2.getCenter(new T.Vector3());
    root.position.x -= center2.x;
    root.position.z -= center2.z;
    root.position.y -= box2.min.y;

    const box3 = new T.Box3().setFromObject(root);
    const size3 = box3.getSize(new T.Vector3());
    const sphere3 = box3.getBoundingSphere(new T.Sphere());

    const meshesByName = {};
    root.traverse((o) => { if (o.isMesh) meshesByName[o.name] = o; });

    return {
      root,
      meshesByName,
      box: box3,
      size: size3,
      boundingSphere: sphere3,
      height: size3.y,
    };
  }

  async _loadGltf(url) {
    const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
      import(/* @vite-ignore */ GLTF_LOADER_URL),
      import(/* @vite-ignore */ DRACO_LOADER_URL),
    ]);
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath(DRACO_DECODER_PATH);
    loader.setDRACOLoader(draco);
    const full = new URL(url, this.baseURI).href;
    const gltf = await new Promise((resolve, reject) => loader.load(full, resolve, undefined, reject));
    return gltf.scene;
  }

  /* kept for completeness / future use — not the active path today, since
   * base.obj (109MB, no .mtl) is impractical to ship directly to a browser.
   * See canam/base.glb for the converted, compressed model actually in use. */
  async _loadObj(url) {
    const [{ OBJLoader }] = await Promise.all([import(/* @vite-ignore */ OBJ_LOADER_URL)]);
    const mtlUrl = url.replace(/\.obj$/i, '.mtl');
    let materials = null;
    try {
      const { MTLLoader } = await import(/* @vite-ignore */ MTL_LOADER_URL);
      const mtlLoader = new MTLLoader();
      materials = await new Promise((resolve, reject) => mtlLoader.load(new URL(mtlUrl, this.baseURI).href, resolve, undefined, reject));
      materials.preload();
    } catch (e) {
      console.warn('[VehicleLoader] no .mtl found next to', url, '— loading geometry only.', e);
    }
    const loader = new OBJLoader();
    if (materials) loader.setMaterials(materials);
    const full = new URL(url, this.baseURI).href;
    return new Promise((resolve, reject) => loader.load(full, resolve, undefined, reject));
  }
}
