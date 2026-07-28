# @Upsert

Shortcut annotation that inserts an entity when there is no uniqueness conflict, or updates it when a conflict is detected.

## Signature / Usage

```kotlin
@Dao
interface UserDao {
    @Upsert
    fun upsertUsers(vararg users: User)
}
```

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Added in Room 2.5.0-alpha03. Requires minimum API level 16, since identifying a primary-key constraint conflict is unavailable on older APIs.
- Behaves like a combination of `@Insert` and `@Update`: on a uniqueness conflict, performs an update instead of failing.

## Related

- [Insert](./insert.md)
- [Update](./update.md)
- [Dao](./dao.md)
