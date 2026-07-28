# @Fts4 / @DatabaseView

`@Fts4` backs an entity with a SQLite full-text-search virtual table; `@DatabaseView` backs a class with a read-only SQL view.

## Signature / Usage

```kotlin
@Fts4
@Entity(tableName = "users")
data class User(
    @PrimaryKey @ColumnInfo(name = "rowid") val id: Int,
    @ColumnInfo(name = "first_name") val firstName: String?
)
```

```kotlin
@DatabaseView(
    "SELECT user.id, user.name, user.departmentId, " +
    "department.name AS departmentName FROM user " +
    "INNER JOIN department ON user.departmentId = department.id"
)
data class UserDetail(
    val id: Long,
    val name: String?,
    val departmentId: Long,
    val departmentName: String?
)

@Database(entities = [User::class], views = [UserDetail::class], version = 1)
abstract class AppDatabase : RoomDatabase()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@Fts4(languageId = ...)` | `String` | — | Optional column name holding the per-row language ID for FTS ranking. |
| `@DatabaseView(value = ...)` | `String` | — | The `SELECT` statement backing the view. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- `@Fts4` requires Room 2.1.0+; the primary key must be `INTEGER` and named `rowid`; `minSdkVersion` 16+ is recommended.
- `@DatabaseView` requires Room 2.1.0+; views only support `SELECT` — no `INSERT`/`UPDATE`/`DELETE`.
- Classes annotated `@DatabaseView` must be listed in `@Database(views = [...])`.

## Related

- [Entity](./entity.md)
- [Database](./database.md)
