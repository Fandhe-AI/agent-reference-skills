# Hover animation

Hover animations and interactions for React: the `whileHover` prop, `onHoverStart` / `onHoverEnd` events, and the lightweight `hover()` gesture recogniser.

## Signature / Usage

```tsx
<motion.button whileHover={{ scale: 1.1 }} />
```

Transitions for entering the hover state are set inside `whileHover`; the component-level `transition` is used when the gesture ends.

```tsx
<motion.button
  whileHover={{
    scale: 1.1,
    // Will be used when gesture starts
    transition: { duration: 0.1 }
  }}
  // Will be used when gesture ends
  transition={{ duration: 0.5 }}
/>
```

## Event handlers

```tsx
<motion.a
  onHoverStart={() => console.log('Hover starts')}
  onHoverEnd={() => console.log('Hover ends')}
/>
```

## hover() gesture recogniser

Tiny (<1kb) function for lightweight hover handling without importing the full `motion` component. It returns a cleanup function, so it integrates directly with `useEffect`.

```tsx
import { hover } from "motion"
import { useRef, useEffect } from "react"

function Component() {
  const ref = useRef(null)

  useEffect(() => {
    return hover(ref.current, () => {
      console.log("on hover start")

      return () => console.log("on hover end")
    })
  }, [])

  return <button ref={ref} />
}
```

## Notes

- Motion hover improves on CSS `:hover`, which can leave "sticky" hover styles on touch devices after the finger is lifted.
- `onHoverStart` / `onHoverEnd` only fire on devices where hover is truly possible; they explicitly do not fire as the result of a touch event.
- `onHoverStart` / `onHoverEnd` require the full `motion` component; use `hover()` for a lighter alternative.
- Hover is the most common form of gesture animation.
- Source: https://motion.dev/docs/react-hover-animation (fetched 2026-10).

## Related

- [gestures.md](./gestures.md)
- [transitions.md](./transitions.md)
