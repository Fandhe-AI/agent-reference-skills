# useReducedMotion

Detects whether a device has Reduced Motion accessibility settings enabled, and reactively updates when the setting changes.

## Signature / Usage

```javascript
import { useReducedMotion } from "motion-v"

const shouldReduceMotion = useReducedMotion()
```

```vue
<script setup>
import { useReducedMotion } from "motion-v"

const shouldReduceMotion = useReducedMotion()
const closedX = computed(() => shouldReduceMotion.value ? 0 : "-100%")
</script>
```

## Notes

- Returns a reactive boolean reflecting the current device setting.
- Actively responds to changes and re-renders components with the latest setting.
- Useful for replacing motion-based effects with opacity changes, disabling video autoplay, or removing parallax effects.

## Related

- [overview](./overview.md)
- [motion](./motion.md)
- [cursor](./cursor.md)
