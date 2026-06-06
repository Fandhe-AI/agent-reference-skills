# motion

Drop-in replacement for HTML and SVG elements that adds animation props running at up to 120fps without triggering React re-renders.

## Signature / Usage

```tsx
import { motion } from "motion/react"

;<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{ scale: 1.1 }}
  transition={{ duration: 0.5 }}
/>
```

There is a `motion` component for every HTML and SVG element (`motion.div`, `motion.span`, `motion.circle`, ...). Wrap custom components with `motion.create(Component)`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initial` | object \| string \| string[] \| false | Starting visual state before mount |
| `animate` | object \| string \| string[] | Target state to animate to on enter/update |
| `exit` | object \| string \| string[] | Animation when removed (requires `AnimatePresence`) |
| `transition` | object | Timing, easing, and spring configuration |
| `variants` | object | Named animation states for reuse and propagation |
| `whileHover` | object \| string | Animation while hovered |
| `whileTap` | object \| string | Animation while pressed/tapped |
| `whileFocus` | object \| string | Animation while focused |
| `whileInView` | object \| string | Animation while element is in viewport |
| `drag` | boolean \| "x" \| "y" | Enables dragging on the given axis |
| `dragConstraints` | object \| ref | Limits the draggable area |
| `dragMomentum` | boolean | Applies inertia after release |
| `layout` | boolean \| "position" \| "size" | Enables layout animations |
| `layoutId` | string | Tracks shared element transitions across components |
| `style` | object | Supports motion values and independent transforms |
| `onAnimationStart` / `onAnimationComplete` | function | Animation lifecycle callbacks |

## Notes

- Animations bypass React's render cycle, updating via the browser's native animation pipeline.
- Animating `transform` and `opacity` offers optimal performance.
- Compatible with server-side rendering.
- For drag gestures on touch devices, disable scrolling with the `touch-action` CSS rule.

## Related

- [AnimatePresence](./animate-presence.md)
- [LayoutGroup](./layout-group.md)
- [LazyMotion](./lazy-motion.md)
- [MotionConfig](./motion-config.md)
