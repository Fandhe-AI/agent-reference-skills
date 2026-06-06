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
| `contentTypeFilter` | `RegExp \| (contentType: string) => boolean` | — | Determines whether a response should be compressed based on its `Content-Type`. Use the exported `COMPRESSIBLE_CONTENT_TYPE_REGEX` constant as a starting point |

## Notes

- On Cloudflare Workers and Deno Deploy, responses are compressed automatically; this middleware is not needed on those platforms.
- `COMPRESSIBLE_CONTENT_TYPE_REGEX` can be imported from `hono/compress` and extended to customize the default compressible content types.
