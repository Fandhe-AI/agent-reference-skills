# KeyframeTrack

A timed sequence of keyframes that animates a specific property of an object. Stores parallel arrays of `times` and `values`. This is the base class for all concrete track types.

## Signature / Usage

```js
// Animate position.x from 0 to 10 over 2 seconds
const track = new THREE.VectorKeyframeTrack(
  'mesh.position',
  [0, 1, 2],
  [0, 0, 0, 5, 0, 0, 10, 0, 0]
);
const clip = new THREE.AnimationClip('move', 2, [track]);
```

## Constructor

```js
new KeyframeTrack(name, times, values, interpolation)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Track name; references a property path (e.g., `'.position'`, `'boneName.quaternion'`) |
| times | Array\<number\> | Keyframe times in seconds |
| values | Array | Keyframe values (number, string, or boolean depending on subclass) |
| interpolation | InterpolateLinear \| InterpolateDiscrete \| InterpolateSmooth \| InterpolateBezier | Interpolation type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| DefaultInterpolation | number | InterpolateLinear | Default interpolation type for this track class |
| TimeBufferType | constructor | Float32Array | Buffer type for time values |
| ValueBufferType | constructor | Float32Array | Buffer type for property values |
| ValueTypeName | string | '' | String identifier for value type (overridden by subclasses) |
| name | string | — | Property path this track targets |
| times | Float32Array | — | Keyframe times |
| values | Float32Array | — | Keyframe values |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| clone() | KeyframeTrack | Returns a copy |
| getInterpolation() | number | Returns the current interpolation type constant |
| getValueSize() | number | Returns the number of values per keyframe |
| optimize() | KeyframeTrack | Removes redundant sequential keys |
| scale(timeScale) | KeyframeTrack | Multiplies all keyframe times by `timeScale` |
| setInterpolation(interpolation) | KeyframeTrack | Changes the interpolation method |
| shift(timeOffset) | KeyframeTrack | Shifts all keyframe times by `timeOffset` seconds |
| trim(startTime, endTime) | KeyframeTrack | Removes keyframes outside the specified time range |
| validate() | boolean | Returns true if track data is valid |
| InterpolantFactoryMethodLinear(result) | LinearInterpolant | Creates a linear interpolant |
| InterpolantFactoryMethodDiscrete(result) | DiscreteInterpolant | Creates a discrete interpolant |
| InterpolantFactoryMethodSmooth(result) | CubicInterpolant | Creates a smooth (cubic) interpolant |
| InterpolantFactoryMethodBezier(result) | BezierInterpolant | Creates a Bezier interpolant (requires `settings.inTangents`/`outTangents`) |

## Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| KeyframeTrack.toJSON(track) | Object | Serializes a track to JSON |

## Notes

- `trim()` does not shift remaining keys to time 0; this would alter interpolated values.
- For Bezier interpolation, set `settings.inTangents` and `settings.outTangents` on the track before creating the interpolant.
- Use concrete subclasses (`VectorKeyframeTrack`, `QuaternionKeyframeTrack`, etc.) rather than this base class directly.

## Related

- [AnimationClip](./AnimationClip.md)
- [tracks/VectorKeyframeTrack](./tracks/VectorKeyframeTrack.md)
- [tracks/QuaternionKeyframeTrack](./tracks/QuaternionKeyframeTrack.md)
- [tracks/NumberKeyframeTrack](./tracks/NumberKeyframeTrack.md)
- [tracks/ColorKeyframeTrack](./tracks/ColorKeyframeTrack.md)
- [tracks/BooleanKeyframeTrack](./tracks/BooleanKeyframeTrack.md)
- [tracks/StringKeyframeTrack](./tracks/StringKeyframeTrack.md)
