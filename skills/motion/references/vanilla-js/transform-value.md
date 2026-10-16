# transformValue

`transformValue()` creates a read-only motion value computed from the output of one or more motion values.

## Signature / Usage

```
import { motionValue, transformValue } from "motion"

const x = motionValue(0)
const doubleX = transformValue(() => x.get() * 2)

doubleX.on("change", (latest) => console.log(latest))

x.set(10) // doubleX will log 20
```

It accepts a single function that returns the computed output. Any motion values that call `.get()` in this function are tracked.

```
const blur = motionValue(0)
const filter = transformValue(() => `blur(${blur.get()}px)`)

styleEffect("img", { filter })
```

Compose:

```
const x = motionValue(0)
const y = motionValue(0)
const rotate = transformValue(() => x.get() + y.get())
const transform = transformValue(() => `translate3d(${x.get()}px ${y.get()}px 0) rotate(${rotate.get()}deg)`)
```

## Notes

- Useful for combining multiple motion values into one, or performing calculations on a motion value's output (e.g. an inverse scale for a child element).
- Values returned from `transformValue` can be used inside other `transformValue` callbacks.

## Related

- [motion-value](./motion-value.md)
- [map-value](./map-value.md)
- [style-effect](./style-effect.md)
