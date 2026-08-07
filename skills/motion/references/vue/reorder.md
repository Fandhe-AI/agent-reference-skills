# Reorder

Lightweight drag-to-reorder list components: `Reorder.Group` and `Reorder.Item`.

## Signature / Usage

```vue
<script setup>
import { Reorder } from "motion-v"
const items = ref([0, 1, 2, 3])
</script>

<template>
  <Reorder.Group axis="y" v-model:values="items">
    <Reorder.Item v-for="item in items" :key="item" :value="item">
      {{ item }}
    </Reorder.Item>
  </Reorder.Group>
</template>
```

## Options / Props

| Component | Name | Default | Description |
|-----------|------|---------|-------------|
| `Reorder.Group` | `as` | `"ul"` | Underlying element to render |
| `Reorder.Group` | `axis` | `"y"` | Direction of reorder detection |
| `Reorder.Group` | `values` | — | Array of values to reorder |
| `Reorder.Group` | `onUpdate:values` | — | Callback when items reorder |
| `Reorder.Item` | `as` | `"li"` | Element for item to render as |
| `Reorder.Item` | `value` | — | Value passed in the reordered array |

## Notes

- Exceptionally lightweight, but lacks features like multirow, dragging between columns, or dragging within scrollable containers.
- Layout animations occur automatically when items are added/removed.
- `z-index` requires `position !== "static"` to function properly.
- Scrollable containers require the `layoutScroll` prop for accurate measurements.

## Related

- [layout-animations](./layout-animations.md)
- [animate-presence](./animate-presence.md)
- [motion](./motion.md)
