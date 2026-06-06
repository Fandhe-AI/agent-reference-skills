# Layout Animation

Animate size/position changes automatically with the `layout` prop, and animate list reordering/removal together with `AnimatePresence`.

```tsx
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export default function TodoList() {
  const [items, setItems] = useState([
    { id: 1, text: "Design" },
    { id: 2, text: "Build" },
    { id: 3, text: "Ship" },
  ])

  const remove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      <AnimatePresence>
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            onClick={() => remove(item.id)}
            style={{ background: "#0af", margin: 8, padding: 12, borderRadius: 8 }}
          >
            {item.text}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
```

## Notes

- `layout` makes the element smoothly animate any layout change (size + position) caused by re-render; use `layout="position"` to animate only position and avoid stretching of aspect-changing content.
- Layout animations run via CSS `transform`, so the surrounding elements reflow without paint-triggering width/height changes.
- Combining `layout` with `AnimatePresence` lets remaining items slide into place as a sibling is removed — set `mode="popLayout"` to pull exiting items out of the layout flow during their exit.
- Set `border-radius` and `box-shadow` through the `style` prop so they are scale-corrected during the transition.
