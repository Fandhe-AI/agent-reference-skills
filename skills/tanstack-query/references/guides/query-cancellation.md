---
source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation
---

# Query Cancellation

TanStack Query passes each `queryFn` an `AbortSignal`, aborted when a query becomes out-of-date or inactive.

## Signature / Usage

```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const resp = await fetch('/todos', { signal })
    return resp.json()
  },
})
```

Manual cancellation:

```tsx
queryClient.cancelQueries({ queryKey: ['todos'] })
```

Cancel options:

```tsx
await queryClient.cancelQueries({ queryKey: ['posts'] }, { silent: true })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `silent` | `boolean` | Suppress `CancelledError` propagation to observers; default `false` |
| `revert` | `boolean` | Restore state from before the in-flight fetch; default `true` |

## Notes

- By default, unmounted/unused queries are **not** cancelled — the promise still resolves and populates the cache.
- Consuming `signal` means the promise (and query) will be cancelled and reverted to its previous state when needed.
- Cancellation does not work with Suspense hooks: `useSuspenseQuery`, `useSuspenseQueries`, `useSuspenseInfiniteQuery`.

## Related

- [query-functions.md](./query-functions.md)
- [scroll-restoration.md](./scroll-restoration.md)
