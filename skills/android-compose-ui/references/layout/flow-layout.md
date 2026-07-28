# FlowRow / FlowColumn

Layouts that fill items in a row/column and wrap to the next line when space runs out.

## Signature / Usage

```kotlin
@Composable
public fun FlowRow(
    modifier: Modifier = Modifier,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    itemVerticalAlignment: Alignment.Vertical = Alignment.Top,
    maxItemsInEachRow: Int = Int.MAX_VALUE,
    maxLines: Int = Int.MAX_VALUE,
    content: @Composable FlowRowScope.() -> Unit,
)

@Composable
public fun FlowColumn(
    modifier: Modifier = Modifier,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    itemHorizontalAlignment: Alignment.Horizontal = Alignment.Start,
    maxItemsInEachColumn: Int = Int.MAX_VALUE,
    maxLines: Int = Int.MAX_VALUE,
    content: @Composable FlowColumnScope.() -> Unit,
)
```

```kotlin
FlowRow(
    horizontalArrangement = Arrangement.spacedBy(8.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp),
) {
    tags.forEach { tag -> AssistChip(onClick = {}, label = { Text(tag) }) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `Arrangement.Start` | Spacing/positioning of items on the main axis (FlowRow) or between lines (FlowColumn). |
| `verticalArrangement` | `Arrangement.Vertical` | `Arrangement.Top` | Spacing between lines (FlowRow) or main axis (FlowColumn). |
| `itemVerticalAlignment` / `itemHorizontalAlignment` | `Alignment.Vertical` / `Horizontal` | `Top` / `Start` | Cross-axis alignment of each item within its line. |
| `maxItemsInEachRow` / `maxItemsInEachColumn` | `Int` | `Int.MAX_VALUE` | Caps how many items are placed per line before wrapping. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Caps how many lines/rows-of-lines are laid out; overflow items are dropped unless an overflow handler is supplied. |
| `content` | `@Composable FlowRowScope.() -> Unit` / `FlowColumnScope.() -> Unit` | — | Items; both scopes expose `weight` similar to `RowScope`/`ColumnScope`. |

## Notes

- Items fill left-to-right (or right-to-left in RTL) wrapping to the next row/column when space runs out, unlike `Row`/`Column` which never wrap.
- `FlowRowScope`/`FlowColumnScope` support `weight()` for proportional sizing within a line, and per-item alignment overrides.
- Package: `androidx.compose.foundation.layout` (marked `@ExperimentalLayoutApi` in some overloads).

## Related

- [Row](./row.md)
- [Column](./column.md)
- [arrangement-alignment](./arrangement-alignment.md)
