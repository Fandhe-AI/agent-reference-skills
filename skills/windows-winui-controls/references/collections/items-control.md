# ItemsControl

Base class that presents a collection of items. Most practical collection controls (`ListView`, `GridView`, `ListBox`, `ComboBox`, `FlipView`, via `Selector`) derive from it. Can be used directly for basic, non-virtualized item presentation.

## Signature / Usage

```xaml
<ItemsControl ItemsSource="{Binding MyDataCollection}">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding PropertyName}"/>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source used to generate content; typically a list implementing collection-change interfaces. |
| `Items` | collection | Populate directly with `FrameworkElement`/data objects instead of `ItemsSource` (mutually exclusive with it). |
| `ItemTemplate` | `DataTemplate` | Template used to display each item. |
| `ItemsPanel` | `ItemsPanelTemplate` | Panel that controls the layout of items. |
| `DisplayMemberPath` | `string` | Property name/path shown per item when no `ItemTemplate` is set. |
| `ItemContainerStyle` | `Style` | Style applied to each generated item container. |
| `ItemContainerStyleSelector` | `StyleSelector` | Chooses a container style per item based on custom logic. |
| `GroupStyle` | collection of `GroupStyle` | Appearance of each grouping level for grouped data. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from WPF's `System.Windows.Controls.ItemsControl` and Jetpack Compose `LazyColumn`.
- `ItemsControl` does **not** virtualize its layout; prefer `ItemsRepeater` (which does support UI virtualization) as the building block for custom collection controls, or use one of the ready-made controls (`ListView`, `GridView`) that virtualize out of the box.
- Derived classes include `Selector` (parent of `ListView`, `GridView`, `ListBox`, `ComboBox`, `FlipView`), `AutoSuggestBox`, `CommandBarOverflowPresenter`, `MenuFlyoutPresenter`, and `Pivot`.

## Related

- [ItemsRepeater](./items-repeater.md)
- [ListView](./list-view.md)
- [ComboBox](./combo-box.md)
