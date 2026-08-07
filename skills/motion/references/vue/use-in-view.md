# useInView

Lightweight composable (0.6kb) that monitors when a DOM element becomes visible in the viewport, returning a reactive boolean.

## Signature / Usage

```vue
<script setup>
import { useInView } from "motion-v"

const domRef = ref()
const isInView = useInView(domRef)
</script>

<template>
  <div ref="domRef" />
</template>
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `root` | window viewport | Ref to scrollable parent element for custom viewport detection |
| `margin` | `"0px"` | Viewport offset (top/right/bottom/left) to adjust detection area |
| `once` | `false` | Stop observing after element enters view; always returns `true` afterward |
| `initial` | `false` | Starting value before element measurement completes |
| `amount` | `"some"` | Visibility threshold: `"some"`, `"all"`, or a 0-1 number |

## Notes

- For browser security reasons, `margin` has no effect within cross-origin iframes unless `root` is explicitly defined.
- Returns `false` while outside viewport; transitions to `true` on entering view.

## Related

- [use-scroll](./use-scroll.md)
- [scroll-animations](./scroll-animations.md)
