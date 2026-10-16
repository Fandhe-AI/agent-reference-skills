# ensureStatic

The `ensureStatic` route segment config requires selected route output (App Shell, per-link prefetch, or the complete server-rendered route) to be static instead of rendered per request. Export it from a page or layout.

## Signature / Usage

```tsx filename="app/blog/layout.tsx"
export const ensureStatic = 'navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

```tsx filename="app/blog/layout.tsx"
type EnsureStatic = 'auto' | 'shell' | 'prefetch' | 'navigation' | false

export const ensureStatic: EnsureStatic = 'navigation'
```

## Options / Props

Default is `'auto'` (equivalent to omitting the export). Each stricter level also includes the earlier stages.

| Value | Output that must be static |
| --- | --- |
| `'auto'` (default) | No additional static requirement |
| `'shell'` | App Shell |
| `'prefetch'` | App Shell and per-link prefetch |
| `'navigation'` | Complete server-rendered route |
| `false` | No static level; preserves normal rendering and fails the build if another segment sets `'shell'`, `'prefetch'`, or `'navigation'` (with Partial Prefetching) |

## Notes

- Only works when `cacheComponents` is enabled; the build fails otherwise. Exporting it from a Client Component throws an error.
- `'shell'`: requires the App Shell loaded by a default `<Link>` to be static. Without Partial Prefetching there is no App Shell, so the value has no effect and Next.js logs a warning. It does not require per-link prefetches to be static (reading `cookies()`, `headers()`, or URL data before `await navigation()` can still trigger a server render on `<Link prefetch={true}>`).
- `'prefetch'`: requires the App Shell and per-link prefetches to be static. Without Partial Prefetching it adds no requirement and links keep their normal full-prefetch behavior (not guaranteed static).
- `'navigation'`: requires the complete server-rendered route to be produced during prerendering. Works with Cache Components alone (Partial Prefetching not required). Set it on the root layout to require static server output for the entire app. Validated during both `next dev` and `next build`; use `next build --debug-prerender` for detailed stack traces.
- With `'navigation'`, these fail validation even inside `<Suspense>` or with `instant = false`: uncached data (including `connection()`), runtime data (`cookies()`, `headers()`, server-side `searchParams`), a `use cache` scope with `expire` under five minutes, `stale` under 30 seconds, or `revalidate` of `0`, and a request-dependent promise passed to a Client Component. The same applies to `generateMetadata` and `generateViewport`. `prefetch()` and `navigation()` are allowed.
- With `'navigation'`, a dynamic route must export `generateStaticParams()` returning at least one complete parameter set (every dynamic parameter included). With `'shell'` or `'prefetch'`, a non-prerendered value serves the fallback shell while the page is generated in the background.
- Client Components inside `<Suspense>` may use `use(browser())` and `use(io())`, and hooks such as `useParams()` and `useSearchParams()`; dynamic routes still require `generateStaticParams()`.
- Difference from `instant`: `ensureStatic` requires server-rendered output to avoid request-time work; `instant` validates that a navigation can update the UI immediately. `instant = false` does not relax `'navigation'` validation, and `'shell'` / `'prefetch'` add no separate build validation.
- Combining levels: a level on the root layout applies to every route; on another layout it applies to every route rendering it (nested layouts, pages, parallel routes). `'auto'` / unset is compatible with any level. A descendant can be stricter but not weaker:

```tsx filename="app/blog/[slug]/page.tsx"
export const ensureStatic = 'navigation' // allowed under a parent 'prefetch'
```

- Errors: weaker child level fails with "A child segment cannot override a parent segment with a less-constrained `ensureStatic`."; mixing `false` with a static level fails with "A child segment cannot override a parent segment with an incompatible `ensureStatic`."; conflicting parallel slots fail with "Parallel slots cannot have incompatible `ensureStatic`."
- Version history: introduced in `v16.4.0`.

## Related

- [instant](./instant.md)
- [prefetch](./prefetch.md)
- [Keeping pages static](https://nextjs.org/docs/app/guides/keeping-pages-static)
- [Optimizing prefetching](https://nextjs.org/docs/app/guides/optimizing-prefetching)
