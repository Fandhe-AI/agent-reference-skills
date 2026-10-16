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
| `dynamic = 'force-dynamic'` | route segment config | Remove the config — uncached data and Request-time APIs already run at request time; Next.js prerenders static/cached UI around them |
| `dynamic = 'force-static'` | route segment config | Remove, then make caching explicit: `use cache` with a suitable `cacheLife` (e.g. `'max'`); optional `ensureStatic = 'navigation'` (16.4+) |
| `dynamic = 'error'` | route segment config | Remove; wrap formerly default-cached `fetch` requests in `use cache` + `cacheLife`; optional `ensureStatic = 'navigation'` (16.4+) |
| `revalidate` (> 0) | route segment config | `cacheLife(...)` inside a `use cache` function |
| `revalidate = 0` | route segment config | Remove — uncached data already runs at request time; keep data outside a `use cache` scope if it must run per request |
| `fetchCache` | route segment config | Remove; for `default-cache` / `only-cache` / `force-cache` wrap data in `use cache`, for `*-no-store` leave it outside a cache scope |
| `fetch` `cache`/`next.{revalidate,tags}` | fetch options | Wrap in `use cache` function; use `cacheLife()`/`cacheTag()` |
| `unstable_cache` | function wrapper | No change required — it keeps working; migrating to `use cache` (key derived automatically) is optional and can happen later |
| `React.cache` | function wrapper | Usually no change; each Cache Function has an isolated React cache scope (see Notes) |
| `dynamicParams` | route segment config | Not supported (build error) — delete the export; call `notFound()` explicitly for unresolved params |
| `experimental_ppr` | route segment config | Removed — `cacheComponents` enables Partial Prerendering |
| `runtime` (incl. `'nodejs'` and `'edge'`) | route segment config | Remove the export — Cache Components requires the Node.js runtime and does not support the `runtime` segment config; use Proxy for edge behavior |
| `instant = false` | route segment config | Opts a segment out of validation while migrating incrementally |

## Notes

- Requires Next.js 16; enable via the `cacheComponents` flag in `next.config.ts` (replaces `experimental.dynamicIO`/`experimental.useCache`).
- Migration can be incremental: enable the flag, run the `cache-components-instant-false` codemod to opt out every route, fix synchronous IO errors (`new Date()`, `Math.random()`, `crypto.randomUUID()` — these are **not** cleared by `instant = false`), then convert routes one at a time.
- The codemod takes a path: pass `./src/app` in a `src/` project (a wrong path reports `0 ok` instead of failing, so check the file count).
- Enforce static output (optional, Next.js 16.4+): after migrating `dynamic = 'force-static'` / `dynamic = 'error'` caching, add `export const ensureStatic = 'navigation'` to require a completely static route. Unlike `force-static`, it does not make Request-time APIs return empty values; it reports an error if request-specific server work prevents prerendering. Use a less restrictive level when only the App Shell or per-link prefetch must stay static (see the Keeping pages static guide, `keeping-pages-static.md`).
- Your existing `fetch` and `unstable_cache` caching keeps working; migrating `unstable_cache` is optional.
- `generateStaticParams` must return at least one param under Cache Components — an empty array raises the `empty-generate-static-params` error. Keep `generateStaticParams` and return at least one real param: removing the export opts the route out of ISR (rendered on every request even with `use cache`). Params not returned are still served at request time. Without Partial Prefetching, await `params` outside `<Suspense>` to preserve ISR for unlisted paths; with Partial Prefetching, await `params` inside `<Suspense>` to serve a fallback while an unlisted path renders.
- `dynamicParams` is not supported: exporting it fails the build with "Route segment config "dynamicParams" is not compatible with `nextConfig.cacheComponents`". Params not returned by `generateStaticParams` render on request; if you used `dynamicParams: false` to reject them, call `notFound()` in the page when the param does not resolve to real data.
- Await `params` inside `<Suspense>`: for routes that do not use `generateStaticParams`, pass the `params` promise into a `<Suspense>` boundary instead of awaiting it at the top of the component, so a static shell can prerender while params are unknown. Client hooks that read the route (`usePathname`, `useParams`, ...) follow the same pattern when the pathname depends on dynamic params.
- `React.cache`: usually no change (still deduplicates within a React render), but each Cache Function has an isolated React cache scope, so separate Cache Functions do not share a `React.cache` result (e.g. one preloads, another consumes). When a helper reads request data and matching calls must share work across Cache Function scopes, replace the React wrapper with `'use cache: private'` (use `cacheLife({ stale: Infinity })` for request-scoped dedupe only; results are not stored in a server cache across production requests).
- `params`/`searchParams` reads must move inside a `<Suspense>`-wrapped child rather than being awaited at the top of a page/layout, so the static shell can still prerender.
- `updateTag()` is for read-your-own-writes in a Server Action; `revalidateTag()` requires a cache profile argument (e.g. `'max'`) and works in Server Actions and Route Handlers.
- With Cache Components, component state persists across navigations via React's `<Activity>` in `"hidden"` mode instead of unmounting — dropdowns/dialogs/forms may need explicit reset logic.
- The `next-cache-components-adoption` skill (`npx skills add vercel/next.js --skill next-cache-components-adoption`) automates this migration feature-by-feature.

## Related

- [Ensuring Instant Navigations](./instant-navigation.md)
- [Incremental Static Regeneration with Cache Components](./incremental-static-regeneration-cache-components.md)
- [Upgrading to Version 16](./version-16.md)
