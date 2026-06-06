# AnimatePresence

Animate components as they mount and unmount from the React tree by wrapping conditional or keyed children in `AnimatePresence`.

```tsx
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

const slides = [
  { id: 1, title: "Slide One" },
  { id: 2, title: "Slide Two" },
  { id: 3, title: "Slide Three" },
]

export default function Slideshow() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        >
          <h2>{slide.title}</h2>
        </motion.div>
      </AnimatePresence>

      <button onClick={() => setIndex((i) => (i + 1) % slides.length)}>
        Next
      </button>
    </div>
  )
}
```

## Notes

- Every direct child needs a unique, stable `key` (use a domain id, never an array index) so `AnimatePresence` can detect what entered or left.
- `mode="wait"` defers the entering element until the exiting one finishes; `"sync"` (default) animates both at once; `"popLayout"` removes exiting elements from layout so siblings can reflow immediately.
- Wrap the conditional logic inside `AnimatePresence` — do not conditionally render `AnimatePresence` itself, or the exit animation is skipped.
- Pass `initial={false}` to skip enter animations for children that are present on first render.
