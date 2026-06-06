# Gestures

Animate and respond to hover, tap/press, focus, and pan interactions via `while*` props and event handlers.

## Hover

```tsx
<motion.a
  whileHover={{ scale: 1.2 }}
  onHoverStart={(event) => {}}
  onHoverEnd={(event) => {}}
/>
```

| Name | Type | Description |
|------|------|-------------|
| `whileHover` | `object \| string` | Animation state while the pointer hovers |
| `onHoverStart` | `(event) => void` | Pointer enters |
| `onHoverEnd` | `(event) => void` | Pointer leaves |

## Tap / Press

```tsx
<motion.button whileTap={{ scale: 0.9, rotate: 3 }} />
```

| Name | Type | Description |
|------|------|-------------|
| `whileTap` | `object \| string` | Animation state during press |
| `onTapStart` | `(event, info) => void` | Pointer presses down |
| `onTap` | `(event, info) => void` | Press released on the same component |
| `onTapCancel` | `(event, info) => void` | Pointer leaves the component during press |

## Focus

```tsx
<motion.a href="#" whileFocus={{ scale: 1.2 }} />
```

| Name | Type | Description |
|------|------|-------------|
| `whileFocus` | `object \| string` | Animation state while focused (CSS `:focus-visible` rules) |

## Pan

```tsx
<motion.div
  onPan={(event, info) => console.log(info.offset.x)}
  onPanStart={(event, info) => {}}
  onPanEnd={(event, info) => {}}
/>
```

| Name | Type | Description |
|------|------|-------------|
| `onPan` | `(event, info) => void` | Fires during pointer movement |
| `onPanStart` | `(event, info) => void` | Fires once movement exceeds 3px |
| `onPanEnd` | `(event, info) => void` | Fires on pointer release |

`info` is a `PanInfo` with `point`, `delta`, `offset`, `velocity`.

## Notes

- Tap is keyboard-accessible automatically: `Enter` triggers `onTapStart`/`whileTap`, release triggers `onTap`, losing focus before release triggers `onTapCancel`.
- Tap auto-cancels if the pointer moves more than 3px inside a draggable parent.
- Pan requires disabling touch scrolling on the relevant axis via the `touch-action` CSS rule for touch input.
- Pan has no associated `while*` animation prop.
- Block parent gestures: use `-Capture` React props + `e.stopPropagation()`, or `propagate={{ tap: false }}` on the motion child.

## Related

- [drag.md](./drag.md)
- [overview.md](./overview.md)
- [scroll.md](./scroll.md)
