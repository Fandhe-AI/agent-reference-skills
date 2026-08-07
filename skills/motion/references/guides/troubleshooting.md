# Troubleshooting

Motion's error/warning guide: each runtime message links to a dedicated page explaining the message, its cause, and the fix. This page summarizes the most common ones.

## Signature / Usage

Errors and warnings thrown by Motion at runtime include a link to `motion.dev/troubleshooting/<slug>` with more detail. Look up the slug from the console message to find the matching guide.

```console
Error: You have rendered a `motion` component within a `LazyMotion` component.
This will break tree shaking. Import and render a `m` component instead.
```

### Custom component ref is not an element

`motion.create()` components must forward their ref to an HTML/SVG element. Occurs when the ref resolves to another component or a class instance instead of a DOM node.

```tsx
const Button = forwardRef(({ style, ...props }, ref) => (
  <button ref={ref} style={style} {...props} />
))
```

### Lazy strict mode

Rendering a `motion` component inside a strict-mode `LazyMotion` breaks tree shaking. Replace it with `m`, disable strict mode, or pass `ignoreStrict` to suppress the error.

## Options / Props

| Slug | Type | Description |
|------|------|-------------|
| `custom-component-ref` | Error | Ref does not resolve to an HTML/SVG element |
| `drag-constraints-ref` | Error | `dragConstraints` ref used before hydration |
| `cubic-bezier-length` | Error | Cubic bezier easing array must contain four numbers |
| `invalid-easing-type` | Error | Unsupported easing value passed to a WAAPI animation |
| `lazy-strict-mode` | Error | `motion` component rendered inside strict `LazyMotion` |
| `max-css-var-depth` | Error | CSS variable resolution exceeded the maximum depth |
| `mini-spring` | Error | Mini `animate()` does not support `type: "spring"` |
| `no-valid-elements` | Error | Selector/target resolved to no elements |
| `animate-null` | Error | Attempted to animate a `null` target |
| `range-length` | Error | Mismatched lengths between input/output ranges |
| `reorder-values` | Error | `Reorder.Group` rendered without a `values` prop |
| `reorder-item-child` | Error | `Reorder.Item` used outside a `Reorder.Group` |
| `repeat-count-too-high` | Error | `repeat` value exceeds the supported limit |
| `spring-two-frames` | Error | Spring transitions only support two keyframes |
| `use-scroll-ref` | Error | `useScroll` target ref read before hydration |
| `color-not-animatable` | Warning | Color value could not be parsed/animated |
| `complex-values-different` | Warning | Complex values being interpolated are structurally different |
| `reduced-motion-disabled` | Warning | OS "Reduced Motion" is enabled, animations may differ |
| `spring-duration-limit` | Warning | Spring `duration` exceeds the supported limit |
| `value-not-animatable` | Warning | Value type cannot be animated |

## Notes

- Full list at [motion.dev/troubleshooting](https://motion.dev/troubleshooting); each row above links to `motion.dev/troubleshooting/<slug>` for the full explanation.
- Errors throw and stop the animation; warnings log to the console but do not stop execution.
- Most ref-related errors (`custom-component-ref`, `drag-constraints-ref`, `use-scroll-ref`) stem from SSR/hydration timing — the ref is read before the DOM node exists.

## Related

- [Performance](./performance.md)
- [Accessibility](./accessibility.md)
