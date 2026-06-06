# Animation Overview

How Motion for React animates elements via the `motion` component, `animate`/`initial`/`exit` props, keyframes, variants, and `AnimatePresence`.

## Signature / Usage

```tsx
import { motion } from "motion/react"

// Animate toward target values whenever `animate` changes
<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
/>

// Skip the enter animation
<motion.div initial={false} animate={{ y: 100 }} />
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `animate` | `object \| string \| string[]` | Target values (or variant labels) to animate toward; re-runs when changed |
| `initial` | `object \| string \| false` | Starting values for enter animation; `false` disables it |
| `exit` | `object \| string` | Values when element leaves DOM; requires `AnimatePresence` |
| `transition` | `object` | Timing/easing/physics config (see transitions.md) |
| `variants` | `object` | Named animation states that propagate to children |
| `custom` | `any` | Per-element data passed to dynamic variant functions |
| `whileHover` / `whileTap` / `whileFocus` / `whileDrag` / `whileInView` | `object \| string` | Gesture-driven animation states |

## Keyframes

```tsx
// Sequence of values
<motion.div animate={{ x: [0, 100, 0] }} />

// `null` = current value (natural interruption)
<motion.div animate={{ x: [null, 100, 0] }} />

// Custom keyframe timing (0-1 progress) via `times`
<motion.circle
  animate={{ cx: [null, 100, 200] }}
  transition={{ duration: 3, times: [0, 0.2, 1] }}
/>
```

## Variants

```tsx
const list = { visible: { opacity: 1 }, hidden: { opacity: 0 } }
const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

// Parent label propagates to children automatically
<motion.ul variants={list} initial="hidden" animate="visible">
  <motion.li variants={item} />
  <motion.li variants={item} />
</motion.ul>
```

Dynamic variants resolve per element via `custom`:

```tsx
const variants = {
  visible: (i) => ({ opacity: 1, transition: { delay: i * 0.3 } }),
}
items.map((item, i) => <motion.div custom={i} variants={variants} />)
```

## AnimatePresence

Keeps exiting elements in the DOM until their `exit` animation finishes. Children need a stable `key`.

```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

## Animatable Values

- Independent transforms: `x`, `y`, `z`, `scale`/`scaleX`/`scaleY`, `rotate`/`rotateX`/`rotateY`/`rotateZ`, `skewX`/`skewY`, `transformPerspective`.
- Any CSS value: `opacity`, `filter`, `background-image`, `mask-image`, `box-shadow`.
- Colors: hex, `rgba`, `hsla`, `oklch`, `oklab`, `color-mix`.
- Value-type conversion: `width`/`height` to/from `"auto"`, units (`"100%"` <-> `"calc(...)"`).
- CSS variables can be both animated (`--rotate`) and used as targets (`var(--action-bg)`).

## Notes

- Import from `motion/react`.
- `animate` re-runs automatically on prop change; no manual trigger needed.
- Use `MotionConfig` to set default transitions for a subtree.
- `useAnimate` provides imperative sequencing/timeline control for non-motion elements.

## Related

- [transitions.md](./transitions.md)
- [gestures.md](./gestures.md)
- [scroll.md](./scroll.md)
- [layout.md](./layout.md)
