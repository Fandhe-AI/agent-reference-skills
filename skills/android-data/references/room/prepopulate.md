# Prepopulate a Room database (createFromAsset / createFromFile)

Prepopulate a Room database at initialization from a prepackaged database file, either from the app's `assets/` directory (`createFromAsset`) or from the device file system (`createFromFile`).

## Signature / Usage

```kotlin
// From an app asset (path relative to assets/)
Room.databaseBuilder<AppDatabase>(appContext, "sample.db")
    .setDriver(BundledSQLiteDriver())
    .createFromAsset("database/myapp.db")
    .build()

// From the file system (anywhere except assets/)
Room.databaseBuilder<AppDatabase>(appContext, "sample.db")
    .setDriver(BundledSQLiteDriver())
    .createFromFile(File("mypath"))
    .build()
```

Call `createFromAsset` / `createFromFile` on the `RoomDatabase.Builder` before `build`.

### Fallback migration with a prepackaged database

```kotlin
// Database class definition declaring version 3.
@Database(entities = [SampleEntity::class], version = 3)
abstract class FallbackAppDatabase : RoomDatabase() {
    // ...
}

fun createFallbackDb(appContext: Context) {
    Room.databaseBuilder<FallbackAppDatabase>(appContext, "sample.db")
        .setDriver(BundledSQLiteDriver())
        .createFromAsset("database/myapp.db")
        .fallbackToDestructiveMigration()
        .build()
}
```

### Multi-step migration with a prepackaged database

```kotlin
@Database(entities = [SampleEntity::class], version = 4)
abstract class MultiStepAppDatabase : RoomDatabase() {
    // ...
}

val MIGRATION_3_4 = object : Migration(3, 4) {
    override suspend fun migrate(connection: SQLiteConnection) {
        // ...
    }
}

fun createMultiStepDb(appContext: Context) {
    Room.databaseBuilder<MultiStepAppDatabase>(appContext, "sample.db")
        .setDriver(BundledSQLiteDriver())
        .createFromAsset("database/myapp.db")
        .addMigrations(MIGRATION_3_4)
        .fallbackToDestructiveMigration()
        .build()
}
```

## Notes

- In-memory Room databases do not support `createFromAsset` or `createFromFile`.
- `createFromAsset` takes a string with a relative path from `assets/` to the prepackaged file.
- `createFromFile` takes a `File`. Room copies the file rather than opening it directly, so the app needs read permission on it.
- For both, Room validates that the schema matches the prepackaged database's schema. Export the schema to use as a reference when building the prepackaged file.
- Prepackaged files are used only in a fallback (destructive) migration. Normally Room drops all tables and creates an empty database for the target version. If a prepackaged file has the same version number as the target version, Room populates the recreated database from it.
- Fallback example (installed v2, app v3, prepackaged v3, no 2 to 3 path, destructive enabled): Room drops the installed database, recreates it and populates it from the prepackaged file. A prepackaged file on version 2 does not match the target version and is not used.
- Implemented-migration example (same versions, but `MIGRATION_2_3` is added): Room runs `migrate` and preserves existing data. The prepackaged file is not used.
- Multi-step example (installed v2, app v4, prepackaged v3, only 3 to 4 migration, destructive enabled): Room performs a destructive fallback, populates from the v3 prepackaged file, then runs `MIGRATION_3_4` to reach v4, preserving the copied data.
- Snippets use the `androidx.room3` API (`Room.databaseBuilder<T>(context, name)`, `suspend fun migrate(connection: SQLiteConnection)`). `setDriver(BundledSQLiteDriver())` is added here because Room 3.0 requires a driver (see room-database-builder); the official prepopulate snippets omit it.

## Related

- [migration](./migration.md)
- [room3-migration](./room3-migration.md)
- [room-database-builder](./room-database-builder.md)
- [testing](./testing.md)
