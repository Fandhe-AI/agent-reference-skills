# @vercel/blob

SDK for interacting with Vercel Blob stores. Install: `npm i @vercel/blob`.

## put()

Uploads a blob to the store.

```ts
import { put } from '@vercel/blob';

const blob = await put('pathname/file.jpg', body, {
  access: 'private', // or 'public'
  addRandomSuffix: true,
});
// blob: { pathname, contentType, contentDisposition, url, downloadUrl, etag }
```

### Options

| Parameter | Required | Description |
|-----------|----------|-------------|
| `access` | Yes | `'private'` or `'public'` |
| `addRandomSuffix` | No | Add random suffix to pathname to avoid conflicts. Default: `false` |
| `allowOverwrite` | No | Allow overwriting existing blob at same pathname. Default: `false` |
| `cacheControlMaxAge` | No | Cache duration in seconds. Default: 1 month. Min: 60s |
| `contentType` | No | MIME type; extracted from pathname extension by default |
| `multipart` | No | Enable multipart upload for large files |
| `ifMatch` | No | ETag for conditional write (throws `BlobPreconditionFailedError` on mismatch) |
| `onUploadProgress` | No | `({loaded, total, percentage}) => void` |
| `abortSignal` | No | `AbortSignal` to cancel the operation |
| `token` | No | Read-write token override |
| `oidcToken` | No | OIDC token override |
| `storeId` | No | Store ID override |

### Return Value

```json
{
  "pathname": "string",
  "contentType": "string",
  "contentDisposition": "string",
  "url": "string",
  "downloadUrl": "string",
  "etag": "string"
}
```

## get()

Retrieves blob content as a stream (primarily for private blobs).

```ts
import { get } from '@vercel/blob';

const result = await get('pathname/file.jpg', { access: 'private' });
// result: { stream, blob: { contentType, etag, ... }, statusCode } | null
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `access` | Yes | `'private'` or `'public'` |
| `ifNoneMatch` | No | ETag for conditional read; returns `statusCode: 304` with `stream: null` if unchanged |
| `headers` | No | Additional request headers |
| `abortSignal` | No | `AbortSignal` to cancel |
| `token` / `oidcToken` / `storeId` | No | Auth overrides |

Returns `null` if blob not found.

## del()

Deletes one or multiple blobs.

```ts
import { del } from '@vercel/blob';

await del('pathname/file.jpg');
await del(['pathname/file1.jpg', 'pathname/file2.jpg']);
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `ifMatch` | No | ETag for conditional delete (single URL only) |
| `abortSignal` | No | `AbortSignal` to cancel |
| `token` / `oidcToken` / `storeId` | No | Auth overrides |

Returns `void`. Does not throw if blob doesn't exist. Delete operations are **free**.

## head()

Returns a blob's metadata (counts as a Simple Operation).

```ts
import { head } from '@vercel/blob';

const metadata = await head('pathname/file.jpg');
```

Throws `BlobNotFoundError` if blob does not exist.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `abortSignal` | No | `AbortSignal` to cancel |
| `token` / `oidcToken` / `storeId` | No | Auth overrides |

## list()

Lists blobs in the store. Returns blobs in lexicographical order by pathname.

```ts
import { list } from '@vercel/blob';

const { blobs, cursor, hasMore } = await list({ prefix: 'folder/', limit: 100 });
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `limit` | No | Max results. Default: 1000 |
| `prefix` | No | Filter by path prefix |
| `cursor` | No | Pagination cursor from previous response |
| `mode` | No | `'expanded'` (default) or `'folded'` (collapses folder contents) |
| `abortSignal` | No | `AbortSignal` to cancel |
| `token` / `oidcToken` / `storeId` | No | Auth overrides |

Counts as an **Advanced Operation**.

## copy()

Copies an existing blob to a new path.

```ts
import { copy } from '@vercel/blob';

