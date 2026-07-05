# Server Actions and Mutations

A Server Action is a React Server Function invoked via `<form action>`, `<button formAction>`, or a client-side transition using the `'use server'` directive. This page covers Next.js-specific behavior: response model, dispatch order, security, and caching integration.

## Signature / Usage

```ts filename="app/posts/actions.ts"
'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  await db.post.create({
    data: {
      title: String(formData.get('title')),
      authorId: session.user.id,
    },
  })

  revalidatePath('/posts')
}
```

## Notes

- Next.js dispatches Server Actions **sequentially per client** — do not rely on `Promise.all` to parallelize actions from the client. Parallelize inside a single action, or use a Server Component / Route Handler instead.
- A single HTTP response carries both the action's return value and a re-rendered RSC Payload when the action calls `updateTag`, `revalidatePath`, `refresh`, mutates cookies, or calls `redirect`. `revalidateTag` (stale-while-revalidate) is the exception — no immediate re-render.
- Security: framework enforces a CSRF `Origin`/`Host` check, a 1MB default body size limit (`serverActions.bodySizeLimit`), encrypted/dead-code-eliminated action IDs, and closure variable encryption (set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` for multi-instance/self-hosted deployments). None of this replaces application-level auth/validation inside every action.
- Choosing a cache update: `updateTag` for read-your-own-writes, `revalidateTag` for background stale-while-revalidate, `revalidatePath` for a single route, `refresh` to refetch the current RSC Payload without invalidating cache.
- Deployments rotate action IDs (at most every 14 days); a client on a stale build may hit "Failed to find Server Action". Prefer rolling deployments and surface a retry path in the UI.
- Configure via `next.config.js` `experimental.serverActions.{allowedOrigins,bodySizeLimit}`.

## Related

- [Forms](./forms.md)
- [How Revalidation Works](https://nextjs.org/docs/app/guides/how-revalidation-works)
- [Data Security](https://nextjs.org/docs/app/guides/data-security)
