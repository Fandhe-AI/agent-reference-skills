# @Transaction

Ensures a DAO method that requires Room to run multiple queries executes atomically.

## Signature / Usage

```kotlin
@Transaction
@Query("SELECT * FROM User")
fun getUsersWithPlaylists(): List<UserWithPlaylists>
```

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Required on DAO methods returning `@Relation`-based result classes (one-to-one, one-to-many, many-to-many, nested), since Room executes a separate query per relationship.
- Ensures consistent results when a method needs to run several queries together.

## Related

- [Query](./query.md)
- [Relation](./relation.md)
- [Dao](./dao.md)
