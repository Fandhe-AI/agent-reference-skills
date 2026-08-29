---
source: https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data
---

# Initial Query Data

Prepopulate a query's cache so it never shows a loading state, via `initialData`.

## Signature / Usage

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
})
```

With freshness timestamp:

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
  staleTime: 60 * 1000,
  initialDataUpdatedAt: initialTodosUpdatedTimestamp, // e.g. 1608412420052
})
```

Function form (executed once):

```tsx
useQuery({ queryKey: ['todos'], queryFn: () => fetch('/todos'), initialData: () => getExpensiveTodos() })
```

From another query's cache:

```tsx
useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => fetch('/todos'),
  initialData: () => queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initialData` | `T \| (() => T \| undefined)` | Persisted directly into the cache |
| `initialDataUpdatedAt` | `number \| (() => number \| undefined)` | JS timestamp (ms) of when `initialData` was last updated |

## Notes

- `initialData` is **persisted to the cache** — do not use it for partial/placeholder data; use `placeholderData` instead.
- With no `staleTime` (default `0`), `initialData` triggers an immediate background refetch on mount.
- `initialDataUpdatedAt` lets `staleTime` decide correctly whether stale `initialData` should refetch.

## Related

- [placeholder-query-data.md](./placeholder-query-data.md)
- [important-defaults.md](./important-defaults.md)
