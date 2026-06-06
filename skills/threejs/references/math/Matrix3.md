# Matrix3

A 3×3 matrix. The constructor and `set()` accept row-major order; elements are stored column-major in `.elements`. Commonly used for normal matrix computations and 2D UV transforms.

## Signature / Usage

```js
const m = new THREE.Matrix3();
m.set( 11, 12, 13,
       21, 22, 23,
       31, 32, 33 );

// Compute normal matrix from a model-view matrix
const normalMatrix = new THREE.Matrix3();
normalMatrix.getNormalMatrix(modelViewMatrix);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| elements | Array\<number\> | Column-major flat array of 9 values |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `identity()` | Matrix3 | Resets to identity matrix |
| `set(n11…n33)` | Matrix3 | Sets all 9 elements (row-major order) |
| `multiply(m)` / `premultiply(m)` | Matrix3 | Post- or pre-multiply |
| `invert()` | Matrix3 | Inverts analytically (zero matrix if determinant = 0) |
| `transpose()` | Matrix3 | Transposes in place |
| `determinant()` | number | Computes the determinant |
| `getNormalMatrix(matrix4)` | Matrix3 | Sets as the inverse-transpose of the upper-left 3×3 of a Matrix4 |
| `setFromMatrix4(m)` | Matrix3 | Copies the upper-left 3×3 from a Matrix4 |
| `setUvTransform(tx, ty, sx, sy, rotation, cx, cy)` | Matrix3 | Sets a UV transformation matrix |
| `makeTranslation(x, y)` | Matrix3 | 2D translation matrix |
| `makeScale(x, y)` | Matrix3 | 2D scale matrix |
| `makeRotation(theta)` | Matrix3 | 2D rotation matrix (radians) |
| `clone()` / `copy(m)` | Matrix3 | Clone or copy |

## Notes

- Internally column-major: `elements[3]` is row 0, column 1.
- `getNormalMatrix` is essential for correct lighting when non-uniform scale is applied.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Matrix3

## Related

- [Matrix4.md](./Matrix4.md)
- [Vector3.md](./Vector3.md)
