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
- Static files: import `serveStatic` from `hono/bun`
- `serveStatic` options: `root`, `rewriteRequestPath`, `mimes`, `onFound`, `onNotFound`, `precompressed`
- Testing: use `bun:test`; pass a `Request` directly to `app.fetch(req)`

## Related

- [Basic](./basic.md)
- [Service Worker](./service-worker.md)
