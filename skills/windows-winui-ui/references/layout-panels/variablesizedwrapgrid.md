# VariableSizedWrapGrid

Provides a grid-style layout panel where each tile/cell can be a variable size based on content, wrapping to a new row or column once a maximum count is reached.

## Signature / Usage

```xaml
<VariableSizedWrapGrid>
  <Image Name="MyBigImage"
    VariableSizedWrapGrid.ColumnSpan="2"
    VariableSizedWrapGrid.RowSpan="2" />
</VariableSizedWrapGrid>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Orientation | `Orientation` | `Vertical` adds items in columns then wraps left-to-right; `Horizontal` adds items in rows then wraps top-to-bottom (inherited from `WrapGrid` base) |
| MaximumRowsOrColumns | `int` | Number of rows/columns before wrapping |
| ItemHeight / ItemWidth | `double` | Explicit cell size; if unset, taken from the first cell's size |
| VariableSizedWrapGrid.RowSpan (attached) | `int` | Rows a child spans; must be positive; values above the total are clamped |
| VariableSizedWrapGrid.ColumnSpan (attached) | `int` | Columns a child spans; must be positive; values above the total are clamped |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel`. Distinct from CSS/JS "wrap grid" layouts and Jetpack Compose staggered grids.
- `Stretch` alignment for children is ignored; children are sized per `ItemHeight`/`ItemWidth`.
- Not supported as the `ItemsPanel` of a `ListView`; usable as the `ItemsPanel` of a `GridView` or `ItemsControl`, but its content is not virtualized, which can hurt performance with large data sets.
- `WrapGrid` is a related, simpler panel with better handling of content that would otherwise be clipped by `Grid`.

## Related

- [ItemsWrapGrid](./itemswrapgrid.md)
- [WrapPanel](./wrappanel.md)
- [Grid](./grid.md)
- [Panel](./panel.md)
