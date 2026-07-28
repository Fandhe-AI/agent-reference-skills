# Async DAO Queries (Flow / suspend / LiveData)

Room disallows database access on the main thread; DAO methods return asynchronous types depending on the query kind and framework.

## Signature / Usage

```kotlin
@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUsers(vararg users: User)

    @Query("SELECT * FROM user WHERE id = :id")
    suspend fun loadUserById(id: Int): User

    @Query("SELECT * FROM user WHERE id = :id")
    fun observeUserById(id: Int): Flow<User>
}
```

## Options / Props

| Query kind | Kotlin | RxJava | Guava | Jetpack |
|------------|--------|--------|-------|---------|
| One-shot write | `suspend` | `Single`/`Maybe`/`Completable` | `ListenableFuture<T>` | — |
| One-shot read | `suspend` | `Single`/`Maybe` | `ListenableFuture<T>` | — |
| Observable read | `Flow<T>` | `Flowable`/`Publisher`/`Observable` | — | `LiveData<T>` |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Kotlin `suspend`/`Flow` support requires the `room-ktx` artifact; RxJava support requires `room-rxjava2`/`room-rxjava3`; Guava support requires `room-guava`.
- A `RoomDatabase` can be configured with either `setQueryExecutor` executors or a coroutine context, not both.
- Observable queries (`Flow`, `Flowable`, `LiveData`) rerun whenever any row in the queried table changes, even if the result set is unaffected; apply `distinctUntilChanged()` (`Transformations.distinctUntilChanged()` for `LiveData`) to avoid redundant UI updates.

## Related

- [Query](./query.md)
- [Dao](./dao.md)
