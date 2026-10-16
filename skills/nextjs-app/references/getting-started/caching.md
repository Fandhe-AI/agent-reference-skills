# Caching

Cache data and UI in Next.js using Cache Components and the `use cache` directive.

## Signature / Usage

```ts
// next.config.ts — enable Cache Components (with Partial Prefetching)
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}

export default nextConfig
```

```tsx
// app/lib/data.ts — data-level caching
import { cacheLife } from 'next/cache'

export async function getUsers() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM users')
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cacheComponents` | `next.config` option | Enables Cache Components (Partial Prerendering model) |
| `partialPrefetching` | `next.config` option | Enables Partial Prefetching: the router prefetches each route's App Shell by default; set explicitly together with `cacheComponents` |
| `"use cache"` | directive | Caches the return value of an async function or component; can be file-level to cache all exports |
| `cacheLife(profile)` | `next/cache` | Sets stale/revalidate/expire durations inside a `use cache` scope |
| `<Suspense fallback>` | React component | Streams uncached/runtime data at request time; fallback is included in the static shell |
| `connection()` | `next/server` | Defers non-deterministic operations (`Math.random()`, `crypto.randomUUID()`) to request time |

## Notes

- New App Router apps created with the recommended `create-next-app` defaults already have Cache Components and Partial Prefetching enabled. To enable it in an existing app, add both `cacheComponents` and `partialPrefetching`; leaving `partialPrefetching` unset logs a warning (set it to `false` only while migrating an app that adopted Cache Components before Partial Prefetching). Both features become always-on in the next major release and the options will be removed
- Prefetching: with Partial Prefetching the router prefetches each route's App Shell by default (static content plus session data derived from `cookies()` / `headers()`); set `prefetch={true}` on a link to also prefetch cached content that depends on its URL data (`searchParams`, dynamic `params`) — per-link prefetching. `use cache` called with values extracted from runtime APIs and `use cache: private` results join the per-link prefetch; `<Suspense>` fallbacks stay in the prefetched UI while uncached content streams at request time. It costs a server invocation per prefetchable link
- For a complete workflow to maximize the static shell, see the Optimizing the static shell guide (`guides/optimizing-the-static-shell.md`)
- Components using runtime APIs (`cookies`, `headers`, `searchParams`, `params` without `generateStaticParams`) should be wrapped in `<Suspense>`
- Deterministic operations (sync I/O, module imports, pure computation) complete during prerendering automatically
- An empty-fallback `<Suspense>` above `<body>` in the root layout opts the entire app out of the static shell (all requests block); use multiple root layouts to scope this
- This page describes the Cache Components model (`cacheComponents: true`); the previous fetch-cache model is documented separately as "Caching and Revalidating (Previous Model)"
- `use cache` entries are stored in-memory by default and may not persist across requests in serverless environments; consider `use cache: remote` for durable caching

## Related

- [revalidating](./revalidating.md)
- [fetching-data](./fetching-data.md)
