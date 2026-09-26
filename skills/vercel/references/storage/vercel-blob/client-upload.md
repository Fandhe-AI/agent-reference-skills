# Client Upload

Upload files directly from the browser to Vercel Blob without routing through your server. Supports files of any size.

## How It Works

1. Browser calls your server route to request a client token
2. Server authenticates/authorizes the user in `onBeforeGenerateToken`, returns token
3. Browser uploads directly to Vercel Blob using the token
4. Vercel Blob calls your server's `onUploadCompleted` webhook when done

## Client-Side Code

```tsx
// app/avatar/upload/avatar-uploader.tsx
'use client';
import { upload } from '@vercel/blob/client';
import type { ChangeEvent } from 'react';

// Render from a Server Component that passes the signed-in user's ID,
// e.g. <AvatarUploader userId={session.userId} />
export function AvatarUploader({ userId }: { userId: string }) {
  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // The server route only issues tokens for paths under avatars/<userId>/
    const blob = await upload(`avatars/${userId}/${file.name}`, file, {
      access: 'private', // or 'public'
      handleUploadUrl: '/api/avatar/upload',
    });
    console.log(blob.url);
  }

  return (
    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} />
  );
}
```

## Server Route (Route Handler)

```ts
// app/api/avatar/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
// App-specific auth helper (e.g. Auth.js `auth()`); not part of @vercel/blob
import { getSession } from '@/lib/auth';

// Expected rejections whose messages are safe to return to the client
class UploadRejectedError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate BEFORE issuing a token; otherwise anyone can upload
        const session = await getSession();
        if (!session) {
          throw new UploadRejectedError('Not authenticated', 401);
        }

        // Authorize the destination: users may only write under their own prefix
        const allowedPrefix = `avatars/${session.userId}/`;
        if (!pathname.startsWith(allowedPrefix) || pathname.includes('..')) {
          throw new UploadRejectedError('Forbidden upload path', 403);
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5 MB
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ userId: session.userId }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel Blob when upload finishes
        // Does NOT fire on localhost; use ngrok for local testing
        console.log('Upload completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    if (error instanceof UploadRejectedError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    // Do not leak internal error details to the client
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
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
- `pathname` and `clientPayload` are sent by the browser: treat them as untrusted and authorize the destination (and anything `clientPayload` references) before returning a token

## Related

- [Server Upload](./server-upload.md)
- [@vercel/blob SDK](./blob-sdk.md)
