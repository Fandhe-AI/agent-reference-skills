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

- Supports lists and grids; multidimensional reorder and automatic axis detection were added in 13.1.0 (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md).
- Layout animations occur automatically when items are added/removed.
- `z-index` requires `position !== "static"` to function properly.
- If `Reorder.Item` components are within a scrollable container, that container automatically scrolls when an item is dragged towards its top or bottom edge.
- motion-v 2.9.0 / 2.11.0 (release notes: https://github.com/motiondivision/motion-vue/releases/tag/v2.9.0, https://github.com/motiondivision/motion-vue/releases/tag/v2.11.0): `Reorder.Item` is focusable by default with keyboard reordering. Space grabs or drops, arrow keys move the item, Escape restores the order from before the grab. Set `tabindex="-1"` to disable the default focus behaviour. Focus is a roving tab index: only the last focused item, or the first rendered one, is in the tab order; with no item grabbed, arrow keys move focus between items (on `axis="xy"`, Up / Down move to the nearest item in the row above / below).
- motion-v 2.9.0: `Reorder.Group` passes the moved value as the second argument to `onUpdate:values` listeners. These keyboard and `moved` details are not on the Vue docs page.
- Source: https://motion.dev/docs/vue-reorder (fetched 2026-11-14).

## Related

- [layout-animations](./layout-animations.md)
- [animate-presence](./animate-presence.md)
- [motion](./motion.md)
