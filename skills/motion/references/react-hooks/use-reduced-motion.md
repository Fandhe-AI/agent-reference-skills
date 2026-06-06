# useReducedMotion

Detect whether the device has the Reduced Motion accessibility setting enabled, reactively re-rendering when it changes.

## Signature / Usage

```tsx
import { useReducedMotion } from "motion/react"
import { motion } from "motion/react"

export function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()
  const closedX = shouldReduceMotion ? 0 : "-100%"

  return (
    <motion.div
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : closedX }}
    />
  )
}
```

Returns a boolean: `true` if Reduced Motion is enabled, `false` otherwise.

## Notes

- Reactive: actively responds to changes and re-renders components with the latest setting.
- Use cases: replace motion-sickness-inducing animations with opacity changes, disable video autoplay, turn off parallax.
- Part of Motion's accessibility features for respecting user motion preferences.

## Related

- [useAnimate](./use-animate.md)
