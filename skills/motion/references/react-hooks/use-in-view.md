# useInView

Lightweight (0.6kb) hook that detects when an element enters or leaves the viewport, enabling scroll-triggered state changes.

## Signature / Usage

```tsx
import { useInView } from "motion/react"

function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    console.log("Element is in view:", isInView)
  }, [isInView])

  return <div ref={ref} />
}
```

Returns a boolean: `true` when the element is inside the viewport, `false` otherwise.

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `root` | window viewport | Ref to a scrollable parent to use as the tracking viewport |
| `margin` | `"0px"` | Adjusts the detection area using CSS margin syntax (e.g. `"0px 100px -50px 0px"`) |
| `once` | `false` | Stops observing after the element enters view, then always returns `true` |
| `initial` | `false` | Initial return value until element measurement completes |
| `amount` | `"some"` | How much must be visible: `"some"`, `"all"`, or a number `0`–`1` |

## Notes

- Works with any HTML element via ref.
- `margin` won't affect cross-origin iframes without an explicit `root`.
- Combine with `useAnimate` for enter animations.

## Related

- [useAnimate](./use-animate.md)
- [usePageInView](./use-page-in-view.md)
- [useScroll](./use-scroll.md)
