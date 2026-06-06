# Sphere

An analytical bounding sphere in 3D space defined by a center point and a radius. Commonly used as a bounding volume for objects and geometry.

## Signature / Usage

```js
const sphere = new THREE.Sphere(
  new THREE.Vector3(0, 0, 0), // center
  1                           // radius
);

// Build from a set of points
const sphere2 = new THREE.Sphere();
sphere2.setFromPoints(pointsArray);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| center | Vector3 | (0, 0, 0) | Center of the sphere |
| radius | number | -1 | Radius (negative = empty sphere) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(center, radius)` | Sphere | Sets center and radius |
| `setFromPoints(points, optionalCenter?)` | Sphere | Computes minimum bounding sphere from an array of Vector3 |
| `containsPoint(point)` | boolean | Tests if a point lies inside the sphere |
| `distanceToPoint(point)` | number | Signed distance from sphere surface to point (negative if inside) |
| `intersectsSphere(sphere)` | boolean | Tests intersection with another sphere |
| `intersectsBox(box)` | boolean | Tests intersection with a Box3 |
| `intersectsPlane(plane)` | boolean | Tests intersection with a Plane |
| `expandByPoint(point)` | Sphere | Expands sphere to include a point |
| `union(sphere)` | Sphere | Expands to enclose both spheres |
| `getBoundingBox(target)` | Box3 | Returns the enclosing AABB |
| `applyMatrix4(matrix)` | Sphere | Transforms sphere by a 4×4 matrix |
| `translate(offset)` | Sphere | Translates center by offset |
| `clone()` / `copy(sphere)` | Sphere | Clone or copy |

## Notes

- A sphere with `radius < 0` is considered empty (`isEmpty()` returns `true`).
- `makeEmpty()` resets radius to `-1`.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Sphere

## Related

- [Box3.md](./Box3.md)
- [Ray.md](./Ray.md)
- [Frustum.md](./Frustum.md)
