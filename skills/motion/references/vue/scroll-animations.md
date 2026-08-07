# Scroll animations

Scroll-triggered animation via `whileInView` and scroll-linked animation via `useScroll`, for parallax and progress-bar effects.

## Signature / Usage

```vue
<motion.div
  :initial="{ opacity: 0 }"
  :whileInView="{ opacity: 1 }"
/>
```

```vue
<script setup>
import { useScroll } from "motion-v"
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
```

## Options / Props

| Name | Description |
|------|-------------|
| `whileInView` | Animation target triggered on viewport entry |
| `inViewOptions.once` | Animate only once |
| `inViewOptions.root` | Custom scroll container ref |
| `useScroll()` | Returns `scrollX`, `scrollY`, `scrollXProgress`, `scrollYProgress` |
| `useSpring()` | Smooths scroll values with stiffness/damping parameters |
| `useTransform()` | Maps progress values to custom ranges (colors, scales, etc.) |

## Notes

- Default viewport is the window; customize with `inViewOptions.root`.
- Progress values range from 0 to 1.
- Smoothing requires wrapping motion values through `useSpring`.

## Related

- [use-scroll](./use-scroll.md)
- [use-in-view](./use-in-view.md)
- [overview](./overview.md)
