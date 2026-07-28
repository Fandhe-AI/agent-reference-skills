# ItemsView

Displays a collection of items using a pluggable, swappable layout system, while preserving selection when the layout changes at run time. Built from `ItemsRepeater`, `ScrollView`, `ItemContainer`, and `ItemCollectionTransitionProvider`.

## Signature / Usage

```xaml
<ItemsView ItemsSource="{x:Bind Photos}" Width="480" Height="400"
           ItemTemplate="{StaticResource PhotoItemTemplate}">
    <ItemsView.Layout>
        <UniformGridLayout MaximumRowsOrColumns="3" MinRowSpacing="5" MinColumnSpacing="5"/>
    </ItemsView.Layout>
</ItemsView>
```

```xaml
<DataTemplate x:Key="PhotoItemTemplate" x:DataType="local:Photo">
    <ItemContainer AutomationProperties.Name="{x:Bind Title}">
        <Image Source="{x:Bind PhotoBitmapImage, Mode=OneWay}"/>
    </ItemContainer>
</DataTemplate>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source collection. Unlike `ItemsControl`-derived controls, `ItemsView` has **no** `Items` collection — items can only be set via `ItemsSource`. |
| `ItemTemplate` | `DataTemplate` | Root element **must** be an `ItemContainer`, or an exception is thrown. |
| `Layout` | `Layout` | Layout strategy for arranging item containers. See table below. |
| `SelectionMode` | `ItemsViewSelectionMode` | `None`, `Single` (default), `Multiple`, `Extended`. |
| `SelectedItem` | `object` | Selected item for `Single`/`Extended` mode. |
| `SelectedItems` | `IVector<object>` | Selected items for `Multiple`/`Extended` mode. |
| `IsItemInvokedEnabled` | `bool` | When `true`, clicking an item raises `ItemInvoked`. |
| `ScrollView` | `ScrollView` | The inner `ScrollView` used for scrolling/zooming, exposed for advanced scenarios. |

### Layout options

| Layout | Key properties | Use case |
|--------|-----------------|----------|
| `StackLayout` (default) | `Orientation`, `Spacing` | Simple vertical (or horizontal) list. |
| `UniformGridLayout` | `Orientation`, `MaximumRowsOrColumns`, `MinItemWidth`/`MinItemHeight`, `MinColumnSpacing`/`MinRowSpacing`, `ItemsStretch`, `ItemsJustification` | Grid of equally sized items. |
| `LinedFlowLayout` | `LineHeight`, `LineSpacing`, `MinItemSpacing`, `ItemsJustification`, `ItemsStretch` | Fixed-height, variable-width wrapping layout; recommended for image collections; has built-in add/remove/resize animations. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from Jetpack Compose `LazyGrid`/`LazyColumn` and the JS `@ark-ui/react` collection primitives.
- Selection APIs (`Select`, `SelectAll`, `Deselect`, `InvertSelection`) ignore `SelectionMode` and work even when it is `None`/`Single` — useful for programmatic "select all" buttons, but be aware they bypass the configured interaction policy.
- Data/UI virtualization: like ListView/GridView, ItemsView supports UI and data virtualization; keep item templates lightweight and avoid forcing eager realization (e.g., avoid iterating `SelectedItems` item-by-item for bulk selection — use `Select`/`SelectAll`/`InvertSelection` instead).
- Prefer `ItemsView` over hand-rolling `ItemsRepeater` + `ScrollView` when out-of-the-box selection, layout switching, and accessibility are sufficient.

## Related

- [ItemsRepeater](./items-repeater.md)
- [ItemContainer](./item-container.md)
- [ScrollView](./scroll-view.md)
- [ListView](./list-view.md)
