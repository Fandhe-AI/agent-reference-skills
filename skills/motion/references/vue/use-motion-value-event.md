# useMotionValueEvent

Manages motion value event listeners with automatic cleanup on unmount, wrapping the motion value's underlying `on()` method.

## Signature / Usage

```javascript
import { useMotionValue, useMotionValueEvent } from "motion-v"

const x = useMotionValue(0)

useMotionValueEvent(x, "animationStart", () => {
  console.log("animation started on x")
})

useMotionValueEvent(x, "change", (latest) => {
  console.log("x changed to", latest)
})
```

## Options / Props

| Event | Description |
|-------|-------------|
| `change` | Emits the latest motion value |
| `animationStart` | Fires when animation begins |
| `animationComplete` | Fires when animation ends |
| `animationCancel` | Fires when animation is canceled |

## Notes

- Event handlers are safely removed on component unmount.

## Related

- [motion-value](./motion-value.md)
- [motion](./motion.md)
- [use-velocity](./use-velocity.md)
