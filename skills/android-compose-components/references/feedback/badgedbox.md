# BadgedBox

Container composable that overlays a `badge` (typically `Badge`) on top of `content` (typically `Icon`), positioning them per Material spec.

## Signature / Usage

```kotlin
@Composable
fun BadgedBox(
    badge: @Composable BoxScope.() -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable BoxScope.() -> Unit,
)
```

```kotlin
BadgedBox(
    badge = { Badge() },
) {
    Icon(
        imageVector = Icons.Filled.Mail,
        contentDescription = "Email",
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `badge` | `@Composable BoxScope.() -> Unit` | — | The badge composable, typically `Badge`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this box. |
| `content` | `@Composable BoxScope.() -> Unit` | — | The anchored content, typically `Icon`, but any composable (`Button`, `Image`, etc.) works. |

## Notes

- Wrap the `badge` content in an `if` condition to hide it conditionally (e.g. only when a count is greater than zero).
- Package: `androidx.compose.material3`.

## Related

- [Badge](./badge.md)
