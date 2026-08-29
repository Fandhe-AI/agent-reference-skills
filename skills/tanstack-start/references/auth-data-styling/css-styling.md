---
source: https://tanstack.com/start/latest/docs/framework/react/guide/css-styling
---

# CSS Styling

TanStack Start supports whatever CSS patterns the bundler supports, and adds SSR-aware route asset discovery plus production controls (Early Hints, CSS inlining).

## CSS Import Patterns

| Pattern | Use it when | SSR behavior | Production features |
|---------|-------------|---------------|----------------------|
| `import css from './app.css?url'` | Stylesheet URL in route `head()` | Rendered from `head().links` | Dynamic Early Hints |
| `import './global.css'` | Global CSS attached to a route chunk | Discovered from Start manifest for matched routes | Static Early Hints, `transformAssets`, CSS inlining |
| `import styles from './card.module.css'` | Scoped class names attached to a route chunk | Discovered from Start manifest for matched routes | Static Early Hints, `transformAssets`, CSS inlining |

## Signature / Usage

```tsx
// src/routes/__root.tsx
/// <reference types="vite/client" />
import { createRootRoute } from '@tanstack/react-router'
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
})
```

Side-effect import for global route CSS (discovered from the Start manifest, no explicit `head()` entry needed):

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import '../styles/global.css'

export const Route = createFileRoute('/')({
  component: Home,
})
```

## CSS Inlining (Experimental)

```ts
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { build: { inlineCss: true } },
    }),
  ],
})
```

`true` is shorthand for `{ enabled: true, transformAssets: false }`. Inlining applies only to manifest-managed CSS (side-effect imports/CSS modules), not to `?url` imports returned from `head().links`. Relative `url(...)`/`@import` in inlined CSS are rebased to the emitted asset path automatically.

## Notes

- `?url` imports are route head output, not manifest-managed assets: not rewritten by runtime `transformAssets`, not inlined by CSS inlining, and only appear in the `dynamic` Early Hints phase.
- CSS inlining only affects production builds; a strict CSP requires `ssr.nonce` on the router for `HeadContent` to apply the nonce to inlined `<style>` tags.

## Related

- [Tailwind CSS Integration](./tailwind-integration.md)
