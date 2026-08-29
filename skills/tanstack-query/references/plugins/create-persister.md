---
source: https://tanstack.com/query/latest/docs/framework/react/plugins/createPersister
---

# experimental_createQueryPersister (createPersister, Experimental)

Enables per-query persistence, caching individual queries to storage rather than persisting the entire `QueryClient`.

## Signature / Usage

```bash
npm install @tanstack/query-persist-client-core
```

```tsx
import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core'

const persister = experimental_createQueryPersister({
  storage: window.localStorage,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
})

useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  persister: persister.persisterFn,
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | storage backend | — | Persistence target |
| `maxAge` | number | 24 hours | Max age of a persisted entry |
| `prefix` | string | — | Key prefix for stored entries |
| `serialize` / `deserialize` | function | — | Custom (de)serialization |
| `buster` | string | — | Cache-busting string |
| `refetchOnRestore` | boolean | — | Whether to refetch immediately after restoring |

## Returned Utilities

| Name | Description |
| --- | --- |
| `persistQueryByKey()` | Manually persist a specific query |
| `retrieveQuery()` | Fetch persisted query data by hash |
| `persisterGc()` | Clean up expired or corrupted entries |
| `restoreQueries()` | Restore multiple queries with optional filtering |
| `removeQueries()` | Remove persisted queries from storage |

## Notes

- Also included in `@tanstack/react-persist-client`
- Wraps `queryFn` as a caching layer between the query and the network; restoration is lazy (on first use of the query)
- Respects `staleTime` and refetches immediately if restored data is stale
- Defaults `networkMode` to `'offlineFirst'` so restoration works without network connectivity
- `queryClient.setQueryData()` writes are not persisted — optimistic updates are lost if the page refreshes before invalidation

## Related

- [persistQueryClient](./persist-query-client.md)
