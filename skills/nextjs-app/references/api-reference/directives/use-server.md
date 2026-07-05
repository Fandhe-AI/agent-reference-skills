# use server

Designates a function or file to execute on the server side. Used at the top of a file to mark all exported functions as server-side, or inline at the top of a function to mark it as a Server Function. This is a React feature; Next.js builds Server Actions on top of it.

## Signature / Usage

```tsx filename="app/actions.ts"
'use server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function createUser(data: { name: string; email: string }) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  const user = await db.user.create({ data })
  return { id: user.id, name: user.name }
}
```

Inline usage inside a Server Component, marking a single function as a Server Function passed to a Client Component:

```tsx filename="app/posts/[id]/page.tsx"
export default async function PostPage({ params }: { params: { id: string } }) {
  async function updatePost(formData: FormData) {
    'use server'
    await savePost(params.id, formData)
  }

  return <EditPost updatePostAction={updatePost} />
}
```

To call a Server Function from a Client Component, define it in a dedicated file with a file-level `'use server'` directive, then import it.

## Notes

- Always authenticate/authorize inside the Server Function (read auth from cookies/headers rather than accepting tokens as parameters).
- Return values are serialized and sent to the client — return only the data the UI needs, not raw database records.
- For Next.js-specific Server Action behaviors (response model, security, configuration, deployment), see [Server Actions and Mutations](https://nextjs.org/docs/app/guides/server-actions).

## Related

- [use client](./use-client.md)
