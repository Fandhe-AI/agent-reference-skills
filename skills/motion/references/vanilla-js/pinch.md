# pinch

pinch() lets users zoom and rotate elements with two fingers or a trackpad, around the point between their fingers.

## Signature / Usage

```javascript
import { pinch } from "motion"
```

```javascript
pinch(".photo", { scale: { min: 1, max: 4 } })
```

Pinch start and end:

```javascript
pinch(".photo", (element, startEvent) => {
  console.log("pinch start")

  return (endEvent, info) => {
    console.log("pinch end at", info.scale)
  }
})
```

Track a pinch each frame:

```javascript
pinch(".photo", () => ({
  onPinch: (event, info) => console.log(info.scale),
  onComplete: (event, info) => console.log("done"),
}))
```

- First argument: an `Element`, an array of elements, or a CSS selector.
- Second argument: an options object, or a function called when a pinch starts. The function receives the element and the start event, and returns either an end callback `(endEvent, info) => void` or an object of `onPinch` / `onComplete` handlers.
- `info` describes the gesture since it started: `point` (point between the fingers, client coordinates), `offset` (how far `point` moved), `scale` (`2` = twice as far apart), `rotate` (degrees).
- Returns a function that removes the gesture and restores the element's original `touch-action`. A running pinch ends and its end callback is called.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scale` | `boolean` \| `{ min, max }` | `true` | Scale with the gesture. `false` disables it |
| `rotate` | `boolean` \| `{ min, max, snap }` | `true` | Rotate with the fingers. Limits in degrees. `snap` rotates to the nearest multiple of `snap` degrees on release |
| `pan` | `boolean` | `true` | Move the element with the point between the fingers. With `false`, the element scales and rotates around its centre |
| `origin` | `"pointer"` \| `{ x, y }` | `"pointer"` (centre when `pan` is `false`) | Pivot point for `scale` and `rotate`. `{ x, y }` is a fraction of the element's width and height |
| `elastic` | `number` \| `{ min, max }` | `0.35` | How far `scale` and `rotate` can go past their limits. `0` stops at the limit, `1` doesn't resist |
| `snapToOrigin` | `boolean` | `false` | On release, animate `scale` to `1`, `x` / `y` to `0`, and `rotate` the shortest way to upright |
| `transition` | spring options | - | Spring for returning inside limits, to a snap angle or to the origin (`stiffness`, `damping`, `bounce`, `visualDuration`) |

## Notes

- Works with two pointers, trackpads, `wheel` events with `ctrlKey`, and Safari's `gesturestart` / `gesturechange` / `gestureend` events.
- `pinch` sets `touch-action: none` on the element. The second touch can land beside the element, which helps with small elements.
- `pinch`, `animate` and `drag` share the same `scale`, `rotate`, `x` and `y` values. A pinch that starts while `animate` changes these values stops those animations.
- With `drag` on the same element, drag continues from the remaining finger without a jump, and a zoom doesn't end in a fling.
- A pinch is never a press: on an element with both `press` and `pinch`, a pinch ends the press as a cancel (`info.success` is `false`). Without `drag` on the element, a pinch also stops a draggable parent from dragging.
- Added in motion 14.11.0. 14.11.1 changed snap points to use velocity-based prediction for the rotation snap point and made the transform origin configurable between element-relative origin and pointer center. 14.13.0 fixed a `drag` started during a snap animation breaking the animation. motion-v 2.12.0 adds `pinch` and `addPinchListeners` (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md).
- Source: https://motion.dev/docs/pinch (fetched 2026-11-14).

## Related

- [drag](./drag.md)
- [press](./press.md)
- [animate](./animate.md)
- [spring](./spring.md)
