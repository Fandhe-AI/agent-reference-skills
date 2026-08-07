# Motion values

Composable, signal-like values that Motion renders with its optimized DOM renderer, tracking state and velocity without triggering Vue's render cycle.

## Signature / Usage

```javascript
import { useMotionValue, useTransform } from "motion-v"

const x = useMotionValue(0)
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])
```

## Options / Props

| Method | Description |
|--------|-------------|
| `get()` | Returns the latest motion value state |
| `set()` | Updates the motion value to a new state |
| `getVelocity()` | Returns velocity per second (0 for strings/colors) |
| `jump()` | Breaks continuity, resets velocity, ends animations |
| `isAnimating()` | Checks if currently animating |
| `stop()` | Halts the active animation |
| `on()` | Subscribes to events; returns an unsubscribe function |
| `destroy()` | Cleans up subscribers (usually automatic) |

## Notes

- Changes to a motion value update the DOM without triggering a Vue re-render.
- Velocity calculations account for frame rate variations; non-numerical values return 0 velocity.

## Related

- [use-velocity](./use-velocity.md)
- [use-transform](./use-transform.md)
- [use-spring](./use-spring.md)
