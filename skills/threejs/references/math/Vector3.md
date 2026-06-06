# Vector3

A 3D vector representing an ordered triplet of numbers (x, y, z). Used for points in 3D space, directions, and general-purpose numeric triplets.

## Signature / Usage

```js
const v = new THREE.Vector3(x, y, z); // defaults: 0, 0, 0

v.set(1, 2, 3);
v.add(other);
v.normalize();
v.multiplyScalar(2);
const len = v.length();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| x | number | 0 | The x component |
| y | number | 0 | The y component |
| z | number | 0 | The z component |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(x, y, z)` | Vector3 | Sets all components |
| `add(v)` / `sub(v)` | Vector3 | Adds or subtracts a vector |
| `multiplyScalar(s)` / `divideScalar(s)` | Vector3 | Scales the vector |
| `dot(v)` | number | Dot product |
| `cross(v)` | Vector3 | Cross product (mutates this) |
| `length()` / `lengthSq()` | number | Euclidean length or squared length |
| `normalize()` | Vector3 | Converts to unit vector |
| `distanceTo(v)` | number | Euclidean distance to another vector |
| `lerp(v, alpha)` | Vector3 | Linear interpolation toward `v` (alpha 0–1) |
| `applyMatrix4(m)` | Vector3 | Transforms by a 4×4 matrix |
| `applyQuaternion(q)` | Vector3 | Applies quaternion rotation |
| `clone()` / `copy(v)` | Vector3 | Clone or copy |
| `toArray()` / `fromArray()` | Array / Vector3 | Serialization helpers |

## Notes

- All mutating methods return `this`, enabling chaining.
- Use `lengthSq()` / `distanceToSquared()` for comparisons — avoids a square root.
- `project(camera)` / `unproject(camera)` convert between world space and NDC.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Vector3

## Related

- [Vector2.md](./Vector2.md)
- [Vector4.md](./Vector4.md)
- [Quaternion.md](./Quaternion.md)
- [Matrix4.md](./Matrix4.md)
