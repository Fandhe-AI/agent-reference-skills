# ItemsWrapGrid

Positions child elements sequentially from left to right or top to bottom in an `ItemsControl` that shows multiple items; wraps to the next row/column at the container edge. Supports pixel-based UI virtualization and grouped layouts.

## Signature / Usage

```xaml
<GridView>
    <GridView.ItemsPanel>
        <ItemsPanelTemplate>
            <ItemsWrapGrid Orientation="Horizontal"/>
        </ItemsPanelTemplate>
    </GridView.ItemsPanel>
</GridView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Orientation | `Orientation` | `Vertical` (default) fills columns top-to-bottom then wraps left-to-right; `Horizontal` fills rows left-to-right then wraps top-to-bottom |
| ItemWidth / ItemHeight | `double` | Fixed size applied to each item cell |
| MaximumRowsOrColumns | `int` | Number of rows/columns before wrapping, overriding container-edge wrapping |
| GroupPadding | `Thickness` | Padding applied around each group when items are grouped |
| GroupHeaderPlacement | enum | Placement of group headers relative to their group |
| CacheLength | `double` | Size of the buffer of realized-but-off-screen items used for virtualization |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel` (via `VirtualizingPanel`/`WrapGrid`). Distinct from `VariableSizedWrapGrid` and CSS grid wrap layouts.
- Usable only as the `ItemsPanel` of an `ItemsControl` that displays more than one item at a time; not usable with single-item controls like `ComboBox` or `FlipView`. It is the default `ItemsPanel` for `GridView`.

## Related

- [ItemsStackPanel](./itemsstackpanel.md)
- [VariableSizedWrapGrid](./variablesizedwrapgrid.md)
- [Panel](./panel.md)
