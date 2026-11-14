# DataStore.Builder

`DataStore.Builder<T>` is the modern, scalable alternative to `DataStoreFactory`, introduced in DataStore 1.3.0-alpha07 and public in 1.3.0. It takes a `CoroutineContext` instead of a `CoroutineScope`.

## Signature / Usage

Adapted (not in the official docs): the signature below is taken from the DataStore 1.3.0 sources jar (`datastore-core-android-1.3.0-sources.jar`, `commonMain/androidx/datastore/core/DataStore.kt`; KDoc stripped, `Builder` is nested in `DataStore`); the usage example is the KDoc example in that source. The release notes themselves have no code sample.

```kotlin
package androidx.datastore.core

public expect interface DataStore<T> {
    public class Builder<T>(storage: Storage<T>, context: CoroutineContext) {
        public fun setCorruptionHandler(handler: CorruptionHandler<T>): Builder<T>
        public fun addMigrations(migrations: List<DataMigration<T>>): Builder<T>
        public fun build(): DataStore<T>
    }
}
```

```kotlin
val dataStore = DataStore.Builder<Settings>(MyStorage(), Dispatchers.IO + SupervisorJob())
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
- Signature source (release artifact, not a branch): https://dl.google.com/android/maven2/androidx/datastore/datastore-core-android/1.3.0/datastore-core-android-1.3.0-sources.jar (retrieved 2026-11-14); the Android actual `DataStore.android.kt` adds tracing internals not shown here.
- Source: https://developer.android.com/jetpack/androidx/releases/datastore (1.3.0 and 1.3.0-alpha07 sections, retrieved 2026-11-14)

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [CorruptionHandler](./corruption-handler.md)
