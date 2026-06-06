# useAnimationFrame

Run a callback every frame, with elapsed `time` and `delta` arguments, using Motion's animation loop.

## Signature / Usage

```tsx
import { useAnimationFrame } from "motion/react"

function Component() {
  const ref = useRef(null)

  useAnimationFrame((time, delta) => {
    ref.current.style.transform = `rotateY(${time}deg)`
  })

  return <div ref={ref} />
}
```

## Options / Props

| Argument | Description |
|----------|-------------|
| `time` | Cumulative duration (ms) since the callback was first invoked |
| `delta` | Elapsed time (ms) between the current and previous frame |

## Notes

- Integrates with Motion's animation loop for optimized performance.
- Runs without triggering React re-renders each frame.
- Pass `undefined` as the callback to pause (e.g. combined with `usePageInView`).
- Related to the lower-level `frame()` scheduler.

## Related

- [useTime](./use-time.md)
- [usePageInView](./use-page-in-view.md)
