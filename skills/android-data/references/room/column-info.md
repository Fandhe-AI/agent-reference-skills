# @ColumnInfo

Customizes the column name and other column-specific settings for a field within an `@Entity`.

## Signature / Usage

```kotlin
@Entity(tableName = "users")
data class User(
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "first_name") val firstName: String?
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String` | Field name | Custom column name in the database. |
| `defaultValue` | `String` | — | Default value declared for the column (used with migrations, Room 2.2.0+). |

## Notes

- If not specified, Room uses the Kotlin/Java field name as the column name.
- Column and table names in SQLite are case-insensitive.

## Related

- [Entity](./entity.md)
- [PrimaryKey](./primary-key.md)
