# StringKeyframeTrack

A `KeyframeTrack` for string values. Uses discrete interpolation only; no interpolation parameter is accepted.

## Constructor

```js
new StringKeyframeTrack(name, times, values)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Track name / property path |
| times | Array\<number\> | Keyframe times in seconds |
| values | Array\<string\> | Keyframe string values |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| DefaultInterpolation | number | InterpolateDiscrete | Overrides `KeyframeTrack#DefaultInterpolation` |
| ValueBufferType | constructor | Array | Overrides `KeyframeTrack#ValueBufferType` |
| ValueTypeName | string | 'string' | Overrides `KeyframeTrack#ValueTypeName` |

## Notes

- Does not accept an interpolation parameter — string values are always discrete.
- Inherits all methods from `KeyframeTrack`.

## Related

- [KeyframeTrack](../KeyframeTrack.md)
