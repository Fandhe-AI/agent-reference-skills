# @Dao

Marks an interface or abstract class as a Data Access Object, providing methods to query, insert, update, and delete data.

## Signature / Usage

```kotlin
@Dao
interface UserDao {
    @Insert
    fun insertAll(vararg users: User)

    @Delete
    fun delete(user: User)

    @Query("SELECT * FROM user")
    fun getAll(): List<User>
}
```

## Notes

- Room generates the implementation of the annotated interface/abstract class at compile time.
- Can be mocked directly in tests since DAOs don't leak database implementation details.

## Related

- [Query](./query.md)
- [Insert](./insert.md)
- [Update](./update.md)
- [Delete](./delete.md)
- [Upsert](./upsert.md)
- [Transaction](./transaction.md)
