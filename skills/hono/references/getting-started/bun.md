# Bun

Run Hono natively on Bun. No adapter is required; export the app with an optional `port` field.

## Signature / Usage

```ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

// Simple export (Bun picks default port)
export default app

// Export with explicit port
export default {
  port: 3000,
  fetch: app.fetch,
}
```

## Notes

- Use `bun run --hot src/index.ts` for hot-reload during development
- Static files: import `serveStatic` from the `@hono/bun` package (install with `bun add @hono/bun`)
- `serveStatic` options: `root`, `rewriteRequestPath`, `mimes`, `onFound`, `onNotFound`, `precompressed`, `allowPercentInPath`
- Since v4.13.11 (GHSA-5r4p-p66f-jhc7) `serveStatic` rejects request paths that still contain `%` after decoding; set `allowPercentInPath: true` to serve file names containing a literal `%`
- `hono/bun` is deprecated since v4.13.10 and will be removed in v5
- Testing: use `bun:test`; pass a `Request` directly to `app.fetch(req)`
- Route matching is case-sensitive, but the file system may not be. On Windows and macOS, `/ADMIN/secret.txt` resolves to the same file as `/admin/secret.txt`, and Windows also accepts 8.3 short names such as `/PROTEC~1`. Path-scoped middleware such as `app.use('/admin/*', auth)` does not match those spellings, so do not rely on it to protect files under a static root. Keep protected files outside the directory you serve, or apply the middleware to every path that `serveStatic` handles.
- Since v4.13.14 `serveStatic` serves only GET and HEAD requests and respects q-values in `Accept-Encoding` for precompressed files; since v4.13.18 with `allowPercentInPath: true` the file path must equal the routed path, otherwise the response is 404.
- Source: https://hono.dev/docs/getting-started/bun (honojs/website@20aab4e0, retrieved 2026-11-14)
- Source: https://github.com/honojs/hono/releases/tag/v4.13.14
- Source: https://github.com/honojs/hono/releases/tag/v4.13.18
- v5 (release candidate): `hono/bun` is removed; import from `@hono/bun`. See guides/migrating-to-v5.md.

## Related

- [Basic](./basic.md)
- [Service Worker](./service-worker.md)
