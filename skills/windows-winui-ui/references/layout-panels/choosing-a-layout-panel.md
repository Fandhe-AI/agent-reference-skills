# Choosing a Layout Panel

Comparison of the main layout panel controls to help decide which one to use, based on how each positions/sizes children and handles the `Stretch` alignment value.

## Signature / Usage

```xaml
<!-- Grid: fluid, cell-based positioning -->
<Grid ColumnDefinitions="Auto,*" RowDefinitions="Auto,*">
    <!-- children placed with Grid.Row / Grid.Column -->
</Grid>
```

## Options / Props

| Panel | Positioning model | Stretch handling |
|-------|--------------------|-------------------|
| `Canvas` | Absolute, via `Canvas.Left`/`Canvas.Top`; `Canvas.ZIndex` for layering; content not clipped or constrained by panel bounds | Ignored; unsized elements size to content |
| `Grid` | Rows/columns via `Grid.Row`/`Grid.Column`, spans via `Grid.RowSpan`/`Grid.ColumnSpan`; content clipped and constrained to panel bounds | Respected — fills the grid cell if size not set explicitly |
| `RelativePanel` | Relative to panel edges/center and to sibling elements via attached properties; content clipped and constrained to panel bounds | Ignored unless attached-property relationships force stretching (e.g. aligned to both left and right panel edges) |
| `StackPanel` | Single line, vertical or horizontal via `Orientation`; content clipped in the cross-axis, unconstrained (no scrollbars) along the stack axis unless explicitly sized | Respected only in the axis opposite `Orientation` |
| `VariableSizedWrapGrid` | Rows/columns that wrap at `MaximumRowsOrColumns`, with variable cell spans via `RowSpan`/`ColumnSpan`; content clipped and constrained to panel bounds | Ignored; cells sized by `ItemHeight`/`ItemWidth` or the first cell |

## Notes

- `Canvas` is the only panel that doesn't support fluid resizing; use it for graphics or small static regions inside an otherwise adaptive UI.
- `Grid` and `RelativePanel` both constrain and clip content to the panel bounds, so scrollable content shows scrollbars when needed; `StackPanel` does not constrain content along its stacking axis, so explicit sizing is needed to make scrollbars appear.
- For `ItemsControl`-hosted collections, prefer the virtualizing `ItemsStackPanel` (default for `ListView`) or `ItemsWrapGrid` (default for `GridView`) over `StackPanel`/`VariableSizedWrapGrid`, which are not virtualized.
- Combine panel choice with `AdaptiveTrigger`/`VisualState` breakpoints for layouts that need structural changes beyond what a single fluid panel can express.

## Related

- [Canvas](./canvas.md)
- [Grid](./grid.md)
- [RelativePanel](./relativepanel.md)
- [StackPanel](./stackpanel.md)
- [VariableSizedWrapGrid](./variablesizedwrapgrid.md)
- [Panel](./panel.md)
- [Responsive Layouts](./responsive-layouts.md)
