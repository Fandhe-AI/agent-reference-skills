# transform

`transform()` creates a function that maps an input range to numbers, colours, or complex strings.

## Signature / Usage

```
import { transform } from "motion"

const numberToColor = transform(
  [0, 100], // Input
  ["#000", "#fff"] // Output
)

numberToColor(50) // rgba(128, 128, 128, 1)

const transformer = transform([0, 100], [0, 360])
transformer(50) // 180
```

Multiple stops:

```
const x = [-100, 0, 100, 200]
const opacity = [0, 1, 1, 0]
const transformer = transform(x, opacity)

transformer(-50) // 0.5
transformer(50) // 1
transformer(150) // 0.5
```

Unclamped:

```
const transformer = transform([0, 100], [0, 360], { clamp: false })

const rotation = transformer(200) // 720
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `clamp` | boolean | `true` | With `false`, the returned function maps infinitely |

## Notes

- Both ranges must always be the same length.
- The input range must be a linear series of numbers, counting up or down; the output range can be non-linear numbers, colors, or complex strings.
- React users can use the `useTransform` hook with motion values.
- Source: https://motion.dev/docs/transform (fetched 2026-10).

## Related

- [map-value](./map-value.md)
- [mix](./mix.md)
- [progress](./progress.md)
