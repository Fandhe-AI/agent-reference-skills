# DataStoreFactory / MultiProcessDataStoreFactory

Generic factory objects for creating a `DataStore<T>` for any serializer/storage, either scoped to a single process or safe for cross-process access.

## Signature / Usage

```kotlin
package androidx.datastore.core

public expect object DataStoreFactory {
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

    // Android only: Direct Boot (device protected storage), since 1.2.0
    @RequiresApi(Build.VERSION_CODES.N)
    @JvmOverloads
    public fun <T> createInDeviceProtectedStorage(
        context: Context,
        fileName: String,
        serializer: Serializer<T>,
        corruptionHandler: ReplaceFileCorruptionHandler<T>? = null,
        migrations: List<DataMigration<T>> = listOf(),
        scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
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
| `scope` | `CoroutineScope` | `CoroutineScope(ioDispatcher() + SupervisorJob())` (common `storage` overload); `Dispatchers.IO + SupervisorJob()` on JVM/Android | Scope for IO operations and transform functions. `ioDispatcher()` is an internal expect function whose JVM/Android actual is `Dispatchers.IO`. |
| `produceFile` | `() -> File` | — | Must consistently return the same file path across calls. |
| `context` (`createInDeviceProtectedStorage`) | `Context` | — | The DeviceProtectedStorageContext used to create the file DataStore acts on. |
| `fileName` (`createInDeviceProtectedStorage`) | `String` | — | File name relative to `Context.createDeviceProtectedStorageContext().filesDir`; created in the `datastore/` subdirectory. |

## Notes

- Never create more than one `DataStore` instance for the same file in the same process; with `MultiProcessDataStoreFactory`, no two instances should act on the same file at the same time even across processes.
- Do not mix `DataStoreFactory` (single-process) and `MultiProcessDataStoreFactory` for the same underlying file.
- `MultiProcessDataStoreFactory` is used for DataStore instances shared across process boundaries (e.g. app + `android:process=":my_process_id"` service).
- `createInDeviceProtectedStorage` always creates the DataStore in device encrypted storage, under the `datastore/` subdirectory. The file comes from `Context.deviceProtectedDataStoreFile(fileName)`, i.e. `File(deviceProtectedContext.filesDir, "datastore/$fileName")`; a user encrypted context is converted via `createDeviceProtectedStorageContext()`.
- Using a regular DataStore during Direct Boot fails, and the error message points to `DataStoreFactory.createInDeviceProtectedStorage()`.
- The common (`commonMain`, 1.2.1 source) `storage`-based `create` overload uses `ioDispatcher()`, an internal expect function that is `Dispatchers.IO` on JVM/Android, so its default scope is equivalent to `Dispatchers.IO + SupervisorJob()`.
- 1.2.0 added `PreferencesFileSerializer`, a `Serializer` for use with `FileStorage`.
- Package: `androidx.datastore.core`.

## Related

- [DataStore](./datastore.md)
- [preferencesDataStore / PreferenceDataStoreFactory](./preferences-datastore.md)
- [Proto/Typed DataStore (Serializer)](./proto-datastore.md)
- [CorruptionHandler](./corruption-handler.md)
