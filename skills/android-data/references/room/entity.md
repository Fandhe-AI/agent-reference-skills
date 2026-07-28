# @Entity

Marks a class as a Room entity, representing a table in the database.

## Signature / Usage

```kotlin
@Entity(tableName = "users")
data class User(
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "first_name") val firstName: String?,
    @ColumnInfo(name = "last_name") val lastName: String?
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tableName` | `String` | Class name | Custom name for the database table. |
| `primaryKeys` | `String[]` | — | Columns composing a composite primary key. |
| `indices` | `Index[]` | — | Indices for query optimization (`Index(value = [...], unique = false)`). |
| `ignoredColumns` | `String[]` | — | Fields excluded from persistence, useful for inheritance. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Table and column names are case-insensitive in SQLite.
- Room requires public fields or getter/setter access; Kotlin data classes are recommended.
- Composite primary key example: `@Entity(primaryKeys = ["firstName", "lastName"])`.

## Related

- [PrimaryKey](./primary-key.md)
- [ColumnInfo](./column-info.md)
- [Ignore](./ignore.md)
- [Embedded](./embedded.md)
- [Fts4 / DatabaseView](./fts-database-view.md)
