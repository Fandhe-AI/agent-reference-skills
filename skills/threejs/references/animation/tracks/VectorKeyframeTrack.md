# VectorKeyframeTrack

A `KeyframeTrack` for vector values (e.g., `Vector2`, `Vector3`). Values are stored as flat arrays of components interleaved per keyframe.

## Signature / Usage

```js
// Animate position along a path (Vector3: 3 values per keyframe)
const track = new THREE.VectorKeyframeTrack(
  'mesh.position',
  [0, 1, 2],
  [0, 0, 0,  10, 0, 0,  10, 10, 0]
);
```

## Constructor

```js
new VectorKeyframeTrack(name, times, values, interpolation)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Track name / property path |
| times | Array\<number\> | Keyframe times in seconds |
| values | Array\<number\> | Vector component values (N numbers per keyframe, where N is the vector size) |
| interpolation | InterpolateLinear \| InterpolateDiscrete \| InterpolateSmooth | Interpolation type |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ValueTypeName | string | 'vector' | Overrides `KeyframeTrack#ValueTypeName` |

## Notes

- The number of values per keyframe matches the vector dimension (2 for Vector2, 3 for Vector3).
- Inherits all methods from `KeyframeTrack`.

## Related

- [KeyframeTrack](../KeyframeTrack.md)
