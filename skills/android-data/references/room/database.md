# @Database

Marks an abstract class extending `RoomDatabase` as the main access point to the persisted database, holding the entities and exposing DAOs.

## Signature / Usage

```kotlin
import androidx.room3.Database
import androidx.room3.RoomDatabase

@Database(entities = [User::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entities` | `KClass[]` | — | Array of `@Entity` classes associated with the database. |
| `version` | `Int` | — | Database schema version, used for migrations. |
| `exportSchema` | `Boolean` | `true` | Whether to export the schema to a JSON file; must be `true` for automated migrations to work. |
| `views` | `KClass[]` | `[]` | Array of `@DatabaseView` classes associated with the database. |
| `autoMigrations` | `AutoMigration[]` | — | Array of `AutoMigration(from = ..., to = ...)` specs for automated schema migrations. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room3`, Room 3.0+) — distinct from the same-named concept in other skills.
- Room 3.0 (stable since July 2026) renamed the package from `androidx.room` to `androidx.room3` (artifacts `androidx.room3:room3-runtime` / `androidx.room3:room3-compiler`) to avoid clashing with Room 2.x, and dropped Java/KAPT support in favor of Kotlin-only KSP code generation. Legacy Room 2.x docs remain at `/training/data-storage/room/v2`; see the [Room 2.x → 3.0 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3) for the full list of breaking changes.
- Combine with `@ColumnTypeConverters` (renamed from `@TypeConverters` in Room 3.0) on the same class to register converters at the database level.
- Instantiate via `Room.databaseBuilder<AppDatabase>(context, "database-name")`, not directly; see [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md) for the Room 3.0 generic builder signature and mandatory `setDriver()` call.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Migration](./migration.md)
- [TypeConverter](./type-converter.md)
- [Fts4 / DatabaseView](./fts-database-view.md)
- [Migrating to Room 3.0 (androidx.room3)](./room3-migration.md)
