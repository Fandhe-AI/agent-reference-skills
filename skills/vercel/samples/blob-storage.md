# Vercel Blob Storage

Upload, list, retrieve metadata, and delete files using the `@vercel/blob` SDK.

```bash
# Install
npm install @vercel/blob

# Pull BLOB_READ_WRITE_TOKEN (or BLOB_STORE_ID + VERCEL_OIDC_TOKEN) into .env
vercel env pull
```

Upload a file (server-side, e.g. Next.js App Router route):

```ts
// app/upload/route.ts
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get('file') as File;

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

## Notes

- The `access` value must match the store's access mode (private or public); you cannot change a store's mode after creation.
- Public blobs are served directly via CDN URL; private blobs must be streamed through a Vercel Function using `get()`.
- CDN cache TTL defaults to one month; use `cacheControlMaxAge` on `put()` to shorten it (minimum 60 s).
- Treat blobs as immutable when possible — use `addRandomSuffix: true` or timestamp-based pathnames to avoid cache propagation issues on overwrites.
