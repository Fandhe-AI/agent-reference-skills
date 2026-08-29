---
source: https://tanstack.com/query/latest/docs/reference/QueryClient
---

# QueryClient

The `QueryClient` manages interactions with the cache system. It enables programmatic control over query and mutation caching, data fetching, and state management without requiring React hooks.

## Signature / Usage

```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryCache` | `QueryCache` (optional) | The query cache instance this client connects to |
| `mutationCache` | `MutationCache` (optional) | The mutation cache instance this client connects to |
| `defaultOptions` | `DefaultOptions` (optional) | Default configuration for all queries and mutations, including hydration settings |

## Methods

| Name | Description |
|------|-------------|
| `query(options)` | Asynchronously fetches and caches a query; returns cached data if valid, otherwise fetches fresh data |
| `infiniteQuery(options)` | Similar to `query()` but handles infinite/paginated data; returns paginated results structure |
| `getQueryData(queryKey)` | Synchronously retrieves cached data for a specific query |
| `getQueriesData(filters)` | Synchronously retrieves cached data for multiple queries matching filters; returns array of tuples |
| `getQueryState(queryKey)` | Synchronously retrieves the complete state object of a query |
| `setQueryData(queryKey, updater)` | Synchronously updates cached data using a value or updater function (immutable operation required) |
| `setQueriesData(filters, updater)` | Synchronously updates multiple cached queries matching filters |
| `invalidateQueries(filters, options)` | Marks queries as stale and refetches active queries by default; supports `refetchType` (`'active'` \| `'inactive'` \| `'all'` \| `'none'`) |
| `refetchQueries(filters, options)` | Refetches queries matching specified criteria without invalidation |
| `cancelQueries(filters, options)` | Cancels ongoing query requests (useful for optimistic updates) |
| `removeQueries(filters)` | Removes queries from cache entirely |
| `resetQueries(filters, options)` | Resets queries to initial state; notifies subscribers and refetches active queries |
| `isFetching(filters?)` | Returns integer count of currently fetching queries |
| `isMutating(filters?)` | Returns integer count of currently fetching mutations |
| `getDefaultOptions()` | Retrieves currently configured default options |
| `setDefaultOptions(options)` | Dynamically updates global default options |
| `getQueryDefaults(queryKey)` | Retrieves defaults set for specific query keys |
| `setQueryDefaults(queryKey, options)` | Sets defaults for queries matching a key |
| `getMutationDefaults(mutationKey)` | Retrieves defaults for specific mutations |
| `setMutationDefaults(mutationKey, options)` | Sets defaults for mutations matching a key |
| `getQueryCache()` | Returns the connected query cache instance |
| `getMutationCache()` | Returns the connected mutation cache instance |
| `clear()` | Clears all connected caches and subscribers |
| `resumePausedMutations()` | Resumes mutations paused due to network disconnection |

## Notes

- `setQueryData` and similar methods are synchronous; use `query()` for asynchronous fetching
- Cache updates via `setQueryData` must follow immutable patterns; never mutate `oldData` directly
- Queries created without active observers are garbage-collected after `gcTime` (default: 5 minutes)
- Query defaults registration order matters: define generic keys first, then specific ones, so specific defaults override generic ones
- Unlike `invalidateQueries`, `refetchQueries` refetches all matching queries regardless of activity status
- Unlike `removeQueries`, `invalidateQueries` preserves queries in cache while marking them invalid

## Related

- [QueryCache](./query-cache.md)
- [MutationCache](./mutation-cache.md)
- [useQueryClient](./use-query-client.md)
