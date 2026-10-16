# Easing functions

Motion's built-in easing functions and modifiers, from `cubicBezier` to `anticipate`.

## Signature / Usage

Both `animate` and the React `motion` component accept easing by name:

```
// Named easing
ease: "easeIn"

// Bezier curve
ease: [0.39, 0.24, 0.3, 1]
```

They can also be imported and called directly with a `0`-`1` progress value:

```
import { easeIn } from "motion"

const eased = easeIn(0.75)
```

Available functions:

- `cubicBezier`
- `easeIn` / `easeOut` / `easeInOut`
- `backIn` / `backOut` / `backInOut`
- `circIn` / `circOut` / `circInOut`
- `anticipate`
- `linear`
- `steps`

`cubicBezier`:

```
import { cubicBezier } from "motion"

const easing = cubicBezier(.35,.17,.3,.86)

const easedProgress = easing(0.5)
```

`steps` (spec-compliant with CSS `steps` easing; changes at the end of a step by default, pass `"start"` to change at the start):

```
import { steps } from "motion"

const easing = steps(4)

easing(0.2) // 0
easing(0.25) // 0.25

steps(4, "start")(0.2) // 0.25

// Adjust distribution by passing progress through another easing first
easing(circInOut(0.2))
```

## Options / Props

Modifiers:

| Name | Type | Description |
|------|------|-------------|
| `reverseEasing` | `(ease) => ease` | Returns a reversed easing; an ease in becomes an ease out |
| `mirrorEasing` | `(ease) => ease` | Returns a mirrored easing; an ease in becomes an ease in-out |

```
import { reverseEasing, mirrorEasing } from "motion"

const powerIn = (progress) => progress * progress

const powerOut = reverseEasing(powerIn)
const powerInOut = mirrorEasing(powerIn)
```

## Notes

- All easing functions import from `"motion"`; importing them separately is useful with the tiny `animate` from `"motion/dom"` or for novel use-cases.
- New easing curve definitions can be generated with the Motion AI Kit.
- The source page's `mirrorEasing` example passes `powerInOut` (a typo for `powerIn`); the correct input is an ease-in function.
- Source: https://motion.dev/docs/easing-functions (fetched 2026-10).

## Related

- [tween](./tween.md)
- [animate](./animate.md)
- [mix](./mix.md)
