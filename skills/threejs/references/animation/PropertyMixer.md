# PropertyMixer

A buffered scene-graph property manager that supports weighted accumulation of values from multiple animation sources. Used internally by the animation system for blending; rarely instantiated directly.

## Constructor

```js
new PropertyMixer(binding, typeName, valueSize)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| binding | PropertyBinding | The property binding to manage |
| typeName | string | The keyframe track type name (e.g., `'vector'`, `'quaternion'`) |
| valueSize | number | Number of values per keyframe sample |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| binding | PropertyBinding | — | The underlying property binding |
| cumulativeWeight | number | 0 | Total accumulated weight (normal blending) |
| cumulativeWeightAdditive | number | 0 | Total accumulated additive weight |
| referenceCount | number | 0 | Number of keyframe tracks referencing this binding |
| useCount | number | 0 | Number of active keyframe tracks currently using this binding |
| valueSize | number | — | Number of values per keyframe sample |

## Methods

| Method | Description |
|--------|-------------|
| accumulate(accuIndex, weight) | Accumulates the incoming region's data into accumulation buffer `accuIndex` |
| accumulateAdditive(weight) | Accumulates incoming data into the additive buffer |
| apply(accuIndex) | Applies accumulation buffer `accuIndex` to the binding when it differs from current state |
| saveOriginalState() | Saves the current bound property value to both accumulation buffers |
| restoreOriginalState() | Applies the saved original state back to the binding |

## Notes

- This class is part of the internal animation blending pipeline and is managed automatically by `AnimationMixer`.
- `referenceCount` and `useCount` are used to determine when a `PropertyMixer` can be safely removed from the cache.

## Related

- [PropertyBinding](./PropertyBinding.md)
- [AnimationMixer](./AnimationMixer.md)
