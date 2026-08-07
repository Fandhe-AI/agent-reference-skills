# LazyMotion

Reduces initial bundle size by loading animation features synchronously or asynchronously, paired with the lightweight `m` component.

## Signature / Usage

```vue
<script setup>
import { LazyMotion, domAnimation, m } from "motion-v"
</script>

<template>
  <LazyMotion :features="domAnimation">
    <m.div :animate="{ opacity: 1 }" />
  </LazyMotion>
</template>
```

```javascript
// async loading
const loadFeatures = import("./features.js").then(res => res.default)
```

```vue
<LazyMotion :features="loadFeatures">
  <m.div :animate="{ scale: 1.5 }" />
</LazyMotion>
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `features` | — | Feature package (`domAnimation` or `domMax`) or dynamic import promise |
| `strict` | `false` | Throws error if a `motion` component renders within `LazyMotion` |

## Notes

- `domAnimation` (+18kb): animations, variants, exit animations, press/hover/focus gestures.
- `domMax` (+28kb): everything in `domAnimation` plus pan/drag gestures and layout animations.
- The `m` component requires manual feature loading via `LazyMotion`.
- Initial bundle can drop from ~34kb to 6kb with lazy loading.
- Async feature loading requires bundler support (Webpack, Rollup).

## Related

- [motion](./motion.md)
- [motion-config](./motion-config.md)
- [overview](./overview.md)
