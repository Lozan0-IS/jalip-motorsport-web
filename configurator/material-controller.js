/* MaterialController — classifies each mesh by role (body/cage/interior/
 * wheel/detail) and gives every mesh its own material instance.
 *
 * The source model has a single shared texture atlas/material reused across
 * all 12 meshes (no per-part materials — confirmed: the raw OBJ has zero
 * `usemtl` lines). Cloning a separate material per mesh right after load
 * (cheap — clone() shares the same texture GPU resources, it only
 * duplicates the small material descriptor) keeps every part independently
 * controllable later without touching any other part.
 *
 * Body color tinting is intentionally NOT implemented — the vehicle always
 * shows its real scanned appearance (paint, panel wear, reflections) as-is,
 * for every part. The bodyMeshes/meshesByRole classification stays (it's
 * what WheelManager uses to find the 4 real wheel meshes), it's just not
 * used to recolor anything here.
 */
export class MaterialController {
  constructor(THREE, root, meshesByName, meshRoles) {
    this.T = THREE;
    this.bodyMeshes = [];
    this.otherMeshes = [];
    this.meshesByRole = { body: [], cage: [], interior: [], wheel: [], detail: [], other: [] };

    root.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.material = o.material.clone(); // per-mesh instance — see note above
      const role = meshRoles[o.name] || 'other';
      (this.meshesByRole[role] || this.meshesByRole.other).push(o);
      if (role === 'body') this.bodyMeshes.push(o);
      else this.otherMeshes.push(o);
    });
  }
}
