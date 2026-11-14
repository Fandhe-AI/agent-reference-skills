# Private Storage

Vercel Blob private stores require authentication for all read and write operations.

## Creating a Private Blob Store

```bash
# Dashboard: Storage > Create Database > Blob > Private
# CLI:
vercel blob create-store my-private-store --access private --yes
```

The `--yes` flag connects the new store to the linked project in all environments (run from the linked project directory).

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

## Authentication

When your code runs on Vercel the SDK authenticates with OIDC by default: connect the store to a project and Vercel adds `VERCEL_OIDC_TOKEN` and `BLOB_STORE_ID` automatically. For team-level stores or code outside Vercel, see Authentication in blob-sdk.md.

## Accessing Without the SDK

From code running on Vercel, pass the short-lived `VERCEL_OIDC_TOKEN` (preferred over the long-lived `BLOB_READ_WRITE_TOKEN` because it rotates; you handle expiry yourself, requests fail with `403` once it expires):

```bash
curl https://<store-id>.private.blob.vercel-storage.com/file.pdf \
  -H "Authorization: Bearer $VERCEL_OIDC_TOKEN"
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

### Consistent reads (`useCache`)

Reads go through the CDN cache by default, so an overwrite can take up to 60 seconds to propagate. When a read must reflect the latest write, bypass the cache for that read:

```ts
const result = await get(pathname, { access: 'private', useCache: false });
```

This serves the read directly from origin storage; these reads are slower and incur Fast Origin Transfer on each request. Keep the default for content that doesn't change after upload (unique pathnames or random suffix). Presigned `GET` URLs accept the same `useCache` option in `presignUrl()` (see signed-urls.md) for time-limited delivery without exposing a read-write token.

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
- Cannot be indexed by search engines (all read access requires authentication)
- Without a `Cache-Control` header on the Function response, Vercel sends `public, max-age=0, must-revalidate` (the browser always revalidates, so your auth logic runs on every request)
- For sensitive data use `Cache-Control: private, no-store`: nothing is stored on disk and every request is a full fetch
- Official examples also set `X-Content-Type-Options: nosniff` on the Function response when serving blobs
- Python: the official page has FastAPI equivalents of these examples and a guide at https://vercel.com/kb/guide/python-and-vercel-blob
- Source: https://vercel.com/docs/vercel-blob/private-storage (fetched 2026-11-14)
- `next/image` does not work directly with private blob URLs; serve through a Function route

### Custom Domains

Private blobs are delivered through your own Functions, so they can be served from any custom domain. A common pattern is a dedicated project (e.g. "assets"): create it with a route handler that serves private blobs, connect the private store to it, and assign a custom domain (e.g. `content.mywebsite.com`). Requests such as `content.mywebsite.com/api/file?pathname=documents/report.pdf` then go through your auth logic and stream the blob.

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Public Storage](./public-storage.md)
- [Pricing](./pricing.md)
