# Box2

An axis-aligned bounding box (AABB) in 2D space, defined by minimum and maximum corner points.

## Signature / Usage

```js
const box = new THREE.Box2(min, max);
// or build from points:
const box = new THREE.Box2().setFromPoints([
  new THREE.Vector2(0, 0),
  new THREE.Vector2(1, 1),
]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| min | Vector2 | (Infinity, Infinity) | Lower boundary |
| max | Vector2 | (-Infinity, -Infinity) | Upper boundary |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(min, max)` | Box2 | Sets lower and upper boundaries |
| `setFromPoints(points)` | Box2 | Computes box that encloses an array of Vector2 |
| `setFromCenterAndSize(center, size)` | Box2 | Centers box and sets dimensions |
| `getCenter(target)` | Vector2 | Returns center point |
| `getSize(target)` | Vector2 | Returns width/height dimensions |
| `expandByPoint(point)` | Box2 | Expands box to include the given point |
| `containsPoint(point)` | boolean | Tests if point is inside or on boundary |
| `containsBox(box)` | boolean | Tests if another box is fully contained |
| `intersectsBox(box)` | boolean | Tests for intersection with another box |
| `distanceToPoint(point)` | number | Euclidean distance from box edge to point |
| `intersect(box)` / `union(box)` | Box2 | Set operations |
| `clone()` / `copy(box)` | Box2 | Clone or copy |

## Notes

- An uninitialized box (default constructor) is considered empty (`isEmpty()` returns `true`).
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Box2

## Related

- [Box3.md](./Box3.md)
- [Vector2.md](./Vector2.md)
