---
source: https://tanstack.com/router/latest/docs/framework/react/guide/deferred-data-loading
---

# Deferred Data Loading

Render critical data immediately while slower, non-critical loader data resolves in the background (or streams from the server), via unresolved promises and the `Await` component.

## Signature / Usage

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
  const { deferredSlowData, fastData } = Route.useLoaderData()

  return (
    <Await promise={deferredSlowData} fallback={<div>Loading...</div>}>
      {(data) => <div>{data}</div>}
    </Await>
  )
}
```

## Notes

- In React 19 you can use the `use()` hook instead of `Await`.
- With an external cache like TanStack Query, don't use `defer`/`Await` — instead call `queryClient.prefetchQuery` (fire-and-forget) for slow data and `await queryClient.ensureQueryData` for fast data in `loader`, then read via `useSuspenseQuery` in the component.
- `Await` triggers the nearest suspense boundary until resolved; a rejected promise throws the serialized error to the nearest error boundary.
- Streamed promises follow the same lifecycle as their associated loader data and can be preloaded.
- SSR streaming requires a server configured for it — see the SSR guide's "Streaming SSR" section.

## Related

- [Data Loading](./data-loading.md)
- [External Data Loading](./external-data-loading.md)
- [SSR](./ssr.md)
