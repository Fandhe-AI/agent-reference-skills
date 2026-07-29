# RoomDatabase.Callback / setDriver(SQLiteDriver)

`RoomDatabase.Callback` hooks into database creation/open/destructive-migration lifecycle events; `RoomDatabase.Builder.setDriver()` configures Room to run on a `SQLiteDriver` (e.g. `BundledSQLiteDriver`) instead of a `SupportSQLiteOpenHelper`-based executor.

## Signature / Usage

```kotlin
val db = Room.databaseBuilder(applicationContext, AppDatabase::class.java, "database-name")
    .addCallback(object : RoomDatabase.Callback() {
        override fun onCreate(db: SupportSQLiteDatabase) {
            super.onCreate(db)
            // Runs once, when the database file is first created.
        }

        override fun onOpen(db: SupportSQLiteDatabase) {
            super.onOpen(db)
            // Runs every time the database is opened.
        }

        override fun onDestructiveMigration(db: SupportSQLiteDatabase) {
            super.onDestructiveMigration(db)
            // Runs when Room falls back to a destructive migration.
        }
    })
    .build()
```

Configuring a `SQLiteDriver` instead of the default executor/`SupportSQLiteOpenHelper` path (Room 2.7.0-alpha01+):

```kotlin
val db = Room.databaseBuilder(applicationContext, AppDatabase::class.java, "database-name")
    .setDriver(BundledSQLiteDriver())
    .setQueryCoroutineContext(Dispatchers.IO)
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `addCallback(callback: RoomDatabase.Callback)` | method | — | Registers a `RoomDatabase.Callback` on the builder. |
| `RoomDatabase.Callback.onCreate(db)` | method (override) | no-op | Called once, when the database is created. |
| `RoomDatabase.Callback.onOpen(db)` | method (override) | no-op | Called each time the database is opened. |
| `RoomDatabase.Callback.onDestructiveMigration(db)` | method (override) | no-op | Called when Room recreates all tables after `fallbackToDestructiveMigration()` (or a related fallback variant) is triggered. |
| `setDriver(driver: SQLiteDriver)` | method | — | Configures Room to access SQLite through a `SQLiteDriver` implementation (Room 2.7.0-alpha01+). Pair with `setQueryCoroutineContext()`, which replaces Android's `setQueryExecutor()` since executors are not KMP-compatible. |
| `BundledSQLiteDriver` | class (`androidx.sqlite.driver.bundled`) | — | `SQLiteDriver` implementation that bundles SQLite compiled from source, giving a consistent SQLite version across Android, JVM, iOS, and other KMP targets. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- As of Room 2.7.0-alpha01, `RoomDatabase.Callback.onCreate` / `onOpen` / `onDestructiveMigration` (and `Migration.migrate`, `AutoMigrationSpec.onPostMigrate`) gained overloads that take an `androidx.sqlite.SQLiteConnection` instead of `SupportSQLiteDatabase`; override the `SQLiteConnection` overload when the database is configured with `setDriver()` (Kotlin Multiplatform or `SQLiteDriver`-based Android setups), and the `SupportSQLiteDatabase` overload for the classic executor-based setup.
- `setDriver(SQLiteDriver)` was added in Room 2.7.0-alpha01 and is not limited to Kotlin Multiplatform projects — it can be used in plain-Android modules that want the `SQLiteDriver` API instead of the executor/`SupportSQLiteOpenHelper` path. Other bundled drivers are `AndroidSQLiteDriver` (in `androidMain`) and `NativeSQLiteDriver` (in `iosMain`).
- As of Room 2.8.0, the `androidx.room:room-sqlite-wrapper` artifact adds `RoomDatabase.getSupportWrapper()`, which returns a `SupportSQLiteDatabase` wrapper for a `SQLiteDriver`-configured database, for code that still needs `SupportSQLiteDatabase`-based APIs.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Migration](./migration.md)
- [Testing](./testing.md)
