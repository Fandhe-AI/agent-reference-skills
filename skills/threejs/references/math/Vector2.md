# Vector2

A 2D vector representing an ordered pair of numbers (x, y). Commonly used for UV coordinates, screen-space positions, and 2D math.

## Signature / Usage

```js
const v = new THREE.Vector2(x, y); // defaults: 0, 0

v.set(1, 2);
v.add(other);
v.normalize();
const len = v.length();
const angle = v.angle(); // radians from positive x-axis
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| x | number | 0 | The x component (also aliased as `.width`) |
| y | number | 0 | The y component (also aliased as `.height`) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(x, y)` | Vector2 | Sets both components |
| `add(v)` / `sub(v)` | Vector2 | Adds or subtracts a vector |
| `multiplyScalar(s)` / `divideScalar(s)` | Vector2 | Scales the vector |
| `dot(v)` | number | Dot product |
| `cross(v)` | number | 2D cross product (scalar) |
| `length()` / `lengthSq()` | number | Euclidean length or squared length |
| `normalize()` | Vector2 | Converts to unit vector |
| `distanceTo(v)` | number | Euclidean distance to another vector |
| `lerp(v, alpha)` | Vector2 | Linear interpolation toward `v` (alpha 0–1) |
| `angle()` | number | Angle in radians from positive x-axis |
| `rotateAround(center, angle)` | Vector2 | Rotates around a center point |
| `clone()` / `copy(v)` | Vector2 | Clone or copy |

## Notes

- `.width` and `.height` are aliases for `.x` and `.y` respectively.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Vector2

## Related

- [Vector3.md](./Vector3.md)
- [Box2.md](./Box2.md)
