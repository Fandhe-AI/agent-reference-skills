# Tween

A tween animates between a start and end value over a set duration, shaped by an easing curve.

## Signature / Usage

```
import { animate } from "motion"

animate(
  element,
  { x: 200 },
  { duration: 0.6, ease: "easeInOut" }
)
```

`duration` is in seconds. `ease` takes the name of a built-in easing function, an array of four numbers for a custom cubic bezier, or your own function mapping `0`-`1` to `0`-`1`.

Multiple keyframes:

```
animate(
  element,
  { x: [0, 200, 100] },
  { duration: 1, times: [0, 0.7, 1] }
)
```

React form:

```
<motion.div
  animate={{ x: 200 }}
  transition={{ duration: 0.6, ease: "easeInOut" }}
/>
```

Easing function anatomy:

```
function linear(p) {
  return p
}

function pow2(p) {
  return p * p;
}

function reverse(ease) {
  return (p) => 1 - ease(p)
}

// The eased progress mixes the two keyframes
const value = from + (to - from) * p
```

## Notes

- Every tween is made of keyframes, a duration, and easing.
- `animate` creates a tween whenever you give it a `duration` or an easing curve. Motion does have `type: "tween"`, but it is typically not used and kept mostly for backwards compatibility.
- Keyframes are spread evenly by default; `times` positions each as a fraction of the total. `ease` also accepts an array, one curve per pair of keyframes.
- A physics-based spring has no declared duration; duration is a side effect of the simulation, and it carries the current velocity into the new animation.
- Performance depends on the browser render pipeline (layout, paint, composite), not on duration or easing; audit which properties are animated.

## Related

- [easing-functions](./easing-functions.md)
- [spring](./spring.md)
- [animate](./animate.md)
