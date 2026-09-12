/* vehicleConfig — single source of truth for the Can-Am configurator.
 *
 * MODEL: canam/base.glb — converted from the real scanned source
 * (canam/base.obj, 109MB / ~500k verts / no .mtl) via obj2gltf + Draco
 * compression, so it loads fast on the web. Geometry/topology/proportions
 * are untouched — only the file format and material wiring changed.
 *
 * meshRoles maps the ACTUAL node names found inside base.glb (generic,
 * auto-exported by the source tool as "root.6", "root.5.refined", etc in
 * the raw OBJ — obj2gltf strips the dots on export, so at runtime they
 * come through as "root6", "root5refined", NOT renamed by us either way)
 * to a functional role. These were confirmed two ways: (1) rendering the
 * model with each node tinted a distinct color and visually inspecting
 * it, and (2) reading the exact THREE.Mesh.name values off the live
 * loaded scene — not guessed.
 *   body      -> exterior painted panels
 *   cage      -> roof + roll cage (structural)
 *   interior  -> seats / cabin tub (never shown to the camera, but not hidden)
 *   wheel     -> one of the 4 wheel+tire assemblies (rim and tire are one
 *                fused mesh in this model — see WheelManager)
 *   detail    -> small parts (coilover shocks, roof-mounted antenna)
 *
 * No color tinting: the vehicle always shows its real scanned paint, for
 * every part — there is no COLOR category in this configurator.
 */
export const MESH_ROLES = {
  root6: 'body',
  root8: 'cage',
  root5refined: 'interior',
  root11: 'wheel',
  root1: 'wheel',
  root10: 'wheel',
  root0: 'wheel',
  root9: 'detail',
  root2: 'detail',
  root7: 'detail',
  root3: 'detail',
  root4: 'detail',
};

export const VEHICLE_CONFIG = {
  modelUrl: './canam/base.glb',

  // GOMAS — wheel swap options. "original" always exists (the real scanned
  // wheels, no extra file to load). Add more entries here + drop a .glb in
  // canam/wheels/ to unlock them — WheelManager needs no code changes.
  wheels: [
    { id: 'original', name: 'Original', model: null, thumbnail: null, price: 0 },
    // { id: 'method-01', name: 'Method 401', model: './canam/wheels/wheel-01.glb', thumbnail: './canam/wheels/wheel-01-thumb.jpg', price: 45000 },
  ],
  defaultWheelId: 'original',

  // ACCESORIOS — additive parts. Empty until real .glb files exist; the UI
  // must not show fake entries. Add here + drop a .glb in canam/accessories/
  // to unlock one — AccessoryManager needs no code changes.
  accessories: [
    // { id: 'bumper-01', name: 'Bumper delantero', model: './canam/accessories/bumper-01.glb', thumbnail: './canam/accessories/bumper-01-thumb.jpg', mountPoint: 'frontBumper', positionOffset: [0, 0, 0], rotationOffset: [0, 0, 0], scale: 1, price: 0 },
  ],
};
