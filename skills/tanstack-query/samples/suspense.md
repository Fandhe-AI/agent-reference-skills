---
source: https://tanstack.com/query/latest/docs/framework/react/guides/suspense, https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery
---

# Suspense with Error Reset Boundary

Use `useSuspenseQuery` with React `Suspense`/`ErrorBoundary`, resetting thrown errors via `QueryErrorResetBoundary`.

```tsx
import { QueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

function Post({ postId }: { postId: string }) {
  const { data: post } = useSuspenseQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  })

  return <h1>{post.title}</h1>
}

function PostPage({ postId }: { postId: string }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}
        >
          <Suspense fallback={<span>Loading...</span>}>
            <Post postId={postId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
```

## Notes

- `data` from `useSuspenseQuery` is guaranteed non-`undefined`; loading/error states are handled by `<Suspense>`/`<ErrorBoundary>` instead of `status`/`error`.
- Suspense queries cannot be conditionally `enabled`, and `placeholderData` is unavailable.
- Without `QueryErrorResetBoundary`, an error boundary that already caught an error won't retry the query when its `reset()` is called — errors stay thrown until the page reloads.
- Query cancellation does not work with `useSuspenseQuery`/`useSuspenseInfiniteQuery`.
