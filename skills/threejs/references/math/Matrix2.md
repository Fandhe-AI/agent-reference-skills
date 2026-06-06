# Matrix2

A 2×2 matrix. Arguments to the constructor and `set()` are in row-major order; elements are stored column-major in `.elements`.

## Signature / Usage

```js
const m = new THREE.Matrix2();
m.set( 11, 12,
       21, 22 );

m.identity(); // reset to identity
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| elements | Array\<number\> | Column-major flat array of 4 values |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(n11, n12, n21, n22)` | Matrix2 | Sets all 4 elements (row-major order) |
| `identity()` | Matrix2 | Resets to 2×2 identity matrix |
| `fromArray(array, offset?)` | Matrix2 | Sets elements from a column-major array |

## Notes

- Matrix2 is a minimal utility class; it does not include multiplication or inversion methods.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Matrix2

## Related

- [Matrix3.md](./Matrix3.md)
- [Matrix4.md](./Matrix4.md)
