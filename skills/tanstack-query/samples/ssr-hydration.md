---
source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr, https://tanstack.com/query/latest/docs/framework/react/reference/hydration
---

# SSR with HydrationBoundary

Prefetch on the server, dehydrate the cache, and hydrate it into the client `QueryClient` via `HydrationBoundary`.

```tsx
// pages/posts.tsx
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.query({ queryKey: ['posts'], queryFn: getPosts })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function Posts() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
  return <ul>{data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

## Notes

- Create the `QueryClient` per request (never at module scope) to avoid leaking cached data between users.
- `dehydrate(queryClient)` only includes successful queries by default; pass `shouldDehydrateQuery` to also include errored ones.
- Server `gcTime` defaults to `Infinity`; avoid `gcTime: 0`, which can cause hydration errors — use at least `2 * 1000` if a short value is needed.
- Custom serialization of `dehydratedState` (e.g. embedding it in HTML) must escape it — `JSON.stringify` alone is not XSS-safe; use `serialize-javascript` or `devalue`.
