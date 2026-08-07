# Room.databaseBuilder / RoomDatabase.Builder

Creates the singleton instance of a `@Database`-annotated class, configured via a chain of `RoomDatabase.Builder` calls.

## Signature / Usage

```kotlin
import androidx.sqlite.driver.bundled.BundledSQLiteDriver

val db = Room.databaseBuilder<AppDatabase>(
    applicationContext,
    "database-name"
)
    .setDriver(BundledSQLiteDriver())
    .build()
```

In-memory database (no persistence to disk, useful for tests). On Android a `Context` is still passed; on other Kotlin Multiplatform targets (or JVM host tests) it is omitted:

```kotlin
val db = Room.inMemoryDatabaseBuilder<AppDatabase>(applicationContext)
    .setDriver(BundledSQLiteDriver())
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setDriver(driver: SQLiteDriver)` | method | — | **Required.** Configures the `SQLiteDriver` (e.g. `BundledSQLiteDriver`, `AndroidSQLiteDriver`) Room uses to access SQLite. See [RoomDatabase.Callback / setDriver](./callback-driver.md). |
| `addMigrations(vararg migrations: Migration)` | method | — | Registers manual `Migration` objects for specific version transitions. |
| `fallbackToDestructiveMigration()` | method | — | Recreates all tables (deleting user data) when no migration path is found. |
| `fallbackToDestructiveMigrationFrom(...)` | method | — | Falls back to destructive migration only from the specified starting versions. |
| `fallbackToDestructiveMigrationOnDowngrade()` | method | — | Falls back to destructive migration only when downgrading. |
| `addColumnTypeConverter(converter)` | method | — | Registers an instance of a `@ProvidedColumnTypeConverter` class (for converters needing manual/DI initialization; renamed from `addTypeConverter()` in Room 3.0). |
| `setQueryCoroutineContext(context: CoroutineContext)` | method | — | Configures the `CoroutineContext` used for query operations; replaces the Room 2.x `setQueryExecutor()` (executors are not KMP-compatible). Defaults to `Dispatchers.IO` if unset. |
| `createFromAsset(path)` | method | — | Prepopulates the database from a file bundled in `assets/`. Not supported by `inMemoryDatabaseBuilder`. |
| `createFromFile(file)` | method | — | Prepopulates the database from a file elsewhere on the device's filesystem; Room copies the file. |
| `enableMultiInstanceInvalidation()` | method | — | Propagates database invalidations across processes in multi-process apps. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room3`, Room 3.0+) — distinct from the same-named concept in other skills.
- Room 3.0 changed `Room.databaseBuilder` / `Room.inMemoryDatabaseBuilder` to a generic, reified-type signature (`Room.databaseBuilder<AppDatabase>(context, "name")`) instead of passing `AppDatabase::class.java`, and made `setDriver(SQLiteDriver)` mandatory — there is no longer an implicit `SupportSQLiteOpenHelper`-based fallback. See the [Room 2.x → 3.0 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3).
- In a single-process app, instantiate the database once using a singleton pattern; each `RoomDatabase` instance is expensive.
- `createFromAsset()` / `createFromFile()` validate that the prepackaged database schema matches the Room database schema.
- A prepackaged database combined with `fallbackToDestructiveMigration()` is used to repopulate data when Room must destructively migrate.
- Manual migrations added via `addMigrations` take precedence over automated migrations for the same version.
- `RoomDatabase.runInTransaction { ... }` (Room 2.x) is replaced by `withWriteTransaction { ... }` / `withReadTransaction { ... }` in Room 3.0.
- `@TypeConverter` / `@TypeConverters` / `@ProvidedTypeConverter` were renamed to `@ColumnTypeConverter` / `@ColumnTypeConverters` / `@ProvidedColumnTypeConverter` in Room 3.0.

## Related

- [Database](./database.md)
- [Migration](./migration.md)
- [Testing](./testing.md)
- [Migrating to Room 3.0 (androidx.room3)](./room3-migration.md)
