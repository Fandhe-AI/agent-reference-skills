# Interpolant

Abstract base class for parameter-domain interpolants. Subclasses implement specific interpolation strategies (linear, cubic, discrete, etc.) used by the animation system.

## Signature / Usage

```js
// Not instantiated directly; used via concrete subclasses:
// THREE.LinearInterpolant, THREE.CubicInterpolant,
// THREE.DiscreteInterpolant, THREE.QuaternionLinearInterpolant

const interpolant = new THREE.LinearInterpolant(
  parameterPositions, // Float32Array of keyframe times
  sampleValues,       // Float32Array of values
  sampleSize,         // number of values per sample
  resultBuffer        // Float32Array for output
);

const result = interpolant.evaluate(t); // returns resultBuffer
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| parameterPositions | TypedArray | Keyframe time positions |
| sampleValues | TypedArray | Keyframe values (flat array, `sampleSize` values per key) |
| resultBuffer | TypedArray | Output buffer reused on each `evaluate` call |
| settings | Object | Optional interpolation settings (default: `null`) |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `evaluate(t)` | TypedArray | Evaluates interpolant at parameter `t`; returns `resultBuffer` |
| `getSettings_()` | Object | Returns effective settings (falls back to `DefaultSettings_`) |
| `copySampleValue_(index)` | TypedArray | Copies a sample into the result buffer |
| `interpolate_(i1, t0, t, t1)` | TypedArray | **Abstract** — implement in subclass to perform interpolation |
| `intervalChanged_(i1, t0, t)` | void | Optional hook called when the active interval changes |

## Notes

- Access time complexity: O(1) for sequential access, O(log N) for random access.
- The animation system creates and manages interpolants automatically via `KeyframeTrack`.
- Return value of `evaluate` is the same `resultBuffer` reference — copy values if you need to keep them across calls.
- See official docs: https://threejs.org/docs/#api/en/math/Interpolant

## Related

- [MathUtils.md](./MathUtils.md)
