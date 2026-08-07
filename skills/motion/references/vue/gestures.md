# Gestures

UI gesture recognition — hover, press, pan, drag, and inView — with event listeners and `while-` animation props.

## Signature / Usage

```vue
<motion.button
  :whileHover="{ scale: 1.2, transition: { duration: 1 } }"
  :whilePress="{ scale: 0.9 }"
/>
```

```vue
<motion.button
  whilePress="press"
  whileHover="hover"
  :variants="buttonVariants"
/>
```

## Options / Props

| Gesture | Trigger | Key Props | Notes |
|---------|---------|-----------|-------|
| Hover | Pointer enters/leaves | `whileHover`, `@hoverStart`, `@hoverEnd` | Only fires on actual mouse events |
| Press | Primary pointer down/up | `whilePress`, `@press`, `@pressCancel` | Keyboard accessible via Enter key |
| Pan | Pointer moves >3px | `@pan` | Requires `touch-action` CSS rule |
| Drag | Pointer movement | `whileDrag`, `dragConstraints`, `dragElastic` | Includes inertia by default |
| Focus | Element gains focus | `whileFocus` | Follows CSS `:focus-visible` rules |

## Notes

- Drag constraints can be pixel values or `HTMLElement` refs via `useDomRef`.
- Direction locking available with `dragDirectionLock`.
- Gestures don't work on SVG `filter` elements (no physical presence).
- Child events can stop propagation using `onPointerDownCapture`.

## Related

- [use-drag-controls](./use-drag-controls.md)
- [cursor](./cursor.md)
- [overview](./overview.md)
