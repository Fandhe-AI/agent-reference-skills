# Migrate from GSAP

Motion separates animation values from options into distinct objects and uses declarative timelines, the Web Animations API, and ScrollTimeline for hardware-accelerated, tree-shakeable animations.

## Signature / Usage

### Basic animation

```tsx
// GSAP
gsap.to("#box", { duration: 10, rotation: 360 })

// Motion
animate("#box", { rotate: 360 }, { duration: 10 })
```

### Keyframes

```tsx
// Motion uses array syntax instead of fromTo
animate(".box", { opacity: [0, 0.5] })
```

### Timeline (declarative array)

```tsx
const timeline = [
  ["#id", { x: 100 }, { duration: 1 }],
  "My label",
  ["#id", { y: 100 }, { duration: 1 }],
]
animate(timeline, options)
```

### React with useAnimate

```tsx
const [scope, animate] = useAnimate()
useEffect(() => {
  animate(scope.current, { rotate: 360 }, { duration: 10 })
}, [])
```

## Options / Props

API equivalents:

| GSAP | Motion |
|------|--------|
| `gsap.to()` | `animate()` |
| `rotation` | `rotate` |
| `repeat: -1` | `repeat: Infinity` |
| `ease: "none"` | `ease: "linear"` |
| `.timeScale()` | `.speed` |
| `.time()` | `.time` |
| `.kill()` | `.stop()` |
| `.progress(1)` | `.complete()` |
| `ScrollTrigger` (viewport) | `inView()` (Intersection Observer) |
| `scrollTrigger { scrub: true }` | `scroll(animation, { target, offset })` |
| `useGSAP` | `useAnimate` |

## Notes

- Motion separates values (`{ rotate: 360 }`) from options (`{ duration: 10 }`) into two objects.
- `inView()` uses Intersection Observer (lower CPU than frame-based detection); `scroll()` enables hardware-accelerated scroll animations.
- Bundle size: mini `animate` ~2.3kb (90% smaller than GSAP), `scroll` ~75% of GSAP's, full `animate` ~18kb. Tree-shaking ships only imported functions.
- Hardware acceleration applies to `transform`, `filter`, `opacity` via the Web Animations API and ScrollTimeline.
- Limitations: no `gsap.from()` equivalent, no mutable option API, layout animations are React-only (not in the JS API), `onUpdate` restricted to single-value animations.

## Related

- [Upgrade from Framer Motion](./upgrade-guide.md)
- [Performance](./performance.md)
