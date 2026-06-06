# AnimationUtils

A utility class providing static helper methods for animation operations, including keyframe manipulation, clip conversion, and typed array processing. All methods are static.

## Signature / Usage

```js
// Create a sub-segment of an animation clip
const runClip = THREE.AnimationUtils.subclip(sourceClip, 'run', 10, 30, 30);

// Convert a clip to additive blending format
const additiveClip = THREE.AnimationUtils.makeClipAdditive(clip);
```

## Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| convertArray(array, type) | TypedArray | Converts an array to the specified typed array type |
| flattenJSON(jsonKeys, times, values, valuePropertyName) | void | Parses AOS keyframe format; populates `times` and `values` arrays |
| getKeyframeOrder(times) | Array\<number\> | Returns sort-order indices for the given times array |
| isTypedArray(object) | boolean | Returns true if the object is a typed array |
| makeClipAdditive(targetClip, referenceFrame?, referenceClip?, fps?) | AnimationClip | Converts clip keyframes to additive format |
| sortedArray(values, stride, order) | Array\<number\> | Sorts values using a pre-computed order from `getKeyframeOrder()` |
| subclip(sourceClip, name, startFrame, endFrame, fps?) | AnimationClip | Creates a new clip containing only the specified frame range |

### subclip Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| sourceClip | AnimationClip | — | Source clip to extract from |
| name | string | — | Name for the new clip |
| startFrame | number | — | Starting frame number |
| endFrame | number | — | Ending frame number |
| fps | number | 30 | Frames per second used for frame-to-time conversion |

### makeClipAdditive Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| targetClip | AnimationClip | — | Clip to convert to additive format |
| referenceFrame | number | 0 | Reference frame for the base pose |
| referenceClip | AnimationClip | targetClip | Clip providing the reference pose |
| fps | number | 30 | Frames per second |

## Notes

- `subclip` is useful for splitting a single long animation clip exported from a DCC tool into multiple named actions.
- `makeClipAdditive` is required when using `AdditiveAnimationBlendMode` on an `AnimationAction`.

## Related

- [AnimationClip](./AnimationClip.md)
- [AnimationAction](./AnimationAction.md)
