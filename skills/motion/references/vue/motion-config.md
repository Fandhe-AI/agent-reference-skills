# MotionConfig

Configures all child motion components: global transitions, `reducedMotion` preference, and CSP nonce compliance.

## Signature / Usage

```vue
<script setup>
import { motion, MotionConfig } from "motion-v"
</script>

<template>
  <MotionConfig :transition="{ duration: 1 }">
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
    />
  </MotionConfig>
</template>
```

## Options / Props

| Name | Description |
|------|-------------|
| `transition` | Fallback transition settings applied to all child motion components |
| `reducedMotion` | `"user"` (respect device), `"always"` (enforce), or `"never"` (ignore). Default: `"never"` |
| `nonce` | Passed through to generated styles when using a CSP nonce attribute |

## Notes

- When reduced motion is enabled, transform and layout animations are disabled, though opacity and backgroundColor animations continue.

## Related

- [motion](./motion.md)
- [transitions](./transitions.md)
- [overview](./overview.md)
