# arc

`arc()` changes the path between two `x`/`y` points from a straight line to a curved one.

## Signature / Usage

```
import { arc } from "motion"

const path = arc({ strength: 1 })

animate(".box", { x: 200, y: 100 }, { duration: 1, path })
```

`arc()` is passed to `transition.path`. It works with `motion` components, `animate`, and `useAnimate` (importable from `"motion"` or `"motion/react"`).

React forms:

```
<motion.div
  animate={{ x: 200, y: 100 }}
  transition={{ duration: 1, path: arc() }}
/>

// Layout animations
<motion.div
  layout
  transition={{
    layout: { duration: 0.6, path: arc({ strength: 0.6 }) },
  }}
/>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `strength` | number | `0.5` | Strength of the bend. `1` peaks at a height equal to the distance between the two points; `0` is no bend |
| `peak` | number | `0.5` | Where along the bend the arc reaches its maximum height. Lower values bring the peak towards the start |
| `direction` | `"cw"` \| `"ccw"` | automatic | Which side the arc bulges toward (clockwise / counter-clockwise relative to direction of travel). Automatic picks a stable screen-space side |
| `rotate` | boolean \| number | `false` | Rotate the element to follow the tangent of the arc. `true` = full, a number between `0` and `1` = scaled. Additive to existing `rotate` |

## Notes

- `arc()` is not supported by the mini `animate()` from `"motion/mini"`.
- The path interpolates between the first and last `x`/`y` value, including across keyframe arrays.
- With a spring, progress overshoots `t = 1` and oscillates back, so the element settles with a bouncy arc; `transition.path` only describes the curve.
- Memoisation: with automatic `direction`, create a single `arc()` instance for all animations on the same component (`useMemo` in React, a module-level constant in vanilla JS) for improved interruption.
- Source: https://motion.dev/docs/arc (fetched 2026-10).

## Related

- [animate](./animate.md)
- [spring](./spring.md)
- [animate-layout](./animate-layout.md)
