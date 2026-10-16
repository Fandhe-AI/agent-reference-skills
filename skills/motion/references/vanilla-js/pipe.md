# pipe

`pipe()` combines functions into one, passing each result to the next.

## Signature / Usage

```
import { pipe } from "motion"

const double = (v) => v * 2
const addOne = (v) => v + 1

const doubleThenAddOne = pipe(double, addOne)

doubleThenAddOne(5) // 11
```

Convert a scroll position into a whole-number percentage:

```
import { pipe, progress, clamp } from "motion"

const toPercent = pipe(
  (y) => progress(0, 1000, y),
  (p) => clamp(0, 1, p),
  (p) => Math.round(p * 100)
)

toPercent(250) // 25
toPercent(1500) // 100
```

## Notes

- Accepts any number of functions and returns a new function. Functions run left to right: `pipe(a, b)` runs `a` first, then `b`.
- Source: https://motion.dev/docs/pipe (fetched 2026-10).

## Related

- [progress](./progress.md)
- [clamp](./clamp.md)
