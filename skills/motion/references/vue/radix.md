# Reka-UI integration

Guide for combining Motion for Vue's animation capabilities with Reka-UI (formerly Radix Vue) components via the `asChild` prop.

## Signature / Usage

```vue
<ToastRoot :as-child="true">
  <Motion
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    layout
  />
</ToastRoot>
```

```vue
<AnimatePresence>
  <Motion
    v-if="isOpen"
    :exit="{ opacity: 0 }"
  />
</AnimatePresence>
```

## Options / Props

| Name | Description |
|------|-------------|
| `asChild` | Allows Motion components to control Reka's DOM nodes |
| `AnimatePresence` | Enables exit animations on unmounting components |
| `layout` | Triggers automatic layout animations on state changes |
| `layoutDependency` | Optimizes performance by tracking specific state changes |

## Notes

- Reka components require `asChild="true"` to work with Motion.
- Exit animations require wrapping unmounting elements with `AnimatePresence`.
- Layout animations need hoisted state management for proper detection.

## Related

- [animate-presence](./animate-presence.md)
- [motion](./motion.md)
- [layout-animations](./layout-animations.md)
