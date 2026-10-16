# Building Your Application

Guide to what `next build` does, how to read the route table it prints, and how to debug prerender-blocking errors under Cache Components.

## Signature / Usage

```bash filename="Terminal"
next build --debug-prerender
next build --debug-build-paths="app/products/[id]/page.tsx"
```

```txt filename="Route table example (product page with loading.js, generateStaticParams, use cache)"
Route (app)
┌ ○ /
├ ○ /_not-found
└   /products/[id]      # Route pattern group
  ├ ◐ /products/[id]    # Fallback row (unlisted IDs)
  ├ ○ /products/1       # Full HTML prerender
  ├ ○ /products/2
  └ ○ /products/3
```

## Options / Props

| Symbol | Name | Behavior |
|--------|------|----------|
| `○` | Static | Next.js prerenders the entire route as HTML |
| `◐` | Partial Prerender | Next.js prerenders a static HTML shell and renders the remaining content on demand (Cache Components only) |
| `●` | SSG | Without Cache Components: paths from `generateStaticParams` / `getStaticProps` prerendered as HTML |
| `ƒ` | Dynamic | Next.js renders the route on demand. With Cache Components, for a page it means the build accepted an empty HTML prerender |
| `--debug-prerender` | CLI flag | Disables minification, enables server source maps, continues past the first prerender failure |
| `--debug-build-paths` | CLI flag | Compiles/prerenders only matching routes (comma-separated paths/globs, `!` to exclude) |

## Notes

- Build phases: setup (env vars, config validation, build ID) → route discovery → compilation (Turbopack/webpack) → static analysis (classify routes, run `generateStaticParams`) → prerendering → output (writes `.next/`, prints route table).
- Route output differs with and without Cache Components. Without: `○` Static, `●` SSG, `ƒ` Dynamic. With Cache Components Partial Prerendering is the only rendering model for App Router pages: `○`, `◐`, `ƒ` describe how much HTML the build produced. A dynamic route can also include a fallback row for pathnames not returned by `generateStaticParams`; Partial Prefetching serves the `loading.js` fallback immediately for an unlisted ID while Next.js renders it and stores it in the ISR cache.
- Other route entries: request-dependent Route Handlers (API endpoints), Proxy (Middleware) and dynamic metadata routes (`icon`, `opengraph-image`, `twitter-image`) use `ƒ`; they render on demand and do not use PPR.
- Prerender validation: with Cache Components, `next build` validates that each App Router page can produce a static shell. Request-time values (`params`, `cookies()`, `headers()`) outside `<Suspense>` give a `blocking-prerender-runtime` error; uncached data gives `blocking-prerender-dynamic`. The build checks TypeScript unless `typescript.ignoreBuildErrors` is enabled. `next dev` stores state and caches in `.next/dev`; to run an isolated production build, configure a separate `distDir`.
- Debug prerender errors: `--debug-prerender` disables server minification, enables server source maps and prevents one failed route from stopping the build; combine with `--debug-build-paths="app/products/[id]/page.tsx"` for a detailed stack trace of one route. `next dev` shows all validation errors in the overlay and terminal with stacks resolved to source.
- Build specific routes: `--debug-build-paths` accepts comma-separated paths and globs, `!` excludes; only matching routes appear in the route table, and selecting an App Router route also includes `/_not-found`.
- Find blocking work (product-page example): `[stream]` — a `loading.js` (or `<Suspense>`) fallback is prerendered as the static shell (`◐`); `generateStaticParams` adds a row per known ID (still `◐` while data is uncached); `[cache]` — `use cache` on the lookup makes listed IDs `○` while the fallback row stays `◐`; `[block]` — `export const instant = false` with no `loading` file and no `use cache` leaves every row `ƒ` with empty prerenders (when a shared layout wraps `children` in `<Suspense>` its fallback is kept as the shell and `◐` is used). `instant = false` disables instant-navigation validation (including the non-empty shell check) but does not change the rendering model or prevent prerendering.
- Prerender-blocking errors (`blocking-prerender-runtime`, `blocking-prerender-dynamic`) fire when `fetch()`, `cookies()`, `headers()`, `params`, `searchParams`, or `connection()` are accessed outside `<Suspense>`; fixes are `[stream]` (wrap in `<Suspense>`), `[cache]` (`use cache`), or `[block]` (`instant = false`).
- Synchronous IO (`Math.random()`, `new Date()`, `crypto.randomUUID()`) also fails the build and cannot be deferred with `instant = false`.
- Do not deploy builds produced with `--debug-prerender` — they skip production optimizations.
- Routes containing cached functions/components can show `Revalidate`/`Expire` columns reflecting the shortest `cacheLife` across all caches in that route (the `default` profile revalidates after 15 minutes; the route's default `expireTime` is one year, shown as `15m` / `1y`).

## Related

- [ISR with Cache Components](./incremental-static-regeneration-cache-components.md)
- [Streaming](./streaming.md)
- [CI Build Caching](./ci-build-caching.md)
