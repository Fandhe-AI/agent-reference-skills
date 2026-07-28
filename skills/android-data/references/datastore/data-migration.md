# DataMigration

Interface for migrating data from an existing format/source into a DataStore before any data is exposed to callers.

## Signature / Usage

```kotlin
package androidx.datastore.core

public interface DataMigration<T> {
    public suspend fun shouldMigrate(currentData: T): Boolean
    public suspend fun migrate(currentData: T): T
    public suspend fun cleanUp()
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
| `shouldMigrate` | `suspend (T) -> Boolean` | — | Cheap check run on every DataStore initialization to decide whether `migrate` should run. Returning `false` skips both `migrate` and `cleanUp`. |
| `migrate` | `suspend (T) -> T` | — | Performs the migration and returns the new data. Must be idempotent — may be called multiple times. |
| `cleanUp` | `suspend () -> Unit` | — | Called only after a successful `migrate`; removes the old data source (e.g. legacy files). |

## Notes

- None of the three methods may access the owning `DataStore`'s `data` / `updateData` directly — doing so deadlocks.
- Migrations run in the order supplied to `migrations` / `produceMigrations`, before any data is returned to callers.
- `SharedPreferencesMigration` is the built-in `DataMigration<Preferences>` implementation for migrating from `SharedPreferences`.
- Package: `androidx.datastore.core`.

## Related

- [DataStore](./datastore.md)
- [SharedPreferencesMigration](./shared-preferences-migration.md)
- [CorruptionHandler](./corruption-handler.md)
