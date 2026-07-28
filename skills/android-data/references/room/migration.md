# Migration / Automated Migration Annotations

Handles Room database schema changes across versions, either manually with a `Migration` object or automatically via `@AutoMigration`.

## Signature / Usage

Manual migration:

```kotlin
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL(
            "CREATE TABLE `Fruit` (`id` INTEGER, `name` TEXT, PRIMARY KEY(`id`))"
        )
    }
}

Room.databaseBuilder(applicationContext, MyDb::class.java, "database-name")
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

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Automated migrations require Room 2.4.0-alpha01+ and rely on exported schemas (`exportSchema = true` on `@Database`); they fail if the schema wasn't exported or compiled.
- Implement `onPostMigrate(database)` on an `AutoMigrationSpec` to run custom logic after an automated migration completes.
- In Kotlin, use the `@RenameTable.Entries` container when applying multiple annotations of the same type.
- Manual migrations (`addMigrations`) take precedence over automated migrations for the same version transition.
- Use `RoomDatabase.Builder.fallbackToDestructiveMigration()` when no migration path exists; this permanently deletes data in affected tables.
- Test migrations with `MigrationTestHelper` from the `androidx.room:room-testing` artifact.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Database](./database.md)
- [Testing](./testing.md)
