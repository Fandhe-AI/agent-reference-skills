# useMotionTemplate

Generates a reactive motion value from a tagged template string containing other motion values.

## Signature / Usage

```javascript
import { useMotionTemplate } from "motion-v"

const x = useMotionValue(100)
const transform = useMotionTemplate`transform(${x}px)`
```

```javascript
const blur = useMotionValue(10)
const saturate = useMotionValue(50)
const filter = useMotionTemplate`blur(${blur}px) saturate(${saturate}%)`
```

## Notes

- Implemented as a tagged template rather than a standard function call.
- Whenever a motion value within the template updates, the returned motion value updates with the latest interpolated string.
- Accepts both static text and motion values within the template.

## Related

- [use-transform](./use-transform.md)
- [motion-value](./motion-value.md)
- [use-spring](./use-spring.md)
