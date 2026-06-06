# useTransform

Create a new motion value that transforms the output of one or more motion values. Composable and animatable without triggering React re-renders.

## Signature / Usage

```tsx
import { useTransform } from "motion/react"

// 1. Transform function — reads motion values via .get()
const doubledX = useTransform(() => x.get() * 2)

// 2. Value mapping — map a single value from input to output range
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

// 3. Multiple output values from one input
const { opacity, scale, filter } = useTransform(offset, [100, 600], {
  opacity: [1, 0.4],
  scale: [1, 0.6],
  filter: ["blur(0px)", "blur(10px)"],
})
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `clamp` | `true` | If `true`, clamps output to within the range; if `false`, keeps mapping beyond it |
| `ease` | — | Easing function(s) to ease mixing between values (must be JavaScript functions) |
| `mixer` | — | Custom mixer; returns a function accepting progress `0`–`1` |

## Notes

- The function form automatically subscribes to motion values read via `.get()` and recalculates per frame.
- Input ranges must be monotonically increasing or decreasing numbers.
- Output ranges must contain values of the same type (numbers, colors, units, strings).
- Input and output ranges must have equal length.

## Related

- [useMotionValue](./use-motion-value.md)
- [useScroll](./use-scroll.md)
- [useSpring](./use-spring.md)
