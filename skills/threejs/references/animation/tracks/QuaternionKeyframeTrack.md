# QuaternionKeyframeTrack

A `KeyframeTrack` for quaternion rotation values. Values are stored as flat arrays of X, Y, Z, W components per keyframe. Uses `QuaternionLinearInterpolant` (SLERP) for linear interpolation to ensure correct spherical rotation blending.

## Signature / Usage

```js
const track = new THREE.QuaternionKeyframeTrack(
  'bone.quaternion',
  [0, 1],
  [0, 0, 0, 1,  0, 0.707, 0, 0.707]  // identity → 90° rotation around Y
);
```

## Constructor

```js
new QuaternionKeyframeTrack(name, times, values, interpolation)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Track name / property path |
| times | Array\<number\> | Keyframe times in seconds |
| values | Array\<number\> | Quaternion components (4 numbers per keyframe: X, Y, Z, W) |
| interpolation | InterpolateLinear \| InterpolateDiscrete \| InterpolateSmooth | Interpolation type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ValueTypeName | string | 'quaternion' | Overrides `KeyframeTrack#ValueTypeName` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| InterpolantFactoryMethodLinear(result) | QuaternionLinearInterpolant | Creates a SLERP-based interpolant; overrides the parent linear factory |

## Notes

- Values array has 4 elements per keyframe (X, Y, Z, W).
- Linear interpolation uses SLERP (`QuaternionLinearInterpolant`) rather than standard linear interpolation to avoid gimbal lock.
- Inherits all other methods from `KeyframeTrack`.

## Related

- [KeyframeTrack](../KeyframeTrack.md)
