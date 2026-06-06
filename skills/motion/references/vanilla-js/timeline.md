# timeline (animation sequences)

Sequence multiple animations by passing an array of segments to `animate()`.

## Signature / Usage

```javascript
import { animate } from "motion"

const sequence = [
  ["ul", { opacity: 1 }, { duration: 0.5 }],
  ["li", { x: [-100, 0] }, { at: 1 }],
  ["nav", { rotate: 180 }, { at: "<" }],
]

animate(sequence)
```

- Each segment is a tuple `[subject, targetValues, transitionOptions]`.
- Segments run sequentially by default; `at` reschedules timing without changing order.
- A second `options` object applies global settings (e.g. `defaultTransition`).

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `at` | number | Absolute start time (seconds), e.g. `{ at: 1 }` |
| `at` | string label | Start at a named label, e.g. `{ at: "my-label" }` |
| `at` | `"<"` | Start at the same time as the previous segment |
| `at` | `"+0.5"` / `"-0.2"` | Relative to the end of the previous segment |
| `at` | `"<0.5"` / `"<-0.2"` | Relative to the start of the previous segment |
| `duration` | number | Segment length in seconds |
| `delay` | number | Initial delay before the segment |
| `defaultTransition` | object | Shared transition for all segments (global options) |

## Related

- [animate](./animate.md)
- [stagger](./stagger.md)
