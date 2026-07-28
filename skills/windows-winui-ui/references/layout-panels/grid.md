# Grid

Defines a flexible grid area that consists of columns and rows. Child elements are measured and arranged according to their row/column assignments, set via the `Grid.Row` and `Grid.Column` attached properties.

## Signature / Usage

```xaml
<Grid x:Name="LayoutRoot" Background="#555555"
      Width="400" Height="300"
      ColumnDefinitions="250, 150"
      RowDefinitions="Auto, 2*, *">
    <TextBlock Grid.Row="0" Grid.Column="0" Grid.ColumnSpan="2"
       Margin="10" FontWeight="Bold" Text="Contoso Corporation"
       HorizontalAlignment="Center" VerticalAlignment="Center" />
</Grid>
```

Full-fledged syntax with `Grid.RowDefinitions`/`Grid.ColumnDefinitions` element blocks is also available when data binding or extra properties (e.g. `MinHeight`) are needed on a definition.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| RowDefinitions | `RowDefinitionCollection` (or comma-separated string) | One `RowDefinition` per row; sets `Height` (fixed, `Auto`, or `*` star sizing) |
| ColumnDefinitions | `ColumnDefinitionCollection` (or comma-separated string) | One `ColumnDefinition` per column; sets `Width` |
| Grid.Row / Grid.Column (attached) | `int` | Assigns a child to a row/column (0-based); default 0 |
| Grid.RowSpan / Grid.ColumnSpan (attached) | `int` | Number of rows/columns a child spans |
| ColumnSpacing / RowSpacing | `double` | Uniform spacing between columns/rows |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel`. Distinct from `System.Windows.Controls.Grid` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` grid primitives, and Jetpack Compose's `Grid`-like layouts.
- By default a Grid has one row and one column.
- `Margin` on children sets distance to grid-cell boundaries; `HorizontalAlignment`/`VerticalAlignment` position a child within its cell.
- An element spanning rows/columns can force a nominally 0-height/width row/column to grow to fit it.
- For more control over per-item sizing than Grid offers, consider `VariableSizedWrapGrid`.

## Related

- [StackPanel](./stackpanel.md)
- [Canvas](./canvas.md)
- [Panel](./panel.md)
- [Layout Fundamentals](./layout-fundamentals.md)
