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
| `React.cache` | function | Memoizes a data-fetching function per request (for data access that does not use `fetch`, such as an ORM or database query); scoped to the current request only |
| `preload()` pattern | convention | Call a data-fetching function without `await` before blocking work, then call it again in the consuming component |

## Notes

- `fetch` requests are memoized by default within a component tree, but not cached across requests unless combined with `use cache`
- Sequential fetches block on each other; initiate requests before awaiting them to fetch in parallel
- A layout accessing uncached/runtime data (`cookies()`, `headers()`, uncached fetch) blocks navigation instead of falling back to `loading.js`; wrap that access in its own `<Suspense>` or move it into `page.js`
- Client Components can also fetch via community libraries like SWR or React Query; see the Client-side data fetching guide (`guides/client-side-data-fetching.md`) for direct browser fetching, providing initial data from a Server Component, and coordinating a library cache with the Next.js server and client caches
- Preloading data: when a component renders after other blocking work, its request starts late. Call the data function without `await` before the blocking work (`preload(id)`), then call it in the consuming component; the function must deduplicate matching calls: `fetch` identical requests are memoized automatically, ORM/database functions need `React.cache`, and with Cache Components use `'use cache'` (or `'use cache: private'` if it reads `cookies()` / `headers()`; in production matching private calls reuse the result within one request without a cross-request server cache). Keep the preload function next to the consuming component

```tsx
// app/item/[id]/item.tsx
async function getItem(id: string) {
  const res = await fetch(`https://api.example.com/items/${id}`)
  return res.json()
}

export const preload = (id: string) => {
  void getItem(id)
}

// page.tsx: preload(id); const isAvailable = await checkIsAvailable(id); return isAvailable ? <Item id={id} /> : null
```

## Related

- [server-and-client-components](./server-and-client-components.md)
- [caching](./caching.md)
- [mutating-data](./mutating-data.md)
