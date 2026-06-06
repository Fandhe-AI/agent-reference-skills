# useSpring

Create a motion value that animates to its latest target using spring physics. Can run standalone with manual control or automatically follow another motion value.

## Signature / Usage

```tsx
import { useSpring, useMotionValue } from "motion/react"

// Manual control with a number or unit string
const x = useSpring(0)
const y = useSpring("100vh")

// Track and smooth another motion value (e.g. scroll progress)
const scrollProgress = useMotionValue(0)
const smoothed = useSpring(scrollProgress)

// With spring transition options
const animated = useSpring(0, { stiffness: 300 })
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `stiffness` / `damping` / `mass` | — | Standard spring transition parameters |
| `skipInitialAnimation` | `false` | Instantly jump to the initial value when tracking sources (like `useScroll`) that update after DOM measurement |

## Notes

- `.set(value)` updates the value and animates to the target with the spring.
- `.jump(value)` updates immediately without animation.
- Accepts number or unit-type strings (`px`, `%`, `vh`, etc.).
- Useful for "following" patterns: pointer tracking, scroll progress smoothing.

## Related

- [useMotionValue](./use-motion-value.md)
- [useScroll](./use-scroll.md)
- [useTransform](./use-transform.md)
