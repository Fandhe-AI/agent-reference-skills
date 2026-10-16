# mapValue

`mapValue()` creates a read-only motion value that maps a numerical motion value's output to a range of numbers, colors, or complex strings.

## Signature / Usage

```
import { mapValue } from "motion"

const x = motionValue(100)

// Fade out outside the 0-100 range
const opacity = mapValue(x, [-100, 0, 100, 200], [0, 1, 1, 0])

// Shift color when fading out
const backgroundColor = mapValue(opacity, [0, 1], ["#f00", "#00f"])
```

Complex strings (same format in every keyframe):

```
const boxShadow = mapValue(
  progress,
  [0, 1],
  ["0px 0px 0px rgba(0, 0, 0, 0)", "10px 10px 5px rgba(0, 0, 0, 0.3)"]
)
```

Unclamped:

```
const progress = motionValue(3)
const double = mapValue(progress, [0, 1], [0, 2], { clamp: false })

double.get() // 6
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `clamp` | boolean | `true` | Clamp output to the provided ranges. With `false`, interpolation is unclamped |

## Notes

- Both ranges must always be the same length.
- The input range must be a linear series of numbers, counting up or down; the output range can be non-linear numbers, colors, or complex strings.
- Complex string keyframes must have the same number of numbers and colors in the same order.

## Related

- [transform](./transform.md)
- [transform-value](./transform-value.md)
- [motion-value](./motion-value.md)
