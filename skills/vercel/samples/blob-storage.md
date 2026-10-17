# Vercel Blob Storage

Upload, list, retrieve metadata, and delete files using the `@vercel/blob` SDK.

```bash
# Install
npm install @vercel/blob

# Pull BLOB_STORE_ID + VERCEL_OIDC_TOKEN (OIDC, default and recommended) into .env.
# Fallback outside Vercel: BLOB_READ_WRITE_TOKEN (long-lived static token)
vercel env pull
```

Upload a file (server-side, e.g. Next.js App Router route):

```ts
// app/upload/route.ts
import { put } from '@vercel/blob';
// App-specific auth helper (e.g. Auth.js `auth()`); not part of @vercel/blob
import { getSession } from '@/lib/auth';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 4 * 1024 * 1024; // stay under the 4.5 MB body limit

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return Response.json({ error: 'file is required' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_SIZE_BYTES) {
    return Response.json({ error: 'Unsupported file type or size' }, { status: 400 });
  }

  const blob = await put(`uploads/${file.name}`, file, {
    access: 'public',          // 'public' or 'private'
    addRandomSuffix: true,     // avoids name collisions
  });

  return Response.json({ url: blob.url });
}
```

List blobs with a prefix filter:

```ts
import { list } from '@vercel/blob';

const { blobs } = await list({ prefix: 'uploads/', limit: 50 });
for (const blob of blobs) {
  console.log(blob.pathname, blob.url);
}
```

Retrieve metadata for a single blob:

```ts
import { head } from '@vercel/blob';

const metadata = await head('uploads/photo-abc123.jpg');
// { pathname, url, contentType, size, uploadedAt, etag, ... }
```

Delete one or multiple blobs:

```ts
import { del } from '@vercel/blob';

// Single
await del('https://<store>.blob.vercel-storage.com/uploads/old-file.jpg');

// Multiple
await del([url1, url2, url3]);
```

Conditional overwrite with `ifMatch` (optimistic concurrency):

```ts
import { head, put, BlobPreconditionFailedError } from '@vercel/blob';

// 1. Read the current blob and its ETag
const metadata = await head('config.json');

// 2. Write with the ETag; only succeeds if the blob hasn't changed
try {
  await put('config.json', JSON.stringify(newConfig), {
    access: 'private' /* or 'public' */,
    allowOverwrite: true,
    ifMatch: metadata.etag,
  });
} catch (error) {
  if (error instanceof BlobPreconditionFailedError) {
    // The blob was modified by another process: retry or handle the conflict
  }
  throw error;
}
```

Issue a short-lived signed URL with `issueSignedToken()` and `presignUrl()`:

```ts
import { issueSignedToken, presignUrl } from '@vercel/blob';

// Server: issue a signed token valid for 1 hour
const token = await issueSignedToken({
  pathname: 'media/photo.png',
  operations: ['get'],
  validUntil: Date.now() + 60 * 60 * 1000,
});

// Sign a URL valid for 5 minutes, even though the token is valid for 1 hour
const { presignedUrl } = await presignUrl(token, {
  operation: 'get',
  pathname: 'media/photo.png',
  access: 'private',
  validUntil: Date.now() + 5 * 60 * 1000,
});

const res = await fetch(presignedUrl);
```

## Notes

- OIDC (`BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`) is the default authentication on Vercel and is more secure than the long-lived `BLOB_READ_WRITE_TOKEN`; connect the store to a project (include Development to use it locally via `vercel env pull`). Use the static read-write token when code runs outside Vercel or when generating client tokens for browser uploads.
- The `access` value must match the store's access mode (private or public); you cannot change a store's mode after creation.
- Public blobs are served directly via CDN URL; private blobs must be streamed through a Vercel Function using `get()`.
- CDN cache TTL defaults to one month; use `cacheControlMaxAge` on `put()` to shorten it (minimum 60 s). Treat blobs as immutable when possible; overwrites can take up to 60 seconds to propagate through the cache.
- `ifMatch` throws `BlobPreconditionFailedError` when the ETag no longer matches. `issueSignedToken()` calls the Blob control API, so cache the result until near expiry; `presignUrl()` signs locally and accepts `'get'`, `'head'`, `'put'`, `'delete'`.
