# Fetching Data

Fetch data in Server and Client Components, and stream content that depends on data.

## Signature / Usage

```tsx
// app/blog/page.tsx — fetch in an async Server Component
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
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
// app/ui/posts.tsx — streaming a promise into a Client Component with use()
'use client'
import { use } from 'react'

export default function Posts({ posts }: { posts: Promise<{ id: string; title: string }[]> }) {
  const allPosts = use(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `loading.js` | file convention | Streams the entire page while data is fetched; wraps `page.js` in `<Suspense>` |
| `<Suspense>` | React component | Streams a specific part of a page with a `fallback` |
| `use(promise)` | React API | Reads a promise passed from a Server Component into a Client Component |
| `Promise.all` | JS API | Runs multiple `fetch` calls in parallel instead of sequentially |
| `React.cache` | function | Memoizes a data-fetching function per request across Server and Client |

## Notes

- `fetch` requests are memoized by default within a component tree, but not cached across requests unless combined with `use cache`
- Sequential fetches block on each other; initiate requests before awaiting them to fetch in parallel
- A layout accessing uncached/runtime data (`cookies()`, `headers()`, uncached fetch) blocks navigation instead of falling back to `loading.js`; wrap that access in its own `<Suspense>` or move it into `page.js`
- Client Components can also fetch via community libraries like SWR or React Query

## Related

- [server-and-client-components](./server-and-client-components.md)
- [caching](./caching.md)
- [mutating-data](./mutating-data.md)
