# spring()

Creates a spring animation generator that can be sampled at specific times.

## Signature / Usage

```javascript
import { spring } from "motion"

const generator = spring({ keyframes: [0, 100], bounce: 0.3 })
const { value, done } = generator.next(10) // sample at 10ms
```

- Returns a generator with `.next(timeMs)` returning `{ value, done }`.
- Also usable as a transition `type: "spring"` within `animate()`.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keyframes` | `[number, number]` | required | Start and end values |
| `duration` | number | `800` | Duration in milliseconds |
| `visualDuration` | number | — | Override duration (seconds); when bulk motion completes |
| `bounce` | number | `0.25` | Bounciness from 0 (none) to 1 (extreme) |
| `stiffness` | number | `1` | Spring stiffness; higher = more sudden |
| `damping` | number | `10` | Opposing force; 0 = infinite oscillation |
| `mass` | number | `1` | Mass; higher = more sluggish |
| `velocity` | number | — | Initial velocity |
| `restSpeed` | number | `0.1` | End threshold when speed drops below |
| `restDelta` | number | `0.01` | End threshold when distance drops below |

## Notes

- Prefer `bounce` + `visualDuration` for intuitive tuning, or `stiffness` / `damping` / `mass` for physics-based control.

## Related

- [animate](./animate.md)
- [motion-value](./motion-value.md)
