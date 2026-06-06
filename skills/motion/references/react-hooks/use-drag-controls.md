# useDragControls

Manually initiate and control drag gestures on motion components, as an alternative to automatic drag detection (e.g. starting a drag from a video scrubber click).

## Signature / Usage

```tsx
import { useDragControls } from "motion/react"
import { motion } from "motion/react"

function Component() {
  const controls = useDragControls()

  return (
    <>
      <div onPointerDown={(event) => controls.start(event)} />
      <motion.div drag dragControls={controls} />
    </>
  )
}
```

## Options / Props

`controls.start(event, options?)` options:

| Name | Default | Description |
|------|---------|-------------|
| `snapToCursor` | `false` | Immediately snap the motion component to the cursor |
| `distanceThreshold` | `3` (px) | Pointer travel distance before drag initializes |
| `touchAction` | — | Apply `touch-action: none` to triggering elements for touch support |

Methods: `controls.stop()` ends the drag normally; `controls.cancel()` ends the drag and skips the `onDragEnd` callback.

## Notes

- Set `dragListener={false}` on the motion component to prevent automatic drag initiation, so dragging only starts via `controls.start`.

## Related

- [useMotionValue](./use-motion-value.md)
- [useVelocity](./use-velocity.md)
