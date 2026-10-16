# Performance

Animate cheap, compositor-only properties (`transform`, `opacity`) to keep animations hardware-accelerated and smooth even when the main JS thread is busy.

## Signature / Usage

The browser updates styles in three steps:

1. **Layout** — calculate element sizes and positions.
2. **Paint** — draw the page into graphical layers.
3. **Composite** — render layers to the viewport.

The best-performing styles trigger only the composite step. `transform` and `opacity` operate directly on a layer and are the safest values to animate.

### Reduce layer size with will-change

```tsx
element.style.willChange = "transform"
animate(element, { borderRadius: "50%" })
```

### Prefer compositor-friendly alternatives

```tsx
// Instead of boxShadow
animate(element, { filter: "drop-shadow(...)" })

// Instead of borderRadius
animate(element, { clipPath: "inset(0 round 50%)" })
```

## Notes

- **Cheap (composite only):** `transform`, `opacity`. Widely hardware-accelerated.
- **Emerging compositor support:** `filter`, `background-color`, `clip-path`, SVG (Chrome/Firefox).
- **Expensive (layout):** `height`, `border-width`, `padding`, `position` — recalculate dimensions of affected elements.
- **Expensive (paint):** `box-shadow`, `border-radius` — avoid layout but require costly repaints.
- At 60fps the browser has ~16.7ms per frame; repaints can exceed 100ms.
- Independent transforms (`x`, `scale`, etc.) are hardware accelerated, just like animating `transform` directly.
- Animating a CSS variable isn't hardware accelerated, even when the variable is applied to `transform`; animate the transform itself instead.
- Browsers differ in acceleration rules: until recently, Chrome did not hardware accelerate a `%`-based transform such as `transform: "translateX(100%)"`.
- Motion uses the Web Animations API to hardware-accelerate animations when the browser supports it; treat it as progressive enhancement, not a requirement.
- Test on low-powered devices. The value you choose to animate is what you have the most control over.

## Related

- [Accessibility](./accessibility.md)
- [Reduce bundle size](./reduce-bundle-size.md)
