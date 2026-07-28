# preferencesDataStore / PreferenceDataStoreFactory

Creates and manages a `DataStore<Preferences>` — the SharedPreferences-like, schema-less key-value implementation of DataStore.

## Signature / Usage

```kotlin
// androidx.datastore.preferences — property delegate (recommended, single call site)
public fun preferencesDataStore(
    name: String,
    corruptionHandler: ReplaceFileCorruptionHandler<Preferences>? = null,
    produceMigrations: (Context) -> List<DataMigration<Preferences>> = { listOf() },
    scope: CoroutineScope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
): ReadOnlyProperty<Context, DataStore<Preferences>>

// androidx.datastore.preferences.core — factory object
public expect object PreferenceDataStoreFactory {
    public fun create(
        storage: Storage<Preferences>,
        corruptionHandler: ReplaceFileCorruptionHandler<Preferences>? = null,
        migrations: List<DataMigration<Preferences>> = listOf(),
        scope: CoroutineScope = CoroutineScope(ioDispatcher() + SupervisorJob()),
    ): DataStore<Preferences>

    public fun createWithPath(
        corruptionHandler: ReplaceFileCorruptionHandler<Preferences>? = null,
        migrations: List<DataMigration<Preferences>> = listOf(),
        scope: CoroutineScope = CoroutineScope(ioDispatcher() + SupervisorJob()),
        produceFile: () -> Path,
    ): DataStore<Preferences>
}
```

```kotlin
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(
    name = "settings",
    produceMigrations = { context -> listOf(SharedPreferencesMigration(context, "legacy_prefs")) },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String` | — | Identifies the preferences file, stored in the app's datastore subdirectory. |
| `corruptionHandler` | `ReplaceFileCorruptionHandler<Preferences>?` | `null` | Invoked when DataStore encounters a `CorruptionException` while deserializing data. |
| `produceMigrations` | `(Context) -> List<DataMigration<Preferences>>` | `{ listOf() }` | Produces `DataMigration`s that run before any data access. |
| `scope` | `CoroutineScope` | `Dispatchers.IO + SupervisorJob()` | Scope used for IO operations and transform functions. |
| `storage` (`create`) | `Storage<Preferences>` | — | Storage implementation defining the on-disk location and access mechanism. |
| `produceFile` (`createWithPath`) | `() -> Path` | — | Returns a consistent okio `Path`; the file must use the `.preferences_pb` extension. |

## Notes

- `preferencesDataStore(...)` must be called only once per file, at the top level, as a `val` extension property on `Context`; all usages should reference the same instance.
- `PreferenceDataStoreFactory.create` / `createWithPath` are called as members of the `PreferenceDataStoreFactory` object (e.g. `PreferenceDataStoreFactory.create(storage = ...)`), not as extension functions.
- Package: `androidx.datastore.preferences` (delegate), `androidx.datastore.preferences.core` (factory object).
- Gradle dependency: `androidx.datastore:datastore-preferences`.

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [Preferences / MutablePreferences](./preferences.md)
- [preferences-keys](./preferences-keys.md)
- [edit](./edit.md)
