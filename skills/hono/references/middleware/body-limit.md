# Body Limit Middleware

Enforces a maximum request body size. Returns a configurable error response when the limit is exceeded.

## Signature / Usage

```ts
import { bodyLimit } from 'hono/body-limit'

app.post(
  '/upload',
  bodyLimit({
    maxSize: 50 * 1024, // 50kb
    onError: (c) => c.text('overflow :(', 413),
  }),
  async (c) => {
    const body = await c.req.parseBody()
    return c.text('pass :)')
  }
)
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `maxSize` | `number` | Yes | Maximum body size in bytes |
| `onError` | `(c: Context) => Response \| Promise<Response>` | No | Callback invoked when the size limit is exceeded |

## Notes

- The middleware checks `Content-Length` header first; only if absent does it stream and measure body size.
- On Bun with bodies exceeding 128 MiB, configure `Bun.serve({ maxRequestBodySize })` or the `onError` handler will not be triggered.
- The official page no longer states a default for `maxSize`; it is a required option, so the former "`100 * 1024`" default note was removed.
- Since v4.13.18 the body is buffered in one array bounded by `maxSize` instead of one object per transfer chunk (GHSA-39q9-qp46-w8xg).
- Source: https://hono.dev/docs/middleware/builtin/body-limit (honojs/website@20aab4e0, retrieved 2026-11-14)
- Source: https://github.com/honojs/hono/releases/tag/v4.13.18
