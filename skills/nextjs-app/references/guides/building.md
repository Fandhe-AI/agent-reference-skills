# Building Your Application

Guide to what `next build` does, how to read the route table it prints, and how to debug prerender-blocking errors under Cache Components.

## Signature / Usage

```bash filename="Terminal"
next build --debug-prerender
next build --debug-build-paths="app/products/[id]/page.tsx"
```

```txt filename="Route table example"
Route (app)
┌ ○ /
├ ○ /_not-found
└   /products/[id]
  └ ◐ /products/[id]    # Shell prerendered, content streams on request
```

## Options / Props

| Symbol | Name | Behavior |
|--------|------|----------|
| `○` | Static | Fully prerendered at build time |
| `◐` | Partial Prerender | Static shell served immediately; dynamic content streams at request time (Cache Components only) |
| `●` | SSG | Prerendered static HTML (from `generateStaticParams`/`getStaticProps`) |
| `ƒ` | Dynamic | Server-rendered on demand for each request |
| `--debug-prerender` | CLI flag | Disables minification, enables server source maps, continues past the first prerender failure |
| `--debug-build-paths` | CLI flag | Compiles/prerenders only matching routes (comma-separated paths/globs, `!` to exclude) |

## Notes

- Build phases: setup (env vars, config validation, build ID) → route discovery → compilation (Turbopack/webpack) → static analysis (classify routes, run `generateStaticParams`) → prerendering → output (writes `.next/`, prints route table).
- Prerender-blocking errors (`blocking-prerender-runtime`, `blocking-prerender-dynamic`) fire when `fetch()`, `cookies()`, `headers()`, `params`, `searchParams`, or `connection()` are accessed outside `<Suspense>`; fixes are `[stream]` (wrap in `<Suspense>`), `[cache]` (`use cache`), or `[block]` (`instant = false`).
- Synchronous IO (`Math.random()`, `new Date()`) also fails the build and cannot be deferred with `instant = false`.
- Do not deploy builds produced with `--debug-prerender` — they skip production optimizations.
- Routes containing cached functions/components show `Revalidate`/`Expire` columns reflecting the shortest `cacheLife` across all caches in that route.

## Related

- [ISR with Cache Components](./incremental-static-regeneration-cache-components.md)
- [Streaming](./streaming.md)
- [CI Build Caching](./ci-build-caching.md)
