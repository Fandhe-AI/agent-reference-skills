# Request ID Middleware

Assigns a unique ID to each request, readable via `c.get('requestId')`. Reads from an incoming header if present.

## Signature / Usage

```ts
import { requestId } from 'hono/request-id'

app.use('*', requestId())
app.get('/', (c) => c.text(`Your request id is ${c.get('requestId')}`))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `limitLength` | `number` | `255` | Maximum length of the request ID |
| `headerName` | `string` | `X-Request-Id` | Header name for receiving/setting the request ID |
| `generator` | `(c) => string` | `crypto.randomUUID()` | Custom function to generate request IDs |

## Notes

- Import `RequestIdVariables` for type-safe `c.get('requestId')`: `new Hono<{ Variables: RequestIdVariables }>()`.
- Set `headerName` to an empty string to disable reading the ID from incoming headers.
- Node.js 20+ is required for `crypto.randomUUID()`; the Node.js adapter handles this automatically.
- Platform-specific IDs (AWS Lambda, Cloudflare, Deno, Fastly) can be integrated via the `generator` option.
