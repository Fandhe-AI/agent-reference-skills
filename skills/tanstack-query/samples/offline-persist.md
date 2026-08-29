---
source: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient, https://tanstack.com/query/latest/docs/framework/react/plugins/createSyncStoragePersister
---

# Persist Cache Offline

Persist a `QueryClient`'s cache to `localStorage` so data survives page reloads, using `PersistQueryClientProvider`.

```tsx
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
      onSuccess={() => {
        queryClient.resumePausedMutations()
      }}
    >
      <Todos />
    </PersistQueryClientProvider>
  )
}
```

## Notes

- `QueryClient`'s `gcTime` must be equal to or greater than `maxAge`, otherwise the cache is garbage-collected before it can be persisted.
- `PersistQueryClientProvider` replaces `QueryClientProvider` — it manages the persist/restore subscription lifecycle and delays fetching until restoration completes.
- `localStorage` requires JSON-serializable values; use `createAsyncStoragePersister` for `IndexedDB`/`AsyncStorage`-backed storage of non-JSON data.
- Bump the `buster` option to invalidate previously persisted caches after an incompatible schema change.
