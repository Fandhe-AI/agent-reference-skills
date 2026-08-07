# useTime

Returns a motion value that updates once per frame with the duration, in milliseconds, since it was first created.

## Signature / Usage

```javascript
import { useTime, useTransform } from "motion-v"

const time = useTime()
const rotate = useTransform(
  time,
  [0, 4000], // every 4 seconds...
  [0, 360],  // ...rotate 360deg
  { clamp: false }
)
```

## Notes

- Useful for perpetual animations without manual frame management.
- `clamp: false` allows values to exceed the specified range, enabling continuous spinning instead of clamping to 0-360deg.

## Related

- [use-animation-frame](./use-animation-frame.md)
- [use-transform](./use-transform.md)
- [overview](./overview.md)
