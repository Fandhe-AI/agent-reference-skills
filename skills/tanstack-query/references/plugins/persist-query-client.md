---
source: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient
---

# persistQueryClient

Manages persistent storage of a `queryClient`'s cache across browser sessions using a configurable storage backend (`Persister`).

## Signature / Usage

```tsx
import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 1000 * 60 * 60 * 24 } }, // 24 hours
})

const persister = createSyncStoragePersister({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24,
})
```

```tsx
// React integration
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

<PersistQueryClientProvider
  client={queryClient}
  persistOptions={{ persister }}
  onSuccess={() => {
    // e.g. queryClient.resumePausedMutations()
  }}
>
  <App />
</PersistQueryClientProvider>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `queryClient` | `QueryClient` | The client whose cache is persisted |
| `persister` | `Persister` | Storage backend implementing `persistClient` / `restoreClient` / `removeClient` |
| `maxAge` | number | Max age of persisted cache; should match `gcTime` |
| `buster` | string | Cache-busting string; changing it discards outdated persisted data |

## Notes

- Set `QueryClient`'s `gcTime` to the same value or higher than `maxAge`
- Related standalone functions: `persistQueryClientSave` (manual save), `persistQueryClientSubscribe` (auto-persist on cache change, returns unsubscribe), `persistQueryClientRestore` (rehydrate saved cache)
- `PersistQueryClientProvider` replaces `QueryClientProvider` and manages subscription lifecycle, prevents race conditions during restoration, and delays query fetching until restoration completes
- Custom persisters implement the `Persister` interface (`persistClient`, `restoreClient`, `removeClient`) — e.g. an IndexedDB-backed persister for native type support beyond Web Storage's string-only model

## Related

- [createSyncStoragePersister](./create-sync-storage-persister.md)
- [createAsyncStoragePersister](./create-async-storage-persister.md)
- [createPersister](./create-persister.md)
