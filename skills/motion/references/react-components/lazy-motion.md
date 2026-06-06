# LazyMotion

Reduces bundle size by loading Motion's animation features on demand, cutting the initial bundle from ~34kb to ~4.6kb when paired with the lightweight `m` component.

## Signature / Usage

```tsx
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = () => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
```

Use the `m` component (`motion/react-m`) instead of `motion` inside `LazyMotion` to gain the code-splitting benefit.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `features` | feature bundle | Capabilities to load, e.g. `domAnimation`; can be passed synchronously or as an async loader to defer until after hydration |
| `strict` | boolean | When `true`, throws if a standard `motion` component is used inside, preventing accidental bundle regressions |

## Notes

- Always use `m` inside `LazyMotion`; mixing standard `motion` components undermines the optimization.
- Synchronous feature loading suits smaller subsets; async loading defers initialization until after site hydration.
- `domAnimation` provides a core feature set; larger feature bundles exist for more capabilities.

## Related

- [motion](./motion.md)
- [MotionConfig](./motion-config.md)
