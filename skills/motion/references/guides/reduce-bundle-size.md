# Reduce Bundle Size

Replace the full `motion` component (34kb) with the slim `m` component plus `LazyMotion` to cut the initial bundle to under 4.6kb, loading animation features on demand.

## Signature / Usage

### The m component + synchronous features

```tsx
import * as m from "motion/react-m"
import { LazyMotion, domAnimation } from "motion/react"

function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} />
      {children}
    </LazyMotion>
  )
}
```

### Lazy loading (code-splitting)

```tsx
// features.js
import { domMax } from "motion/react"
export default domMax
```

```tsx
import { LazyMotion } from "motion/react"
import * as m from "motion/react-m"

const loadFeatures = () =>
  import("./features.js").then(res => res.default)

function App() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    </LazyMotion>
  )
}
```

### Strict mode

```tsx
<LazyMotion features={domAnimation} strict>
  {/* Throws if motion.div is used instead of m.div */}
</LazyMotion>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `features` | `FeatureBundle \| LazyFeatureBundle` | `domAnimation` (+15kb) or `domMax` (+25kb); or an async loader that returns the bundle. |
| `strict` | `boolean` | Throws an error if the full `motion` component is used inside `LazyMotion`, enforcing `m` usage. |

## Notes

- `m` works identically to `motion` but ships without preloaded features (animations, layout, drag).
- `domAnimation` (+15kb): animations, variants, exit animations, tap/hover/focus gestures.
- `domMax` (+25kb): everything in `domAnimation` plus pan/drag and layout animations.
- Lazy loading defers feature code until after the initial render via a dynamic `import()`.

## Related

- [Installation](./installation.md)
- [Performance](./performance.md)
