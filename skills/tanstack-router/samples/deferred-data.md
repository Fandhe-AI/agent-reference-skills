---
source: https://tanstack.com/router/latest/docs/framework/react/guide/deferred-data-loading
---

# Deferred Data Loading with `Await`

Return fast data awaited and slow data as an unresolved promise from `loader`, then stream the slow part in with `Await`.

```tsx
// src/routes/posts.$postId.tsx
import { createFileRoute, Await } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async () => {
    const slowDataPromise = fetchSlowData() // not awaited
    const fastData = await fetchFastData()
    return { fastData, deferredSlowData: slowDataPromise }
  },
  component: PostIdComponent,
})

function PostIdComponent() {
  const { fastData, deferredSlowData } = Route.useLoaderData()

  return (
    <div>
      <div>{fastData}</div>
      <Await promise={deferredSlowData} fallback={<div>Loading...</div>}>
        {(data) => <div>{data}</div>}
      </Await>
    </div>
  )
}
```

## Notes

- `Await` triggers the nearest suspense boundary until the promise resolves; a rejection throws the serialized error to the nearest error boundary.
- In React 19, `use(deferredSlowData)` can replace `<Await>`.
- With an external cache like TanStack Query, prefer `queryClient.prefetchQuery` (fire-and-forget) plus `useSuspenseQuery` instead of `defer`/`Await` — see the `query-integration.md` sample.
- Streaming SSR of deferred promises requires the streaming server entry described in the `basic-ssr.md` sample.
