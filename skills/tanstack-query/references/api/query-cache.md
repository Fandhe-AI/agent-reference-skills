---
source: https://tanstack.com/query/latest/docs/reference/QueryCache
---

# QueryCache

The `QueryCache` serves as the storage mechanism for TanStack Query, maintaining all data, metadata, and query state. Direct interaction is discouraged; instead, use `QueryClient` to access cache functionality.

## Signature / Usage

```tsx
import { QueryCache } from '@tanstack/react-query'

const queryCache = new QueryCache({
  onError: (error, query) => {
    console.log(error)
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onError` | `(error: unknown, query: Query) => void` (optional) | Executes when a query encounters an error |
| `onSuccess` | `(data: unknown, query: Query) => void` (optional) | Executes when a query succeeds |
| `onSettled` | `(data: unknown \| undefined, error: unknown \| null, query: Query) => void` (optional) | Executes when a query resolves (success or error) |

## Methods

| Name | Description |
|------|-------------|
| `find(filters)` | Synchronously retrieves a single query instance matching `filters: QueryFilters` (requires `queryKey`). Returns `Query \| undefined` |
| `findAll(filters?)` | Synchronously retrieves all query instances partially matching filters. Returns `Query[]` (empty array if no matches) |
| `subscribe(callback)` | Subscribes to cache updates via `callback: (event: QueryCacheNotifyEvent) => void`; returns an unsubscribe function |
| `clear()` | Clears entire cache and reinitializes |

## Notes

- These advanced methods are not typically needed for most applications, but help in edge cases requiring detailed query metadata

## Related

- [QueryClient](./query-client.md)
- [MutationCache](./mutation-cache.md)
