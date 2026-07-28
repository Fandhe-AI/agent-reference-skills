# Room.databaseBuilder / RoomDatabase.Builder

Creates the singleton instance of a `@Database`-annotated class, configured via a chain of `RoomDatabase.Builder` calls.

## Signature / Usage

```kotlin
val db = Room.databaseBuilder(
    applicationContext,
    AppDatabase::class.java,
    "database-name"
).build()
```

In-memory database (no persistence to disk, useful for tests):

```kotlin
val db = Room.inMemoryDatabaseBuilder(
    applicationContext,
    AppDatabase::class.java
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `addMigrations(vararg migrations: Migration)` | method | — | Registers manual `Migration` objects for specific version transitions. |
| `fallbackToDestructiveMigration()` | method | — | Recreates all tables (deleting user data) when no migration path is found. |
| `fallbackToDestructiveMigrationFrom(...)` | method | — | Falls back to destructive migration only from the specified starting versions. |
| `fallbackToDestructiveMigrationOnDowngrade()` | method | — | Falls back to destructive migration only when downgrading. |
| `addTypeConverter(converter)` | method | — | Registers an instance of a `@ProvidedTypeConverter` class (for converters needing manual/DI initialization). |
| `setQueryExecutor(executor)` | method | — | Configures the executor used for query operations (Android-only; not available in Kotlin Multiplatform `commonMain`). |
| `createFromAsset(path)` | method | — | Prepopulates the database from a file bundled in `assets/`. Not supported by `inMemoryDatabaseBuilder`. |
| `createFromFile(file)` | method | — | Prepopulates the database from a file elsewhere on the device's filesystem; Room copies the file. |
| `enableMultiInstanceInvalidation()` | method | — | Propagates database invalidations across processes in multi-process apps. |

## Notes

- In a single-process app, instantiate the database once using a singleton pattern; each `RoomDatabase` instance is expensive.
- `createFromAsset()` / `createFromFile()` validate that the prepackaged database schema matches the Room database schema.
- A prepackaged database combined with `fallbackToDestructiveMigration()` is used to repopulate data when Room must destructively migrate.
- Manual migrations added via `addMigrations` take precedence over automated migrations for the same version.
- `setQueryExecutor()` and a `CoroutineContext` (`setCoroutineContext()`/`setQueryCoroutineContext()`) are mutually exclusive ways to control the thread pool used for database operations; if neither is set, Room defaults to `Dispatchers.IO` on Kotlin Multiplatform.

## Related

- [Database](./database.md)
- [Migration](./migration.md)
- [Testing](./testing.md)
