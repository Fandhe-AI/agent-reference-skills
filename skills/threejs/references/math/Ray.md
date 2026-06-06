# Ray

A ray with an origin point and a direction vector. Used internally by `Raycaster` for picking and intersection tests.

## Signature / Usage

```js
const ray = new THREE.Ray(
  new THREE.Vector3(0, 0, 0),   // origin
  new THREE.Vector3(0, 0, -1)   // direction (should be normalized)
);

const target = new THREE.Vector3();
const hit = ray.intersectSphere(sphere, target);
if (hit) {
  console.log('intersection at', target);
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| origin | Vector3 | (0, 0, 0) | Ray origin |
| direction | Vector3 | (0, 0, -1) | Normalized direction vector |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(origin, direction)` | Ray | Sets origin and direction |
| `at(t, target)` | Vector3 | Returns point at parameter `t` along the ray |
| `lookAt(v)` | Ray | Adjusts direction to face a world-space position |
| `intersectBox(box, target)` | Vector3 \| null | Intersection point with a Box3 |
| `intersectPlane(plane, target)` | Vector3 \| null | Intersection point with a Plane |
| `intersectSphere(sphere, target)` | Vector3 \| null | Intersection point with a Sphere |
| `intersectTriangle(a, b, c, backfaceCulling, target)` | Vector3 \| null | Intersection point with a triangle |
| `intersectsBox(box)` | boolean | Fast boolean test against a Box3 |
| `intersectsSphere(sphere)` | boolean | Fast boolean test against a Sphere |
| `distanceToPoint(point)` | number | Closest distance from ray to a point |
| `closestPointToPoint(point, target)` | Vector3 | Closest point on the ray to a given point |
| `applyMatrix4(matrix4)` | Ray | Transforms ray by a 4×4 matrix |
| `clone()` / `copy(ray)` | Ray | Clone or copy |

## Notes

- `direction` should be normalized; `Raycaster` handles this automatically.
- `intersectTriangle` with `backfaceCulling = true` only hits front faces (CCW winding).
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Ray

## Related

- [Plane.md](./Plane.md)
- [Sphere.md](./Sphere.md)
- [Box3.md](./Box3.md)
