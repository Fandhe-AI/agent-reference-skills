# DataStoreFactory / MultiProcessDataStoreFactory

Generic factory objects for creating a `DataStore<T>` for any serializer/storage, either scoped to a single process or safe for cross-process access.

## Signature / Usage

```kotlin
package androidx.datastore.core

public expect object DataStoreFactory {
    // commonMain / JVM actual: storage-based
    public fun <T> create(
        storage: Storage<T>,
        corruptionHandler: ReplaceFileCorruptionHandler<T>? = null,
        migrations: List<DataMigration<T>> = listOf(),
        scope: CoroutineScope = CoroutineScope(ioDispatcher() + SupervisorJob()),
    ): DataStore<T>

    // JVM/Android only: serializer + file-based
    public fun <T> create(
        serializer: Serializer<T>,
        corruptionHandler: ReplaceFileCorruptionHandler<T>? = null,
        migrations: List<DataMigration<T>> = listOf(),
        scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
        produceFile: () -> File,
    ): DataStore<T>
}

// androidx.datastore.core (Android) — cross-process safe
public object MultiProcessDataStoreFactory {
    public fun <T> create(
        serializer: Serializer<T>,
        corruptionHandler: ReplaceFileCorruptionHandler<T>? = null,
        migrations: List<DataMigration<T>> = listOf(),
        scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
        produceFile: () -> File,
    ): DataStore<T>

    public fun <T> create(
        storage: Storage<T>,
        corruptionHandler: ReplaceFileCorruptionHandler<T>? = null,
        migrations: List<DataMigration<T>> = listOf(),
        scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
    ): DataStore<T>
}
```

```kotlin
val dataStore: DataStore<Settings> = DataStoreFactory.create(
    serializer = SettingsSerializer,
    corruptionHandler = ReplaceFileCorruptionHandler { Settings.getDefaultInstance() },
    produceFile = { File(context.filesDir, "settings.pb") },
)

val multiProcessDataStore = MultiProcessDataStoreFactory.create(
    serializer = TimeSerializer,
    produceFile = { File(context.filesDir, "time.pb") },
    corruptionHandler = null,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `storage` | `Storage<T>` | — | Low-level storage implementation defining the on-disk location and access mechanism. |
| `serializer` | `Serializer<T>` | — | Serializer used to read/write `T`; used together with `produceFile` instead of `storage`. |
| `corruptionHandler` | `ReplaceFileCorruptionHandler<T>?` | `null` | Invoked when a `CorruptionException` is thrown while deserializing data. |
| `migrations` | `List<DataMigration<T>>` | `listOf()` | Migrations executed, in order, before any data access. Must be idempotent. |
| `scope` | `CoroutineScope` | `Dispatchers.IO + SupervisorJob()` | Scope for IO operations and transform functions. |
| `produceFile` | `() -> File` | — | Must consistently return the same file path across calls. |

## Notes

- Never create more than one `DataStore` instance for the same file in the same process; with `MultiProcessDataStoreFactory`, no two instances should act on the same file at the same time even across processes.
- Do not mix `DataStoreFactory` (single-process) and `MultiProcessDataStoreFactory` for the same underlying file.
- `MultiProcessDataStoreFactory` is used for DataStore instances shared across process boundaries (e.g. app + `android:process=":my_process_id"` service).
- Package: `androidx.datastore.core`.

## Related

- [DataStore](./datastore.md)
- [preferencesDataStore / PreferenceDataStoreFactory](./preferences-datastore.md)
- [Proto/Typed DataStore (Serializer)](./proto-datastore.md)
- [CorruptionHandler](./corruption-handler.md)
