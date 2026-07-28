# @Relation

Defines a one-to-one, one-to-many, or (combined with `@Junction`) many-to-many relationship, resolved by Room through separate queries rather than object references.

## Signature / Usage

One-to-many:

```kotlin
data class UserWithPlaylists(
    @Embedded val user: User,
    @Relation(
        parentColumn = "userId",
        entityColumn = "userCreatorId"
    )
    val playlists: List<Playlist>
)

@Dao
interface UserDao {
    @Transaction
    @Query("SELECT * FROM User")
    fun getUsersWithPlaylists(): List<UserWithPlaylists>
}
```

Many-to-many via `@Junction`:

```kotlin
@Entity(primaryKeys = ["playlistId", "songId"])
data class PlaylistSongCrossRef(val playlistId: Long, val songId: Long)

data class PlaylistWithSongs(
    @Embedded val playlist: Playlist,
    @Relation(
        parentColumn = "playlistId",
        entityColumn = "songId",
        associateBy = Junction(PlaylistSongCrossRef::class)
    )
    val songs: List<Song>
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `parentColumn` | `String` | — | Primary key column of the parent entity. |
| `entityColumn` | `String` | — | Column in the child entity referencing the parent's primary key (or, with `@Junction`, the junction table's column referencing the child). |
| `entity` | `KClass` | inferred | Child entity class, if not inferable from the field type. |
| `projection` | `String[]` | — | Subset of child entity columns to fetch. |
| `associateBy` | `Junction` | — | `Junction(crossRefEntity::class)` identifying the cross-reference table for many-to-many relationships. |

## Notes

- Always pair with `@Embedded` on the parent field and `@Transaction` on the DAO query method, since Room runs one query per relationship and needs atomicity.
- Room doesn't support lazy-loaded object references; `@Relation` results are fully loaded when the query runs.
- If `@Relation` doesn't fit the need, write an explicit `JOIN` in a `@Query` and return a multimap (Room 2.4+) instead.

## Related

- [Embedded](./embedded.md)
- [Transaction](./transaction.md)
- [Query](./query.md)
