# Vue animation overview

Motion for Vue provides multiple approaches to animating UI, from simple property-based animation to orchestration, via the `<motion />` component.

## Signature / Usage

```vue
<motion.div :animate="{ opacity: 1 }" />
```

When the `animate` prop values change, the component automatically transitions to the new target values.

## Options / Props

| Feature | Description |
|---------|-------------|
| Transforms | Independent animation of translate (x, y, z), scale, rotate, skew, perspective |
| Keyframes | Sequential value animation via arrays: `{ x: [0, 100, 0] }` |
| Variants | Named animation targets for orchestration across component trees |
| Gestures | `whileHover`, `whilePress`, `whileDrag`, `whileFocus`, `whileInView` |
| Transitions | Customizable via `ease`, `duration`, `when`, `delayChildren` |
| Exit animations | Managed through `AnimatePresence` |

## Notes

- Animatable values include numbers, unit strings (`"10px"`, `"0vh"`), colors (hex/RGBA/HSLA), and complex values like `box-shadow` and `mask-image`, plus discrete states like `"none"`/`"hidden"`.
- CSS variable animations always trigger paint; prefer `MotionValue` for performance-sensitive cases.
- Elements with `display: none` cannot be measured; use `visibility: hidden` instead.

## Related

- [motion](./motion.md)
- [scroll-animations](./scroll-animations.md)
- [layout-animations](./layout-animations.md)
