# frame

`frame` schedules functions on Motion's animation loop, batching reads, updates and renders.

## Signature / Usage

```
import { frame, cancelFrame } from "motion"

frame.render(() => element.style.transform = "translateX(0px)")

function measureElement() {
  console.log(element.getBoundingClientRect())
}

frame.read(measureElement)
cancelFrame(measureElement)
```

Keep a function firing every frame by passing `true` as the second argument:

```
let i = 0

function update() {
  i++

  // Stop after 100 frames
  if (i >= 100) cancelFrame(update)
}

frame.update(update, true)
```

## Options / Props

Frame steps, run in order:

| Name | Type | Description |
|------|------|-------------|
| `frame.read(fn, keepAlive?)` | function | Read values from or measure the DOM |
| `frame.update(fn, keepAlive?)` | function | Amend values once all values have been read |
| `frame.render(fn, keepAlive?)` | function | Apply updated values to the DOM once all values have been updated |

## Notes

- Works like `requestAnimationFrame`: callbacks execute on the next animation frame.
- Prevents layout thrashing and avoids the overhead of multiple `requestAnimationFrame` calls.
- The source page's `cancelFrame` example imports from `"framer-motion"`; the other examples import from `"motion"`.
- `styleEffect`, `attrEffect`, `svgEffect` and `propEffect` render during the render step; `delay` fires on the `read` step; Three.js / vgpu writes happen in `preRender` (see their pages).
- Source: https://motion.dev/docs/frame (fetched 2026-10).

## Related

- [delay](./delay.md)
- [style-effect](./style-effect.md)
- [resize](./resize.md)
