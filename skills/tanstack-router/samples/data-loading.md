---
source: https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
---

# Data Loading with `loader`

Preload data in a route's `loader` before the component renders, then read it with `useLoaderData()`.

```tsx
// src/routes/posts.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
  component: PostsComponent,
})

function PostsComponent() {
  const posts = Route.useLoaderData()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

```tsx
// Reading loader data outside the route file, without importing Route directly
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')

function PostsSidebar() {
  const posts = routeApi.useLoaderData()
  return <div>{posts.length} posts</div>
}
```

## Notes

- `loader` runs after `params.parse`/`validateSearch` (matching phase) and after `beforeLoad` (pre-loading phase), in parallel across all matched routes.
- Do not read `search` directly inside `loader` — declare `loaderDeps` to select only the params the loader actually needs, otherwise unrelated search changes trigger unnecessary reloads.
- Default `staleTime` is `0`, so cached data revalidates in the background (`'background'` `staleReloadMode`) on reuse.
- `router.invalidate({ sync: true })` forces a reload of all matched routes and awaits it.
