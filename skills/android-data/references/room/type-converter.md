# @TypeConverter / @TypeConverters

`@TypeConverter` marks a method that converts a custom type to/from a type Room can persist; `@TypeConverters` registers converter classes with Room.

## Signature / Usage

```kotlin
class Converters {
    @TypeConverter
    fun fromTimestamp(value: Long?): Date? = value?.let { Date(it) }

    @TypeConverter
    fun dateToTimestamp(date: Date?): Long? = date?.time
}

@Database(entities = [User::class], version = 1)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@TypeConverters` value | `KClass[]` | — | Converter classes to register; can be placed on `@Database`, `@Entity`, or `@Dao` to scope visibility. |

## Notes

- Room doesn't allow direct object references between entities; type converters let a custom type be stored in a single column instead.
- Room 2.3+ ships a default converter for enums; a custom converter takes precedence if defined.
- For converters needing constructor injection, annotate the class `@ProvidedTypeConverter` and register the instance via `RoomDatabase.Builder.addTypeConverter(instance)` instead of `@TypeConverters`.

## Related

- [Database](./database.md)
- [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md)
