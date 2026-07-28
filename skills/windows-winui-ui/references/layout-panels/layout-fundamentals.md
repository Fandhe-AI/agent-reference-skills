# Layout Fundamentals

Core sizing and positioning properties shared by every `FrameworkElement`, and the Grid-specific attached properties used to place children in rows/columns.

## Signature / Usage

```xaml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto"/>
        <ColumnDefinition/>
        <ColumnDefinition Width="44"/>
        <ColumnDefinition Width="2*"/>
    </Grid.ColumnDefinitions>
    <TextBlock Grid.Column="0" Text="Column 1 sizes to its content." FontSize="24"/>
</Grid>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Height / Width | `double` or `Auto`/`NaN` | Suggested size; `Auto` sizes to content/container; default is `NaN` (unset) |
| ActualHeight / ActualWidth | `double` (read-only) | Rendered size at runtime; changes fire `SizeChanged` |
| MinWidth / MaxWidth / MinHeight / MaxHeight | `double` | Constrains fluid sizing without fixing it |
| HorizontalAlignment / VerticalAlignment | `Left`/`Center`/`Right`/`Stretch`, `Top`/`Center`/`Bottom`/`Stretch` | Position within the parent container; `Stretch` is the default and fills available space (overridden by some controls, e.g. `Button`) |
| Grid.Row / Grid.Column (attached) | `int` | Row/column index (0-based) of a Grid child |
| Grid.RowSpan / Grid.ColumnSpan (attached) | `int` | Number of rows/columns a Grid child spans |
| RowDefinitions / ColumnDefinitions | collection | Rows/columns of a Grid; each `Height`/`Width` may be fixed (`44`), `Auto`, or star (`*`, `2*`) sized |

## Notes

- Star (`*`) sizing distributes remaining space (after `Auto` and fixed columns/rows are resolved) by weighted proportion; `2*` is twice as wide/tall as `*`.
- How `Stretch` behaves depends on the parent panel: in a `Grid` cell it fills the cell; in a `Canvas` the element sizes to its content instead (Canvas ignores `Stretch`).
- Use the read-only `ActualHeight`/`ActualWidth` to query runtime size instead of `Height`/`Width`.
- `Visibility="Collapsed"` removes an element from layout entirely (no space reserved); use `x:Load` to defer creation of collapsed elements for startup performance.

## Related

- [Grid](./grid.md)
- [Alignment, Margin, and Padding](./alignment-margin-padding.md)
- [Choosing a Layout Panel](./choosing-a-layout-panel.md)
- [Responsive Layouts](./responsive-layouts.md)
