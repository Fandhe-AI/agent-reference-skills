# SharedPreferencesMigration

Built-in `DataMigration<Preferences>` that copies entries out of an existing `SharedPreferences` file into a `DataStore<Preferences>`.

## Signature / Usage

```kotlin
package androidx.datastore.preferences

public fun SharedPreferencesMigration(
    produceSharedPreferences: () -> SharedPreferences,
    keysToMigrate: Set<String> = MIGRATE_ALL_KEYS,
): SharedPreferencesMigration<Preferences>

public fun SharedPreferencesMigration(
    context: Context,
    sharedPreferencesName: String,
    keysToMigrate: Set<String> = MIGRATE_ALL_KEYS,
): SharedPreferencesMigration<Preferences>
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
| `produceSharedPreferences` | `() -> SharedPreferences` | — | Supplies the `SharedPreferences` instance to migrate from. |
| `context`, `sharedPreferencesName` | `Context`, `String` | — | Convenience overload that resolves `SharedPreferences` by name. |
| `keysToMigrate` | `Set<String>` | `MIGRATE_ALL_KEYS` | Restricts migration to specific keys; omit to migrate all keys. |

## Notes

- Supports `boolean`, `float`, `int`, `long`, `String`, and `Set<String>` values; other types returned by `getAll()` are ignored.
- Pre-existing keys in the destination `DataStore` are not overwritten; keys absent from `keysToMigrate` are not migrated.
- Using the `context` + `sharedPreferencesName` overload, the source `SharedPreferences` file is deleted once it becomes empty after migration.
- Package: `androidx.datastore.preferences`.

## Related

- [DataMigration](./data-migration.md)
- [preferencesDataStore](./preferences-datastore.md)
