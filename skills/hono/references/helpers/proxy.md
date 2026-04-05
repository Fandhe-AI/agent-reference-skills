# Proxy Helper

Forward incoming requests to an upstream origin with automatic header sanitization.

## Signature / Usage

```ts
import { proxy } from 'hono/proxy'

app.get('/proxy/:path', (c) =>
  proxy(`http://origin/${c.req.param('path')}`)
)

// With options
app.get('/proxy/:path', (c) =>
  proxy(`http://origin/${c.req.param('path')}`, {
    headers: { Authorization: undefined }, // exclude header
  })
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input` | `string \| URL \| Request` | Target URL or Request |
| `init.raw` | `Request` | Pass request object directly |
| `init.customFetch` | `(req: Request) => Promise<Response>` | Override the underlying fetch implementation |
| `init.strictConnectionProcessing` | `boolean` | Enable RFC 9110 hop-by-hop header processing (trusted environments only) |
| `init.headers` | object | Override or exclude specific headers; set a header to `undefined` to omit it |

## Notes

- `Accept-Encoding` is replaced with an encoding the current runtime can handle
- Unnecessary response headers are removed automatically
- The `Connection` header is ignored by default to prevent Hop-by-Hop Header Injection attacks
- Use `strictConnectionProcessing: true` only in trusted environments

## Related

- [Adapter Helper](./adapter.md)
