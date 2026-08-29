---
source: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
---

# Advanced Server Rendering

React Query with streaming, React Server Components, and the Next.js app router.

## Signature / Usage

Server Component prefetch + Client Component consumption:

```tsx
// app/posts/page.tsx (Server Component)
export default async function PostsPage() {
  const queryClient = new QueryClient()
  await queryClient.query({ queryKey: ['posts'], queryFn: getPosts }).catch(noop)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

```tsx
// app/posts/posts.tsx (Client Component)
'use client'
export default function Posts() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: () => getPosts() })
}
```

Streaming pending queries (v5.40+, no `await`):

```tsx
export default function PostsPage() {
  const queryClient = getQueryClient()
  void queryClient.query({ queryKey: ['posts'], queryFn: getPosts }).catch(noop)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

```tsx
'use client'
export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })
}
```

## Notes

- Server Components are a "loader phase" that always runs on the server, even during page transitions; think of them as another framework loader for prefetching.
- Do **not** render the result of `queryClient.query` directly inside a Server Component and pass to a Client Component — treat Server Components purely as a prefetch mechanism to avoid data-ownership desync.
- To dehydrate pending (unawaited) queries for streaming, set `dehydrate.shouldDehydrateQuery` to also include `query.state.status === 'pending'`, and consume with `useSuspenseQuery` on the client.
- **Do not use Next.js Server Actions to fetch data in a `queryFn`** — when called from the client they run serially (not in parallel), which conflicts with React Query's fetch/refetch model and can leave queries stuck pending or fail with a "plain objects only" error. Server Actions remain fine for **mutations**.
- `@tanstack/react-query-next-experimental`'s `ReactQueryStreamedHydration` allows skipping prefetching entirely (fetch inside `useSuspenseQuery` in a Client Component) at the cost of flattening waterfalls only on initial load, not client-side navigation.

## Related

- [ssr.md](./ssr.md)
- [suspense.md](./suspense.md)
