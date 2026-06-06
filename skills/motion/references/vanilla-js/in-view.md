# inView()

Detects when elements enter the viewport via IntersectionObserver.

## Signature / Usage

```javascript
import { inView, animate } from "motion"

const stop = inView(
  "#carousel li",
  (element, enterInfo) => {
    animate(element, { opacity: 1 })

    // Returned function fires on viewport exit
    return (leaveInfo) => {
      animate(element, { opacity: 0 })
    }
  },
  { root: document.querySelector("#carousel") }
)

stop() // stop detection
```

- `target`: selector string, `Element`, or array of elements.
- `callback`: `(element, info) => void | ((leaveInfo) => void)`. `info` is an `IntersectionObserverEntry`. Returning a function runs it on exit.
- Returns a function that stops detection.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `root` | Element | `window` | Scrollable parent used as the viewport |
| `margin` | string | `0` | Viewport boundary adjustment (px/%) |
| `amount` | `"some" \| "all" \| number` | `"some"` | Visibility threshold (0–1 proportion) |

## Related

- [scroll](./scroll.md)
- [animate](./animate.md)
