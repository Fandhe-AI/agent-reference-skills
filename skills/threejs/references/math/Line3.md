# Line3

An analytical line segment in 3D space, defined by a start point and an end point.

## Signature / Usage

```js
const line = new THREE.Line3(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 1, 1)
);

const center = new THREE.Vector3();
line.getCenter(center);

const closest = new THREE.Vector3();
line.closestPointToPoint(somePoint, true, closest);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| start | Vector3 | (0, 0, 0) | Start point of the segment |
| end | Vector3 | (0, 0, 0) | End point of the segment |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(start, end)` | Line3 | Sets start and end |
| `at(t, target)` | Vector3 | Returns point at `t` (0 = start, 1 = end) |
| `getCenter(target)` | Vector3 | Returns the midpoint |
| `delta(target)` | Vector3 | Returns `end - start` vector |
| `distance()` | number | Euclidean length of the segment |
| `distanceSq()` | number | Squared length |
| `closestPointToPoint(point, clampToLine, target)` | Vector3 | Closest point on the segment to a given point |
| `closestPointToPointParameter(point, clampToLine)` | number | `t` parameter of the closest point |
| `applyMatrix4(matrix)` | Line3 | Transforms the segment by a Matrix4 |
| `clone()` / `copy(line)` | Line3 | Clone or copy |
| `equals(line)` | boolean | Equality test |

## Notes

- `clampToLine = true` restricts the closest-point search to the segment; `false` extends to the infinite line.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Line3

## Related

- [Ray.md](./Ray.md)
- [Vector3.md](./Vector3.md)
