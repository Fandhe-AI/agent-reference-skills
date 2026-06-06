# useVelocity

Create a motion value that tracks the velocity of another motion value, enabling velocity-based animations and interactions.

## Signature / Usage

```tsx
import { useMotionValue, useVelocity, useTransform } from "motion/react"
import { motion } from "motion/react"

function Component() {
  const x = useMotionValue(0)
  const xVelocity = useVelocity(x)
  const scale = useTransform(
    xVelocity,
    [-3000, 0, 3000],
    [2, 1, 2],
    { clamp: false }
  )

  return <motion.div drag="x" style={{ x, scale }} />
}
```

Accepts a numerical motion value; returns a new motion value updating with the source's velocity.

## Notes

- Works with any numerical motion value.
- Chainable — pass a velocity value back into `useVelocity` to compute acceleration.
- Integrates with `useMotionValueEvent` to listen for velocity changes.
- Useful for drag interactions and scroll-based effects.

## Related

- [useMotionValue](./use-motion-value.md)
- [useTransform](./use-transform.md)
- [useDragControls](./use-drag-controls.md)
