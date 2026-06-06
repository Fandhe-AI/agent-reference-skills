# Layout Animations

The `layout` prop animates size/position changes automatically using CSS `transform`; `layoutId` enables shared-element transitions between components.

## Signature / Usage

```tsx
// Animate any layout change (size + position)
<motion.div layout />

// Animate position only (avoids stretching of aspect-changing content)
<motion.div layout="position" />

// Shared-element transition: crossfade between two elements
<motion.div layoutId="underline" />
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `layout` | `boolean \| "position" \| "size"` | Animate layout changes; `"position"`/`"size"` restrict the axis |
| `layoutId` | `string` | Link two elements for shared-element crossfade transitions |
| `layoutScroll` | `boolean` | Mark a scrollable container so scroll offset is measured correctly |
| `layoutRoot` | `boolean` | Mark a `position: fixed` element so page scroll is accounted for |
| `layoutDependency` | `any` | Only measure/animate when this value changes (perf) |
| `layoutAnchor` | `{ x: number, y: number }` | Anchor point (0-1) the animation pins to |
| `onLayoutAnimationStart` | `() => void` | Fires when a layout animation starts |
| `onLayoutAnimationComplete` | `() => void` | Fires when a layout animation completes |

## LayoutGroup

Synchronizes layout animations across components that may not re-render together.

```tsx
import { LayoutGroup, motion } from "motion/react"

<LayoutGroup>
  <Item />
  <Item />
</LayoutGroup>
```

## Transition Customization

Layout uses a dedicated `layout` transition key:

```tsx
<motion.div
  layout
  transition={{
    ease: "linear",
    layout: { duration: 0.3 },
  }}
/>
```

## Notes

- All layout animations run via the CSS `transform` property for performance (no paint-triggering width/height changes).
- Stretched/distorted children: apply `layout` to child elements for scale correction.
- Set `border-radius` and `box-shadow` through the `style` prop so they are scale-corrected.
- Inline elements won't animate; ensure `display` is not `inline`.
- Combine with `AnimatePresence` + `layoutId` for smooth enter/exit shared transitions.
- Use `scrollbar-gutter: stable` to prevent scrollbar-driven layout jumps.

## Related

- [overview.md](./overview.md)
- [transitions.md](./transitions.md)
