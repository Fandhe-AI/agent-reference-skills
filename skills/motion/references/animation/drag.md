# Drag

The `drag` prop makes an element draggable, with constraints, elasticity, momentum, and imperative control via `useDragControls`.

## Signature / Usage

```tsx
<motion.div drag />        // both axes
<motion.div drag="x" />    // horizontal only
<motion.div drag="y" />    // vertical only
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `drag` | `boolean \| "x" \| "y"` | Enable dragging on both axes or one |
| `dragConstraints` | `{ top, left, right, bottom } \| RefObject` | Movement bounds in pixels or relative to a ref element |
| `dragElastic` | `number` | Elasticity beyond constraints, 0-1 (default `0.5`) |
| `dragMomentum` | `boolean` | Inertia animation on release (default `true`) |
| `dragTransition` | `InertiaOptions` | Physics of momentum, e.g. `bounceStiffness`/`bounceDamping` |
| `dragDirectionLock` | `boolean` | Lock to the first dragged axis |
| `dragPropagation` | `boolean` | Allow drag events to propagate to parents |
| `dragSnapToOrigin` | `boolean` | Animate back to origin on release |
| `dragListener` | `boolean` | Default pointer handler (default `true`); set `false` for manual control |
| `dragControls` | `DragControls` | Value from `useDragControls()` for imperative start |
| `whileDrag` | `object \| string` | Animation state while dragging |
| `onDragStart` | `(event, info) => void` | Drag begins |
| `onDrag` | `(event, info) => void` | Fires continuously while dragging |
| `onDragEnd` | `(event, info) => void` | Drag completes |
| `onDirectionLock` | `(axis) => void` | Fires when direction lock resolves |

## Constraints (ref-based)

```tsx
const constraintsRef = useRef(null)

<motion.div ref={constraintsRef}>
  <motion.div drag dragConstraints={constraintsRef} dragElastic={0.1} />
</motion.div>
```

## Event info

```tsx
function onDrag(event, info) {
  info.point     // pointer coordinates
  info.delta     // distance since last event
  info.offset    // distance from drag origin
  info.velocity  // current pointer velocity
}
```

## useDragControls (imperative start)

```tsx
import { motion, useDragControls } from "motion/react"

function Scrubber() {
  const dragControls = useDragControls()
  return (
    <>
      <div onPointerDown={(e) => dragControls.start(e, { snapToCursor: true })} />
      <motion.div drag="x" dragControls={dragControls} dragListener={false} />
    </>
  )
}
```

## Notes

- Set `dragMomentum={false}` to stop without inertia.
- Snap-to-grid: use `dragTransition={{ power: 0, modifyTarget: t => Math.round(t / 50) * 50 }}`.
- Set `draggable={false}` on child `<img>` elements to avoid the browser ghost image.
- Pair `dragControls` with `dragListener={false}` to start drag from a separate handle.
- A framework-free `drag()` function (with `constraints`, `elastic`, `momentum` and headless `x` / `y` motion values) is available in vanilla JS since motion 14.4.0; see `vanilla-js/drag.md`. Its `elastic` default is documented as `0.35`, while `dragElastic` here is documented as `0.5`.
- Source: https://motion.dev/docs/react-drag (fetched 2026-11-14).

## Related

- [gestures.md](./gestures.md)
- [transitions.md](./transitions.md)
- [svg.md](./svg.md)
