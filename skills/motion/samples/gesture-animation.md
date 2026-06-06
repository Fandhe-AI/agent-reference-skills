# Gesture Animation

React to hover, tap, and drag interactions with the `whileHover`, `whileTap`, `whileDrag`, and `drag` props.

```tsx
import { motion } from "motion/react"
import { useRef } from "react"

export default function GestureCard() {
  const constraintsRef = useRef(null)

  return (
    <motion.div
      ref={constraintsRef}
      style={{ width: 320, height: 320, background: "#eee", borderRadius: 16 }}
    >
      <motion.div
        // Hover + tap feedback
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 3 }}
        // Drag within the parent bounds
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        whileDrag={{ cursor: "grabbing" }}
        onTap={() => console.log("tapped")}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ width: 100, height: 100, background: "#0af", borderRadius: 12 }}
      />
    </motion.div>
  )
}
```

## Notes

- `whileHover` / `whileTap` / `whileDrag` animate only for the duration of the gesture, then return to `animate`.
- `whileTap` is keyboard-accessible automatically: `Enter` triggers it, and release fires `onTap`.
- `dragConstraints` accepts a ref (bounds = that element) or an explicit `{ top, left, right, bottom }` pixel box; `dragElastic` (0–1) controls overshoot beyond the bounds.
- For touch devices, set the `touch-action` CSS rule on the draggable axis so the page does not scroll while dragging.
