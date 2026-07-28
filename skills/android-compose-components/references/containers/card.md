# Card

Filled card that contains content and actions relating to a single subject, with subtle background separation.

## Signature / Usage

```kotlin
@Composable
fun Card(
    modifier: Modifier = Modifier,
    shape: Shape = CardDefaults.shape,
    colors: CardColors = CardDefaults.cardColors(),
    elevation: CardElevation = CardDefaults.cardElevation(),
    border: BorderStroke? = null,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
Card(modifier = Modifier.size(width = 240.dp, height = 100.dp)) {
    Text("Hello, world!", modifier = Modifier.padding(16.dp))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the card container. |
| `shape` | `Shape` | `CardDefaults.shape` | Shape of the container. |
| `colors` | `CardColors` | `CardDefaults.cardColors()` | Resolves container/content colors. |
| `elevation` | `CardElevation` | `CardDefaults.cardElevation()` | Controls shadow size in different states. |
| `border` | `BorderStroke?` | `null` | Border drawn around the container. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Content arranged in a `Column`. |

## Notes

- A clickable overload adds an `onClick: () -> Unit` parameter for interactive cards.
- `ElevatedCard` and `OutlinedCard` are style variants sharing the same shape: `ElevatedCard` drops the border in favor of a stronger `CardDefaults.elevatedCardElevation()` shadow; `OutlinedCard` drops elevation in favor of a `CardDefaults.outlinedCardBorder()` border. Both have their own clickable overload too.
- Cards have no built-in scroll or dismiss behavior; combine with `verticalScroll` or `SwipeToDismissBox` as needed.
- Package: `androidx.compose.material3`.

## Related

- [Scaffold](./scaffold.md)
- [Surface](./surface.md)
- [ListItem](./listitem.md)
