# @Insert

Defines a DAO method that inserts its parameters into the database.

## Signature / Usage

```kotlin
@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUsers(vararg users: User)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onConflict` | `Int` (`OnConflictStrategy`) | — | Conflict resolution strategy, e.g. `OnConflictStrategy.REPLACE`. |

## Notes

- Accepts a single entity, varargs, a `List`, or a mix of entities and collections.
- Return type can be `Long` (rowId of the inserted row) for a single parameter, `Array<Long>`/`List<Long>` for multiple parameters, or `Unit`/`void`.

## Related

- [Dao](./dao.md)
- [Update](./update.md)
- [Delete](./delete.md)
- [Upsert](./upsert.md)
