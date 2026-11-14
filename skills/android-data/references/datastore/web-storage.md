# DataStore web storage (WebSessionStorage / WebLocalStorage / WebOpfsStorage)

KMP web storage options added in DataStore 1.3.0 for Kotlin/Wasm and JS targets.

## Signature / Usage

Adapted (not in the official docs): the official release notes have no code sample for the web storage APIs, so the fence below quotes the release-note text instead of a signature.

```text
sessionStorage (WebSessionStorage): Allows temporary data persistence within a single browser tab.
localStorage (WebLocalStorage): Enables persistent storage with cross-tab event notifications and synchronization.
Origin Private File System (WebOpfsStorage): Provides file-system support via OPFS, featuring asynchronous file I/O and cross-tab notifications.
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WebSessionStorage` | storage | — | Data lives within a single browser tab. |
| `WebLocalStorage` | storage | — | Persistent, with cross-tab event notifications and synchronization. |
| `WebOpfsStorage` | storage | — | OPFS-based; asynchronous file I/O, cross-tab notifications via the BroadcastChannel API, exclusive write access via the Web Locks API. |

## Notes

- 1.3.0-alpha05 added WASM/JS support via localStorage (cross-tab notifications, unlike the existing sessionStorage implementation). 1.3.0-alpha08 added OPFS and the explicit `WebLocalStorage` / `WebSessionStorage` APIs.
- 1.3.0-alpha04 fixed malformed binary data on Web by replacing UTF-8 string handling with Base64 encoding.
- Android-only DataStore pages in this category do not apply to web targets.
- Source: https://developer.android.com/jetpack/androidx/releases/datastore (1.3.0, alpha04, alpha05, alpha08 sections, retrieved 2026-11-14)

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
