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

## Options / Props

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

## Notes

- All layout animations run via the CSS `transform` property for performance (no paint-triggering width/height changes).
- Stretched/distorted children: apply `layout` to child elements for scale correction.
- Set `border-radius` and `box-shadow` through the `style` prop so they are scale-corrected.
- Inline elements won't animate; ensure `display` is not `inline`.
- Combine with `AnimatePresence` + `layoutId` for smooth enter/exit shared transitions.
- Use `scrollbar-gutter: stable` to prevent scrollbar-driven layout jumps.
- Layout springs preserve velocity from the animation they interrupt (14.13.0, CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md).
- Source: https://motion.dev/docs/react-layout-animations (fetched 2026-11-14).

### Mass from size

Set `mass: "auto"` and a layout spring takes its mass from the element's size: big elements move with more weight, small ones feel light. Damping scales with the mass, so a bigger element settles later but bounces the same amount. Each element takes its mass from its own size, so in a group, small children react faster than their parent.

```tsx
<motion.div
  layout
  transition={{
    type: "spring",
    visualDuration: 0.4,
    bounce: 0.2,
    mass: "auto"
  }}
/>
```

### LayoutGroup

Synchronizes layout animations across components that may not re-render together.

```tsx
import { LayoutGroup, motion } from "motion/react"

<LayoutGroup>
  <Item />
  <Item />
</LayoutGroup>
```

### Transition Customization

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

### Motion along a path

By default, layout animations move elements in a straight line. Pass `arc()` to `transition.layout.path` to curve the motion, including for shared `layoutId` transitions. `arc` is imported from `motion/react`.

```tsx
import { arc, motion } from "motion/react"

<motion.div layout transition={{ layout: { path: arc() } }} />
```

## Related

- [overview.md](./overview.md)
- [transitions.md](./transitions.md)
