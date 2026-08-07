# v-motion

Declarative animation directive for HTML/SVG elements, offering most of the `<motion />` component's power without a wrapper component.

## Signature / Usage

```vue
<div v-motion="{
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}">
  Slide In
</div>
```

```vue
<div v-motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">
  Hello Motion
</div>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initial` | target \| variants \| false | Starting visual state before mount |
| `animate` | target \| variants | Target state to animate to |
| `exit` | target \| variants | Animation when removed (requires `AnimatePresence`) |
| `transition` | object | Timing and easing configuration |
| `whileHover` / `whilePress` / `whileFocus` / `whileInView` / `whileDrag` | target \| variants | Gesture-triggered animation states |

## Notes

- Installable globally via `MotionPlugin` (Vue) or a module (Nuxt), or locally via direct import of `vMotion`.
- Supports reactive bindings and custom preset registration.
- Works with `<AnimatePresence>` for exit animations.

## Related

- [motion](./motion.md)
- [overview](./overview.md)
- [gestures](./gestures.md)
