# Optimize XAML layout

Reducing panel nesting, using single-cell `Grid`s for overlap, panel built-in border properties, and choosing between `SizeChanged`/`LayoutUpdated`.

## Signature / Usage

```xaml
<!-- Single-cell Grid for overlapping content (no RowDefinitions/ColumnDefinitions) -->
<Grid>
    <Ellipse Fill="Red" Width="200" Height="200" />
    <TextBlock Text="Test" HorizontalAlignment="Center" VerticalAlignment="Center" />
</Grid>
```

## Options / Props

| Technique | Effect |
|-----------|--------|
| Flatten nested panels (e.g. nested `StackPanel` → single `Grid`/`RelativePanel`) | Reduces non-pixel-producing elements in the tree; biggest win when the structure is repeated (e.g. inside a `DataTemplate`) |
| Single-cell `Grid` (no row/column definitions) | Optimized path for overlapping elements, vs. margins/alignment tricks in other panels |
| Panel built-in border properties (`BorderBrush`, `BorderThickness`, `CornerRadius`, `Padding`) on `Grid`/`StackPanel`/`RelativePanel`/`ContentPresenter` | Avoids adding a separate `Border` element |
| `SizeChanged` vs `LayoutUpdated` | `SizeChanged` fires locally when an element's size changes; `LayoutUpdated` fires globally on every element whenever any element updates — prefer `SizeChanged` for performance |

## Notes

- The largest layout-performance gains come from reducing structure repeated many times (e.g. inside `ListView`/`GridView` item templates), not from trimming a single top-level panel.
- Panel choice (`Grid` vs `StackPanel` vs `RelativePanel`) is not itself a major performance differentiator — all XAML panels are optimized similarly; choose based on the closest layout-behavior match.
- Important API referenced: `Microsoft.UI.Xaml.Controls.Panel` (WinUI 3 / Windows App SDK namespace).

## Related

- [Optimize XAML loading](./optimize-xaml-loading.md)
- [Optimize ListView and GridView performance](./optimize-gridview-and-listview.md)
