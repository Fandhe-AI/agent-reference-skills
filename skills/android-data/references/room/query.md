# @Query

Writes a custom SQL statement and exposes it as a DAO method. The SQL is validated at compile time.

## Signature / Usage

```kotlin
@Query("SELECT * FROM user WHERE age > :minAge")
fun loadAllUsersOlderThan(minAge: Int): Array<User>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `String` | — | The SQL statement to run. Bind parameters with `:paramName`, matched to method parameters. |

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Supports collection parameters (`WHERE region IN (:regions)`) and multi-table joins.
- Can return a projection POJO/data class for a subset of columns, or a `Map`/multimap (Room 2.4+) for joined results; annotate the key/value type arguments directly, e.g. `Map<@MapColumn("key") String, @MapColumn("value") String>` (Room 2.6.0+), to specify key/value columns explicitly. The older DAO-method-level `@MapInfo` annotation is deprecated as of Room 2.6.0-alpha03 in favor of `@MapColumn`.
- Can return a `PagingSource<Int, T>` (Room 2.3.0-alpha01+) for use with the Paging library — see the `paging` category of the `android-architecture` skill for `Pager`/`PagingSource` usage.
- Direct `Cursor` return is discouraged; prefer typed return values.
- Combine with `@Transaction` when the method must run as part of a multi-query atomic operation.

## Related

- [Dao](./dao.md)
- [Transaction](./transaction.md)
- [Async Queries](./async-queries.md)
