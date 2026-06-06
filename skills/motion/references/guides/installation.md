# Installation

Install Motion for React and import the `motion` component. Requires React 18.2 or higher.

## Signature / Usage

```bash
npm install motion
# or
yarn add motion
# or
pnpm add motion
```

```tsx
"use client"
import { motion } from "motion/react"

export default function MyComponent() {
  return <motion.div animate={{ scale: 1.5 }} />
}
```

### CDN (no install)

```html
<script type="module">
  import motion from "https://cdn.jsdelivr.net/npm/motion@latest/react/+esm"
</script>
```

## Notes

- Only compatible with React `18.2` and higher.
- The package is `motion`; React APIs are imported from `motion/react`.
- Next.js App Router: add `"use client"` at the top of files that use `motion`. Alternatively import from `motion/react-client` to reduce client-side JavaScript.
- Vite: no special configuration required.

## Related

- [Reduce bundle size](./reduce-bundle-size.md)
- [Upgrade from Framer Motion](./upgrade-guide.md)
