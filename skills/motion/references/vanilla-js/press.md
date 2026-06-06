# press()

Gesture helper that detects press start/end, with keyboard accessibility.

## Signature / Usage

```javascript
import { press } from "motion"

press("button", (element, startEvent) => {
  console.log("pressed:", element)

  // Returned function fires on press end
  return (endEvent, info) => {
    console.log("press", info.success ? "completed" : "cancelled")
  }
})
```

- `element`: `Element`, array of elements, or CSS selector string.
- `callback`: `(element, startEvent) => void | ((endEvent, info) => void)`. `info.success` indicates whether the press completed on the element.
- Returns a function that removes all associated event listeners.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `passive` | boolean | `true` | Set `false` to allow `event.preventDefault()` |
| `once` | boolean | `false` | Fire the gesture only once per element |

## Notes

- Filters secondary pointer events (right-clicks, multi-touch).
- Keyboard accessible by default (Enter key support).

## Related

- [hover](./hover.md)
- [animate](./animate.md)
