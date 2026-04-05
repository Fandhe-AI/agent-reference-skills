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
| `maxSize` | `number` | Yes | Maximum body size in bytes (default: `100 * 1024` = 100 KB) |
| `onError` | `(c: Context) => Response \| Promise<Response>` | No | Callback invoked when the size limit is exceeded |

## Notes

- The middleware checks `Content-Length` header first; only if absent does it stream and measure body size.
- On Bun with bodies exceeding 128 MiB, configure `Bun.serve({ maxRequestBodySize })` or the `onError` handler will not be triggered.
