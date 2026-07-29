# Alignment lines

`AlignmentLine` defines a custom reference point a layout exposes for positioning, read by a parent after measurement via `Placeable[alignmentLine]`. `FirstBaseline`/`LastBaseline` are the built-in text alignment lines; `Modifier.alignBy`/`alignByBaseline` let a `Row`/`Column` child align to an alignment line instead of the default cross-axis `Alignment`.

## Signature / Usage

```kotlin
abstract class AlignmentLine(val merger: (Int, Int) -> Int)
class HorizontalAlignmentLine(merger: (Int, Int) -> Int) : AlignmentLine(merger)
class VerticalAlignmentLine(merger: (Int, Int) -> Int) : AlignmentLine(merger)

val FirstBaseline: HorizontalAlignmentLine
val LastBaseline: HorizontalAlignmentLine

@Stable fun RowScope.alignBy(alignmentLine: HorizontalAlignmentLine): Modifier
@Stable fun RowScope.alignBy(alignmentLineBlock: (Measured) -> Int): Modifier
@Stable fun RowScope.alignByBaseline(): Modifier

@Stable fun ColumnScope.alignBy(alignmentLine: VerticalAlignmentLine): Modifier
@Stable fun ColumnScope.alignBy(alignmentLineBlock: (Measured) -> Int): Modifier
```

```kotlin
Row {
    Text("Short", Modifier.alignByBaseline())
    Text("Tall text", Modifier.alignByBaseline())
}
```

```kotlin
// Read a baseline after measurement inside a custom layout modifier
fun Modifier.firstBaselineToTop(firstBaselineToTop: Dp) = layout { measurable, constraints ->
    val placeable = measurable.measure(constraints)
    check(placeable[FirstBaseline] != AlignmentLine.Unspecified)
    val firstBaseline = placeable[FirstBaseline]
    val placeableY = firstBaselineToTop.roundToPx() - firstBaseline
    layout(placeable.width, placeable.height + placeableY) {
        placeable.placeRelative(0, placeableY)
    }
}
```

```kotlin
// Defining and providing a custom AlignmentLine from a custom Layout
private val MaxChartValue = HorizontalAlignmentLine(merger = { old, new -> min(old, new) })

Layout(content = { /* ... */ }) { _, constraints ->
    layout(
        width = constraints.maxWidth,
        height = constraints.maxHeight,
        alignmentLines = mapOf(MaxChartValue to /* computed y position */ 0),
    ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AlignmentLine.merger` | `(Int, Int) -> Int` | — | Combines two values when several descendants provide the same alignment line (e.g. `min`/`max`). |
| `FirstBaseline` / `LastBaseline` | `HorizontalAlignmentLine` | — | Built-in alignment lines exposed by text composables (`BasicText`), read via `placeable[FirstBaseline]`. |
| `RowScope.alignBy(alignmentLine)` | `HorizontalAlignmentLine` | — | Aligns a `Row` child's alignment-line position with the same alignment line of its siblings, instead of using `verticalAlignment`. |
| `RowScope.alignBy(alignmentLineBlock)` | `(Measured) -> Int` | — | Aligns using a custom computed line (block returns the offset from the top). |
| `RowScope.alignByBaseline()` | — | — | Shorthand for `alignBy(FirstBaseline)`; recommended for aligning text baselines inside a `Row`. |
| `ColumnScope.alignBy(alignmentLine)` | `VerticalAlignmentLine` | — | Aligns a `Column` child's alignment-line position with siblings, instead of using `horizontalAlignment`. |

## Notes

- Alignment lines are read after a child is measured (`Placeable[alignmentLine]`), and provided by a layout via the `alignmentLines` map parameter of `MeasureScope.layout(width, height, alignmentLines, placementBlock)`.
- Custom alignment lines are declared as top-level `HorizontalAlignmentLine`/`VerticalAlignmentLine` properties; use `HorizontalAlignmentLine` for a line consumed for vertical positioning, `VerticalAlignmentLine` for horizontal positioning.
- `alignBy`/`alignByBaseline` override the row/column's `verticalAlignment`/`horizontalAlignment` for that single child, similarly to `RowScope.align`/`ColumnScope.align` but positioning relative to a line instead of the box edge.
- Package: `androidx.compose.ui.layout` (`AlignmentLine`, `FirstBaseline`, `LastBaseline`), `androidx.compose.foundation.layout` (`alignBy`, `alignByBaseline`).

## Related

- [Row](./row.md)
- [Column](./column.md)
- [Layout (custom layout)](./layout.md)
- [Intrinsic measurements](./intrinsic-measurements.md)
