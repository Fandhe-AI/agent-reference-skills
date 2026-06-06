# useTime

Create a motion value that updates every frame with the elapsed time (ms) since creation. Useful for perpetual animations.

## Signature / Usage

```tsx
import { useTime, useTransform } from "motion/react"
import { motion } from "motion/react"

function Component() {
  const time = useTime()
  const rotate = useTransform(
    time,
    [0, 4000], // for every 4 seconds...
    [0, 360],  // ...rotate 360deg
    { clamp: false }
  )

  return <motion.div style={{ rotate }} />
}
```

Returns a motion value emitting milliseconds since instantiation, updating once per frame.

## Notes

- Creates a new independent motion value on each call.
- Effective for continuous, self-sustaining animations.
- Compose with `useTransform` and other motion value hooks.
- `clamp: false` allows values to grow unbounded for infinite loops.

## Related

- [useTransform](./use-transform.md)
- [useAnimationFrame](./use-animation-frame.md)
