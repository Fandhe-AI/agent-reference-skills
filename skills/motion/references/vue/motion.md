# motion

Drop-in replacement for HTML and SVG elements that adds declarative animation and gesture props to Vue components.

## Signature / Usage

```vue
<script setup>
import { motion } from "motion-v"
</script>

<template>
  <motion.div
    class="box"
    :animate="{ scale: 2 }"
    :whileInView="{ opacity: 1 }"
    layout
    :style="{ x: 100 }"
  />
</template>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `animate` | target \| variants | Animation target on enter and update |
| `initial` | target \| variants \| false | Initial visual state of component |
| `exit` | target \| variants | Animation when component is removed (requires `AnimatePresence`) |
| `transition` | object | Default transition settings (duration, easing, spring) |
| `whileHover` | target \| variants | Animation state while hovering |
| `whilePress` | target \| variants | Animation state while pressing |
| `whileFocus` | target \| variants | Animation state while focused |
| `whileInView` | target \| variants | Animation state while in viewport |
| `whileDrag` | target \| variants | Animation state while dragging |
| `drag` | boolean \| "x" \| "y" | Enable dragging |
| `dragConstraints` | object \| ref | Define draggable area boundaries |
| `layout` | boolean \| "position" \| "size" | Animate layout changes |
| `layoutId` | string | Shared element transition identifier |
| `variants` | object | Named animation states |
| `style` | object | Supports motion values and independent transforms |
| `onAnimationStart` / `onAnimationComplete` | function | Animation lifecycle callbacks |

## Notes

- The component being removed must be a direct child of `AnimatePresence` for exit animations to work.
- SVG `transform` attributes require DOM measurements for calculation.
- For pan gestures on touch input, disable scrolling via the `touch-action` CSS rule.
- Calling `motion.create()` inside templates creates new components every render, breaking animations — define it outside the render scope.
- Auto-import via `unplugin-vue-components` does not currently support the `<motion />` component; import it manually.

## Related

- [directive (v-motion)](./directive.md)
- [overview](./overview.md)
- [layout-animations](./layout-animations.md)
- [transitions](./transitions.md)
