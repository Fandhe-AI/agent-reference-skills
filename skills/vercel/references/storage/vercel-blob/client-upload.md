# Client Upload

Upload files directly from the browser to Vercel Blob without routing through your server. Supports files of any size.

## How It Works

1. Browser calls your server route to request a client token
2. Server authenticates/authorizes the user in `onBeforeGenerateToken`, returns token
3. Browser uploads directly to Vercel Blob using the token
4. Vercel Blob calls your server's `onUploadCompleted` webhook when done

## Client-Side Code

```tsx
// app/avatar/upload/page.tsx
'use client';
import { upload } from '@vercel/blob/client';

const blob = await upload(file.name, file, {
  access: 'private', // or 'public'
  handleUploadUrl: '/api/avatar/upload',
  clientPayload: JSON.stringify({ postId: '123' }), // optional
});
console.log(blob.url);
```

## Server Route (Route Handler)

```ts
// app/api/avatar/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  const jsonResponse = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async (pathname, clientPayload) => {
      // REQUIRED: authenticate and authorize user here
      // const session = await auth();
      // if (!session) throw new Error('Not authenticated');

      return {
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ userId: 'user-123' }),
      };
    },
    onUploadCompleted: async ({ blob, tokenPayload }) => {
      // Called by Vercel Blob when upload finishes
      // Does NOT fire on localhost; use ngrok for local testing
      console.log('Upload completed:', blob.url);
    },
  });

  return NextResponse.json(jsonResponse);
}
```

## `onBeforeGenerateToken` Return Options

| Parameter | Description |
|-----------|-------------|
| `allowedContentTypes` | Array of allowed MIME types (supports wildcards: `image/*`) |
| `maximumSizeInBytes` | Max file size in bytes (max: 5 TB) |
| `validUntil` | Token expiry as Unix timestamp in ms (default: now + 1 hour) |
| `addRandomSuffix` | Add random suffix to pathname |
| `allowOverwrite` | Allow overwriting existing blob |
| `cacheControlMaxAge` | Cache duration in seconds |
| `callbackUrl` | Custom webhook URL for `onUploadCompleted` |
| `tokenPayload` | String forwarded to `onUploadCompleted` |

## Local Development

`onUploadCompleted` cannot reach `localhost`. Use [ngrok](https://ngrok.com/) and set:

```bash
# .env.local
VERCEL_BLOB_CALLBACK_URL=https://abc123.ngrok-free.app
```

## Notes

- Client uploads have **no data transfer charges** for the upload itself
- `handleUpload` requires `BLOB_READ_WRITE_TOKEN`; OIDC is not accepted
- Without authentication in `onBeforeGenerateToken`, your upload route accepts anonymous uploads

## Related

- [Server Upload](./server-upload.md)
- [@vercel/blob SDK](./blob-sdk.md)
