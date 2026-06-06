# Quaternion

Represents a rotation using four components `(x, y, z, w)`. Preferred over Euler angles for composing rotations and smooth interpolation (no gimbal lock). Three.js expects quaternions to be normalized.

## Signature / Usage

```js
const q = new THREE.Quaternion();
q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

const vector = new THREE.Vector3(1, 0, 0);
vector.applyQuaternion(q);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| x | number | 0 | x component |
| y | number | 0 | y component |
| z | number | 0 | z component |
| w | number | 1 | w component (identity = 1) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `setFromAxisAngle(axis, angle)` | Quaternion | Sets rotation from axis (Vector3) and angle (radians) |
| `setFromEuler(euler, update?)` | Quaternion | Sets from Euler angles |
| `setFromRotationMatrix(m)` | Quaternion | Sets from the 3×3 rotation part of a Matrix4 |
| `setFromUnitVectors(vFrom, vTo)` | Quaternion | Sets rotation that aligns `vFrom` to `vTo` |
| `multiply(q)` / `premultiply(q)` | Quaternion | Quaternion composition |
| `invert()` / `conjugate()` | Quaternion | Invert rotation (assumes unit length) |
| `normalize()` | Quaternion | Normalizes to unit length |
| `slerp(qb, t)` | Quaternion | Spherical linear interpolation toward `qb` (t 0–1) |
| `rotateTowards(q, step)` | Quaternion | Rotates toward target by at most `step` radians |
| `angleTo(q)` | number | Angle between two quaternions in radians |
| `clone()` / `copy(q)` | Quaternion | Clone or copy |
| `equals(q)` | boolean | Equality test |

## Notes

- `identity()` resets to no-rotation state: `(0, 0, 0, 1)`.
- `Object3D.quaternion` is the live rotation stored on every scene object.
- Use `Quaternion.slerpFlat` / `multiplyQuaternionsFlat` for flat-array batch operations.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Quaternion

## Related

- [Euler.md](./Euler.md)
- [Matrix4.md](./Matrix4.md)
- [Vector3.md](./Vector3.md)
