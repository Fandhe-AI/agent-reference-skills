# Streaming with Suspense

Send static page content immediately and stream in a slower async component once it resolves, using React `<Suspense>`.

```tsx
// app/blog/page.tsx
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'

export default function BlogPage() {
  return (
    <div>
      {/* Sent to the client immediately */}
      <header>
        <h1>Welcome to the Blog</h1>
      </header>
      <main>
        {/* Streamed in once BlogList's data resolves */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  )
}
```

```tsx
// components/BlogList.tsx
export default async function BlogList() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return (
    <ul>
      {posts.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## Notes

- A `loading.tsx` file streams the **whole page**; a manual `<Suspense>` boundary streams only the wrapped component, letting the rest of the page render instantly.
- The fallback is prefetched and part of the static shell, so it appears with no network round-trip.
- Multiple sibling `<Suspense>` boundaries stream independently — a slow boundary does not block a faster one from resolving first.
- A `200` status code is always sent for the initial streamed response; errors inside a boundary are instead handled by a nested `error.tsx`.
