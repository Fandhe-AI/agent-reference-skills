# springValue

`springValue()` creates a motion value that reacts to changes with a physics-based spring animation.

## Signature / Usage

```
import { springValue } from "motion"

const x = springValue(0)
const y = springValue("100%")

// These will go to their new target with a spring animation
x.set(100)
y.set("0%")

styleEffect("div", { x, y })
```

It accepts a number (with or without a unit) or another motion value:

```
const pointerX = motionValue(0)
const x = springValue(pointerX)

document.addEventListener("pointermove", (e) => {
  // x will animate these changes with a spring animation
  pointerX.set(e.clientX)
})

styleEffect("div", { x })
```

Attach a spring to a derived value:

```
const opacity = motionValue(1)
const x = mapValue(opacity, [0, 1], [0, 100])
const xWithSpring = springValue(x)
```

## Options / Props

All normal spring options are supported via a second argument:

```
springValue(0, { stiffness: 1000 })
```

## Notes

- Although `duration` and `visualDuration` are accepted, prefer the physics-based options `stiffness`, `damping` and `mass`, because they incorporate the velocity of the value for the smoothest motion.
- Upstream example uses "pointerMove"; corrected to "pointermove" because DOM event names are case-sensitive.
- Source: https://motion.dev/docs/spring-value (fetched 2026-10).

## Related

- [spring](./spring.md)
- [motion-value](./motion-value.md)
- [map-value](./map-value.md)
- [style-effect](./style-effect.md)
