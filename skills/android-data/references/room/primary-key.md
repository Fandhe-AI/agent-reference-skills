# @PrimaryKey

Designates a field as the primary key that uniquely identifies each row of an `@Entity`.

## Signature / Usage

```kotlin
@Entity
data class User(
    @PrimaryKey(autoGenerate = true) val id: Int,
    val firstName: String?
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `autoGenerate` | `Boolean` | `false` | Automatically assigns an ID to new entity instances. |

## Notes

- For a composite primary key, use `@Entity(primaryKeys = [...])` instead of `@PrimaryKey` on a single field.

## Related

- [Entity](./entity.md)
- [ColumnInfo](./column-info.md)
