# @Update

Defines a DAO method that updates rows matching the given entities.

## Signature / Usage

```kotlin
@Dao
interface UserDao {
    @Update
    fun updateUsers(vararg users: User)
}
```

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Matches rows using the entity's primary key; if no matching primary key exists, no changes are made.
- Return type can be `Int` (number of rows updated) or `Unit`/`void`.

## Related

- [Dao](./dao.md)
- [Insert](./insert.md)
- [Delete](./delete.md)
- [Upsert](./upsert.md)
