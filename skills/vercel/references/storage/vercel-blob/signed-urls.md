# Signed URLs

Vercel Signed URLs grant time-limited access to a Blob URL without exposing a read-write token. Issue a short-lived signed token on your server, then sign individual blob URLs from the browser or any client. The CDN verifies the signature and rejects requests outside the token's scope.

## Signature / Usage

```ts
import { issueSignedToken, presignUrl } from '@vercel/blob';

// Server: issue a signed token. `issueSignedToken` calls the Blob
// control API, so cache the result and reuse it across requests until it's
// near expiry to avoid a network round-trip on every URL you sign.
const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['get'],
  validUntil: Date.now() + 60 * 60 * 1000,
});

// Sign a URL valid for 5 minutes, even though the token is valid for 1 hour.
const { presignedUrl } = await presignUrl(token, {
  operation: 'get',
  pathname: 'media/photo.png',
  access: 'private',
  validUntil: Date.now() + 5 * 60 * 1000,
});

const res = await fetch(presignedUrl);
```

Use cases: share a private blob with a third party for a limited window; embed a private blob in a server-rendered page without proxying bytes; let a browser upload directly without a read-write token; let a client delete or inspect a specific blob without full read-write access.

## `issueSignedToken(options)`

Runs on the server and asks the Blob control API for a short-lived token used to sign presigned URLs. Uses the same authentication as the rest of the SDK (OIDC or a static read-write token).

| Name | Required | Description |
|------|----------|-------------|
| `pathname` | No | Blob pathname to scope the token to, e.g. `media/photo.png`. `*` allows any pathname in the store. Defaults to a whole-store wildcard. |
| `operations` | No | Array of `'get'`, `'head'`, `'put'`, `'delete'`. Defaults to `['get']`. `'get'` covers GET on the blob URL; `'head'` covers HEAD (signed separately so a `'get'` token cannot be replayed as HEAD); `'put'` covers single-object PUT and multipart POST against the Blob API; `'delete'` covers DELETE against the Blob API. |
| `validUntil` | No | Expiry in ms since epoch. Maximum 7 days from now. Defaults to 1 hour from now. |
| `allowedContentTypes` | No | MIME types accepted on `'put'`, e.g. `['image/png', 'image/jpeg']`. Embedded in the delegation payload and enforced on every upload. |
| `maximumSizeInBytes` | No | Maximum upload size in bytes, enforced on `'put'`. |
| `token` | No | Static read-write token. |
| `oidcToken` | No | Vercel OIDC token, used in place of `process.env.VERCEL_OIDC_TOKEN`. Pair with `storeId` (or `BLOB_STORE_ID`). |
| `storeId` | No | Blob store id, used with OIDC. |
| `abortSignal` | No | `AbortSignal` to cancel the request. |

Returns:

```ts
{
  delegationToken: string;       // public; encodes scope and HMAC, travels publicly in every signed URL
  clientSigningToken: string;    // secret; HMAC key used to sign URLs within the delegation's scope
  validUntil: number;            // ms since epoch
}
```

## `presignUrl(signedToken, options)`

Takes the `{ delegationToken, clientSigningToken }` returned by `issueSignedToken` and produces a ready-to-fetch URL for a pathname. HMAC-only; runs in any environment (server, edge, browser). Returns `{ presignedUrl: string }`.

| Name | Required | Description |
|------|----------|-------------|
| `operation` | Yes | `'get'`, `'head'`, `'put'`, or `'delete'`. Must be in the `operations` array of the `issueSignedToken` call. |
| `pathname` | Yes | Blob pathname to sign. Must match the delegation's `pathname` scope. |
| `access` | Yes | `'public'` or `'private'`, matching the store's access mode. |
| `validUntil` | No | Expiry of this URL in ms since epoch. Capped to the delegation's `validUntil`. Serialized as the signed `vercel-blob-valid-until` query parameter. |

Operation-specific extra fields:

- `'put'`: `allowedContentTypes`, `maximumSizeInBytes`, `addRandomSuffix`, `allowOverwrite`, `cacheControlMaxAge`, `ifMatch`, `onUploadCompleted`.
- `'get'`: `useCache`. Set `false` to append `cache=0` so fetches bypass the CDN cache and read from origin storage.
- `'delete'`: `ifMatch` to require a specific ETag.
- `'head'`: no additional fields.

```ts
// GET that must reflect the latest write
const { presignedUrl } = await presignUrl(token, {
  operation: 'get',
  pathname: 'media/photo.png',
  access: 'private',
  useCache: false, // appends cache=0 so fetches read from origin storage
});
```

