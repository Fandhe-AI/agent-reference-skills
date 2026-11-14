# DataStore web storage (WebSessionStorage / WebLocalStorage / WebOpfsStorage)

KMP web storage options added in DataStore 1.3.0 for Kotlin/Wasm and JS targets.

## Signature / Usage

Adapted (not in the official docs): the signatures below are the class declarations from the DataStore 1.3.0 sources jar (`datastore-core-okio-1.3.0-sources.jar`, `webMain/androidx/datastore/core/okio/WebStorage.web.kt`; bodies and KDoc elided); the usage is composed from those constructors and the `DataStore.Builder` signature. The release notes themselves have no code sample.

```kotlin
package androidx.datastore.core.okio

public class WebSessionStorage<T>(serializer: OkioSerializer<T>, name: String) : Storage<T>
public class WebLocalStorage<T>(serializer: OkioSerializer<T>, name: String) : Storage<T>
public class WebOpfsStorage<T>(serializer: OkioSerializer<T>, private val name: String) : Storage<T>
```

```kotlin
val dataStore = DataStore.Builder<Settings>(
    WebLocalStorage(SettingsOkioSerializer, "settings"),
    Dispatchers.Default + SupervisorJob(),
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WebSessionStorage<T>(serializer, name)` | `Storage<T>` | — | Data lives within a single browser tab. |
| `WebLocalStorage<T>(serializer, name)` | `Storage<T>` | — | Persistent, with cross-tab event notifications and synchronization. |
| `WebOpfsStorage<T>(serializer, name)` | `Storage<T>` | — | OPFS-based; asynchronous file I/O, cross-tab notifications via the BroadcastChannel API, exclusive write access via the Web Locks API. |

## Notes

- 1.3.0-alpha05 added WASM/JS support via localStorage (cross-tab notifications, unlike the existing sessionStorage implementation). 1.3.0-alpha08 added OPFS and the explicit `WebLocalStorage` / `WebSessionStorage` APIs.
- 1.3.0-alpha04 fixed malformed binary data on Web by replacing UTF-8 string handling with Base64 encoding.
- Android-only DataStore pages in this category do not apply to web targets.
- Signature source (release artifact, not a branch): https://dl.google.com/android/maven2/androidx/datastore/datastore-core-okio/1.3.0/datastore-core-okio-1.3.0-sources.jar (retrieved 2026-11-14)
- Source: https://developer.android.com/jetpack/androidx/releases/datastore (1.3.0, alpha04, alpha05, alpha08 sections, retrieved 2026-11-14)

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
