# Transitions

The `transition` prop controls timing, easing, spring physics, repetition, and orchestration of animations.

## Signature / Usage

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: "easeOut", duration: 2, delay: 0.5 }}
/>
```

Value-specific transitions and a `default` fallback:

```tsx
<motion.li
  animate={{
    x: 0,
    opacity: 1,
    transition: {
      default: { type: "spring" },
      opacity: { ease: "linear" },
    },
  }}
/>
```

## Tween Options (duration-based, default for most values)

| Name | Type | Description |
|------|------|-------------|
| `duration` | `number` | Length in seconds (default `0.3`) |
| `ease` | `string \| number[] \| string[]` | `linear`, `easeIn/Out/InOut`, `circIn/Out/InOut`, `backIn/Out/InOut`, `anticipate`, or cubic-bezier array |
| `times` | `number[]` | Keyframe positions (0-1) for multi-value animations |

## Spring Options (`type: "spring"`, default for transforms/layout)

| Name | Type | Description |
|------|------|-------------|
| `stiffness` | `number` | Spring tension; higher = snappier (default `1`) |
| `damping` | `number` | Opposing force; `0` = infinite oscillation (default `10`) |
| `mass` | `number` | Object mass; higher = more sluggish (default `1`) |
| `velocity` | `number` | Initial velocity |
| `bounce` | `number` | Bounciness `0`-`1` (default `0.25`); duration-based mode |
| `duration` / `visualDuration` | `number` | Spring time; `visualDuration` is easier to tune |
| `restSpeed` | `number` | End when below this speed (default `0.1`) |
| `restDelta` | `number` | End when below this distance (default `0.01`) |

## Inertia Options (`type: "inertia"`, used by drag momentum)

| Name | Type | Description |
|------|------|-------------|
| `power` | `number` | Higher = farther target (default `0.8`) |
| `timeConstant` | `number` | Deceleration in ms (default `700`) |
| `modifyTarget` | `(v) => number` | Adjust target, e.g. snap-to-grid |
| `min` / `max` | `number` | Boundary constraints with spring bounce |
| `bounceStiffness` / `bounceDamping` | `number` | Boundary bounce physics |

## Orchestration / Repeat

| Name | Type | Description |
|------|------|-------------|
| `delay` | `number` | Start delay in seconds; negatives start mid-animation |
| `repeat` | `number` | Repeat count; `Infinity` for perpetual |
| `repeatType` | `"loop" \| "reverse" \| "mirror"` | Repetition behavior |
| `repeatDelay` | `number` | Wait between repetitions |
| `when` | `"beforeChildren" \| "afterChildren"` | Order parent vs child variants |
| `delayChildren` | `number` | Delay child variant animations |
| `staggerChildren` | `number \| stagger()` | Stagger child timing |

```tsx
import { stagger } from "motion/react"

const container = {
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: stagger(0.1, { from: "last" }),
    },
  },
}
```

## Notes

- Spring is the default for `x`, `y`, `scale`, `rotate`, and layout animations; tween is the default for most other values.
- Higher-specificity transitions replace inherited defaults; add `inherit: true` to merge with a parent `MotionConfig` transition.
- `path: arc()` curves motion-value movement along an arc instead of a straight line.

## Related

- [overview.md](./overview.md)
- [layout.md](./layout.md)
- [drag.md](./drag.md)
