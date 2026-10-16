# SVG animation (JavaScript)

Comparison of the four ways to animate SVG on the web (SMIL, CSS, Web Animations API, Motion) and when to use each.

## Signature / Usage

Line drawing with Motion:

```jsx
animate("path", { pathLength: [0, 1] }, { duration: 2 })
```

Infinite chasing-line loader:

```javascript
const pathLength = motionValue(0.25)
const pathOffset = motionValue(0)

svgEffect("path", { pathLength, pathOffset })

animate(pathOffset, [0, 1], { repeat: Infinity, ease: "linear" })
```

Springs and scroll-linking on SVG values:

```
animate("path", { pathLength: 1 }, { type: spring, bounce: 0.4 })

scroll(animate("path", { pathLength: [0, 1] }))
```

SMIL, for comparison:

```html
<circle cx="50" cy="50" r="20">
  <animate
    attributeName="r"
    values="20; 40; 20"
    dur="2s"
    repeatCount="indefinite"
  />
</circle>
```

CSS transform origin fix:

```css
.spinner {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 1s linear infinite;
}
```

Manual line drawing with `pathLength="1"`:

```html
<path pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" />
```

## Options / Props

| Name | SMIL | CSS | WAAPI | Motion |
|------|------|-----|-------|--------|
| Declarative | Yes | Yes | No | Yes, in React |
| Attributes | Yes | No | No | Yes |
| Path morphing | Yes | Not in Safari | Not in Safari | Yes |
| Motion along a path | `<animateMotion>` | `offset-path` | `offsetDistance` | `offsetDistance` and `arc()` |
| Springs | No | Generated `linear()` only | Generated `linear()` only | Yes |
| Scroll-linking | No | Scroll timelines | Scroll timelines | `scroll()` (cross-browser) |

## Notes

- SMIL can animate any attribute (`viewBox`, `points`, `stdDeviation`) but is verbose and runs on the main thread. The page does not recommend it for new work.
- CSS and WAAPI cannot animate attributes, only CSS properties. SVG 2 promoted `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height` to CSS properties. `viewBox`, `points`, `x1`/`y1`/`x2`/`y2`, gradient `offset` and filter primitive attributes have no CSS equivalent.
- WAAPI needs complete CSS values (`"50px"`, not `50`).
- SVG transforms originate at the `viewBox` origin by default; `transform-box: fill-box` resolves against the element. Motion's `svgEffect` and `motion` components apply `fill-box` automatically when a transform is seen; opt out with `transformBox: "view-box"`.
- `d: path(...)` can be transitioned in CSS but Safari does not support `d` as a style. Motion interpolates `d` in all browsers; the two paths must have the same points in the same order. For different shapes, pair with a path mixer like Flubber.
- Motion draw values: `pathLength`, `pathSpacing`, `pathOffset`, on `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline`, `rect`. `<motion.svg>` can animate `viewBox`.
- Cost: animating SVG is generally paint (grade C by MotionScore); `transform` and `opacity` via CSS, WAAPI or Motion are GPU-accelerated. Prefer animating `transform` over `x`, `cx`, `r`; `viewBox` is a paint.
- Source: https://motion.dev/docs/svg-animation (fetched 2026-10).

## Related

- [svg-effect](./svg-effect.md)
- [arc](./arc.md)
- [animate](./animate.md)
- [scroll](./scroll.md)
