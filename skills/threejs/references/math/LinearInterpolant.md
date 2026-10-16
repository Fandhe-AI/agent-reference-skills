# LinearInterpolant

A basic linear interpolant. Extends `Interpolant`.

## Signature / Usage

```js
const interpolant = new THREE.LinearInterpolant(
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

- Source: `src/math/interpolants/LinearInterpolant.js`. Official docs: https://threejs.org/docs/pages/LinearInterpolant.html

## Related

- [Interpolant](./Interpolant.md)
- [QuaternionLinearInterpolant](./QuaternionLinearInterpolant.md)
- [CubicInterpolant](./CubicInterpolant.md)
- [DiscreteInterpolant](./DiscreteInterpolant.md)
