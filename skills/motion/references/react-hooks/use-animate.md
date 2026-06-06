# useAnimate

Manually start and control animations, scoped to the current React component.

## Signature / Usage

```tsx
import { useAnimate } from "motion/react"
// or, smaller bundle with the mini animate function:
import { useAnimate } from "motion/react-mini"

function Component({ children }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // Selectors are scoped to children of the element holding `scope`
    animate("li", { opacity: 1 })
  }, [])

  return <ul ref={scope}>{children}</ul>
}
```

Returns a tuple `[scope, animate]`:

- `scope` — a ref attached to an HTML/SVG/motion element that establishes the animation boundary.
- `animate` — a scoped version of the `animate()` function used to trigger animations.

## Notes

- DOM queries passed to `animate` are automatically limited to children of the `scope` element.
- All animations created in scope are cleaned up automatically when the component unmounts.
- Can animate the `scope` element directly or target children via CSS selectors.
- Supports timeline sequences (arrays of animation definitions) for orchestration.

## Related

- [useInView](./use-in-view.md)
- [useMotionValue](./use-motion-value.md)
