# mix

`mix()` creates a function that interpolates between two values based on a `0`-`1` progress value.

## Signature / Usage

```
import { mix } from "motion"

const mixer = mix(0, 100)
mixer(0.5) // 50

const mixNumber = mix(0, 100)
const mixColor = mix("#000", "#FFF")
const mixObject = mix(
  { a: "0px", b: 10 },
  { a: "20px", b: 0 }
)

const mixComplex = mix("0px 0px #fff", "100px 100px #000")
mixComplex(0.5) // 50px 50px rgba(180, 180, 180, 1)
```

Values outside `0`-`1` are accepted:

```
mixNumber(2) // 200
mixNumber(-1) // -100
```

Easing, and random values:

```
import { mix, easeInOut } from "motion"

mixNumber(easeInOut(0.75))

const x = mix(100, 400, Math.random())

// Mostly higher numbers
mix(0, 50, easeOut(Math.random()))

// Mostly lower numbers
mix(0, 50, easeIn(Math.random()))
```

## Notes

- Mixes numbers, colors (RGBA, HSLA), complex strings, and arrays and objects of those. Both values must be the same type.
- RGB colors are mixed in the linear RGB color space, avoiding the typical CSS brightness dips/greyness.
- `mix(a, b, progress)` with a third argument returns the mixed value directly, as in the random example.
- Upstream example shows `rgba(128, 128, 128, 1)`; corrected to `rgba(180, 180, 180, 1)` because RGB colors are mixed in linear RGB space (sqrt(0.5 * 255²) ≈ 180).
- Source: https://motion.dev/docs/mix (fetched 2026-10).

## Related

- [progress](./progress.md)
- [transform](./transform.md)
- [easing-functions](./easing-functions.md)
