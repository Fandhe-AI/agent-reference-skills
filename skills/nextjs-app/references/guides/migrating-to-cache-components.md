# Migrating to Cache Components

Guide to migrating from route segment configs (`dynamic`, `revalidate`, `fetchCache`) to Cache Components (`use cache`, `cacheLife`), driven by instant-navigation validation, with an incremental adoption path via `instant = false`.

## Signature / Usage

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

```tsx filename="app/page.tsx"
import { cacheLife } from 'next/cache'

export default async function Page() {
  'use cache'
  cacheLife('hours')
  const data = await fetch('https://api.example.com/data')
  return <div>...</div>
}
```

## Options / Props

| Name | Old config | Cache Components replacement |
|------|------------|-------------------------------|
| `dynamic = 'force-dynamic'` | route segment config | Not needed — all pages are dynamic by default |
| `dynamic = 'force-static'` | route segment config | `use cache` with a long `cacheLife` (e.g. `'max'`) |
| `revalidate` | route segment config | `cacheLife(...)` inside a `use cache` function |
| `fetchCache` | route segment config | Not needed — `use cache` scopes all fetches within it |
| `fetch` `cache`/`next.{revalidate,tags}` | fetch options | Wrap in `use cache` function; use `cacheLife()`/`cacheTag()` |
| `unstable_cache` | function wrapper | `use cache` directive on the function; key derived automatically |
| `dynamicParams` | route segment config | Not supported — call `notFound()` explicitly for unresolved params |
| `experimental_ppr` | route segment config | Removed — `cacheComponents` enables Partial Prerendering |
| `runtime = 'edge'` | route segment config | Not supported — Cache Components requires Node.js runtime; use Proxy instead |
| `instant = false` | route segment config | Opts a segment out of validation while migrating incrementally |

## Notes

- Requires Next.js 16; enable via the `cacheComponents` flag in `next.config.ts` (replaces `experimental.dynamicIO`/`experimental.useCache`).
- Migration can be incremental: enable the flag, run the `cache-components-instant-false` codemod to opt out every route, fix synchronous IO errors (`new Date()`, `Math.random()`, `crypto.randomUUID()` — these are **not** cleared by `instant = false`), then convert routes one at a time.
- `generateStaticParams` must return at least one param under Cache Components — an empty array raises the `empty-generate-static-params` error.
- `params`/`searchParams` reads must move inside a `<Suspense>`-wrapped child rather than being awaited at the top of a page/layout, so the static shell can still prerender.
- `updateTag()` is for read-your-own-writes in a Server Action; `revalidateTag()` requires a cache profile argument (e.g. `'max'`) and works in Server Actions and Route Handlers.
- With Cache Components, component state persists across navigations via React's `<Activity>` in `"hidden"` mode instead of unmounting — dropdowns/dialogs/forms may need explicit reset logic.
- The `next-cache-components-adoption` skill (`npx skills add vercel/next.js --skill next-cache-components-adoption`) automates this migration feature-by-feature.

## Related

- [Ensuring Instant Navigations](./instant-navigation.md)
- [Incremental Static Regeneration with Cache Components](./incremental-static-regeneration-cache-components.md)
- [Upgrading to Version 16](./version-16.md)