```ts
// PUT with CDN-enforced constraints (conditional write via ifMatch)
const { etag } = await head(
  'https://<storeId>.private.blob.vercel-storage.com/media/photo.png',
);
const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['put'],
  allowedContentTypes: ['image/png'],
  maximumSizeInBytes: 10 * 1024 * 1024,
  validUntil: Date.now() + 60 * 60 * 1000,
});
const { presignedUrl } = await presignUrl(token, {
  operation: 'put',
  pathname: 'media/photo.png',
  access: 'private',
  allowedContentTypes: ['image/png'],
  maximumSizeInBytes: 10 * 1024 * 1024,
  addRandomSuffix: false,
  allowOverwrite: true,
  ifMatch: etag,
});
const res = await fetch(presignedUrl, {
  method: 'PUT',
  headers: { 'content-type': 'image/png' },
  body: pngBytes,
});
```

```ts
// DELETE guarded by ETag
const { presignedUrl } = await presignUrl(token, {
  operation: 'delete',
  pathname: 'media/photo.png',
  access: 'private',
  ifMatch: etag,
});
const res = await fetch(presignedUrl, { method: 'DELETE' });
```

HEAD: `fetch(presignedUrl, { method: 'HEAD' })` after signing with `operation: 'head'` and a token issued with `operations: ['head']`.

## `handleUploadPresigned(options)` (presigned uploads)

Server-side route helper imported from `@vercel/blob/client`; the presigned counterpart of `handleUpload`. Your server returns presigned PUT URLs and the browser uploads directly with no Vercel-managed bearer token in flight. It also verifies the upload-completed callback like `handleUpload`.

| Name | Required | Description |
|------|----------|-------------|
| `body` | Yes | Parsed request JSON, typed `HandleUploadPresignedBody`. |
| `request` | Yes | Incoming `Request`; used to verify the `onUploadCompleted` callback signature. |
| `webhookPublicKey` | No | Public key to verify the callback. Defaults to `process.env.BLOB_WEBHOOK_PUBLIC_KEY` (used instead of the read-write token). |
| `getSignedToken` | Yes | Async function `(pathname, clientPayload, multipart)` returning `{ token, urlOptions? }`. `token` is an `IssuedSignedToken` scoped with `operations: ['put']`; `urlOptions` constrains the upload URL. You must authenticate and authorize the user inside it, otherwise the route allows anonymous uploads. |
| `onUploadCompleted` | No | Same shape as in `handleUpload`. |

```ts
import { issueSignedToken } from '@vercel/blob';
import {
  type HandleUploadPresignedBody,
  handleUploadPresigned,
} from '@vercel/blob/client';

await handleUploadPresigned({
  body,
  request,
  getSignedToken: async (pathname) => ({
    token: await issueSignedToken({ pathname, operations: ['put'] }),
    urlOptions: {
      allowedContentTypes: ['image/png', 'image/jpeg'],
      addRandomSuffix: true,
      allowOverwrite: false,
      cacheControlMaxAge: 30 * 24 * 60 * 60,
    },
  }),
  onUploadCompleted: async ({ blob, tokenPayload }) => {
    // Same shape as `handleUpload` — your database writes carry over.
  },
});
```

Browser side, call `uploadPresigned` from `@vercel/blob/client`:

```ts
const result = await uploadPresigned(file.name, file, {
  access: 'private',
  handleUploadUrl: '/api/upload-presigned',
});
```

## Notes

- Treat `clientSigningToken` as a secret: anyone holding it can sign URLs within the delegation's scope. `delegationToken` is safe to share (it travels inside every signed URL).
- Cache the issued token across requests until near expiry; `issueSignedToken` makes a network call.
- Presigned `GET` URLs are served through the CDN cache; overwrites at the same pathname may take up to 60 seconds to propagate. Use `useCache: false` when the fetch must reflect the latest write.
- Upgrading from `handleUpload`: swap to `handleUploadPresigned`, mint the token inside `getSignedToken`, move constraints from `onBeforeGenerateToken` into `urlOptions`; replace client `upload` with `uploadPresigned` and point `handleUploadUrl` at the new route; the result type is `PutBlobResult` (not `BlobResult`).
- Set `BLOB_WEBHOOK_PUBLIC_KEY` in the project environment so `handleUploadPresigned` can verify the upload-completed callback. Existing connections can opt in from the store's connection menu.
- Python SDK does not support Signed URLs.

## Related

- [Client Upload](./client-upload.md)
- [@vercel/blob SDK](./blob-sdk.md)
- [Private Storage](./private-storage.md)
- [Vercel Blob Python SDK](./python-sdk.md)
