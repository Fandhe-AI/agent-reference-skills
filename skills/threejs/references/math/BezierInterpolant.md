# BezierInterpolant

A Bezier interpolant using cubic Bezier curves with 2D control points. Extends `Interpolant`.

## Signature / Usage

```js
// Constructor documented without parameters; normally created by
// KeyframeTrack.InterpolantFactoryMethodBezier
const interpolant = new THREE.BezierInterpolant();
```

## Notes

- Supports the COLLADA/Maya style of Bezier animation where each keyframe has explicit in/out tangent control points specified as 2D coordinates (time, value).
- Tangent data is read from `inTangents` and `outTangents` on the interpolant (populated by `KeyframeTrack.InterpolantFactoryMethodBezier`).
- For a track with N keyframes and stride S, each tangent array has `N * S * 2` values. Layout: `[k0_c0_time, k0_c0_value, k0_c1_time, k0_c1_value, ..., k0_cS_time, k0_cS_value, k1_c0_time, k1_c0_value, ...]`
- Source: `src/math/interpolants/BezierInterpolant.js`. Official docs: https://threejs.org/docs/pages/BezierInterpolant.html

## Related

- [Interpolant](./Interpolant.md)
- [CubicInterpolant](./CubicInterpolant.md)
