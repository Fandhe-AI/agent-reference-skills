# GridView

Presents a collection of items in rows and columns that scroll vertically, stacking items horizontally until a row fills and then wrapping to the next row. Best for image-focused collections such as photo or product galleries. Derives from `ListViewBase`, sharing most functionality with `ListView`.

## Signature / Usage

```xaml
<GridView x:Name="myGridView" SelectionMode="None" IsItemClickEnabled="True"
          ItemsSource="{x:Bind Photos}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Data source collection to populate the view. Mutually exclusive with populating `Items` directly. |
| `Items` | `IObservableVector<object>` | Direct item collection, used instead of `ItemsSource`. |
| `ItemTemplate` | `DataTemplate` | Defines the visual for each item; requires `x:DataType` with `x:Bind`. |
| `ItemsPanel` | `ItemsPanelTemplate` | Defaults to `ItemsWrapGrid`, which lays items horizontally and wraps/scrolls vertically. |
| `SelectionMode` | `ListViewSelectionMode` | `None`, `Single` (default), `Multiple`, `Extended`. |
| `SelectedItem` / `SelectedIndex` | `object` / `int` | Selected item and its index (single-selection). |
| `SelectedItems` | `IVector<object>` | Selected items for `Multiple`/`Extended` selection. |
| `IsItemClickEnabled` | `bool` | Enables click-to-invoke instead of/alongside selection. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from Jetpack Compose `LazyVerticalGrid` and WPF grid-like controls.
- Both `ListView` and `GridView` are `ItemsControl` types and share the `ListViewBase` API surface (`SelectAll`, `SelectRange`, `DeselectRange`, `SelectedRanges`, `ItemClick`); see `ListView` for the shared selection-interaction table (None / Single / Multiple / Extended, keyboard/mouse/touch behavior).
- Keep `ItemsWrapGrid` (or `ItemsStackPanel`) as the `ItemsPanel` to retain UI virtualization; swapping in a non-virtualizing panel disables virtualization for the whole view.
- Use a `DataGrid` control (Windows Community Toolkit) instead of `GridView`/`ListView` when a true tabular/multi-column layout is required.

## Related

- [ListView](./list-view.md)
- [ItemsView](./items-view.md)
- [FlipView](./flip-view.md)
