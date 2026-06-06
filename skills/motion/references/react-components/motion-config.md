# MotionConfig

Wrapper that sets configuration defaults (transition, reduced-motion behavior, CSP nonce) for all descendant `motion` components.

## Signature / Usage

```tsx
import { motion, MotionConfig } from "motion/react"

export const MyComponent = () => (
  <MotionConfig transition={{ duration: 1 }}>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
  </MotionConfig>
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `transition` | object | Fallback transition applied to all child motion components unless individually overridden |
| `reducedMotion` | "never" \| "user" \| "always" | `never` (default) ignores preferences; `user` honors device accessibility settings; `always` enforces reduced motion (useful for testing) |
| `nonce` | string | Passes a `nonce` attribute to Motion's inline styles for Content Security Policy compliance |

## Notes

- A "set it and forget it" way to define animation behavior once at a high level instead of repeating it per component.
- When reduced motion is active, transform and layout animations are disabled while opacity and color animations continue.

## Related

- [motion](./motion.md)
- [LazyMotion](./lazy-motion.md)
