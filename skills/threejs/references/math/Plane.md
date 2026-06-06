# Plane

An infinite 2D surface in 3D space represented in Hessian normal form: a unit-length normal vector and a signed distance constant from the origin.

## Signature / Usage

```js
// From normal and a point on the plane
const plane = new THREE.Plane();
plane.setFromNormalAndCoplanarPoint(
  new THREE.Vector3(0, 1, 0), // upward-facing
  new THREE.Vector3(0, 0, 0)
);

const dist = plane.distanceToPoint(someVector3);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| normal | Vector3 | (1, 0, 0) | Unit-length normal vector defining plane orientation |
| constant | number | 0 | Signed distance from origin to the plane |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(normal, constant)` | Plane | Sets normal and constant |
| `setFromNormalAndCoplanarPoint(normal, point)` | Plane | Derives plane from normal and a point on it |
| `setFromCoplanarPoints(a, b, c)` | Plane | Derives plane from three CCW-wound coplanar points |
| `normalize()` | Plane | Normalizes normal and adjusts constant accordingly |
| `negate()` | Plane | Negates normal and constant (flips facing) |
| `distanceToPoint(point)` | number | Signed distance from the plane to a point |
| `distanceToSphere(sphere)` | number | Signed distance from the plane to a sphere |
| `projectPoint(point, target)` | Vector3 | Projects a point onto the plane |
| `intersectLine(line, target, clampToLine?)` | Vector3 \| null | Returns line-plane intersection point |
| `intersectsBox(box)` | boolean | Tests intersection with a Box3 |
| `applyMatrix4(matrix, normalMatrix?)` | Plane | Applies a 4×4 affine transformation |
| `clone()` / `copy(plane)` | Plane | Clone or copy |

## Notes

- Positive `distanceToPoint` means the point is on the same side as the normal; negative means opposite side.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Plane

## Related

- [Ray.md](./Ray.md)
- [Frustum.md](./Frustum.md)
- [Vector3.md](./Vector3.md)
