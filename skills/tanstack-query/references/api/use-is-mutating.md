---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useIsMutating
---

# useIsMutating

An optional hook that provides the count of mutations currently being fetched by the application, useful for app-wide loading indicators.

## Signature / Usage

```tsx
import { useIsMutating } from '@tanstack/react-query'

const isMutating = useIsMutating()
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `filters` | `MutationFilters` | Apply mutation filters to narrow results |
| `queryClient` | `QueryClient` | Custom QueryClient instance; defaults to the nearest context provider |

## Returns

`number` — the quantity of active mutations currently in flight.

## Related

- [useIsFetching](./use-is-fetching.md)
- [useMutationState](./use-mutation-state.md)
