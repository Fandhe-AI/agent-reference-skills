# Scroll Animations

Two approaches: scroll-linked animations driven by `useScroll` motion values, and scroll-triggered animations via the `whileInView` prop.

## Scroll-Linked: useScroll

```tsx
import { useScroll, motion } from "motion/react"

function Progress() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress, originX: 0 }} />
}
```

### useScroll return values

| Name | Type | Description |
|------|------|-------------|
| `scrollX` / `scrollY` | `MotionValue<number>` | Absolute scroll position in pixels |
| `scrollXProgress` / `scrollYProgress` | `MotionValue<number>` | Normalized progress 0-1 |

### useScroll options

| Name | Type | Description |
|------|------|-------------|
| `target` | `RefObject` | Track a specific element's progress through the viewport |
| `offset` | `string[]` | When tracking starts/ends, e.g. `["start end", "end start"]` |
| `container` | `RefObject` | Custom scroll container (defaults to window) |

Map scroll progress to CSS values with `useTransform`:

```tsx
import { useTransform } from "motion/react"

const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])
return <motion.div style={{ filter }} />
```

## Scroll-Triggered: whileInView

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
```

### viewport options

| Name | Type | Description |
|------|------|-------------|
| `once` | `boolean` | Play only the first time the element enters view |
| `amount` | `"some" \| "all" \| number` | Visibility threshold to trigger |
| `margin` | `string` | Margin around the viewport boundary |
| `root` | `RefObject` | Custom scroll container ref |

## useInView (state, non-motion elements)

```tsx
import { useInView } from "motion/react"

const ref = useRef(null)
const isInView = useInView(ref)
```

## Notes

- `useScroll` returns `MotionValue`s; pass them to `style` (or `useTransform`) — do not read them in render.
- `whileInView` is best for one-shot reveal animations; `useScroll` is best for parallax/progress bars and scroll scrubbing.
- `useInView` sets React state and works with plain (non-motion) elements.

## Related

- [overview.md](./overview.md)
- [transitions.md](./transitions.md)
