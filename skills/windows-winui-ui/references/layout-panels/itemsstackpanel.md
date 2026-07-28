# ItemsStackPanel

Arranges the items of an `ItemsControl` into a single line, stacked vertically or horizontally, with support for pixel-based UI virtualization and grouped layouts.

## Signature / Usage

```xaml
<ListView>
    <ListView.ItemsPanel>
        <ItemsPanelTemplate>
            <ItemsStackPanel Orientation="Horizontal"/>
        </ItemsPanelTemplate>
    </ListView.ItemsPanel>
</ListView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Orientation | `Orientation` | `Vertical` (default) stacks top-to-bottom; `Horizontal` stacks left-to-right |
| GroupHeaderPlacement | enum | Placement of group headers relative to their group |
| GroupPadding | `Thickness` | Padding applied around each group when items are grouped |
| CacheLength | `double` | Size of the buffer of realized-but-off-screen items used for virtualization |
| AreStickyGroupHeadersEnabled | `bool` | Whether group headers stick to the leading edge while scrolling |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel` (via `VirtualizingPanel`). Distinct from `StackPanel`, which is not virtualized and can be used anywhere, not only as an `ItemsPanel`.
- Usable only as the `ItemsPanel` of an `ItemsControl` that displays more than one item at a time; not usable with single-item controls like `ComboBox` or `FlipView`. It is the default `ItemsPanel` for `ListView`.

## Related

- [StackPanel](./stackpanel.md)
- [ItemsWrapGrid](./itemswrapgrid.md)
- [Panel](./panel.md)
