# @ForeignKey

Declares a foreign key constraint from an `@Entity` to another `@Entity`, via the `foreignKeys` parameter of `@Entity`. SQLite enforces the relationship at write time, unlike `@Relation` which only resolves reads.

## Signature / Usage

```kotlin
@Entity(
    foreignKeys = [
        ForeignKey(
            entity = User::class,
            parentColumns = ["id"],
            childColumns = ["userCreatorId"],
            onDelete = ForeignKey.CASCADE,
            onUpdate = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["userCreatorId"])]
)
data class Playlist(
    @PrimaryKey val playlistId: Long,
    val userCreatorId: Long,
    val name: String
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | `KClass<*>` | — | The parent `@Entity` class being referenced; must be in the same database. |
| `parentColumns` | `String[]` | — | Column(s) in the parent entity; must be covered by a unique index or the primary key. |
| `childColumns` | `String[]` | — | Column(s) in the current entity referencing `parentColumns` (same order/count). |
| `onDelete` | `Int` | `NO_ACTION` | Action when the parent row is deleted: `NO_ACTION`, `RESTRICT`, `SET_NULL`, `SET_DEFAULT`, `CASCADE`. |
| `onUpdate` | `Int` | `NO_ACTION` | Action when the parent row's referenced columns are updated; same constants as `onDelete`. |
| `deferred` | `Boolean` | `false` | If `true`, the constraint is checked at transaction commit instead of immediately (useful for bulk inserts). |

## Notes

- Room verifies at compile time that `parentColumns` is covered by a unique index or primary key on the parent entity; missing it is a build error.
- Room emits the `MISSING_INDEX_ON_FOREIGN_KEY_CHILD` warning if `childColumns` isn't indexed — always add an `@Index` on the child entity's foreign key columns to avoid full table scans when the parent changes.
- `CASCADE` on `onDelete` deletes dependent child rows automatically; `SET_NULL` / `SET_DEFAULT` require the child column to be nullable / have a default (`@ColumnInfo(defaultValue = ...)`) respectively.
- This is a DB-level referential-integrity constraint, distinct from `@Relation`, which is a query-time join annotation with no enforcement.

## Related

- [Entity](./entity.md)
- [Index (see Entity's `indices` option)](./entity.md)
- [Relation](./relation.md)
- [ColumnInfo](./column-info.md)
