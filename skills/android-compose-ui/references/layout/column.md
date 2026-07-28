# Column

A layout composable that places its children in a vertical sequence. Items do not scroll by default; use `Modifier.verticalScroll` or `LazyColumn` for scrollable content.

## Signature / Usage

```kotlin
@Composable
public inline fun Column(
    modifier: Modifier = Modifier,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
Column {
    Text("Alfred Sisley")
    Text("3 minutes ago")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `verticalArrangement` | `Arrangement.Vertical` | `Arrangement.Top` | Controls vertical spacing/positioning of children when the column is taller than its content. |
| `horizontalAlignment` | `Alignment.Horizontal` | `Alignment.Start` | Horizontal alignment of children. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Column content; children are placed top to bottom. |

## Notes

- Without weighted children, `Column` sizes itself to fit content; use `Modifier.fillMaxHeight` to expand. A child using `ColumnScope.weight` causes the `Column` to fill available height automatically.
- `ColumnScope.weight(weight: Float, fill: Boolean = true)` distributes remaining vertical space proportionally among weighted children after unweighted children are measured.
- `ColumnScope.align(alignment: Alignment.Horizontal)` overrides `horizontalAlignment` for a single child.
- Package: `androidx.compose.foundation.layout`.

## Related

- [Row](./row.md)
- [Box](./box.md)
- [arrangement-alignment](./arrangement-alignment.md)
