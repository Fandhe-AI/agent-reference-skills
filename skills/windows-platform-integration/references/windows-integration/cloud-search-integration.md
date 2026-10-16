# Cloud files provider integration with Windows Search

Lets cloud storage providers contribute results from remote storage to File Explorer and Windows Search by registering a search handler for their sync root. Supported on Windows 11, version 24H2 and later on Copilot+ PCs and AI-enabled Cloud PCs.

## Signature / Usage

```text
1. Set the SearchHandlerFactory registry value under the provider's sync root registry key
   to the CLSID of a COM local server.
2. Implement IStorageProviderSearchHandlerFactory in that local server.
3. Return an IStorageProviderSearchHandler implementation from the factory.
```

When Windows searches an eligible sync root, it calls `IStorageProviderSearchHandler.Find` with the search query options.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SearchHandlerFactory` | registry value | Under the sync root registry key; holds the CLSID of the COM local server. |
| `IStorageProviderSearchHandlerFactory` | interface (Windows.Storage.Provider) | Implemented in the local server; returns the search handler. |
| `IStorageProviderSearchHandler` | interface (Windows.Storage.Provider) | Provider implementation; `Find` receives the query options. |

## Notes

- Registering a sync root with the Cloud Files API does not automatically enable cloud files search; only providers that register and implement the search handler can contribute cloud results.
- Registration requirements and Cloud Sync Engine implementation are described in "Build a Cloud Sync Engine that supports placeholder files" (Win32 `cfapi`, section "Cloud files search").

## Related

- [Search providers](./search-providers.md)
- [Official docs: Cloud search integration](https://learn.microsoft.com/en-us/windows/apps/develop/search/cloud-search-integration)
