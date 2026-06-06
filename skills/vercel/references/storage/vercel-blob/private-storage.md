# Private Storage

Vercel Blob private stores require authentication for all read and write operations.

## Creating a Private Blob Store

```bash
# Dashboard: Storage > Create Database > Blob > Private
# CLI:
vercel blob create-store my-store --access private
```

## Uploading Files

```ts
import { put } from '@vercel/blob';

const blob = await put('documents/report.pdf', file, { access: 'private' });
```

## Delivering Private Blobs

Private blob URLs (`*.private.blob.vercel-storage.com/...`) are not publicly accessible. Serve them through a Function that authenticates the request and uses `get()` to stream the response:

```ts
import { get } from '@vercel/blob';

export async function GET(request: Request) {
  // Authenticate user here
  const pathname = new URL(request.url).searchParams.get('pathname');
  const result = await get(pathname, { access: 'private' });

  if (!result || result.statusCode !== 200) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType,
      'Cache-Control': 'private, no-cache',
    },
  });
}
```

## Accessing Without the SDK

```bash
curl https://<store-id>.private.blob.vercel-storage.com/file.pdf \
  -H "Authorization: Bearer $BLOB_READ_WRITE_TOKEN"
```

## Caching

Two cache layers:

1. **CDN cache** (Function ↔ blob store): Controlled by `cacheControlMaxAge` at upload time. Default: 1 month.
2. **Browser cache** (browser ↔ Function): Controlled by the `Cache-Control` response header from your Function.

Recommended `Cache-Control` values:

| Use case | Header |
|----------|--------|
| General private content | `private, no-cache` |
| Sensitive data (PII, tokens) | `private, no-store` |

### Conditional Requests (ETag)

Forward the browser's `If-None-Match` header to `get()` via `ifNoneMatch` to avoid re-downloading unchanged blobs:

```ts
const result = await get(pathname, {
  access: 'private',
  ifNoneMatch: request.headers.get('if-none-match') ?? undefined,
});

if (result.statusCode === 304) {
  return new Response(null, {
    status: 304,
    headers: { ETag: result.blob.etag, 'Cache-Control': 'private, no-cache' },
  });
}
```

## Download Charges

Per download through a Function:

1. Function fetches blob from store: Blob Data Transfer + Fast Origin Transfer (cache miss)
2. Function responds to browser: Fast Data Transfer + Fast Origin Transfer

## Notes

- Not recommended for files > 100 MB when traffic is high
- For large public media, use [public storage](./public-storage.md) (3x cheaper data transfer)
- Cannot be indexed by search engines
- `next/image` does not work directly with private blob URLs; serve through a Function route

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Public Storage](./public-storage.md)
- [Pricing](./pricing.md)
