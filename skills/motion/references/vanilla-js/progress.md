# progress

`progress()` returns how far a value is through a range, where `0` is the start and `1` is the end.

## Signature / Usage

```
import { progress } from "motion"

progress(0, 200, 50) // 0.25
progress(100, 200, 150) // 0.5

// Either direction
progress(200, 100, 150) // 0.5
progress(200, 100, 175) // 0.25
```

Arguments: start of the range, end of the range, value.

Outside the range (output is not limited):

```
progress(0, 100, 150) // 1.5
progress(0, 100, -50) // -0.5

clamp(0, 1, progress(0, 100, 150)) // 1
```

Map to another range:

```
const opacity = mix(0, 1, progress(0, 500, scrollY))
```

## Notes

- The opposite of `mix`: `mix` turns progress into a value, `progress` turns a value into progress.
- If the start and end are the same, `progress` returns `1`.
- For mapping with several stops, easing or colours, use `transform`.
- Source: https://motion.dev/docs/progress (fetched 2026-10).

## Related

- [mix](./mix.md)
- [clamp](./clamp.md)
- [transform](./transform.md)
