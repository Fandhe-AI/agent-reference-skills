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
| `filters` | `Omit<MutationFilters, "status">` | Apply mutation filters to narrow results |
| `queryClient` | `QueryClient` | Custom QueryClient instance; defaults to the nearest context provider |

## Returns

`number` — the quantity of active mutations currently in flight.

## Notes

- `filters` accepts `MutationFilters` without the `status` property
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/framework/react/reference/functions/useIsMutating.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)

## Related

- [useIsFetching](./use-is-fetching.md)
- [useMutationState](./use-mutation-state.md)
