# AnimatePresence

Enables exit animations by wrapping motion components, giving access to the `exit` animation prop when they are removed from the tree.

## Signature / Usage

```vue
<script setup>
import { AnimatePresence, motion } from "motion-v"
</script>

<template>
  <AnimatePresence>
    <motion.div v-if="show" key="modal" :exit="{ opacity: 0 }" />
  </AnimatePresence>
</template>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initial` | boolean | `true` | Set to `false` to disable initial animations on mount |
| `custom` | any | — | Pass dynamic values for variant-based exit animations |
| `mode` | "sync" \| "wait" \| "popLayout" | `"sync"` | Controls exit/enter timing |
| `onExitComplete` | function | — | Callback fired when all exiting nodes finish animating |

## Notes

- All direct children require unique `key` props that persist across renders (avoid array indices).
- Detects removal from mounting/remounting, `v-show` toggling, key changes, or list item removal.
- `AnimatePresence` must remain in the tree; conditionally wrapping it breaks functionality.
- With `mode="popLayout"`, parent elements need a `position` other than `"static"`.

## Related

- [motion](./motion.md)
- [layout-animations](./layout-animations.md)
- [reorder](./reorder.md)
