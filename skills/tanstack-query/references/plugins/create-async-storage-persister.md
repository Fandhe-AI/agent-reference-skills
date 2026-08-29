---
source: https://tanstack.com/query/latest/docs/framework/react/plugins/createAsyncStoragePersister
---

# createAsyncStoragePersister

Creates a `Persister` that caches a `queryClient`'s data to an async storage backend, such as React Native's `AsyncStorage` or browser `localStorage`.

## Signature / Usage

```bash
npm install @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```tsx
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

const persister = createAsyncStoragePersister({ storage: AsyncStorage })

persistQueryClient({ queryClient, persister })
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | `AsyncStorage` | — | Required storage implementation with get/set/remove operations |
| `key` | string | `REACT_QUERY_OFFLINE_CACHE` | Cache storage identifier |
| `throttleTime` | number | 1000 | Disk write delay in ms |
| `serialize` | function | `JSON.stringify` | Data encoding function |
| `deserialize` | function | `JSON.parse` | Data decoding function |
| `retry` | function | — | Async error-recovery strategy |

## Notes

- Storages that read/write synchronously, like `window.localStorage`, also adhere to the `AsyncStorage` interface and work with this persister
- Supports the same predefined retry handlers as the sync storage persister

## Related

- [persistQueryClient](./persist-query-client.md)
- [createSyncStoragePersister](./create-sync-storage-persister.md)
