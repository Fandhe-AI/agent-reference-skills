---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#movement-regression
---

# Movement regression

Sites like Sketchfab keep a scene fluid by regressing movement: effects, textures and shadows slightly reduce quality until still-stand. The state model has an object called `performance`.

## Signature / Usage

```jsx
performance: {
  current: 1,
  min: 0.1,
  max: 1,
  debounce: 200,
  regress: () => void,
},
```

| Name | Type | Description |
| --- | --- | --- |
| current | number | Performance factor alternates between min and max |
| min | number | Performance lower bound (should be less than 1) |
| max | number | Performance upper bound (no higher than 1) |
| debounce | number | Debounce timeout until it goes to upper bound (1) again |
| regress() | () => void | Function that temporarily regresses performance |

Define defaults on the canvas:

```jsx
<Canvas performance={{ min: 0.5 }}>...</Canvas>
```

### Putting the system into regression

Call `regress()`, for instance when controls fire their change-event:

```jsx
const regress = useThree((state) => state.performance.regress)
useEffect(() => {
  controls.current?.addEventListener('change', regress)
```

### Responding to it

Mere calls to `regress()` will not change or affect anything. Your app has to opt into performance scaling by listening to the performance `current`: 1 (max) means everything is ok, the default. Less than 1 (min) means a regression is requested and the number tells you how far to scale down. For instance, multiply `current` with the pixel ratio to cut down on resolution; with `min: 0.5` that halves the resolution for at least 200ms (delay) when regress is called. It can also be used to switch off lights when `current < 1`, use lower-res textures, skip post-processing effects, etc.

```jsx
function AdaptivePixelRatio() {
  const current = useThree((state) => state.performance.current)
  const setPixelRatio = useThree((state) => state.setDpr)
  useEffect(() => {
    setPixelRatio(window.devicePixelRatio * current)
  }, [current])
  return null
}
```

Drop this component into the scene, combine it with the code above that calls `regress()`, and you have adaptive resolution:

```jsx
<AdaptivePixelRatio />
```

## Notes

- Pre-made components for this exist in the Drei library, a separate package not covered by this skill.

## Related

- [performance-monitoring](./performance-monitoring.md)
- [on-demand-rendering](./on-demand-rendering.md)
