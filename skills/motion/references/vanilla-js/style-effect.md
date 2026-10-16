# styleEffect

`styleEffect()` applies the output of motion values to the `.style` of one or more elements, with independent transforms.

## Signature / Usage

```
import { styleEffect } from "motion"

const opacity = motionValue(0.5)
const backgroundColor = motionValue("#00f")

const cancel = styleEffect("div", { opacity, backgroundColor })

opacity.set(1)
animate(backgroundColor, "rgba(34, 255, 0, 1)")

cancel()
```

Accepts an element, list of elements, or CSS selector, plus a map of motion values. Any motion value works, including `mapValue` and `transformValue`:

```
const blur = motionValue(2)
const filter = transformValue(() => `blur(${blur.get()}px)`)

styleEffect("img", { filter })
```

One motion value can drive many styles and elements:

```
const progress = motionValue(0)

styleEffect("#progress", {
  opacity: progress,
  scaleX: progress
})
```

## Notes

- Re-renders once per frame during the render step of the frameloop.
- Supports independent transforms (`x`, `scaleY` etc), default unit types (`100` instead of `"100px"`), and CSS properties.
- Returns a cleanup function that stops applying the motion values.
- Source: https://motion.dev/docs/style-effect (fetched 2026-10).

## Related

- [attr-effect](./attr-effect.md)
- [svg-effect](./svg-effect.md)
- [prop-effect](./prop-effect.md)
- [motion-value](./motion-value.md)
- [frame](./frame.md)
