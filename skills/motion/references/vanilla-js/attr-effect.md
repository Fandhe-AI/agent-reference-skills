# attrEffect

`attrEffect()` applies the output of motion values to the attributes of one or more elements.

## Signature / Usage

```
import { attrEffect } from "motion"

const width = motionValue(100)

const cancel = attrEffect("rect", { width })

cancel()
```

Accepts an element, list of elements, or CSS selector, plus a map of motion values:

```
const progress = motionValue(0.5)

attrEffect("#progress", { "data-progress": progress })
```

`aria` and `data` attribute names are converted from camel case to kebab case:

```
const value = motionValue("#fff")

attrEffect(counter, {
  ariaValuenow: value,
  dataValue: value
})

// <div aria-valuenow="#fff" data-value="#fff">
```

## Notes

- Re-renders once per frame during the render step of the frameloop.
- Attributes are set via their JavaScript setter where available, for type-safety and performance.
- Any motion value can be provided, including `mapValue` and `transformValue`; each can drive many attributes on many elements.
- Returns a cleanup function that stops applying the motion values.
- Source: https://motion.dev/docs/attr-effect (fetched 2026-10).

## Related

- [style-effect](./style-effect.md)
- [svg-effect](./svg-effect.md)
- [motion-value](./motion-value.md)
- [frame](./frame.md)
