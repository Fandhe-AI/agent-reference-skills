# ColorKeyframeTrack

A `KeyframeTrack` for RGB color values. Values are stored as flat arrays of R, G, B components (each in range [0, 1]) interleaved per keyframe.

## Signature / Usage

```js
const track = new THREE.ColorKeyframeTrack(
  'material.color',
  [0, 1, 2],                       // times
  [1, 0, 0,  0, 1, 0,  0, 0, 1],  // red → green → blue
  THREE.InterpolateLinear
);
```

## Constructor

```js
new ColorKeyframeTrack(name, times, values, interpolation)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Track name / property path |
| times | Array\<number\> | Keyframe times in seconds |
| values | Array\<number\> | Keyframe RGB values (3 numbers per keyframe) |
| interpolation | InterpolateLinear \| InterpolateDiscrete \| InterpolateSmooth | Interpolation type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ValueTypeName | string | 'color' | Overrides `KeyframeTrack#ValueTypeName` |

## Notes

- Values array has 3 elements per keyframe (R, G, B).
- Inherits all methods from `KeyframeTrack`.

## Related

- [KeyframeTrack](../KeyframeTrack.md)
