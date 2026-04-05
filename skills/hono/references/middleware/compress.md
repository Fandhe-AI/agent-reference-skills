# Compress Middleware

Compresses response bodies using gzip or deflate based on the client's `Accept-Encoding` header.

## Signature / Usage

```ts
import { compress } from 'hono/compress'

app.use(compress())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `encoding` | `'gzip' \| 'deflate'` | Auto | Force a specific encoding; when unset, both are supported and gzip takes precedence |
| `threshold` | `number` | `1024` | Minimum response size in bytes before compression is applied |

## Notes

- On Cloudflare Workers and Deno Deploy, responses are compressed automatically; this middleware is not needed on those platforms.
