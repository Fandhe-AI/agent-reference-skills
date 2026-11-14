---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useIsFetching
---

# useIsFetching

An optional hook that returns the number of queries that your application is loading or fetching in the background, for implementing app-wide loading indicators.

## Signature / Usage

```tsx
import { useIsFetching } from '@tanstack/react-query'

const isFetching = useIsFetching()
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `filters` | `Omit<QueryFilters, "fetchStatus">` | Apply query filtering criteria to narrow results |
| `queryClient` | `QueryClient` | Custom QueryClient instance; defaults to the nearest context provider |

## Returns

`number` — count of queries actively loading or fetching in the background.

## Notes

- `filters` accepts `QueryFilters` without the `fetchStatus` property
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/framework/react/reference/functions/useIsFetching.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)

## Related

- [useIsMutating](./use-is-mutating.md)
