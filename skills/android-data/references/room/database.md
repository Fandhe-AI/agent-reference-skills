# @Database

Marks an abstract class extending `RoomDatabase` as the main access point to the persisted database, holding the entities and exposing DAOs.

## Signature / Usage

```kotlin
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

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Combine with `@TypeConverters` on the same class to register converters at the database level.
- Instantiate via `Room.databaseBuilder`, not directly.

## Related

- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
- [Migration](./migration.md)
- [TypeConverter](./type-converter.md)
- [Fts4 / DatabaseView](./fts-database-view.md)