const blob = await copy('source/file.jpg', 'destination/file.jpg', { access: 'public' });
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `access` | Yes | `'private'` or `'public'` |
| `contentType` | No | MIME type override |
| `addRandomSuffix` | No | Default: `false` (unlike `put()`) |
| `allowOverwrite` | No | Default: `false` |
| `cacheControlMaxAge` | No | Cache duration in seconds |
| `ifMatch` | No | ETag for conditional copy |
| `abortSignal` | No | `AbortSignal` to cancel |
| `token` / `oidcToken` / `storeId` | No | Auth overrides |

Note: `contentType` and `cacheControlMaxAge` are NOT copied from source; set them explicitly.

## Multipart Uploads

For files > 100 MB. Three approaches:

### Automatic (recommended)

Pass `multipart: true` to `put()` or `upload()`:

```ts
await put('large-video.mp4', stream, { access: 'public', multipart: true });
```

### Manual (3-phase)

```ts
import { createMultipartUpload, uploadPart, completeMultipartUpload } from '@vercel/blob';

const { key, uploadId } = await createMultipartUpload('file.mp4', { access: 'public' });

const part = await uploadPart('file.mp4', chunkBuffer, {
  access: 'public', partNumber: 1, key, uploadId,
});

const blob = await completeMultipartUpload('file.mp4', [part], {
  access: 'public', key, uploadId,
});
```

Each part must be >= 5 MB except the last. Billing: 1 op to start + 1 op per part + 1 op to complete.

## Client Uploads

From `@vercel/blob/client`:

### upload()

```ts
import { upload } from '@vercel/blob/client';

const blob = await upload('filename.jpg', file, {
  access: 'public',
  handleUploadUrl: '/api/upload',
});
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `access` | Yes | `'private'` or `'public'` |
| `handleUploadUrl` | Yes | Server route URL for token generation |
| `clientPayload` | No | String sent to `onBeforeGenerateToken` on server |
| `multipart` | No | Enable multipart for large files |
| `onUploadProgress` | No | `({loaded, total, percentage}) => void` |
| `abortSignal` | No | `AbortSignal` to cancel |

### handleUpload()

Server-side route handler for client uploads:

```ts
import { handleUpload } from '@vercel/blob/client';

const jsonResponse = await handleUpload({
  body,
  request,
  onBeforeGenerateToken: async (pathname, clientPayload) => {
    // Authenticate and authorize user here — required!
    return {
      allowedContentTypes: ['image/jpeg', 'image/png'],
      addRandomSuffix: true,
      tokenPayload: JSON.stringify({ userId: session.user.id }),
    };
  },
  onUploadCompleted: async ({ blob, tokenPayload }) => {
    // Update your database with blob.url
  },
});
```

`onBeforeGenerateToken` return options:

| Parameter | Description |
|-----------|-------------|
| `allowedContentTypes` | Allowed MIME types (supports wildcards: `text/*`) |
| `maximumSizeInBytes` | Max upload size (max: 5 TB) |
| `validUntil` | Token expiry timestamp in ms (default: now + 1 hour) |
| `addRandomSuffix` | Add random suffix to pathname |
| `allowOverwrite` | Allow overwriting existing blobs |
| `cacheControlMaxAge` | Cache duration in seconds |
| `callbackUrl` | Custom URL for `onUploadCompleted` webhook |
| `tokenPayload` | String forwarded to `onUploadCompleted` |

## Error Handling

```ts
import { BlobNotFoundError, BlobPreconditionFailedError } from '@vercel/blob';

try {
  await head('file.jpg');
} catch (error) {
  if (error instanceof BlobNotFoundError) { /* ... */ }
  if (error instanceof BlobPreconditionFailedError) { /* ETag mismatch */ }
}
```

## Notes

- `handleUpload` always requires a read-write token (`BLOB_READ_WRITE_TOKEN`); OIDC is not accepted
- `onUploadCompleted` callback does not fire on localhost; use ngrok for local testing
- Set `VERCEL_BLOB_CALLBACK_URL` env var to override the callback URL locally

## Related

- [Overview](./overview.md)
- [Private Storage](./private-storage.md)
- [Public Storage](./public-storage.md)
- [Client Upload](./client-upload.md)
- [Pricing](./pricing.md)
