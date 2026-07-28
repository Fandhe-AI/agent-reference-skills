# @Ignore

Excludes a specific field (or, via `@Entity(ignoredColumns = [...])`, an inherited field) from being persisted.

## Signature / Usage

```kotlin
@Entity
data class User(
    @PrimaryKey val id: Int,
    val firstName: String?,
    @Ignore val picture: Bitmap?
)
```

Inheritance-based exclusion:

```kotlin
open class User {
    var picture: Bitmap? = null
}

@Entity(ignoredColumns = ["picture"])
data class RemoteUser(
    @PrimaryKey val id: Int,
    val hasVpn: Boolean
) : User()
```

## Notes

- This is the Android Room persistence library (Kotlin, `androidx.room`) — distinct from the same-named concept in other skills.
- Use `@Ignore` on a field to skip it directly; use `@Entity(ignoredColumns = [...])` when the field comes from a superclass.

## Related

- [Entity](./entity.md)
