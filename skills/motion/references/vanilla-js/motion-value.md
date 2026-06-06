# motionValue()

Creates a reactive value that tracks state and velocity of an animated property.

## Signature / Usage

```javascript
import { motionValue, animate } from "motion"

const x = motionValue(0)
const unsubscribe = x.on("change", (latest) => console.log(latest))

animate(x, 100)
```

- `motionValue(initialValue)` returns a `MotionValue`.
- Starting a new animation on the same value automatically ends the previous one.

## Options / Props

| Method | Description |
|--------|-------------|
| `get()` | Returns the latest state |
| `set(value)` | Updates the value to a new state |
| `getVelocity()` | Returns latest velocity (0 if non-numerical) |
| `jump(value)` | Moves to new state, resets velocity to 0, ends active animations |
| `isAnimating()` | Returns whether currently animating |
| `stop()` | Terminates the active animation |
| `on(event, cb)` | Subscribes to an event; returns an unsubscribe function |
| `destroy()` | Cleans up subscribers to this value |

## Notes

- Events available via `on()`: `change`, `animationStart`, `animationCancel`, `animationComplete`.

## Related

- [animate](./animate.md)
- [spring](./spring.md)
