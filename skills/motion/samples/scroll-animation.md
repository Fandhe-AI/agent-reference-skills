# Scroll Animation

Drive animations from scroll progress with `useScroll`, optionally remapping the value via `useTransform`.

```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

// 1. Page reading-progress bar (fixed to the top of the viewport)
export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        originX: 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: "#0af",
      }}
    />
  )
}

// 2. Element-linked reveal: animate as a section passes through the viewport
export function Reveal() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  return (
    <section ref={ref} style={{ minHeight: "100vh" }}>
      <motion.div style={{ opacity, y }}>Revealed on scroll</motion.div>
    </section>
  )
}
```

## Notes

- `useScroll()` with no args tracks the window; pass `target` (a ref) to track an element's progress through its scroll container.
- `offset` defines the progress boundaries: `["start end", "center center"]` maps progress 0 when the element's start meets the viewport end, to 1 when its center meets the viewport center.
- The returned `scrollYProgress` is a motion value (0–1) — bind it directly to `style` or remap it with `useTransform`/`useSpring`.
- Binding scroll values to `transform`, `opacity`, `clipPath`, or `filter` keeps the animation GPU-accelerated.
