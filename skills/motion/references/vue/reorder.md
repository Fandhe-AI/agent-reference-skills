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
| `Reorder.Group` | `axis` | auto-detected | Axis of reordering: `"x"`, `"y"` or `"xy"`. Detected from the item layout (`"x"` for rows, `"y"` for columns, `"xy"` for grids or wrapped lists); set to override |
| `Reorder.Group` | `values` | — | Array of values to reorder |
| `Reorder.Group` | `onUpdate:values` | — | Callback when items reorder |
| `Reorder.Item` | `as` | `"li"` | Element for item to render as |
| `Reorder.Item` | `value` | — | Value passed in the reordered array |

## Notes

- Supports lists and grids; multidimensional reorder and automatic axis detection were added in 13.1.0 (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.3.0/CHANGELOG.md).
- Layout animations occur automatically when items are added/removed.
- `z-index` requires `position !== "static"` to function properly.
- If `Reorder.Item` components are within a scrollable container, that container automatically scrolls when an item is dragged towards its top or bottom edge.
- Source: https://motion.dev/docs/vue-reorder

## Related

- [layout-animations](./layout-animations.md)
- [animate-presence](./animate-presence.md)
- [motion](./motion.md)
