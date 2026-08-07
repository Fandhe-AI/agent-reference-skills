# useSpring

Creates a motion value that animates to its latest target using spring physics, settable manually or by tracking another motion value.

## Signature / Usage

```javascript
import { useSpring, useMotionValue } from "motion-v"

const x = useSpring(0)
const y = useSpring("100vh")

x.set(100)
y.set("50vh")

x.jump(50) // immediate, no animation

const sourceValue = useMotionValue(0)
const tracked = useSpring(sourceValue)

useSpring(0, { stiffness: 300 })
```

## Notes

- Source motion values must be numbers or unit-type strings when tracking.
- Spring animations occur automatically on `.set()` calls; `.jump()` bypasses the spring for immediate updates.
- Configure spring behavior with standard transition options (stiffness, damping, etc.).

## Related

- [motion-value](./motion-value.md)
- [use-transform](./use-transform.md)
- [transitions](./transitions.md)
