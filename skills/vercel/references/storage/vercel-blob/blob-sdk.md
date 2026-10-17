# @vercel/blob

SDK for interacting with Vercel Blob stores. Install: `npm i @vercel/blob`.

## Authentication

Use OIDC when your code runs on Vercel; use a static read-write token when running outside Vercel or when generating client tokens for browser uploads.

- OIDC (recommended): needs `VERCEL_OIDC_TOKEN` (managed by Vercel; for local dev run `vercel env pull` once, development tokens expire after 12 hours and the SDK refreshes them using your Vercel CLI credentials) and `BLOB_STORE_ID` (created when you connect a store; `store_<id>` or `<id>` form). Do not read `VERCEL_OIDC_TOKEN` yourself and pass it to calls: an explicitly passed token is not refreshed and fails with `403` after it expires.
- Passing OIDC credentials explicitly: for frameworks that don't load `.env.local` into `process.env` (e.g. Vite server code), pass `oidcToken` and `storeId` on each call (prefer configuring the framework, e.g. `dotenv-expand`, instead). Otherwise OIDC silently falls back to `BLOB_READ_WRITE_TOKEN`.
- Read-write token: long-lived `BLOB_READ_WRITE_TOKEN`, added when you create a store from the dashboard. OIDC takes precedence when its variables are present.
- Resolution order: (1) explicit `token` option (read-write or a client token from `generateClientTokenFromReadWriteToken`; always wins, including over OIDC); (2) OIDC (`oidcToken` option or `VERCEL_OIDC_TOKEN`, with `storeId` option or `BLOB_STORE_ID`; both required); (3) `process.env.BLOB_READ_WRITE_TOKEN`; (4) otherwise the SDK throws.
- `handleUpload` always needs a read-write token; use `handleUploadPresigned` for client uploads with OIDC.

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

The `body` can be `ReadableStream`, `String`, `ArrayBuffer` or `Blob`. To upload into a folder put it in the pathname (e.g. `` `existingBlobFolder/${file.name}` ``).

## putImage()

Optimizes an image once at write time (width, quality, format) and stores only the optimized output.

```ts
import { putImage } from '@vercel/blob';

const blob = await putImage('avatars/user-123.webp', request.body, {
  access: 'public',
  optimizeImage: { width: 256, quality: 80, format: 'webp' },
});
```

`putImage(pathname, bodyOrUrl, options)`: `bodyOrUrl` is image content (`ReadableStream`, `String`, `ArrayBuffer`, `Blob`) or a `URL` instance pointing to a public http(s) image that Vercel fetches server-side (strings are always treated as image content). Options: `access` (required), `optimizeImage` (required), `addRandomSuffix`, `allowOverwrite`, `cacheControlMaxAge`, `ifMatch`, `oidcToken`, `storeId`, `abortSignal`, `onUploadProgress`. `contentType` and `multipart` are not available.

| `optimizeImage` | Required | Description |
|-----------------|----------|-------------|
| `width` | Yes | Integer 1 to 8192; aspect ratio preserved |
| `quality` | No | Integer 1 to 100; default 75 |
| `format` | No | `'jpeg'`, `'png'`, `'webp'`, `'avif'`; source format kept when omitted |

Requires OIDC credentials (read-write tokens are not accepted). Returns the same object as `put()`. If the optimized output would be larger than the source, the source is stored unchanged (check `contentType`). Billed as one image transformation plus a regular blob upload. The `optimizeImage` option on `put()` and `putFromUrl()` are deprecated in favor of `putImage()` but keep working.

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

## rename()

Moves a blob to a new path: copies, then deletes the source only after the copy succeeds.

```ts
import { rename } from '@vercel/blob';

const blob = await rename('user-uploads/avatar-old.png', 'user-uploads/avatar.png', {
  access: 'private',
});
```

`rename(fromUrlOrPathname, toPathname, options)`: like `copy()`, `contentType` and `cacheControlMaxAge` are not carried over. Throws if a blob already exists at `toPathname` unless `allowOverwrite: true` (or `addRandomSuffix: true`). If the source cannot be deleted after a successful copy, the method throws and the blob exists at both paths; retry with `allowOverwrite: true`. Cannot be called with a client token.

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

### Uploader

A wrapper around the manual process that carries the shared data (you still manage memory and concurrency; parts >= 5 MB except the last, ideally equal size):

```ts
import { createMultipartUploader } from '@vercel/blob';

const uploader = await createMultipartUploader('file.mp4', { access: 'public' });
const part1 = await uploader.uploadPart(1, chunkBody1);
const blob = await uploader.complete([part1]);
// uploader: { key, uploadId, uploadPart(partNumber, body), complete(parts) }
```

`createMultipartUploader` options: `access` (required), `contentType`, `token`, `oidcToken`, `storeId`, `addRandomSuffix` (default `true`), `cacheControlMaxAge`, `abortSignal`.

## Signed URLs

Time-limited access to a blob URL without exposing a read-write token (summary; full reference in signed-urls.md).

- `issueSignedToken(options)`: runs on your server with the usual authentication (OIDC or read-write token); scope with `pathname`, `operations` (`'get'`, `'head'`, `'put'`, `'delete'`), `validUntil`, `allowedContentTypes`, `maximumSizeInBytes`. Returns `{ delegationToken, clientSigningToken, validUntil }`. Treat `clientSigningToken` as a secret: anyone holding it can sign URLs within the delegation's scope.
- `presignUrl(signedToken, options)`: produces a ready-to-fetch URL for a pathname and operation; signs locally with no network call, so it runs on server, edge, or browser.
- Presigned `GET` URLs accept the `useCache` option in `presignUrl()`.

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

### uploadPresigned()

Presigned counterpart of `upload()`: asks your server for a presigned `PUT` URL and uploads directly to Blob storage with no bearer token in flight. `uploadPresigned(pathname, body, options)` accepts the same parameters as `upload` and returns the same blob object; point `handleUploadUrl` at a route that implements `handleUploadPresigned`.

### handleUploadPresigned()

Server-side route helper, presigned counterpart of `handleUpload()`; returns presigned `PUT` URLs backed by `issueSignedToken`, so it works with OIDC as well as a read-write token.

- Mint the signed token inside a `getSignedToken` callback, typically `issueSignedToken({ pathname, operations: ['put'] })`. You must authenticate and authorize the user inside this function.
- Upload constraints (`allowedContentTypes`, `maximumSizeInBytes`) move into the `urlOptions` object returned by `getSignedToken`.
- `onUploadCompleted` keeps its shape, but its signature is verified with a webhook public key (`webhookPublicKey`, default `process.env.BLOB_WEBHOOK_PUBLIC_KEY`) instead of the read-write token.

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

- `handleUpload` always requires a read-write token (`BLOB_READ_WRITE_TOKEN`); OIDC is not accepted (use `handleUploadPresigned` for OIDC)
- Conditional options: `ifMatch` (put, putImage, copy, del single URL) and `ifNoneMatch` (get) as documented in the current Blob docs
- `onUploadCompleted` callback does not fire on localhost; use ngrok for local testing
- Set `VERCEL_BLOB_CALLBACK_URL` env var to override the callback URL locally

## Related

- [Overview](./overview.md)
- [Private Storage](./private-storage.md)
- [Public Storage](./public-storage.md)
- [Client Upload](./client-upload.md)
- [Signed URLs](./signed-urls.md)
- [Pricing](./pricing.md)
