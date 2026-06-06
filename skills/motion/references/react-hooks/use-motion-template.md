# useMotionTemplate

Create a motion value from a string template containing other motion values, automatically updating whenever any contained motion value changes.

## Signature / Usage

```tsx
import { useMotionTemplate, useMotionValue } from "motion/react"
import { motion } from "motion/react"

function Component() {
  const blur = useMotionValue(10)
  const saturate = useMotionValue(50)
  const filter = useMotionTemplate`blur(${blur}px) saturate(${saturate}%)`

  return <motion.div style={{ filter }} />
}
```

Uses tagged template literal syntax — interpolate motion values directly into a string.

## Notes

- Returns a motion value rendering the template string with the current motion value states.
- Supports mixing static text with multiple dynamic motion values.
- Works seamlessly with `style` props on motion components (e.g. `filter`, `transform`).

## Related

- [useMotionValue](./use-motion-value.md)
- [useSpring](./use-spring.md)
- [useTransform](./use-transform.md)
