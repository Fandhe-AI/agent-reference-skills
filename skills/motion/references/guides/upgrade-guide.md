# Upgrade from Framer Motion

Framer Motion was renamed to Motion. Uninstall `framer-motion`, install `motion`, and update imports from `"framer-motion"` to `"motion/react"`.

## Signature / Usage

```bash
npm uninstall framer-motion
npm install motion
```

```tsx
// Before
import { motion } from "framer-motion"

// After
import { motion } from "motion/react"
```

## Notes

Breaking changes by major version:

- **12.0** — No breaking changes in Motion for React (see the JavaScript upgrade guide for vanilla JS changes).
- **11.0** — Multiple `MotionValue` updates in the same frame exclude intermediate values from velocity calc. Render scheduling moved from synchronous to microtask; Jest tests must `await nextFrame()` before asserting styles.
- **10.0** — Removed `IntersectionObserver` fallback for `whileInView`. Deprecated `exitBeforeEnter` now throws; use `mode="wait"`.
- **9.0** — Elements with tap listeners receive `tabindex="0"`; `whileFocus` mirrors `:focus-visible`.
- **8.0** — Removed mouse/touch event polyfills. Use `onPointerDown` instead of `onMouseDown` / `onTouchStart`.
- **7.0** — React 18 is the minimum supported version.
- **6.0** — 3D moved to a separate package (`framer-motion/three` → `framer-motion-3d`).

## Related

- [Installation](./installation.md)
- [Migrate from GSAP](./migrate-from-gsap.md)
