# CubicInterpolant

Fast and simple cubic spline interpolant. Extends `Interpolant`.

## Signature / Usage

```js
const interpolant = new THREE.CubicInterpolant(
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

- Derived from a Hermitian construction setting the first derivative at each sample position to the linear slope between neighboring positions over their parameter interval.
- Source: `src/math/interpolants/CubicInterpolant.js`. Official docs: https://threejs.org/docs/pages/CubicInterpolant.html

## Related

- [Interpolant](./Interpolant.md)
- [BezierInterpolant](./BezierInterpolant.md)
- [LinearInterpolant](./LinearInterpolant.md)
