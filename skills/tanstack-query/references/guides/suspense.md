---
source: https://tanstack.com/query/latest/docs/framework/react/guides/suspense
---

# Suspense

`useSuspenseQuery`, `useSuspenseInfiniteQuery`, and `useSuspenseQueries` integrate with React Suspense/Error Boundaries.

## Signature / Usage

```ts
const { data: post } = useSuspenseQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPost(postId),
})
```

## Notes

- `data` is guaranteed non-`undefined` in TypeScript; loading/error states are handled by `<Suspense>` and Error Boundaries instead of `status`/`error` fields.
- Cannot conditionally `enable`/`disable` a suspense query, and `placeholderData` is unavailable.
- Default `throwOnError` is `(error, query) => typeof query.state.data === 'undefined'` — only throws to the nearest boundary when there's no other data to show; throw manually for full always-throw behavior.
- Reset thrown errors on retry with `QueryErrorResetBoundary` or `useQueryErrorResetBoundary`.
- Works as "fetch-on-render" out of the box; for "render-as-you-fetch," prefetch on routing/interaction callbacks (see [prefetching.md](./prefetching.md)).
- Query cancellation does not work with these Suspense hooks (see [query-cancellation.md](./query-cancellation.md)).

## Related

- [prefetching.md](./prefetching.md)
- [advanced-ssr.md](./advanced-ssr.md)
- [query-cancellation.md](./query-cancellation.md)
