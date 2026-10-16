# clamp

`clamp()` limits a value to a minimum and maximum.

## Signature / Usage

```
import { clamp } from "motion"

clamp(0, 100, 150) // 100
clamp(0, 1, 0.5) // 0.5
clamp(0, 1, 2) // 1
clamp(0, 1, -1) // 0
```

Arguments: `min`, `max`, value.

Pairs with `progress`:

```
const amount = clamp(0, 1, progress(100, 400, scrollY))
```

## Notes

- Values inside the range are returned unchanged; values outside are limited to the nearest edge.
- Where `wrap` loops a value back around, `clamp` stops it at the edge.

## Related

- [progress](./progress.md)
- [wrap](./wrap.md)
