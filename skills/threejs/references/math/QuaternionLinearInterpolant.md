# QuaternionLinearInterpolant

Spherical linear unit quaternion interpolant (SLERP). Extends `Interpolant`.

## Signature / Usage

```js
const interpolant = new THREE.QuaternionLinearInterpolant(
  parameterPositions, // TypedArray
  sampleValues,       // TypedArray
  sampleSize,         // number
  resultBuffer        // TypedArray
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| parameterPositions | TypedArray | The parameter positions hold the interpolation factors. |
| sampleValues | TypedArray | The sample values. |
| sampleSize | number | The sample size. |
| resultBuffer | TypedArray | The result buffer. |

## Notes

- Source: `src/math/interpolants/QuaternionLinearInterpolant.js`. Official docs: https://threejs.org/docs/pages/QuaternionLinearInterpolant.html

## Related

- [Interpolant](./Interpolant.md)
- [LinearInterpolant](./LinearInterpolant.md)
- [Quaternion](./Quaternion.md)
