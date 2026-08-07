# Rendering

React Router v8 Framework Mode supports three rendering strategies.

## Signature / Usage

### 1. Client Side Rendering (CSR)

```typescript
// react-router.config.ts
import type { Config } from "@react-router/dev/config";
export default { ssr: false } satisfies Config;
```

For SPAs. No server required.

### 2. Server Side Rendering (SSR)

```typescript
export default { ssr: true } satisfies Config;
```

Improves SEO and initial-load performance. Requires a deployment that supports server rendering.

### 3. Static Pre-rendering

```typescript
export default {
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```

Generates static HTML at build time; loaders also run at build time.

## Options / Props

| Strategy | Use case | Deployment | SEO |
| --- | --- | --- | --- |
| CSR | SPA | Static hosting | fair |
| SSR | Web app | Server required | good |
| Pre-render | Static site | Static hosting | best |

## Notes

- SSR and pre-rendering can be combined (global `ssr: true` plus route-specific pre-rendering)
- `clientLoader` can be used to skip server rendering for specific routes
- URLs not covered by `prerender()` fall back to SSR
- Framework Mode only
- No breaking changes to the `ssr`/`prerender` config API between v7 and v8

## Related

- [modes](./modes.md)
- [installation](./installation.md)
- [data-loading](./data-loading.md)
- [deploying](./deploying.md)
