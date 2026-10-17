# Vercel Blob

Object storage for files of any size with private and public access modes.

## Access Modes

| | Private Storage | Public Storage |
|-|----------------|----------------|
| Write access | Authenticated | Authenticated |
| Read access | Authenticated (token required) | Anyone with the URL |
| Delivery | Through Functions via `get()` | Direct blob URL |
| Best for | Sensitive docs, user content, custom auth | Large media, images, videos, public assets |

> You cannot change the access mode after store creation.

## Getting Started

```bash
npm i @vercel/blob
vercel env pull  # pulls BLOB_STORE_ID / VERCEL_OIDC_TOKEN (OIDC default) for connected stores
```

```js
import { put } from '@vercel/blob';

const blob = await put('avatar.jpg', imageFile, { access: 'private' });
console.log(blob.url);
```

## Authentication

Connected projects authenticate with OpenID Connect (OIDC) by default. When you connect a store (store's **Projects** tab > **Connect to Project**), Vercel adds these environment variables:

| Variable | What it is |
|----------|------------|
| `BLOB_STORE_ID` | Id of the store; the SDK pairs it with the OIDC token. An identifier, not a secret |
| `VERCEL_OIDC_TOKEN` | Short-lived OIDC token issued and rotated by Vercel; refreshed automatically after `vercel env pull` using your Vercel CLI credentials |
| `BLOB_WEBHOOK_PUBLIC_KEY` | Public key the SDK uses to verify webhook callbacks signed by Vercel Blob. A public value, not a secret |

`BLOB_READ_WRITE_TOKEN` is a long-lived static token added when you create a store and is a fallback: OIDC takes precedence when its environment variables are present. Use the read-write token only when your code runs outside Vercel (CI job, another host) or when you generate client tokens for browser uploads.

The SDK resolves credentials in this order:

1. Explicit `token` option (read-write token or client token)
2. OIDC: `VERCEL_OIDC_TOKEN` + `BLOB_STORE_ID` (recommended on Vercel)
3. `process.env.BLOB_READ_WRITE_TOKEN`

## Key Concepts

- **Durability**: 99.999999999% (11 nines), backed by Amazon S3
- **Availability**: 99.99%
- **Caching**: Blobs cached for up to 1 month by default (configurable via `cacheControlMaxAge`)
- **Cache propagation delay**: Up to 60 seconds after update/delete
- **Overwriting**: Disabled by default; use `allowOverwrite: true` to enable
- **Folders**: Use `/` in pathnames (e.g., `folder/file.txt`) — no explicit folder creation needed
- **Sorting**: `list()` returns blobs in lexicographical order by pathname
- **Multipart uploads**: Recommended for files > 100 MB; splits into parallel parts

## Limits

| Limit | Value |
|-------|-------|
| Max file size | 5 TB |
| Cache size limit | 512 MB per blob |
| Server upload body limit | 4.5 MB (use client uploads for larger) |

## Notes

- Unlimited stores on every plan (changelog 2026-09-23): the previous limits of 100 (Hobby), 500 (Pro) and 1,000 (Enterprise) stores no longer apply. Store creation is billed as a Blob Advanced Operation (Pro $5.00 per million; on Hobby it counts toward the 2,000 free operations per month); deleting a store is free
- Overwrite protection is on by default: uploading to an existing pathname fails unless `allowOverwrite: true`; alternatives are `addRandomSuffix: true` or unique pathnames. Treat blobs as immutable where possible
- Conditional writes (`ifMatch` with an ETag) and conditional reads (`ifNoneMatch`, 304) are supported for both private and public stores
- Signed URLs (changelog "Signed URLs are now available for Vercel Blob"): time-limited access to a blob URL without exposing a read-write token; see [signed-urls.md](./signed-urls.md)
- You can create stores in any of 19 regions (`--region` in the CLI, default `iad1`); region and access mode cannot be changed after creation
- Blobs larger than 512 MB are never cached; every access is a cache MISS
- `del()` operations are free; delete may take up to 60 seconds to propagate
- Dashboard interactions (browse, upload, view) count as operations toward billing

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Private Storage](./private-storage.md)
- [Public Storage](./public-storage.md)
- [Server Upload](./server-upload.md)
- [Client Upload](./client-upload.md)
- [Signed URLs](./signed-urls.md)
- [Python SDK](./python-sdk.md)
- [Security](./security.md)
- [Pricing](./pricing.md)
