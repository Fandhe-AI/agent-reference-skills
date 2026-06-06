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

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get('file') as File;

  const blob = await put(file.name, file, {
    access: 'private', // or 'public'
  });

  return Response.json(blob);
}
```

## Upload via Server Action

```ts
// app/actions.ts
'use server';
import { put } from '@vercel/blob';

export async function uploadAction(formData: FormData) {
  const file = formData.get('file') as File;
  return await put(file.name, file, { access: 'private' });
}
```

## Notes

- Server uploads incur Fast Data Transfer charges when your Vercel app receives the file
- `put()` returns `{ pathname, contentType, contentDisposition, url, downloadUrl, etag }`

## Related

- [Client Upload](./client-upload.md)
- [@vercel/blob SDK](./blob-sdk.md)
