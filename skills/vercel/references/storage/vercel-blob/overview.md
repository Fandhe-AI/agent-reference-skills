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
vercel env pull  # pulls BLOB_READ_WRITE_TOKEN / BLOB_STORE_ID
```

```js
import { put } from '@vercel/blob';

const blob = await put('avatar.jpg', imageFile, { access: 'private' });
console.log(blob.url);
```

## Authentication

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

- Blobs larger than 512 MB are never cached; every access is a cache MISS
- `del()` operations are free; delete may take up to 60 seconds to propagate
- Dashboard interactions (browse, upload, view) count as operations toward billing

## Related

- [@vercel/blob SDK](./blob-sdk.md)
- [Private Storage](./private-storage.md)
- [Public Storage](./public-storage.md)
- [Server Upload](./server-upload.md)
- [Client Upload](./client-upload.md)
- [Pricing](./pricing.md)
