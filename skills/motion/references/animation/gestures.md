# Gestures

Animate and respond to hover, tap/press, focus, pan and pinch interactions via `while*` props and event handlers.

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

### Double tap, long press, press to repeat

The `tap` prop configures the tap gesture: `count` (quick taps needed for `onTap`), `countTimeout` (seconds between taps, default `0.3`), `hold` (seconds a press must be held before `onTap` fires) and `repeat` (fire `onTap` every `repeat` seconds while held).

```tsx
<motion.div
  tap={{ count: 2 }}
  whileTap={{ scale: 0.98 }}
  onTap={() => like()}
/>
```

```tsx
<motion.button
  tap={{ hold: 0.5 }}
  whileTap={{ scale: 0.9 }}
  onTap={() => openMenu()}
/>
```

```tsx
<motion.button
  tap={{ hold: 0.4, repeat: 0.08 }}
  onTapStart={increment}
  onTap={(event) => {
    if (event.type !== "pointerup") increment()
  }}
/>
```

`onTapStart` and `whileTap` start on the first press; `onTap` fires after the last tap (or on release after `hold`). If the next tap comes too late or too far away, or a hold is released early, `onTapCancel` fires.

## Pinch

```tsx
import { LazyMotion, motion, pinchFeatures } from "motion/react"

<LazyMotion features={pinchFeatures}>
  <motion.img
    src="photo.jpg"
    drag
    pinch={{ scale: { min: 1, max: 4 }, rotate: { snap: 90 } }}
    whilePinch={{ boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}
  />
</LazyMotion>
```

| Name | Type | Description |
|------|------|-------------|
| `pinch` | `boolean \| object` | Scale, rotate and move with two touches, a trackpad pinch or Safari gesture events, around the point between the fingers. Options: `scale`, `rotate`, `pan`, `origin`, `elastic`, `snapToOrigin`, `transition`, `onStart` / `onMove` / `onEnd` |
| `whilePinch` | `object \| string` | Animation state while pinching (animate values other than `scale` / `rotate` / `x` / `y`) |

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
- `tap` was added in motion 14.10.0 (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md). Source: https://motion.dev/docs/react-gestures (fetched 2026-11-14).
- Tap auto-cancels if the pointer moves more than 3px inside a draggable parent.
- Pan requires disabling touch scrolling on the relevant axis via the `touch-action` CSS rule for touch input.
- Pan has no associated `while*` animation prop.
- Pinch isn't in the default `motion` bundle; load `pinchFeatures` with `LazyMotion`. A pinch is never a tap, so it doesn't fire `onTap`. See `vanilla-js/pinch.md` for the vanilla option reference.
- Block parent gestures: use `-Capture` React props + `e.stopPropagation()`, or `propagate={{ tap: false }}` on the motion child.

## Related

- [drag.md](./drag.md)
- [overview.md](./overview.md)
- [scroll.md](./scroll.md)
