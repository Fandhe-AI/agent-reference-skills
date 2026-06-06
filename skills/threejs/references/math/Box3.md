# Box3

An axis-aligned bounding box (AABB) in 3D space. Widely used as a bounding volume for objects and geometry.

## Signature / Usage

```js
const box = new THREE.Box3();
box.setFromObject(mesh); // enclose an Object3D and its children

const center = new THREE.Vector3();
box.getCenter(center);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| min | Vector3 | (Infinity, Infinity, Infinity) | Lower boundary |
| max | Vector3 | (-Infinity, -Infinity, -Infinity) | Upper boundary |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `setFromObject(object, precise?)` | Box3 | Encloses an Object3D and all its children |
| `setFromPoints(points)` | Box3 | Encloses an array of Vector3 |
| `setFromCenterAndSize(center, size)` | Box3 | Centers box and sets dimensions |
| `getCenter(target)` | Vector3 | Returns center point |
| `getSize(target)` | Vector3 | Returns width/height/depth dimensions |
| `expandByPoint(point)` | Box3 | Expands box to include the given point |
| `containsPoint(point)` | boolean | Tests if point lies within or on boundary |
| `containsBox(box)` | boolean | Tests if another box is fully contained |
| `intersectsBox(box)` | boolean | Tests for overlap with another box |
| `intersectsSphere(sphere)` | boolean | Tests for overlap with a sphere |
| `distanceToPoint(point)` | number | Euclidean distance from box edge to point |
| `getBoundingSphere(target)` | Sphere | Returns smallest enclosing sphere |
| `applyMatrix4(matrix)` | Box3 | Transforms box by a 4×4 matrix |
| `intersect(box)` / `union(box)` | Box3 | Set operations |
| `clone()` / `copy(box)` | Box3 | Clone or copy |

## Notes

- An uninitialized box is considered empty; `setFromObject` also resets it first.
- Use `precise: true` in `setFromObject` to compute a tighter fit (slower).
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Box3

## Related

- [Box2.md](./Box2.md)
- [Sphere.md](./Sphere.md)
- [Vector3.md](./Vector3.md)
