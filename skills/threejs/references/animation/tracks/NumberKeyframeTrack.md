# NumberKeyframeTrack

A `KeyframeTrack` for scalar numeric values. Suitable for animating opacity, morph target influences, or any single-number property.

## Signature / Usage

```js
const track = new THREE.NumberKeyframeTrack(
  'mesh.material.opacity',
  [0, 1],   // times
  [1, 0],   // values: fade from opaque to transparent
  THREE.InterpolateLinear
);
```

## Constructor

```js
new NumberKeyframeTrack(name, times, values, interpolation)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Track name / property path |
| times | Array\<number\> | Keyframe times in seconds |
| values | Array\<number\> | Keyframe numeric values (1 number per keyframe) |
| interpolation | InterpolateLinear \| InterpolateDiscrete \| InterpolateSmooth | Interpolation type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ValueTypeName | string | 'number' | Overrides `KeyframeTrack#ValueTypeName` |

## Notes

- Values array has 1 element per keyframe.
- Inherits all methods from `KeyframeTrack`.

## Related

- [KeyframeTrack](../KeyframeTrack.md)
