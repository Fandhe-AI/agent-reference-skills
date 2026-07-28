# ListView

Displays data stacked vertically in a single column. Best for text-focused, top-to-bottom-ordered collections such as message lists or search results. Derives from `ListViewBase`, which it shares with `GridView`.

## Signature / Usage

```xaml
<ListView x:Name="ContactsLV" ItemsSource="{x:Bind Contacts}">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:Contact">
            <TextBlock Text="{x:Bind Name}"/>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source collection to populate the view. Mutually exclusive with directly populating `Items` (setting both throws, or the XAML-declared items are ignored). |
| `Items` | `IObservableVector<object>` | Collection to add items to directly (XAML or code), when not using `ItemsSource`. |
| `ItemTemplate` | `DataTemplate` | Defines how each data item is visualized. Requires `x:DataType` when using `x:Bind`. |
| `ItemsPanel` | `ItemsPanelTemplate` | Panel used to lay out item containers. Defaults to `ItemsStackPanel` (vertical list). Must stay `ItemsStackPanel`/`ItemsWrapGrid` to keep virtualization. |
| `SelectionMode` | `ListViewSelectionMode` | `None`, `Single` (default), `Multiple`, `Extended`. |
| `SelectedItem` | `object` | Currently selected data item (single-selection). `null` if none selected. |
| `SelectedIndex` | `int` | Index of `SelectedItem`; `-1` if none selected. |
| `SelectedItems` | `IVector<object>` | Selected items when `SelectionMode` is `Multiple`/`Extended`. |
| `IsItemClickEnabled` | `bool` | When `true`, clicking an item raises `ItemClick` instead of (or in addition to) selecting it. Default `false`. |
| `DisplayMemberPath` | `string` | Property path used for string display when no `ItemTemplate` is set. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.ListView` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` list primitives, and Jetpack Compose `LazyColumn`.
- Do not replace `ItemsPanel` with a non-virtualizing panel — only `ItemsStackPanel` and `ItemsWrapGrid` preserve UI virtualization; other panels force full realization of every item and hurt scroll performance.
- Grouped data requires binding to a `CollectionViewSource`, which enables grouping support as a proxy source.
- For programmatic multi-select, prefer `SelectAll` / `SelectRange` / `DeselectRange` over manipulating `SelectedItems` item-by-item: these keep unrealized items virtualized (only the index range is used) and raise `SelectionChanged` once instead of per item.
- Data virtualization: when `ItemsSource` implements `IItemsRangeInfo`, using `SelectRange`/`DeselectRange` does not populate `AddedItems`/`RemovedItems` in `SelectionChangedEventArgs` (this would force de-virtualization); use `SelectedRanges` instead.

## Related

- [GridView](./grid-view.md)
- [ItemsView](./items-view.md)
- [ItemsControl](./items-control.md)
- [ScrollView](./scroll-view.md)
