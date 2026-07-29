# FlexBox / Grid (experimental)

`FlexBox` and `Grid` are experimental, non-lazy layout composables in `androidx.compose.foundation.layout` inspired by CSS Flexbox and CSS Grid. They are distinct from the lazy `LazyVerticalGrid`/`LazyHorizontalGrid` and from `FlowRow`/`FlowColumn`, targeting small item counts that need flexible resizing, wrapping, or two-dimensional item placement rather than lazy composition of large datasets.

## Signature / Usage

```kotlin
@ExperimentalFlexBoxApi
@Composable
fun FlexBox(
    modifier: Modifier = Modifier,
    config: FlexBoxConfig = FlexBoxConfig,
    content: @Composable FlexBoxScope.() -> Unit,
)

@ExperimentalGridApi
@Composable
fun Grid(
    config: GridConfigurationScope.() -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable GridScope.() -> Unit,
)
```

```kotlin
@OptIn(ExperimentalFlexBoxApi::class)
@Composable
fun FlexBoxSample() {
    FlexBox(
        config = {
            wrap(FlexWrap.Wrap)
            gap(8.dp)
        },
    ) {
        // All boxes have an intrinsic width of 100.dp.
        // Some grow to fill any remaining space on the row.
        RedRoundedBox()
        BlueRoundedBox()
        GreenRoundedBox(modifier = Modifier.flex { grow(1.0f) })
        OrangeRoundedBox(modifier = Modifier.flex { grow(1.0f) })
        PinkRoundedBox(modifier = Modifier.flex { grow(1.0f) })
    }
}
```

```kotlin
@OptIn(ExperimentalGridApi::class)
@Composable
fun GridSample() {
    Grid(
        config = {
            column(1.fr)
            column(2.fr)
            row(100.dp)
            gap(8.dp)
        },
    ) {
        RedBox(modifier = Modifier.gridItem(row = 1, column = 1))
        BlueBox(modifier = Modifier.gridItem(row = 1, column = 2))
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `FlexBoxConfigScope.direction(value)` | `FlexDirection` (`Row`/`Column`/`RowReverse`/`ColumnReverse`) | `Row` | Main-axis layout direction, like CSS `flex-direction`. |
| `FlexBoxConfigScope.wrap(value)` | `FlexWrap` (`NoWrap`/`Wrap`/`WrapReverse`) | `NoWrap` | Wraps items onto new lines when the main axis runs out of space. |
| `FlexBoxConfigScope.justifyContent(value)` | `FlexJustifyContent` | `Start` | Distributes items along the main axis (like CSS `justify-content`). |
| `FlexBoxConfigScope.alignItems(value)` | `FlexAlignItems` | `Start` | Aligns items along the cross axis (like CSS `align-items`). |
| `FlexBoxConfigScope.alignContent(value)` | `FlexAlignContent` | `Start` | Distributes extra cross-axis space across multiple wrapped lines. |
| `FlexBoxConfigScope.gap(all)` / `rowGap(value)` / `columnGap(value)` | `Dp` | `0.dp` | Spacing between items and between wrapped lines. |
| `FlexBoxConfigScope.maxItemsInEachLine(value)` | `Int` | — | Caps the number of items placed on a single line. |
| `FlexBoxScope.flex(flexConfig)` | `FlexConfig` or `FlexConfigScope.() -> Unit` | — | Per-item flex properties, set via a `FlexConfigScope` DSL: `grow(Float)`, `shrink(Float)`, `basis(FlexBasis` / `Dp` / `Float)`, `alignSelf(FlexAlignSelf)`, `order(Int)`. |
| `GridConfigurationScope.column(...)` / `row(...)` | `Dp` / `Fr` / `Float` / `GridTrackSize` | — | Defines a column/row track's fixed size, flexible `Fr` weight, percentage, or explicit `GridTrackSize` (`Fixed`/`Flex`/`Percentage`/`MinMax`/`MinContent`/`MaxContent`/`Auto`). |
| `GridConfigurationScope.area(areaId, row, column, rowSpan, columnSpan)` | mixed | `rowSpan`/`columnSpan = 1` | Declares a named grid area spanning the given cells, referenced later via `Modifier.gridItem(areaId)`. |
| `GridConfigurationScope.gap(all)` / `rowGap(value)` / `columnGap(value)` | `Dp` | `0.dp` | Spacing between grid tracks. |
| `GridScope.gridItem(row, column, rowSpan, columnSpan, alignment)` | mixed | `row`/`column = GridIndexUnspecified (0)`, `rowSpan`/`columnSpan = 1`, `alignment = Alignment.TopStart` | Places a child at explicit row/column indices (overloads also accept `IntRange`s or a named `areaId`). `row`/`column` are **1-based** (1 is the first row/column, negative values count from the end); the default `GridIndexUnspecified` (`0`) is a sentinel meaning "auto-place", not a real row/column 0. |

## Notes

- Both APIs are experimental/alpha (require `@OptIn(ExperimentalFlexBoxApi::class)` / `@OptIn(ExperimentalGridApi::class)`) and their surface may change; prefer `FlowRow`/`FlowColumn` or the lazy grids for stable, production layouts today.
- `FlexBoxConfig` and `FlexConfig` are `fun interface`s configured through a scope-receiver DSL lambda (`FlexBoxConfigScope` / `FlexConfigScope`), not data-class-style named-argument constructors — there is no `FlexBoxConfig(wrap = ..., justifyContent = ...)` constructor, and the enum is `FlexJustifyContent`, not `JustifyContent`.
- `FlexBox` and `Grid` both compose their `content` eagerly in a single measure/layout pass (no `SubcomposeLayout` or visible-item tracking); neither is a lazy replacement for `LazyVerticalGrid`/`LazyHorizontalGrid` — for large item counts, use `FlowRow`/`FlowColumn` or the lazy grids/lists instead.
- Package: `androidx.compose.foundation.layout`.

## Related

- [FlowRow / FlowColumn](./flow-layout.md)
- [LazyVerticalGrid](./lazyverticalgrid.md)
- [LazyVerticalStaggeredGrid](./lazyverticalstaggeredgrid.md)
