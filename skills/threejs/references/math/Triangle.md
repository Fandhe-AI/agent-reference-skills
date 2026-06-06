# Triangle

A geometric triangle defined by three corner vectors `a`, `b`, `c`. Provides area, normal, barycentric coordinate, and intersection utilities.

## Signature / Usage

```js
const tri = new THREE.Triangle(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0)
);

const normal = new THREE.Vector3();
tri.getNormal(normal);

const area = tri.getArea();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| a | Vector3 | (0, 0, 0) | First corner |
| b | Vector3 | (0, 0, 0) | Second corner |
| c | Vector3 | (0, 0, 0) | Third corner |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(a, b, c)` | Triangle | Sets all three vertices |
| `getArea()` | number | Computes the area of the triangle |
| `getNormal(target)` | Vector3 | Computes the unit-length normal |
| `getPlane(target)` | Plane | Computes the plane the triangle lies within |
| `getMidpoint(target)` | Vector3 | Returns the centroid |
| `containsPoint(point)` | boolean | Tests if a projected point is inside the triangle |
| `getBarycoord(point, target)` | Vector3 | Computes barycentric coordinates (returns null if degenerate) |
| `getInterpolation(point, v1, v2, v3, target)` | Vector3 | Barycentric interpolation of per-vertex values |
| `closestPointToPoint(p, target)` | Vector3 | Returns closest point on the triangle to a given point |
| `isFrontFacing(direction)` | boolean | Tests if the triangle faces a given direction |
| `intersectsBox(box)` | boolean | Tests intersection with a Box3 |
| `clone()` / `copy(tri)` | Triangle | Clone or copy |

## Notes

- Static equivalents exist for most instance methods: `Triangle.getNormal(a, b, c, target)`, etc.
- `getBarycoord` returns `null` when the triangle is degenerate (zero area).
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Triangle

## Related

- [Plane.md](./Plane.md)
- [Box3.md](./Box3.md)
- [Vector3.md](./Vector3.md)
