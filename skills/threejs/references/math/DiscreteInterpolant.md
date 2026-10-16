# DiscreteInterpolant

Interpolant that evaluates to the sample value at the position preceding the parameter. Extends `Interpolant`.

## Signature / Usage

```js
const interpolant = new THREE.DiscreteInterpolant(
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

- Source: `src/math/interpolants/DiscreteInterpolant.js`. Official docs: https://threejs.org/docs/pages/DiscreteInterpolant.html

## Related

- [Interpolant](./Interpolant.md)
- [LinearInterpolant](./LinearInterpolant.md)
