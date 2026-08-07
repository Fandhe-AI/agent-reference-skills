# useVelocity

Accepts a motion value and returns a new one that tracks the rate of change of the original value.

## Signature / Usage

```vue
<script setup>
import { useMotionValue, useVelocity } from "motion-v"

const x = useMotionValue(0)
const xVelocity = useVelocity(x)
</script>

<template>
  <Motion :style="{ x }" />
</template>
```

## Notes

- Input must be a numerical motion value.
- Can be chained, e.g. calling `useVelocity` on a velocity output tracks acceleration.
- Integrates with `useTransform` for effects like dynamic scaling based on velocity.
- Velocity changes can be monitored via `useMotionValueEvent`.

## Related

- [motion-value](./motion-value.md)
- [use-motion-value-event](./use-motion-value-event.md)
