---
source: https://tanstack.com/query/latest/docs/framework/react/plugins/createSyncStoragePersister
---

# createSyncStoragePersister

Creates a `Persister` that caches a `queryClient`'s data to a synchronous Web Storage backend (`localStorage` or `sessionStorage`).

## Signature / Usage

```bash
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```tsx
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

const persister = createSyncStoragePersister({ storage: window.localStorage })

persistQueryClient({ queryClient, persister })
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | `Storage` | — | `localStorage` or `sessionStorage` reference |
| `key` | string | `REACT_QUERY_OFFLINE_CACHE` | Storage key identifier |
| `throttleTime` | number | 1000 | Minimum ms between writes |
| `serialize` | function | `JSON.stringify` | Custom serialization |
| `deserialize` | function | `JSON.parse` | Custom deserialization |
| `retry` | function | — | Retry/error-recovery strategy for failed persistence |

## Notes

- Deprecated: this plugin will be removed in the next major version — migrate to `createAsyncStoragePersister`
- Use `serialize`/`deserialize` with a library like `lz-string` to compress data and work around localStorage size limits
- A predefined `removeOldestQuery` retry strategy handles storage overflow by evicting the oldest cached query

## Related

- [persistQueryClient](./persist-query-client.md)
- [createAsyncStoragePersister](./create-async-storage-persister.md)
