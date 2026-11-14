# drag

drag() makes elements draggable, with momentum, constraints and direction locking built in.

## Signature / Usage

```javascript
import { drag } from "motion"
```

```javascript
drag(".box")
```

```javascript
drag(".slider", { axis: "x" })
```

```javascript
drag(".box", {
  constraints: { top: -50, left: -50, right: 50, bottom: 50 }
})
```

Events:

```javascript
drag(".box", {
  onStart: (event, info) => console.log("Drag started"),
  onMove: (event, info) => console.log(info.offset.x),
  onEnd: (event, info) => console.log("Drag ended"),
  onTransitionEnd: () => console.log("Element at rest")
})
```

- First argument: an `Element`, an array of elements, or a CSS selector (every matching element becomes draggable).
- `drag` moves the element with its `x` and `y` transforms and applies `touch-action`, `user-select` and `draggable="false"`.
- Returns a function that removes the gesture and restores the element's original styles.
- `onStart`, `onMove` and `onEnd` receive the `PointerEvent` and an `info` object: `point`, `delta` (since the last event), `offset` (from the gesture start), `velocity`.

Constraints can also be an element, measured when `drag` runs and when the element or container changes size. `onMeasureConstraints` can return a new box:

```javascript
drag(".box", {
  constraints: document.querySelector(".container"),
  onMeasureConstraints: (constraints) => ({
    ...constraints,
    top: constraints.top + 20
  })
})
```

To use the position elsewhere, bind your own motion values with `styleEffect` before calling `drag`:

```javascript
import { drag, mapValue, motionValue, styleEffect } from "motion"

const box = document.querySelector(".box")
const x = motionValue(0)

styleEffect(box, { x })
drag(box, { axis: "x" })

styleEffect(document.body, {
  opacity: mapValue(x, [-200, 0, 200], [0, 1, 0])
})
```

To drag without moving the element (for example a dial), pass motion values as `x` / `y`:

```javascript
import { drag, motionValue, styleEffect } from "motion"

const dial = document.querySelector(".dial")
const rotate = motionValue(0)

styleEffect(dial, { rotate })
drag(dial, { axis: "x", x: rotate })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `axis` | `"x"` \| `"y"` | `undefined` | Lock dragging to one axis. Touch input can still scroll the page along the other axis |
| `x`, `y` | motion value | - | Write the drag to these motion values instead of the element's own `x` / `y`. The element doesn't move; with only one set, it doesn't move on the other axis either |
| `constraints` | `{ top, left, right, bottom }` \| `Element` | - | Pixel values relative to the element's origin, or an element to drag within |
| `elastic` | `number` \| object | `0.35` | How far the element can move past its constraints, `0` to `1`. An object sets each edge (`{ top, bottom }` etc.) |
| `momentum` | `boolean` | `true` | Carry the gesture's velocity into an inertia animation on release |
| `transition` | inertia options | - | `power`, `timeConstant`, `bounceStiffness`, `bounceDamping`, `restDelta`, `restSpeed` |
| `snapToOrigin` | `boolean` \| `"x"` \| `"y"` | `false` | Animate back to the origin on release |
| `directionLock` | `boolean` | `false` | Lock to the first axis the pointer moves along |
| `propagation` | `boolean` | `false` | Allow gestures to start on draggable parent elements (by default only the innermost element moves) |
| `onStart`, `onMove`, `onEnd` | function | - | Gesture callbacks with the `PointerEvent` and `info` |
| `onDirectionLock` | function | - | Fires with `"x"` or `"y"` when `directionLock` locks an axis |
| `onTransitionEnd` | function | - | Fires when the element comes to rest after a release |
| `onMeasureConstraints` | function | - | Fires when Motion measures element constraints. Return a new box to override them |

## Notes

- `drag` and `animate` share the same `x` and `y` values: `animate` can move an element after a drag, and a drag continues from where `animate` left it. A drag that starts while `animate` moves the element stops that animation. To keep linked motion values in step after a drag, animate the motion value itself.
- `<img>` children stay natively draggable, so the browser shows its ghost image. Set `draggable="false"` on them too.
- Added to the JavaScript API in motion 14.4.0. It is the same physics-based gesture as the React `drag` prop (see `animation/drag.md` and `react-components/motion.md`). 14.10.0 added the `x` / `y` options for headless gesture tracking.
- The vanilla `elastic` option documents a default of `0.35`, while the React `dragElastic` prop is documented with a default of `0.5` (animation/drag.md); the official pages differ and are kept as written.
- Source: https://motion.dev/docs/drag (fetched 2026-11-14).

## Related

- [pinch](./pinch.md)
- [press](./press.md)
- [animate](./animate.md)
- [styleEffect](./style-effect.md)
- [scopeMotion](./scope-motion.md)
