# animate()

Core function to animate HTML/SVG elements, motion values, single values, or JS objects.

## Signature / Usage

```javascript
import { animate } from "motion"

const box = document.getElementById("box")

const animation = animate(
  box,
  { opacity: 0, x: 100 },
  { duration: 0.5, ease: "easeOut" }
)

animation.pause()
animation.time = 0.25
animation.play()

await animation // resolves on completion
```

- `target`: HTML/SVG element(s), CSS selector string, motion value, JS object, or single value.
- `values`: object of animatable props (`{ opacity: 0, x: 100 }`), keyframe arrays (`{ x: [0, 100, 0] }`), or a target value.
- `options`: transition configuration (see below).

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"tween" \| "spring" \| "inertia"` | `"tween"` | Animation type |
| `duration` | number | `0.3` | Length in seconds |
| `ease` | string \| array \| function | — | Easing curve (`"linear"`, `"easeOut"`, cubic bezier) |
| `delay` | number | `0` | Delay before start (seconds); accepts `stagger()` |
| `repeat` | number | `0` | Repeat count (`Infinity` for perpetual) |
| `repeatType` | `"loop" \| "reverse" \| "mirror"` | `"loop"` | Repeat behavior |
| `bounce` | number | `0.25` | Spring bounciness (0–1) |
| `stiffness` | number | `1` | Spring stiffness |
| `damping` | number | `10` | Spring opposing force |
| `path` | function | — | Pass `arc()` to curve `x` / `y` movement instead of a straight line (added in 12.40.0). `arc()` accepts `strength`, `peak`, `direction` and `rotate` options |
| `onUpdate` | function | — | Callback with latest value |

```javascript
import { animate, arc } from "motion"

animate(".product", { x: 200, y: -120 }, { duration: 0.6, path: arc() })
```

## Notes

- Alternative: use CSS `offset-path` to animate along a fixed path by animating `offsetDistance`, e.g. `animate(".product", { offsetDistance: ["0%", "100%"] }, { duration: 2 })`. `arc()` can create curves dynamically.

- Animatable props include CSS styles, independent transforms (`x`, `y`, `z`, `rotate`, `scale`), CSS variables (`"--rotate"`), SVG path props (`pathLength`), colors, and arbitrary numbers.
- Returns `AnimationControls`:
  - Read-only: `duration`.
  - Read/write: `time` (seconds), `speed` (1 = normal, -1 = reverse).
  - Methods: `play()`, `pause()`, `complete()`, `cancel()` (revert to initial), `stop()` (commit and prevent restart), `then(cb)`.

## Related

- [scroll](./scroll.md)
- [stagger](./stagger.md)
- [spring](./spring.md)
- [timeline](./timeline.md)
- [arc](./arc.md)
- [motion-value](./motion-value.md)
