# 3D transforms

How the z axis, `perspective` and `preserve-3d` work on the web, and how to animate them with Motion.

## Signature / Usage

```js
import { animate } from "motion"

animate(".card", {
  transformPerspective: 800,
  rotateY: 30,
})
```

Card flip:

```css
.scene { perspective: 1000px; }
.card { position: relative; transform-style: preserve-3d; }
.face { position: absolute; inset: 0; backface-visibility: hidden; }
.back { transform: rotateY(180deg); }
```

```js
import { animate, press } from "motion"

let flipped = false

press(".card", (card) => {
  flipped = !flipped
  animate(card, { rotateY: flipped ? 180 : 0 })
})
```

Independent 3D values with per-value options:

```js
animate(
  ".card",
  { rotateX: 12, z: -40 },
  {
    type: "spring",
    visualDuration: 0.5,
    bounce: 0.25,
    z: { duration: 0.5, ease: "circInOut" },
  },
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| z | number | Translate along the z axis (positive towards the viewer) |
| rotateX | number | Tips the element forwards/backwards |
| rotateY | number | Swings the element like a door |
| rotateZ | number | Spins on screen (same as `rotate`) |
| transformPerspective | number | Motion's name for the `perspective()` transform function; serialised at the start of the transform string automatically |

## Notes

- Origin `0, 0` is the top-left corner; positive `y` runs down. Positive `z` comes towards the viewer.
- `perspective` CSS property goes on a parent (children share one vanishing point; for shelves, carousels, cubes). `perspective()` transform function goes in an element's own transform (self-contained widgets like a tilt card) and must be at the start of the transform string. Setting `perspective` creates a stacking context.
- Smaller perspective values give deeper rotations. `perspective-origin` (default `50% 50%`) moves the vanishing point.
- `perspective` extends only one element deep; add `transform-style: preserve-3d` to extend to children. Use `backface-visibility: hidden` to hide faces turned away.
- Forced flattening: `overflow` other than `visible`/`clip`, `opacity` below 1, `filter`, `clip-path`, `mask-image` other than `none`, `mix-blend-mode` other than `normal`, `isolation: isolate`, paint containment (`contain: paint`, `content-visibility: hidden`) force `transform-style` to `flat` on a 3D parent.
- Unlike CSS, Motion animates each transform axis independently, so a spring on rotation and a tween on `z` do not replace each other's transform string.
- 3D transforms run hardware accelerated, but each surface tends to get its own composited layer (GPU texture); test on low-powered devices when using many.
- Source: https://motion.dev/docs/3d-transforms (fetched 2026-10).

## Related

- [Performance](./performance.md)
