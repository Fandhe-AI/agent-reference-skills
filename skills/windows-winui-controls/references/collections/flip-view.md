# FlipView

Displays one item at a time from a collection, letting the user "flip" through items via swipe, navigation buttons, or arrow keys. Best for small-to-medium image collections (up to ~25 items), such as photo albums or product detail galleries.

## Signature / Usage

```xaml
<FlipView x:Name="Gallery" MaxWidth="400" Height="270" ItemsSource="{x:Bind Pictures}">
    <FlipView.ItemTemplate>
        <DataTemplate x:DataType="x:String">
            <Image Source="{x:Bind Mode=OneWay}"/>
        </DataTemplate>
    </FlipView.ItemTemplate>
</FlipView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source collection. Mutually exclusive with adding items directly to `Items`. |
| `Items` | collection | Direct item collection (wrapped automatically in `FlipViewItem` containers). |
| `ItemTemplate` | `DataTemplate` | Defines how each item is displayed. |
| `ItemsPanel` | `ItemsPanelTemplate` | Defaults to a horizontal flip; use a vertical `VirtualizingStackPanel`/`StackPanel` to flip vertically. |
| `ItemContainerStyle` | `Style` | Styles the generated `FlipViewItem` container. |
| `SelectedIndex` | `int` | Index of the currently displayed item; bind two-way with a `PipsPager.SelectedPageIndex` for a page indicator. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from carousel/flip-view-like components in other frameworks.
- Avoid FlipView for large collections beyond ~25 items (except photo albums, which conventionally switch to FlipView after a photo is selected from a grid view) — the repetitive flip motion becomes tedious; use `ListView`/`GridView`/`ItemsView` instead.
- For collections of 10+ items, pair FlipView with a contextual indicator: `PipsPager` for simple dot pagination, or a thumbnail film strip for richer navigation.
- Bi-directional/RTL: mirror the forward/back navigation buttons for RTL languages (right button navigates backward, left button navigates forward).

## Related

- [ListView](./list-view.md)
- [GridView](./grid-view.md)
