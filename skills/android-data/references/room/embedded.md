# @Embedded

Decomposes the fields of another class directly into the columns of the enclosing table, without creating a relationship.

## Signature / Usage

```kotlin
data class Address(
    val street: String?,
    val state: String?,
    val city: String?,
    @ColumnInfo(name = "post_code") val postCode: Int
)

@Entity
data class User(
    @PrimaryKey val id: Int,
    val firstName: String?,
    @Embedded val address: Address?
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | `String` | — | Prefix added to each embedded column name; needed to keep names unique when embedding multiple fields of the same type. |

## Notes

- `User` above generates columns `id`, `firstName`, `street`, `state`, `city`, `post_code`.
- Also used alongside `@Relation` to include the parent entity in a relationship result class, e.g. `@Embedded val user: User`.

## Related

- [Entity](./entity.md)
- [Relation](./relation.md)
