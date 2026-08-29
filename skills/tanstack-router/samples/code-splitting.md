---
source: https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting
---

# Code Splitting with `createLazyFileRoute`

Split a route's critical config (path, loader, `beforeLoad`) from its non-critical component into a separate `.lazy.tsx` file.

```tsx
// src/routes/posts.tsx — critical config only
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})
```

```tsx
// src/routes/posts.lazy.tsx — non-critical config
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts')({
  component: Posts,
})

function Posts() {
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

```ts
// vite.config.ts — or use automatic code-splitting instead of manual .lazy.tsx files
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
  ],
})
```

## Notes

- `loader` is intentionally excluded from the lazy split — it is already an async boundary and is required for preload-on-hover.
- `__root.tsx` cannot be code-split; it always renders.
- Automatic code-splitting (`autoCodeSplitting: true`) is the recommended approach for file-based routing on a supported bundler, avoiding manual `.lazy.tsx` files entirely.
- For code-based routing, use `createLazyRoute` plus `route.lazy(() => import(...).then((d) => d.Route))` instead.
