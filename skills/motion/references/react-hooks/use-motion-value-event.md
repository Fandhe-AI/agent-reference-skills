# useMotionValueEvent

Fire events when a motion value changes, with handlers tied to the component lifecycle and cleaned up automatically on unmount.

## Signature / Usage

```tsx
import { useMotionValue, useMotionValueEvent } from "motion/react"

function Component() {
  const x = useMotionValue(0)

  useMotionValueEvent(x, "change", (latest) => {
    console.log("x changed to", latest)
  })

  return null
}
```

Signature: `useMotionValueEvent(motionValue, eventName, callback)`.

## Options / Props

| Event | Description |
|-------|-------------|
| `change` | Fires when the value updates; receives the latest value |
| `animationStart` | Fires when animation begins |
| `animationComplete` | Fires when animation finishes |
| `animationCancel` | Fires when animation is cancelled |

## Notes

- Handlers are cleaned up automatically when the component unmounts.
- Wraps the motion value's `on()` method for convenience.
- For custom cleanup logic, use `motionValue.on("change", cb)` inside `useEffect` and return the unsubscribe.

## Related

- [useMotionValue](./use-motion-value.md)
- [useVelocity](./use-velocity.md)
