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
| `tap` | `{ count, countTimeout, hold, repeat }` | Options for the tap gesture: `count` (quick consecutive taps needed for `onTap`, default `1`), `countTimeout` (max seconds between taps, default `0.3`), `hold` (seconds a press must be held for `onTap`, default `0`), `repeat` (once `hold` is reached, `onTap` fires every `repeat` seconds while held) |
| `whileFocus` | object \| string | Animation while focused |
| `whileInView` | object \| string | Animation while element is in viewport |
| `drag` | boolean \| "x" \| "y" | Enables dragging on the given axis |
| `dragConstraints` | object \| ref | Limits the draggable area |
| `dragMomentum` | boolean | Applies inertia after release |
| `pinch` | boolean \| object | Enables the pinch gesture (scale, rotate and move with two touches, a trackpad pinch or Safari gesture events). Needs `pinchFeatures` loaded via `LazyMotion`. Options: `scale`, `rotate` (`{ min, max, snap }`), `pan`, `origin`, `elastic` (default `0.35`), `snapToOrigin`, `transition`, `onStart` / `onMove` / `onEnd` |
| `whilePinch` | object \| string | Animation while pinching. Pinch writes `scale`, `rotate`, `x` and `y`, so animate other values such as `boxShadow` or `opacity` |
| `layout` | boolean \| "position" \| "size" | Enables layout animations |
| `layoutId` | string | Tracks shared element transitions across components |
| `layoutAnchor` | `{ x: number, y: number }` \| false | Point on the parent used to resolve child layout position (default `{ x: 0, y: 0 }`; each axis is a 0-1 progress, `0.5` = center, `1` = bottom/right). `false` disables relative projection for this element |
| `propagate` | `{ tap: false }` | Prevents children gestures from propagating to parents. Currently only supports `tap` |
| `style` | object | Supports motion values and independent transforms |
| `onAnimationStart` / `onAnimationComplete` | function | Animation lifecycle callbacks |

## Notes

- Animations bypass React's render cycle, updating via the browser's native animation pipeline.
- Animating `transform` and `opacity` offers optimal performance.
- Compatible with server-side rendering.
- For drag gestures on touch devices, disable scrolling with the `touch-action` CSS rule.
- `pinch` isn't part of the default `motion` bundle: wrap in `<LazyMotion features={pinchFeatures}>` (`import { LazyMotion, motion, pinchFeatures } from "motion/react"`). It sets `touch-action: none` (use `style={{ touchAction: "pan-y" }}` to let one finger scroll), works with `drag`, and a pinch never fires `onTap`.
- `tap` was added in motion 14.10.0 (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md); `transition.out` (transitions used when exiting a state) was added in 14.7.0 and is listed only in the CHANGELOG, not on the docs page.
- Source: https://motion.dev/docs/react-motion-component (fetched 2026-11-14).

## Related

- [AnimatePresence](./animate-presence.md)
- [LayoutGroup](./layout-group.md)
- [LazyMotion](./lazy-motion.md)
- [MotionConfig](./motion-config.md)
