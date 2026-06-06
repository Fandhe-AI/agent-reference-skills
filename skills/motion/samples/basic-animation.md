# Basic Animation

Animate a `motion` component from an `initial` state to an `animate` target, with an `exit` state for removal.

```tsx
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export default function Box() {
  const [show, setShow] = useState(true)

  return (
    <>
      <button onClick={() => setShow((v) => !v)}>Toggle</button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ width: 120, height: 120, background: "#0af", borderRadius: 12 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
```

## Notes

- `initial` is the visual state before mount; pass `initial={false}` to render directly at the `animate` state without an enter animation.
- `exit` only runs when the element is wrapped in `AnimatePresence`.
- Prefer animating `transform` (`x`, `y`, `scale`, `rotate`) and `opacity` — they run on the compositor and avoid React re-renders.
- `transition` accepts `duration`/`ease` for tweens or `type: "spring"` with `stiffness`/`damping` for physics.
