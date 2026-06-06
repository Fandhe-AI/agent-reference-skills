# Matrix4

A 4×4 matrix used for 3D transformations including translation, rotation, scale, and projection. The constructor and `set()` accept row-major order; internally elements are stored column-major in `.elements`.

## Signature / Usage

```js
const m = new THREE.Matrix4();
m.compose(position, quaternion, scale); // build TRS matrix

const pos = new THREE.Vector3();
const quat = new THREE.Quaternion();
const scale = new THREE.Vector3();
m.decompose(pos, quat, scale);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| elements | Array\<number\> | Column-major flat array of 16 values |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `identity()` | Matrix4 | Resets to identity matrix |
| `set(n11…n44)` | Matrix4 | Sets all 16 elements (row-major order) |
| `compose(position, quaternion, scale)` | Matrix4 | Builds a TRS transformation matrix |
| `decompose(position, quaternion, scale)` | Matrix4 | Extracts position, rotation, and scale |
| `multiply(m)` / `premultiply(m)` | Matrix4 | Post- or pre-multiply |
| `invert()` | Matrix4 | Inverts in place (zero matrix if determinant = 0) |
| `transpose()` | Matrix4 | Transposes in place |
| `makeTranslation(x, y, z)` | Matrix4 | Creates a translation matrix |
| `makeRotationFromEuler(euler)` | Matrix4 | Creates rotation from Euler angles |
| `makeRotationFromQuaternion(q)` | Matrix4 | Creates rotation from quaternion |
| `makeScale(x, y, z)` | Matrix4 | Creates a scale matrix |
| `makePerspective(...)` / `makeOrthographic(...)` | Matrix4 | Creates projection matrices |
| `lookAt(eye, target, up)` | Matrix4 | Sets rotation to look from eye toward target |
| `clone()` / `copy(m)` | Matrix4 | Clone or copy |

## Notes

- `compose` / `decompose` operate on `Object3D.matrix` during scene graph updates.
- Column-major storage means `.elements[4]` is row 0, column 1.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Matrix4

## Related

- [Matrix3.md](./Matrix3.md)
- [Quaternion.md](./Quaternion.md)
- [Vector3.md](./Vector3.md)
