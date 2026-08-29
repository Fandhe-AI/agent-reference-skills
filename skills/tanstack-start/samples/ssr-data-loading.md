---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-functions
---

# SSR Data Loading (route loader + server function)

Fetch server data during SSR via a route `loader` calling a `createServerFn`, then read it in the component with `useLoaderData()`.

```tsx
// src/server/posts.ts
import { createServerFn } from '@tanstack/react-start'

export const getPost = createServerFn()
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const post = await db.findPost(data.id)
    return post
  })
```

```tsx
// src/routes/posts.$postId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { getPost } from '../server/posts'

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => getPost({ data: { id: params.postId } }),
  component: PostPage,
})

function PostPage() {
  const post = Route.useLoaderData()
  return <article>{post.title}</article>
}
```

## Notes

- `loader` runs on the server during SSR and again on the client during client-side navigation; it always calls the same server function, which itself only ever executes on the server.
- With `ssr: true` (default), loader data is serialized and sent to the client alongside the server-rendered HTML — no extra client-side fetch happens on first load.
- Use `Route.useLoaderData()` inside the route's `component` to read the resolved data without re-fetching.
