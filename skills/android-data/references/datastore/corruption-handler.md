# CorruptionHandler / ReplaceFileCorruptionHandler

Recovery hook invoked when DataStore's `Storage` layer fails to deserialize the on-disk data. `ReplaceFileCorruptionHandler` is the standard built-in implementation that replaces corrupted data with a produced default.

## Signature / Usage

```kotlin
package androidx.datastore.core

public interface CorruptionHandler<T> {
    public suspend fun handleCorruption(ex: CorruptionException): T
}

public class CorruptionException(message: String, cause: Throwable? = null) :
    IOException(message, cause)

// androidx.datastore.core.handlers
public expect class ReplaceFileCorruptionHandler<T>(
    produceNewData: (CorruptionException) -> T
) : CorruptionHandler<T>
```

```kotlin
val dataStore: DataStore<Settings> = DataStoreFactory.create(
    serializer = SettingsSerializer,
    corruptionHandler = ReplaceFileCorruptionHandler { Settings.getDefaultInstance() },
    produceFile = { File(context.filesDir, "settings.pb") },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `handleCorruption` | `suspend (CorruptionException) -> T` | — | Returns the value DataStore should write to disk to recover from corruption. |
| `produceNewData` (`ReplaceFileCorruptionHandler`) | `(CorruptionException) -> T` | — | Produces replacement data used to overwrite the corrupted file. |

## Notes

- `handleCorruption` / `produceNewData` must not interact with any DataStore API — doing so can deadlock.
- `CorruptionException` is a subclass of `IOException` specifically for data-format corruption; it should not be thrown for transient IO or permission errors.
- If `ReplaceFileCorruptionHandler` itself throws while replacing the data, the new exception is attached as a suppressed exception to the original and rethrown.
- Without a `corruptionHandler`, a `CorruptionException` propagates to the caller of `data` / `updateData`.
- Package: `androidx.datastore.core` (`CorruptionHandler`, `CorruptionException`), `androidx.datastore.core.handlers` (`ReplaceFileCorruptionHandler`).

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [Proto/Typed DataStore (Serializer)](./proto-datastore.md)
- [DataMigration](./data-migration.md)
