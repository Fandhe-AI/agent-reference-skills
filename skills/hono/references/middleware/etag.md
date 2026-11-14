# ETag Middleware

Generates and validates `ETag` headers to enable HTTP caching via conditional requests (`If-None-Match`).

## Signature / Usage

```ts
import { etag } from 'hono/etag'

app.use('/etag/*', etag())
app.get('/etag/abc', (c) => c.text('Hono is cool'))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `weak` | `boolean` | `false` | Enables weak validation by prefixing the ETag value with `W/` |
| `retainedHeaders` | `string[]` | `RETAINED_304_HEADERS` | Headers to retain in `304 Not Modified` responses |
| `generateDigest` | `(body: Uint8Array) => ArrayBuffer \| Promise<ArrayBuffer>` | SHA-1 | Custom digest generation function |

## Notes

- `RETAINED_304_HEADERS` (exported from `hono/etag`) contains the RFC-required headers: `Cache-Control`, `Content-Location`, `Date`, `ETag`, `Expires`, `Vary`.
- Extend retained headers by spreading `RETAINED_304_HEADERS` with your custom headers.
- Source: https://hono.dev/docs/middleware/builtin/etag (honojs/website@20aab4e0, retrieved 2026-11-14)
- Since v4.13.17 quoted entity tags keep their commas and the discarded response body is cancelled. Source: https://github.com/honojs/hono/releases/tag/v4.13.17

## Related

- [Cache](./cache.md)
