# useScroll

Builds scroll-linked animations such as progress indicators and parallax effects, using the browser's ScrollTimeline API.

## Signature / Usage

```vue
<script setup>
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `container` | Browser window | The scrollable element to track |
| `target` | Scrollable area | Element whose progress to track within the viewport |
| `axis` | `"y"` | Scroll axis for offset application |
| `offset` | `["start start", "end end"]` | Intersection points between target and container |
| `trackContentSize` | `false` | Auto-detect content size changes |

## Notes

- Content size tracking is disabled by default because the scrollable area usually remains stable.
- Accepts intersection values as numbers, named shortcuts, pixels, percentages, or viewport units.
- Compose returned motion values with `useTransform` and `useSpring` for advanced animations.
- motion-v 2.9.0 also returns `scrollXLength` and `scrollYLength` MotionValues: the maximum scroll offset of each axis (release notes: https://github.com/motiondivision/motion-vue/releases/tag/v2.9.0). The Vue docs page does not list them yet; the React docs describe them as the container's scrollable size minus its visible size (https://motion.dev/docs/react-use-scroll, fetched 2026-11-14).

## Related

- [scroll-animations](./scroll-animations.md)
- [motion-value](./motion-value.md)
- [use-in-view](./use-in-view.md)
