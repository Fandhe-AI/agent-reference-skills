# useTransform

Creates a new motion value that transforms the output of one or more motion values, via a transform function or value mapping.

## Signature / Usage

```javascript
import { useTransform } from "motion-v"

// transform function
const doubledX = useTransform(() => x.get() * 2)

// value mapping
const color = useTransform(x, [0, 100], ["#f00", "#00f"])
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `clamp` | `true` | Restricts output to the defined range; set `false` for perpetual mapping |
| `ease` | — | Easing function(s) to smooth transitions between output values |
| `mixer` | — | Custom function to interpolate between output value pairs |

## Notes

- Input and output ranges must have matching lengths.
- Input range values must be consistently increasing or decreasing.
- Output values must share the same type but can be numbers, units, colors, or animatable strings.
- Motion values accessed via `.get()` inside a transform function are auto-subscribed.

## Related

- [motion-value](./motion-value.md)
- [use-motion-template](./use-motion-template.md)
- [use-spring](./use-spring.md)
