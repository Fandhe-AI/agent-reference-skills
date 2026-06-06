# scroll()

Links a callback or an animation to scroll progress.

## Signature / Usage

```javascript
import { scroll, animate } from "motion"

// Track scroll progress (0–1)
const cancel = scroll((progress) => {
  console.log(progress)
})

// Drive an animation with scroll
const animation = animate(
  "div",
  { transform: ["none", "rotate(90deg)"] },
  { ease: "linear" }
)
scroll(animation)

// Horizontal scroll on a specific container
scroll(callback, {
  container: document.getElementById("carousel"),
  axis: "x",
})

cancel() // stop tracking
```

- First argument: a callback `(progress, info?) => void` (progress is 0–1) or an `animate()` animation object.
- Returns a cleanup function that cancels the scroll link.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `container` | Element \| Window | `window` | Element/window to track scroll progress |
| `axis` | `"x" \| "y"` | `"y"` | Scroll axis to track |
| `target` | Element | scrollable area | Element whose progress to track within container |
| `offset` | string[] | `["start start", "end end"]` | Intersection points defining tracked region |
| `trackContentSize` | boolean | `false` | Auto-detect content size changes |

## Notes

- When passing an animation, its playback is scrubbed by scroll position rather than time.
- `offset` strings combine a target edge and a container edge, e.g. `"start end"`.

## Related

- [animate](./animate.md)
- [in-view](./in-view.md)
