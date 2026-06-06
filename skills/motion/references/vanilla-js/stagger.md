# stagger()

Produces a dynamic `delay` function that offsets each animated element sequentially.

## Signature / Usage

```javascript
import { animate, stagger } from "motion"

animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
```

The first `<li>` waits 0s, the second 0.1s, the third 0.2s, and so on.

- `duration` (number): delay increment in seconds per element.
- Returns a delay function compatible with `animate()` options.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `startDelay` | number | `0` | Initial delay before the stagger sequence begins (negative starts mid-way) |
| `from` | `"first" \| "center" \| "last" \| number` | `"first"` | Origin point of the stagger |
| `ease` | function \| string | `"linear"` | Redistributes delays across total stagger time |

## Related

- [animate](./animate.md)
- [timeline](./timeline.md)
