# press()

Gesture helper that detects press start/end, including double press, long press and press to repeat, with keyboard accessibility.

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
- Returns a function that removes all associated event listeners (cancels the gesture).

Instead of an end function, the start callback can return an object of handlers:

```javascript
press(element, () => {
  return {
    onActive: () => console.log("active"),
    onHold: (progress) => console.log("held", progress),
    onRepeat: (count) => console.log("repeat", count),
    onComplete: (endEvent, info) => console.log("end", info.success)
  }
})
```

- `onComplete`: called when the press ends (same as returning a function).
- `onActive`: called once, when the press becomes active while still held. Without `hold`, on press down; with `hold`, when the hold time is reached.
- `onHold`: called every frame while held, with `progress` from `0` to `1` (over `hold`, then over each `repeat`). Only called when `hold` or `repeat` is set.
- `onRepeat`: called every `repeat` seconds while held, with the number of repeats so far.

Double press, long press and press to repeat:

Double press:

```javascript
press(element, () => {
  return (endEvent, info) => {
    if (info.success) console.log("double press!")
  }
}, { count: 2 })
```

Long press:

```javascript
press(element, () => {
  return {
    onHold: (progress) => {
      ring.style.strokeDashoffset = 1 - progress
    },
    onActive: () => console.log("long press!"),
    onComplete: (endEvent, info) => {
      if (!info.success) console.log("released too early")
    }
  }
}, { hold: 1 })
```

Press and hold to repeat:

```javascript
press(plusButton, () => {
  increment()

  return {
    onActive: increment,
    onRepeat: increment
  }
}, { hold: 0.4, repeat: 0.08 })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `passive` | boolean | `true` | Set `false` to allow `event.preventDefault()` |
| `once` | boolean | `false` | Fire the gesture only once per element |
| `count` | number | `1` | Number of quick, consecutive presses needed for the gesture to succeed (`2` = double press) |
| `countTimeout` | number | `0.3` | Maximum time in seconds between the end of one press and the start of the next |
| `hold` | number | `0` | Time in seconds the last press must be held for the gesture to succeed. Releasing earlier cancels it |
| `repeat` | number | - | While the last press is held, and once `hold` is reached, call `onRepeat` every `repeat` seconds |

## Notes

- Filters secondary pointer events (right-clicks, multi-touch).
- Keyboard accessible by default (Enter key support). With keyboard accessibility, `info.success` is `false` if the element is blurred while Enter is held.
- With `count`, the start callback fires on the first press so a press style can show at once; the gesture only succeeds after the last press. If the next press comes too late or too far away, it is cancelled and `success` is `false`.
- With `hold`, releasing early or moving the pointer more than a few pixels cancels the gesture, so scrolling on a touch device doesn't trigger a long press. `press` also stops the context menu that touch devices open on a long press.
- `count`, `hold` and `repeat` were added in motion 14.10.0 (motion-v 2.12.0 for Vue; CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md).
- Source: https://motion.dev/docs/press (fetched 2026-11-14).

## Related

- [hover](./hover.md)
- [pinch](./pinch.md)
- [drag](./drag.md)
- [animate](./animate.md)
