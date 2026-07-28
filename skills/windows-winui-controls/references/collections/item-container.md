# ItemContainer

Represents the container for an individual item in an `ItemsView` collection control. Derives from `Control`; `SelectorBarItem` derives from it.

## Signature / Usage

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
| `Child` | `UIElement` | The content of the item (XAML content property — the direct child written inside `<ItemContainer>...</ItemContainer>`). |
| `IsSelected` | `bool` | Whether the item is currently selected. |
| `CanUserSelect` | `bool` | Whether the user can select this item. |
| `CanUserInvoke` | `bool` | Whether the user can invoke this item. |
| `MultiSelectMode` | `ItemContainerMultiSelectMode` | Controls multi-select interaction behavior for this container. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Not related to any similarly-named container types in other frameworks.
- The root element of an `ItemsView.ItemTemplate` **must** be an `ItemContainer`, or an exception is thrown at run time — this is how `ItemsView` shows selection states and other per-item visualizations.
- `SelectorBarItem` is a derived `ItemContainer`; it inherits `IsSelected` (synchronized with `SelectorBar.SelectedItem`) and `Child`, though `SelectorBarItem.Text`/`Icon` are the recommended way to set content rather than `Child`.

## Related

- [ItemsView](./items-view.md)
- [SelectorBar](./selector-bar.md)
