# usePageInView

Track document visibility state to pause animations, video, or other work when the user switches tabs and resume on return.

## Signature / Usage

```tsx
import { usePageInView } from "motion/react"

function Component() {
  const videoRef = useRef(null)
  const isInView = usePageInView()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    isInView ? video.play() : video.pause()
  }, [isInView])

  return <video ref={videoRef} />
}
```

Returns a boolean: `true` when the page is the active browser tab. Defaults to `true` on the server and the initial client render.

## Notes

- Improves performance: reduces CPU usage, extends battery life.
- Pair with `useAnimationFrame` to pause loops: `useAnimationFrame(isInView ? update : undefined)`.

## Related

- [useInView](./use-in-view.md)
- [useAnimationFrame](./use-animation-frame.md)
