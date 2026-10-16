# Lenis smooth scroll

Drive Lenis smooth scroll from Motion's frame loop, keeping `scroll()` and `useScroll` animations in sync.

## Signature / Usage

```bash
npm install motion lenis
```

```js
import "lenis/dist/lenis.css"
import Lenis from "lenis"
import { frame, cancelFrame } from "motion"

const lenis = new Lenis({ autoRaf: false })

function update({ timestamp }) {
  lenis.raf(timestamp)
}

frame.setup(update, true)

// teardown
cancelFrame(update)
lenis.destroy()
```

React:

```tsx
import { ReactLenis } from "lenis/react"
import { frame, cancelFrame } from "motion/react"
import { useEffect, useRef } from "react"
import "lenis/dist/lenis.css"

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    function update({ timestamp }) {
      lenisRef.current?.lenis?.raf(timestamp)
    }

    frame.setup(update, true)

    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
```

Scroll to an element with Motion easings:

```js
import { easeInOut, cubicBezier } from "motion"

lenis.scrollTo("#contact", { duration: 1.6, easing: easeInOut })
lenis.scrollTo(0, { duration: 1, easing: cubicBezier(0.65, 0, 0.35, 1) })
```

## Notes

- Create Lenis with `autoRaf: false` so it does not start its own `requestAnimationFrame` loop. `ReactLenis` starts its own loop by default, so set `autoRaf: false` in `options`.
- `frame.setup` runs before `read`, so Lenis writes the scroll position before Motion measures it. `frame.update` (as in Lenis's own guide) works too but main-thread scroll animations render one frame behind. Motion's `timestamp` is in milliseconds, as `lenis.raf()` expects.
- Lenis moves native scroll position, so `scroll()` / `useScroll` work unchanged, including hardware-accelerated `ScrollTimeline` / `ViewTimeline` ones.
- Lenis's recommended stylesheet is not loaded by importing `lenis`; the `autoToggle` option needs it.
- Spring scroll: compute with Motion `animate(lenis.scroll, top, { type: "spring", ..., onUpdate: (latest) => lenis.scrollTo(latest, { immediate: true }) })` and stop on `lenis.on("virtual-scroll", ...)`.
- Vue: `lenis/vue` provides `VueLenis`; same pattern (`autoRaf: false`, template ref, `frame.setup` in `onMounted`, `cancelFrame` in `onUnmounted`).
- Reduced motion: from Lenis `1.3.26` it respects `prefers-reduced-motion` by default (`lenis.prefersReducedMotion`); with older versions do not create Lenis when the user prefers reduced motion.
- Nested scroll areas: add `data-lenis-prevent`. Lock page scroll with `lenis.stop()` / `lenis.start()`.
- Limitations: no CSS scroll snap (use `lenis/snap`); smooth scroll stops over iframes; Safari caps at 60fps (30fps in Low Power Mode); wheel scrolling moves onto the main thread, so a long task pauses scroll and all linked animations.
- Source: https://motion.dev/docs/lenis (fetched 2026-10).

## Related

- [Accessibility](./accessibility.md)
- [Performance](./performance.md)
