# DataStore.Builder

`DataStore.Builder<T>` is the modern, scalable alternative to `DataStoreFactory`, introduced in DataStore 1.3.0-alpha07 and public in 1.3.0. It takes a `CoroutineContext` instead of a `CoroutineScope`.

## Signature / Usage

Adapted (not in the official docs): the signature below is taken from the androidx source at commit `07d39ac` (androidx-main, 2026-09-21; KDoc stripped); the usage example is the KDoc example in that source. The release notes themselves have no code sample.

```kotlin
package androidx.datastore.core

public class Builder<T>(storage: Storage<T>, context: CoroutineContext) {
    public fun setCorruptionHandler(handler: CorruptionHandler<T>): Builder<T>
    public fun addMigrations(migrations: List<DataMigration<T>>): Builder<T>
    public fun build(): DataStore<T>
}
```

```kotlin
val dataStore = Builder<Settings>(MyStorage(), Dispatchers.IO + SupervisorJob())
.setCorruptionHandler(MyCorruptionHandler())
.build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setCorruptionHandler` | `(CorruptionHandler<T>) -> Builder<T>` | `ReThrowCorruptionHandler` | Invoked if the `Storage` layer throws a `CorruptionException`. |
| `addMigrations` | `(List<DataMigration<T>>) -> Builder<T>` | — | Migrations run in the order added, before any data is returned. |
| `build` | `() -> DataStore<T>` | — | Validates the configuration and builds the `DataStore`. |
| `storage` (constructor) | `Storage<T>` | — | Storage implementation. |
| `CoroutineContext` | `CoroutineContext` | — | Execution behavior (e.g. a Dispatcher) without binding DataStore to the lifecycle of the caller's scope. Should contain an application-scoped `Job` (not `viewModelScope`); without a `Job`, DataStore creates one implicitly and it must be managed manually. |

## Notes

- The release notes recommend migrating from `DataStoreFactory` to `DataStore.Builder`: requiring a `CoroutineContext` keeps DataStore operations from being bound to short-lived UI lifecycles (e.g. `viewModelScope`), preventing premature cancellation and potential data loss.
- `DataStore.Builder`, `ReThrowCorruptionHandler` and `InterProcessCoordinator` were made public in 1.3.0.
- 1.3.0-alpha04 added a utility `copy` function for updating data in Preferences DataStore.
- Signature source (androidx-main at `07d39ac`, not a release tag, so it may differ from 1.3.0 stable): https://github.com/androidx/androidx/blob/07d39ac8361d28a4504479aa7eb897ba825aeec3/datastore/datastore-core/src/commonMain/kotlin/androidx/datastore/core/DataStore.kt
- Source: https://developer.android.com/jetpack/androidx/releases/datastore (1.3.0 and 1.3.0-alpha07 sections, retrieved 2026-11-14)

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [CorruptionHandler](./corruption-handler.md)
