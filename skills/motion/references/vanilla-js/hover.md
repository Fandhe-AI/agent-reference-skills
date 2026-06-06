# hover()

Gesture helper that detects hover start/end, filtering fake touch-emulated hover events.

## Signature / Usage

```javascript
import { hover } from "motion"

hover("button", (element, startEvent) => {
  console.log("hover started")

  // Returned function fires on hover end
  return (endEvent) => {
    console.log("hover ended")
  }
})

// Cancel all handlers
const cancel = hover("a", callback)
cancel()
```

- `element`: single `Element`, array of elements, or CSS selector string.
- `callback`: `(element, startEvent) => void | ((endEvent) => void)`. Returning a function runs it on hover end.
- Returns a function that cancels all active handlers.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `passive` | boolean | `true` | Set `false` to allow `event.preventDefault()` |
| `once` | boolean | `false` | Fire the gesture only once per element |

## Notes

- Automatically filters touch-emulated fake hover events and manages event listeners.

## Related

- [press](./press.md)
- [animate](./animate.md)
