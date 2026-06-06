# Vector4

A 4D vector representing an ordered quadruplet of numbers (x, y, z, w). Used for homogeneous coordinates, RGBA colors, and quaternion-like storage.

## Signature / Usage

```js
const v = new THREE.Vector4(x, y, z, w); // defaults: 0, 0, 0, 1

v.set(1, 0, 0, 1);
v.multiplyScalar(2);
v.applyMatrix4(m);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| x | number | 0 | The x component |
| y | number | 0 | The y component |
| z | number | 0 | The z component (also aliased as `.width`) |
| w | number | 1 | The w component (also aliased as `.height`) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(x, y, z, w)` | Vector4 | Sets all components |
| `add(v)` / `sub(v)` | Vector4 | Adds or subtracts a vector |
| `multiplyScalar(s)` / `divideScalar(s)` | Vector4 | Scales the vector |
| `dot(v)` | number | Dot product |
| `length()` / `lengthSq()` | number | Euclidean length or squared length |
| `normalize()` | Vector4 | Converts to unit vector |
| `lerp(v, alpha)` | Vector4 | Linear interpolation toward `v` (alpha 0–1) |
| `applyMatrix4(m)` | Vector4 | Multiplies by a 4×4 matrix |
| `setAxisAngleFromQuaternion(q)` | Vector4 | Sets x,y,z as axis and w as angle from quaternion |
| `clone()` / `copy(v)` | Vector4 | Clone or copy |

## Notes

- `.width` / `.height` are aliases for `.z` / `.w`.
- `copy(v)` accepts both Vector3 and Vector4.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Vector4

## Related

- [Vector3.md](./Vector3.md)
- [Matrix4.md](./Matrix4.md)
- [Quaternion.md](./Quaternion.md)
