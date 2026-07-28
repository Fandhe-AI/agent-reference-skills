# Row

A layout composable that places its children in a horizontal sequence. Items do not scroll by default; use `Modifier.horizontalScroll` or `LazyRow` for scrollable content.

## Signature / Usage

```kotlin
@Composable
public inline fun Row(
    modifier: Modifier = Modifier,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    verticalAlignment: Alignment.Vertical = Alignment.Top,
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
Row(verticalAlignment = Alignment.CenterVertically) {
    Image(bitmap = artist.image, contentDescription = "Artist image")
    Column {
        Text(artist.name)
        Text(artist.lastSeenOnline)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `Arrangement.Start` | Controls horizontal spacing/positioning of children when the row is wider than its content. |
| `verticalAlignment` | `Alignment.Vertical` | `Alignment.Top` | Vertical alignment of children. |
| `content` | `@Composable RowScope.() -> Unit` | — | Row content; children are placed start to end. |

## Notes

- Without weighted children, `Row` sizes itself to fit content; use `Modifier.fillMaxWidth` to expand. A child using `RowScope.weight` causes the `Row` to fill available width automatically. Weights are disregarded in horizontally scrollable contexts (infinite available space).
- `RowScope.weight(weight: Float, fill: Boolean = true)` distributes remaining horizontal space proportionally among weighted children.
- `RowScope.align(alignment: Alignment.Vertical)` overrides `verticalAlignment` for a single child; has priority over the row's `verticalAlignment`.
- Text children should use `Modifier.alignByBaseline` for baseline-aware alignment instead of `align`.
- Package: `androidx.compose.foundation.layout`.

## Related

- [Column](./column.md)
- [Box](./box.md)
- [arrangement-alignment](./arrangement-alignment.md)
