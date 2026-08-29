---
source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr
---

# Server Rendering & Hydration

Three steps: prefetch on the server, dehydrate into serializable state, hydrate into a client cache via `<HydrationBoundary>`.

## Signature / Usage

App setup (create `queryClient` in React state, per request):

```tsx
const [queryClient] = React.useState(
  () => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }),
)
```

Full Next.js pages router example:

```tsx
// pages/posts.tsx
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.query({ queryKey: ['posts'], queryFn: getPosts }).catch(noop)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

function Posts() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

Quick-start alternative with `initialData` (no hydration API):

```tsx
export async function getServerSideProps() {
  const posts = await getPosts()
  return { props: { posts } }
}

function Posts(props) {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts, initialData: props.posts })
}
```

## Notes

- **Never** create the `queryClient` at file/module scope for SSR — it must be created per request/component instance to avoid leaking data between users.
- `initialData` never overwrites existing cache data even if fresher — prefer the full hydration flow for repeated navigation.
- `dehydrate(...)` only includes **successful** queries by default; use `shouldDehydrateQuery` to include failed ones.
- Custom SSR setups must escape serialized state to avoid XSS (`JSON.stringify` alone is unsafe) — use `serialize-javascript` or `devalue`.
- Server `gcTime` defaults to `Infinity` (disables manual GC; memory clears when the request ends). Avoid `gcTime: 0` — it can cause hydration errors; use `2 * 1000` minimum if you need a short value.
- For advanced patterns (streaming, Server Components, Next.js app router), see [advanced-ssr.md](./advanced-ssr.md).

## Related

- [advanced-ssr.md](./advanced-ssr.md)
- [prefetching.md](./prefetching.md)
- [request-waterfalls.md](./request-waterfalls.md)
