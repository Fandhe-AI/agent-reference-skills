# Euler

Represents a rotation as three angles applied sequentially around the x, y, and z axes in a specified order. Iterating yields `(x, y, z, order)`.

## Signature / Usage

```js
const euler = new THREE.Euler(0, Math.PI / 2, 0, 'XYZ');

const vector = new THREE.Vector3(1, 0, 0);
vector.applyEuler(euler);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| x | number | 0 | Rotation around x axis (radians) |
| y | number | 0 | Rotation around y axis (radians) |
| z | number | 0 | Rotation around z axis (radians) |
| order | string | `'XYZ'` | Rotation application order (e.g. `'XYZ'`, `'YXZ'`, `'ZXY'`, etc.) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(x, y, z, order?)` | Euler | Sets all components |
| `setFromQuaternion(q, order?, update?)` | Euler | Derives angles from a normalized quaternion |
| `setFromRotationMatrix(m, order?, update?)` | Euler | Derives angles from the rotation part of a Matrix4 |
| `setFromVector3(v, order?)` | Euler | Sets x/y/z from a Vector3 |
| `reorder(newOrder)` | Euler | Changes order while preserving the represented rotation (via quaternion) |
| `fromArray(array)` | Euler | Sets from `[x, y, z, order?]` |
| `toArray(array?, offset?)` | Array | Serializes to array |
| `clone()` / `copy(euler)` | Euler | Clone or copy |
| `equals(euler)` | boolean | Equality test |

## Notes

- Euler angles are subject to gimbal lock; prefer `Quaternion` when composing multiple rotations.
- `reorder()` converts through a quaternion, which may introduce floating-point error.
- The static default order `Euler.DEFAULT_ORDER` is `'XYZ'`.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Euler

## Related

- [Quaternion.md](./Quaternion.md)
- [Matrix4.md](./Matrix4.md)
- [Vector3.md](./Vector3.md)
