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
| `filters` | `QueryFilters` | Apply query filtering criteria to narrow results |
| `queryClient` | `QueryClient` | Custom QueryClient instance; defaults to the nearest context provider |

## Returns

`number` — count of queries actively loading or fetching in the background.

## Related

- [useIsMutating](./use-is-mutating.md)
