# wrap

`wrap()` constrains a value within a range by wrapping it back around, ideal for pagination and looping indices.

## Signature / Usage

```
import { wrap } from "motion"

wrap(0, 100, 150) // 50

const index = wrap(0, numItems, currentIndex + 1)
```

Arguments: `min`, `max`, value.

```
wrap(0, 10, 5) // 5
wrap(0, 10, 11) // 1
wrap(0, 10, -1) // 9
```

## Notes

- Values within the range are unaffected; values outside wrap back around.
- Useful for next/prev pagination.
- Source: https://motion.dev/docs/wrap (fetched 2026-10).

## Related

- [clamp](./clamp.md)
- [progress](./progress.md)
