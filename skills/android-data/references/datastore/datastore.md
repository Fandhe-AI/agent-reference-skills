# DataStore

Interface providing type-safe, asynchronous, transactional access to persisted data. Backed by a `Flow<T>` and a coroutine-based transactional update.

## Signature / Usage

```kotlin
package androidx.datastore.core

public expect interface DataStore<T> {
    public val data: Flow<T>
    public suspend fun updateData(transform: suspend (t: T) -> T): T
}
```

```kotlin
fun counterFlow(dataStore: DataStore<Preferences>): Flow<Int> =
    dataStore.data.map { preferences -> preferences[EXAMPLE_COUNTER] ?: 0 }

suspend fun incrementCounter(dataStore: DataStore<Preferences>) {
    dataStore.updateData {
        it.toMutablePreferences().also { preferences ->
            preferences[EXAMPLE_COUNTER] = (preferences[EXAMPLE_COUNTER] ?: 0) + 1
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Flow<T>` | — | Efficient, cached access to the latest durably persisted state. Always emits a value or throws on read failure; collecting again after an exception retries the read. |
| `updateData` | `suspend (t: T) -> T` | — | Transactionally updates the data in an atomic read-modify-write operation. All operations are serialized; completes only after the data is durably persisted. |

## Notes

- Do not layer a cache on top of `data`; use `data.first()` for a single snapshot instead.
- If `transform` or the disk write fails, the transaction is aborted and the exception propagates.
- Generic type `T` must be immutable, or DataStore's guarantees break.
- Never create more than one `DataStore` instance for the same file within a process.
- `DataStore.Builder<T>(storage, context)` offers a lower-level construction path (`setCorruptionHandler`, `addMigrations`, `build()`) as an alternative to `DataStoreFactory` / `PreferenceDataStoreFactory`.
- Package: `androidx.datastore.core`.

## Related

- [preferencesDataStore / PreferenceDataStoreFactory](./preferences-datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [Preferences / MutablePreferences](./preferences.md)
- [Proto/Typed DataStore (Serializer)](./proto-datastore.md)
- [DataMigration](./data-migration.md)
- [CorruptionHandler](./corruption-handler.md)
