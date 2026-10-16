# svgEffect

`svgEffect()` applies the output of motion values to SVG styles and attributes, including `pathLength` for draw animations.

## Signature / Usage

```
import { svgEffect } from "motion"

const stroke = motionValue("#00f")
const strokeWidth = motionValue(5)

const cancel = svgEffect("circle", { strokeWidth, stroke })

stroke.set("#f00")
animate(strokeWidth, 1)

cancel()
```

Accepts an element, list of elements, or CSS selector, plus a map of motion values.

Attribute prefix for names that are both a style and an attribute:

```
const width = motionValue(400)

svgEffect("rect", { attrWidth: width })
```

Draw animations:

```
const progress = motionValue(0)

svgEffect("#progress", {
  pathLength: progress,
  pathOffset: progress
})
```

Infinite looping (leave `pathSpacing` unset):

```
const pathLength = motionValue(0.5)
const pathOffset = motionValue(0)

svgEffect("path", { pathLength, pathOffset })

animate(pathOffset, [0, 1], { repeat: Infinity })
```

## Options / Props

Draw values, each a `0`-`1` progress value:

| Name | Type | Description |
|------|------|-------------|
| `pathLength` | number | Controls the line length |
| `pathSpacing` | number | Controls the spacing between line segments |
| `pathOffset` | number | Controls the position of the line along the path |

## Notes

- By default valid styles are applied via `.style`; use the `attr` prefix (e.g. `attrWidth`) to set the attribute of the same name.
- Draw animations are supported on `<circle>`, `<ellipse>`, `<line>`, `<path>`, `<polygon>`, `<polyline>` and `<rect>`.
- Unset `pathSpacing` is calculated dynamically to allow infinite looping.
- When a `transform` is detected, `transform-box: fill-box` is applied so the transform origin is relative to the element, as in CSS. Override with `svgEffect("path", { transformBox: motionValue("view-box") })`.
- Re-renders once per frame during the render step of the frameloop; returns a cleanup function.

## Related

- [svg-animation](./svg-animation.md)
- [style-effect](./style-effect.md)
- [attr-effect](./attr-effect.md)
- [motion-value](./motion-value.md)
