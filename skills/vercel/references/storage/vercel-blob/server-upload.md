# Server Upload

Upload files to Vercel Blob from a server-side Function or Server Action.

## When to Use

- Files <= 4.5 MB (Vercel Functions request body limit)
- For larger files, use [client uploads](./client-upload.md)

## Setup

```bash
npm i @vercel/blob
vercel env pull  # pulls BLOB_READ_WRITE_TOKEN or OIDC vars
```

## Upload via Route Handler

```ts
// app/api/upload/route.ts
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

  const blob = await put(file.name, file, {
    access: 'private', // or 'public'
    addRandomSuffix: true,
  });

  return Response.json(blob);
}
```

## Upload via Server Action

```ts
// app/actions.ts
'use server';
import { put } from '@vercel/blob';
// App-specific auth helper (e.g. Auth.js `auth()`); not part of @vercel/blob
import { getSession } from '@/lib/auth';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 4 * 1024 * 1024;

export async function uploadAction(formData: FormData) {
  // Server Actions are public endpoints: authenticate inside the action
  const session = await getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    throw new Error('file is required');
  }
  if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_SIZE_BYTES) {
    throw new Error('Unsupported file type or size');
  }

  return await put(file.name, file, { access: 'private', addRandomSuffix: true });
}
```

## Notes

- Server uploads incur Fast Data Transfer charges when your Vercel app receives the file
- Authenticate the caller and validate the file (presence, type, size) before calling `put()`; `file.type` is client-declared, so inspect the content as well when the type matters
- `put()` returns `{ pathname, contentType, contentDisposition, url, downloadUrl, etag }`

## Related

- [Client Upload](./client-upload.md)
- [@vercel/blob SDK](./blob-sdk.md)
