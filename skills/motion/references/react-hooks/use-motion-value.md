# useMotionValue

Create a `MotionValue` — a composable, signal-like value that updates the DOM directly without triggering React re-renders.

## Signature / Usage

```tsx
import { useMotionValue } from "motion/react"

const x = useMotionValue(0)

x.get()      // 100
x.set(100)   // update without re-rendering React

// Subscribe to changes
const unsubscribe = x.on("change", (latest) => console.log(latest))

// Compose into dependent values
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

return <motion.div style={{ x, opacity }} />
```

Accepts an initial string or number.

## Options / Props

| Method | Description |
|--------|-------------|
| `get()` | Returns the current value |
| `set(value)` | Updates the value without a React re-render |
| `jump(value)` | Sets value, resets velocity to 0, ends active animations, ignores attached effects |
| `getVelocity()` | Velocity per second for numeric values (`0` for strings/colors) |
| `isAnimating()` | `true` if currently animating |
| `stop()` | Halts active animations |
| `on(event, cb)` | Subscribe to `"change"`, `"animationStart"`, `"animationComplete"`, `"animationCancel"`; returns an unsubscribe fn |
| `destroy()` | Cleans up subscribers (usually automatic) |

## Notes

- Motion values track both state and velocity.
- Synchronize motion across components and compose via `useTransform`, `useSpring`, `useVelocity`.
- Prefer `useMotionValueEvent` over manual `on()` in components for automatic cleanup.

## Related

- [useTransform](./use-transform.md)
- [useSpring](./use-spring.md)
- [useVelocity](./use-velocity.md)
- [useMotionValueEvent](./use-motion-value-event.md)
- [useMotionTemplate](./use-motion-template.md)
