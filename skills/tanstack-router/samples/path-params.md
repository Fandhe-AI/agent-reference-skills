---
source: https://tanstack.com/router/latest/docs/framework/react/guide/path-params
---

# Path Params

Capture a URL segment with the `$name` prefix and read it via `Route.useParams()` inside the owning route.

```tsx
// src/routes/posts.$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()
  const post = Route.useLoaderData()
  return (
    <div>
      Post {postId}: {post.title}
    </div>
  )
}
```

```tsx
// Optional path param: matches both /posts and /posts/tech
// src/routes/posts.{-$category}.tsx
export const Route = createFileRoute('/posts/{-$category}')({
  component: () => {
    const { category } = Route.useParams()
    return <div>Category: {category ?? 'all'}</div>
  },
})
```

## Notes

- Path params match a single segment up to the next `/`; once parsed they are available to all child routes.
- Outside the owning route, use the global `useParams({ strict: false })` for ambiguous access.
- Removing an optional param on navigation: `params={{ category: undefined }}`; preserving others while updating: `params={(prev) => ({ ...prev, category: undefined })}`.
