# dataStore / Serializer (Proto & Typed DataStore)

Type-safe DataStore for a custom serializable object `T` (e.g. a generated Protocol Buffers message, or a `kotlinx.serialization` data class). Requires implementing `Serializer<T>` and reading through the `dataStore` property delegate.

## Signature / Usage

```kotlin
package androidx.datastore.core

public interface Serializer<T> {
    public val defaultValue: T
    public suspend fun readFrom(input: InputStream): T
    public suspend fun writeTo(t: T, output: OutputStream)
}

// androidx.datastore — property delegate
public fun <T> dataStore(
    fileName: String,
    serializer: Serializer<T>,
    corruptionHandler: ReplaceFileCorruptionHandler<T>? = null,
    produceMigrations: (Context) -> List<DataMigration<T>> = { listOf() },
    scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
): ReadOnlyProperty<Context, DataStore<T>>
```

```kotlin
object SettingsSerializer : Serializer<Settings> {
    override val defaultValue: Settings = Settings.getDefaultInstance()

    override suspend fun readFrom(input: InputStream): Settings =
        try {
            Settings.parseFrom(input)
        } catch (exception: InvalidProtocolBufferException) {
            throw CorruptionException("Cannot read proto.", exception)
        }

    override suspend fun writeTo(t: Settings, output: OutputStream) = t.writeTo(output)
}

val Context.dataStore: DataStore<Settings> by dataStore(
    fileName = "settings.pb",
    serializer = SettingsSerializer,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `T` | — | Value returned when no data exists on disk yet. |
| `readFrom` | `suspend (InputStream) -> T` | — | Deserializes `T` from the stream; must throw `CorruptionException` on unreadable/corrupt data. |
| `writeTo` | `suspend (T, OutputStream) -> Unit` | — | Serializes `T` to the stream. Closing the stream is a no-op inside this function. |
| `fileName` (`dataStore`) | `String` | — | File name for the on-disk store, e.g. `settings.pb` or `settings.json`. |
| `serializer` (`dataStore`) | `Serializer<T>` | — | Serializer used to read/write `T`. |
| `corruptionHandler` (`dataStore`) | `ReplaceFileCorruptionHandler<T>?` | `null` | Invoked on `CorruptionException` during deserialization. |
| `produceMigrations` (`dataStore`) | `(Context) -> List<DataMigration<T>>` | `{ listOf() }` | Migrations run before any data access. |
| `scope` (`dataStore`) | `CoroutineScope` | `Dispatchers.IO + SupervisorJob()` | Scope for IO operations and transforms. |

## Notes

- `T` must be immutable; mutable types break DataStore's caching/consistency guarantees.
- Proto DataStore requires a `.proto` schema (Gradle `com.google.protobuf:protobuf-kotlin-lite`) with compile-time code generation. JSON DataStore instead uses a `@Serializable` data class with `kotlinx.serialization`, following the same `Serializer<T>` shape.
- `dataStore(...)` follows the same single-call-site rule as `preferencesDataStore`: declare once at the top level, reuse the same instance.
- Package: `androidx.datastore.core` (`Serializer`), `androidx.datastore` (`dataStore` delegate).

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [CorruptionHandler](./corruption-handler.md)
- [DataMigration](./data-migration.md)
