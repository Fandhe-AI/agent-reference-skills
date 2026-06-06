# Accessibility

Respect the OS "Reduced Motion" setting to avoid motion sickness and usability issues. Motion provides `MotionConfig` and the `useReducedMotion` hook.

## Signature / Usage

### MotionConfig reducedMotion

Automatically disables transform and layout animations while preserving opacity and color changes.

```tsx
import { MotionConfig } from "motion/react"

export function App({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

### useReducedMotion hook

```tsx
import { useReducedMotion } from "motion/react"

function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()
  const animate = shouldReduceMotion
    ? { opacity: isOpen ? 1 : 0 }
    : { x: isOpen ? 0 : "-100%" }
  return <motion.div animate={animate} />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `reducedMotion` | `"user" \| "always" \| "never"` | `"user"` respects the OS preference, `"always"` forces reduced motion, `"never"` disables the feature. |

## Notes

- Prefer animating `opacity` instead of `transform` when reduced motion is active.
- Use `useReducedMotion` to disable auto-playing background video and parallax effects for sensitive users.
- `reducedMotion="user"` keeps opacity/color transitions; only transform and layout animations are disabled.

## Related

- [Performance](./performance.md)
