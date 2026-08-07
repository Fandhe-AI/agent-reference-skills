# useAnimationFrame

Executes a callback on every animation frame, supplying elapsed time and delta for frame-level animation control.

## Signature / Usage

```javascript
import { useAnimationFrame } from "motion-v"

const domRef = ref()

useAnimationFrame((time, delta) => {
  domRef.value.style.transform = `rotateY(${time}deg)`
})
```

## Options / Props

| Argument | Description |
|----------|-------------|
| `time` | Total elapsed duration since the callback was first invoked |
| `delta` | Time elapsed since the previous animation frame |

## Notes

- Fires once per animation frame for continuous animation control.

## Related

- [overview](./overview.md)
- [motion-value](./motion-value.md)
