# SVG Animation

Motion provides a `motion` component for every SVG element, enabling line drawing, path morphing, attribute animation, and `viewBox` animation.

## Line Drawing

```tsx
<motion.path
  d={d}
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
```

| Name | Type | Description |
|------|------|-------------|
| `pathLength` | `number` (0-1) | Total drawn length of the stroke |
| `pathSpacing` | `number` (0-1) | Length of the gap between segments |
| `pathOffset` | `number` (0-1) | Where the drawn segment begins |

Supported elements: `path`, `circle`, `ellipse`, `line`, `polygon`, `polyline`, `rect`.

## Path Morphing

Animate the `d` attribute between similar paths:

```tsx
<motion.path d="M 0,0 l 0,10 l 10,10" animate={{ d: "M 0,0 l 10,0 l 10,10" }} />
```

Paths must have identical numbers and types of instructions. Use a library like Flubber for dissimilar interpolation.

## Animating viewBox

```tsx
// Pan
<motion.svg viewBox="0 0 200 200" animate={{ viewBox: "100 0 200 200" }} />

// Zoom
<motion.svg viewBox="0 0 200 200" animate={{ viewBox: "-100 -100 300 300" }} />
```

## Attributes & Transforms

```tsx
// Animate SVG attributes directly
<motion.circle cx={0} animate={{ cx: 50 }} />

// Use attribute (not CSS transform) shorthand
<motion.rect attrX={0} animate={{ attrX: 100 }} />

// Restore native SVG transform origin (top-left)
<motion.rect style={{ rotate: 90, transformBox: "view-box" }} />
```

| Name | Description |
|------|-------------|
| `attrX` / `attrY` | SVG `x`/`y` attribute (distinct from CSS `x`/`y` transform) |
| `attrScale` | SVG `scale` attribute |

## Drag with scaled viewBox

```tsx
import { motion, MotionConfig, transformViewBoxPoint } from "motion/react"

function Component() {
  const ref = useRef(null)
  return (
    <MotionConfig transformPagePoint={transformViewBoxPoint(ref)}>
      <svg ref={ref} viewBox="0 0 100 100" style={{ width: 200, height: 200 }}>
        <motion.circle drag />
      </svg>
    </MotionConfig>
  )
}
```

## Notes

- By default Motion sets SVG transform origin to the element center (matching CSS); use `transformBox: "view-box"` to restore native behavior.
- `MotionValue`s pass through both attribute targets (`cx={cx}`) and `style` (`style={{ opacity }}`).
- Components available: `motion.svg`, `motion.path`, `motion.circle`, `motion.ellipse`, `motion.rect`, `motion.line`, `motion.polygon`, `motion.polyline`, and filter primitives like `motion.feTurbulence`, `motion.feDisplacementMap`.

## Related

- [overview.md](./overview.md)
- [transitions.md](./transitions.md)
- [drag.md](./drag.md)
