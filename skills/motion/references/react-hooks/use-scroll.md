# useScroll

Create scroll-linked animations by tracking scroll progress as motion values. Can leverage the browser `ScrollTimeline` API for hardware acceleration.

## Signature / Usage

```tsx
import { useScroll } from "motion/react"
import { motion } from "motion/react"

// Page scroll progress bar
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress }} />
}

// Track an element's progress through the viewport
function Section() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  return <div ref={ref} />
}
```

Returns four motion values:

- `scrollX` / `scrollY` — absolute scroll position in pixels per axis.
- `scrollXProgress` / `scrollYProgress` — normalized progress `0`–`1` within the defined offsets.

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `container` | viewport | Ref to a scrollable element to track instead of the window |
| `target` | scroll container | Ref to an element whose progress within the container is tracked |
| `axis` | `"y"` | Tracked axis (`"x"` or `"y"`) |
| `offset` | `["start start", "end end"]` | Intersection points defining progress boundaries |
| `trackContentSize` | `false` | Auto-update when content size changes |

## Notes

- Offsets accept named edges (`start`, `center`, `end`), percentages, pixels, and viewport units.
- Returned values are motion values, composable with `useTransform` and `useSpring`.
- GPU-accelerated when driving `opacity`, `transform`, `clipPath`, or `filter`.

## Related

- [useTransform](./use-transform.md)
- [useSpring](./use-spring.md)
- [useMotionValueEvent](./use-motion-value-event.md)
