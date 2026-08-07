# RoomDatabase.Callback / setDriver(SQLiteDriver)

`RoomDatabase.Callback` hooks into database creation/open/destructive-migration lifecycle events; `RoomDatabase.Builder.setDriver()` configures the `SQLiteDriver` (e.g. `BundledSQLiteDriver`, `AndroidSQLiteDriver`) that Room uses to access SQLite. In Room 3.0, calling `setDriver()` is mandatory — Room no longer falls back to a `SupportSQLiteOpenHelper`-based executor.

## Signature / Usage

```kotlin
import androidx.sqlite.SQLiteConnection
import androidx.sqlite.driver.bundled.BundledSQLiteDriver

val db = Room.databaseBuilder<AppDatabase>(applicationContext, "database-name")
    .setDriver(BundledSQLiteDriver())
    .setQueryCoroutineContext(Dispatchers.IO)
    .addCallback(object : RoomDatabase.Callback() {
        override suspend fun onCreate(connection: SQLiteConnection) {
            super.onCreate(connection)
            // Runs once, when the database file is first created.
        }

        override suspend fun onOpen(connection: SQLiteConnection) {
            super.onOpen(connection)
            // Runs every time the database is opened.
        }

        override suspend fun onDestructiveMigration(connection: SQLiteConnection) {
            super.onDestructiveMigration(connection)
            // Runs when Room falls back to a destructive migration.
        }
    })
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `addCallback(callback: RoomDatabase.Callback)` | method | — | Registers a `RoomDatabase.Callback` on the builder. |
| `RoomDatabase.Callback.onCreate(connection)` | suspend method (override) | no-op | Called once, when the database is created. |
| `RoomDatabase.Callback.onOpen(connection)` | suspend method (override) | no-op | Called each time the database is opened. |
| `RoomDatabase.Callback.onDestructiveMigration(connection)` | suspend method (override) | no-op | Called when Room recreates all tables after `fallbackToDestructiveMigration()` (or a related fallback variant) is triggered. |
| `setDriver(driver: SQLiteDriver)` | method | — | **Required in Room 3.0.** Configures Room to access SQLite through a `SQLiteDriver` implementation. Pair with `setQueryCoroutineContext()`, which replaces Android's `setQueryExecutor()` since executors are not KMP-compatible. |
| `BundledSQLiteDriver` | class (`androidx.sqlite.driver.bundled`) | — | `SQLiteDriver` implementation that bundles SQLite compiled from source, giving a consistent SQLite version across Android, JVM, iOS, and other KMP targets. |
| `AndroidSQLiteDriver` | class (`androidx.sqlite.driver.framework`) | — | `SQLiteDriver` implementation backed by the platform's framework SQLite on Android. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room3`, Room 3.0+) — distinct from the same-named concept in other skills.
- Room 3.0 removed `SupportSQLiteDatabase` from the core APIs and made `setDriver()` mandatory; `RoomDatabase.Callback.onCreate` / `onOpen` / `onDestructiveMigration` (and `Migration.migrate`, `AutoMigrationSpec.onPostMigrate`) are now `suspend` functions taking an `androidx.sqlite.SQLiteConnection`. The old `SupportSQLiteDatabase`-based (non-suspend) overloads are Room 2.x (`androidx.room`) only — see the [Room 2.x → 3.0 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3).
- `setDriver(SQLiteDriver)` is not limited to Kotlin Multiplatform projects — it is used the same way in plain-Android modules. Other bundled drivers are `AndroidSQLiteDriver` (in `androidMain`) and `NativeSQLiteDriver` (in `iosMain`).
- The `androidx.room3:room3-sqlite-wrapper` artifact adds the `RoomDatabase.getSupportWrapper()` extension function, which returns a `SupportSQLiteDatabase`-compatible wrapper (bridge classes `RoomSupportSQLiteDatabase` / `RoomSupportSQLiteSession` / `RoomSupportSQLiteStatement`) for a `SQLiteDriver`-configured database — useful for incrementally migrating code that still calls `SupportSQLiteDatabase`-based APIs (e.g. `roomDatabase.openHelper.writableDatabase`).

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Migration](./migration.md)
- [Testing](./testing.md)
- [Migrating to Room 3.0 (androidx.room3)](./room3-migration.md)
