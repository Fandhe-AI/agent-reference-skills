# Migration / Automated Migration Annotations

Handles Room database schema changes across versions, either manually with a `Migration` object or automatically via `@AutoMigration`.

## Signature / Usage

Manual migration (Room 3.0+, `androidx.room3`):

```kotlin
import androidx.sqlite.SQLiteConnection

val MIGRATION_1_2 = object : Migration(1, 2) {
    override suspend fun migrate(connection: SQLiteConnection) {
        connection.execSQL(
            "CREATE TABLE `Fruit` (`id` INTEGER, `name` TEXT, PRIMARY KEY(`id`))"
        )
    }
}

Room.databaseBuilder<MyDb>(applicationContext, "database-name")
    .setDriver(BundledSQLiteDriver())
    .addMigrations(MIGRATION_1_2)
    .build()
```

Automated migration:

```kotlin
@Database(
    version = 2,
    entities = [User::class],
    autoMigrations = [
        AutoMigration(from = 1, to = 2)
    ]
)
abstract class AppDatabase : RoomDatabase()
```

Automated migration with an ambiguous schema change (rename):

```kotlin
@Database(
    version = 2,
    entities = [User::class],
    autoMigrations = [
        AutoMigration(from = 1, to = 2, spec = AppDatabase.MyAutoMigration::class)
    ]
)
abstract class AppDatabase : RoomDatabase() {
    @RenameTable(fromTableName = "User", toTableName = "AppUser")
    class MyAutoMigration : AutoMigrationSpec
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AutoMigration.from` | `Int` | — | Starting schema version. |
| `AutoMigration.to` | `Int` | — | Target schema version. |
| `AutoMigration.spec` | `KClass<AutoMigrationSpec>` | — | Spec class needed when Room can't infer an ambiguous change (rename/delete). |
| `@RenameTable` | annotation | — | `fromTableName` / `toTableName`, applied on an `AutoMigrationSpec` class. |
| `@RenameColumn` | annotation | — | Declares a column rename for an automated migration. |
| `@DeleteColumn` | annotation | — | Declares a column deletion for an automated migration. |
| `@DeleteTable` | annotation | — | Declares a table deletion for an automated migration. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room3`, Room 3.0+) — distinct from the same-named concept in other skills.
- Room 3.0 made `Migration.migrate()` and `AutoMigrationSpec.onPostMigrate()` `suspend` functions that take an `androidx.sqlite.SQLiteConnection` instead of a `SupportSQLiteDatabase`; execute SQL via `connection.execSQL(...)` rather than `database.execSQL(...)`. The legacy `SupportSQLiteDatabase`-based signatures are Room 2.x (`androidx.room`) only — see [Migrating to Room 3.0](./room3-migration.md) and the official [Room 2.x → 3.0 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3).
- Automated migrations rely on exported schemas (`exportSchema = true` on `@Database`, configured via `room3 { schemaDirectory(...) }` in the Room Gradle plugin); they fail if the schema wasn't exported or compiled.
- Implement `onPostMigrate(connection)` on an `AutoMigrationSpec` to run custom logic after an automated migration completes.
- In Kotlin, use the `@RenameTable.Entries` container when applying multiple annotations of the same type.
- Manual migrations (`addMigrations`) take precedence over automated migrations for the same version transition.
- Use `RoomDatabase.Builder.fallbackToDestructiveMigration()` when no migration path exists; this permanently deletes data in affected tables.
- Test migrations with `MigrationTestHelper` from the `androidx.room3:room3-testing` artifact; see [Testing](./testing.md) for the Room 3.0 `SQLiteConnection`-based API.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Database](./database.md)
- [Testing](./testing.md)
- [Migrating to Room 3.0 (androidx.room3)](./room3-migration.md)
