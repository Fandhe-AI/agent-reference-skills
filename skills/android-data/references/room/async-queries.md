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

Reactive return type requiring explicit registration (Room 3.0, e.g. `LiveData`):

```kotlin
import androidx.room3.livedata.LiveDataDaoReturnTypeConverter

@Dao
@DaoReturnTypeConverters(LiveDataDaoReturnTypeConverter::class)
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAllLiveData(): LiveData<List<User>>
}
```

## Options / Props

| Query kind | Kotlin | RxJava3 (`room3-rxjava3`) | Guava (`room3-guava`) | LiveData (`room3-livedata`) |
|------------|--------|---------------------------|------------------------|------------------------------|
| One-shot write | `suspend` | `Single`/`Maybe`/`Completable` | `ListenableFuture<T>` | — |
| One-shot read | `suspend` | `Single`/`Maybe` | `ListenableFuture<T>` | — |
| Observable read | `Flow<T>` | `Flowable`/`Publisher`/`Observable` | — | `LiveData<T>` |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room3`, Room 3.0+) — distinct from the same-named concept in other skills.
- Room 3.0 is coroutine-first: every DAO one-shot method must be a `suspend` function (blocking, non-`suspend` DAO methods from Room 2.x are no longer supported). Observable return types (`Flow<T>`, `LiveData<T>`, RxJava types, `ListenableFuture<T>`) stay non-`suspend`.
- Room 3.0 requires reactive/observable DAO return types other than `Flow` to be registered explicitly with `@DaoReturnTypeConverters` on the `@Dao` interface, using the converter class from the matching artifact: `PagingSourceDaoReturnTypeConverter` (`room3-paging`), `RxDaoReturnTypeConverters` (`room3-rxjava3`), `GuavaDaoReturnTypeConverter` (`room3-guava`), `LiveDataDaoReturnTypeConverter` (`room3-livedata`). `Flow<T>` works without registration. This replaces the Room 2.x implicit `room-ktx`/`room-rxjava2`/`room-rxjava3`/`room-guava` artifact-presence detection; see the [Room 2.x → 3.0 migration guide](https://developer.android.com/training/data-storage/room/migration-2-to-3).
- A `RoomDatabase` is configured with `setQueryCoroutineContext(context)` (Room 3.0) rather than the Room 2.x `setQueryExecutor()`; see [Room.databaseBuilder / RoomDatabase.Builder](./room-database-builder.md).
- Observable queries (`Flow`, `Flowable`, `LiveData`) rerun whenever any row in the queried table changes, even if the result set is unaffected; apply `distinctUntilChanged()` (`Transformations.distinctUntilChanged()` for `LiveData`) to avoid redundant UI updates.
- `InvalidationTracker.Observer` (and `addObserver`/`removeObserver`) was removed in Room 3.0; use `db.invalidationTracker.createFlow("TableName")` instead.

## Related

- [Query](./query.md)
- [Dao](./dao.md)
- [Migrating to Room 3.0 (androidx.room3)](./room3-migration.md)
