# Server Component Data Fetching with Caching

Fetch data directly in an async Server Component and control `fetch` caching with `cache` / `next.revalidate` / `next.tags`.

```tsx
// app/blog/page.tsx
export default async function Page() {
  // Cached indefinitely until manually revalidated
  const cached = await fetch('https://api.vercel.app/blog', {
    cache: 'force-cache',
  })

  // Revalidated on-demand via a matching tag
  const tagged = await fetch('https://api.vercel.app/blog', {
    next: { tags: ['posts'] },
  })

  // Revalidated at most once every 3600 seconds
  const timed = await fetch('https://api.vercel.app/blog', {
    next: { revalidate: 3600 },
  })

  const posts = await cached.json()

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

- `fetch` requests are **not** cached by default; opt in explicitly with `cache: 'force-cache'` or `next.revalidate`.
- Identical `fetch` calls within the same render pass are automatically memoized, so fetching in the component that needs the data (instead of prop-drilling) is safe.
- Use `next: { tags: [...] }` together with `revalidateTag()` for on-demand invalidation (see `on-demand-revalidation.md`).
- For non-`fetch` data sources (ORM/database), wrap the function with React's `cache()` for request-level memoization, or `unstable_cache()` for time/tag-based caching.
