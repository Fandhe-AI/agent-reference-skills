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
| `isValidProp` | function | Prop-filtering function (e.g. `@emotion/is-prop-valid`) injected explicitly so props are not forwarded to the DOM |

## Notes

- A "set it and forget it" way to define animation behavior once at a high level instead of repeating it per component.
- When reduced motion is active, transform and layout animations are disabled while opacity and color animations continue.
- Migration (12 → 13): Motion 13.0 removed `@emotion/is-prop-valid` as an optional dependency in favour of explicit injection (source: React upgrade guide, 13.0 section; the MotionConfig page itself has no section for this prop). If styled `motion` components (Styled Components / Emotion) now render props to the DOM, either inject it, or reverse the composition with `motion.create(StyledDiv)`:

```tsx
import isPropValid from "@emotion/is-prop-valid"
import { MotionConfig } from "motion/react"

<MotionConfig isValidProp={isPropValid}>
  <App />
</MotionConfig>
```

- With Styled Components 6, use transient props or configure `shouldForwardProp` to prevent styling props reaching the DOM.

## Related

- [motion](./motion.md)
- [LazyMotion](./lazy-motion.md)
