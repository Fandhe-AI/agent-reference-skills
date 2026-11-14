# TableView

Experimental WinUI 3 control (`Microsoft.UI.Xaml.Controls.Tabular.TableView`) that displays a collection of items in rows and columns, with sorting, filtering, grouping, column resizing, frozen leading columns, single-row selection, and opt-in cell editing. Rows are virtualized.

## Signature / Usage

Merge `TabularControlsResources` after `XamlControlsResources` in *App.xaml* (without it, the app throws a XAML parse exception when it first lays out a TableView):

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls" />
            <TabularControlsResources xmlns="using:Microsoft.UI.Xaml.Controls.Tabular" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

Declare the namespace for markup (C# files: `using Microsoft.UI.Xaml.Controls.Tabular;`):

```xaml
xmlns:tabular="using:Microsoft.UI.Xaml.Controls.Tabular"
```

TableView doesn't generate columns from the data; add one column per value. A table with four text columns:

```xaml
<tabular:TableView
    x:Name="ItemsTable"
    Height="280"
    AutomationProperties.Name="Inventory items"
    ItemsSource="{x:Bind Items}">
    <tabular:TableView.Columns>
        <tabular:TableViewTextColumn Binding="{Binding Id}" Header="ID" Width="80" />
        <tabular:TableViewTextColumn Binding="{Binding Name}" Header="Name" Width="*" />
        <tabular:TableViewTextColumn Binding="{Binding Category}" Header="Category" Width="180" />
        <tabular:TableViewTextColumn Binding="{Binding Value}" Header="Value" Width="Auto" />
    </tabular:TableView.Columns>
</tabular:TableView>
```

Filter, sort, and group from code by wrapping the collection in a `TableViewSource` and binding `ItemsSource` to it:

```csharp
public TableViewSource TableSource { get; }

public InventoryPage()
{
    TableSource = TableViewSource.From(Items);
    InitializeComponent();
}
```

```csharp
TableSource
    .Filter(item => ((TableViewSampleItem)item).Value >= 25)
    .Sort("Name", SortDirection.Ascending);
```

```csharp
// Group the rows by category.
TableSource.GroupBy(item => ((TableViewSampleItem)item).Category);
```

A template column for custom cell content (set `SortMemberPath` to keep it sortable):

```xaml
<tabular:TableViewTemplateColumn Header="Value" SortMemberPath="Value" Width="220">
    <tabular:TableViewTemplateColumn.CellTemplate>
        <DataTemplate x:DataType="local:TableViewSampleItem">
            <Grid Padding="12,0" ColumnSpacing="12">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="*" />
                    <ColumnDefinition Width="32" />
                </Grid.ColumnDefinitions>
                <ProgressBar
                    VerticalAlignment="Center"
                    AutomationProperties.AccessibilityView="Raw"
                    IsHitTestVisible="False"
                    Maximum="100"
                    Value="{x:Bind Value}" />
                <TextBlock
                    Grid.Column="1"
                    HorizontalAlignment="Right"
                    VerticalAlignment="Center"
                    Text="{x:Bind Value}" />
            </Grid>
        </DataTemplate>
    </tabular:TableViewTemplateColumn.CellTemplate>
</tabular:TableViewTemplateColumn>
```

## Options / Props

| Member | Type / owner | Description |
| --- | --- | --- |
| `Columns` | TableView | Content property; the column collection. |
| `ItemsSource` | TableView | Collection or `TableViewSource`. |
| `SelectionMode` | TableView | `Single` (default) or `None`. `SelectedItem` / `SelectedIndex` are read-only; use `Select`, `Deselect`, `DeselectAll`, `IsSelected`. |
| `CanUserSortColumns` / `CanUserResizeColumns` | TableView | Set `False` to prevent user sorting / resizing. |
| `IsReadOnly` | TableView, column | Cells are read-only by default; set the table's `IsReadOnly` to `False` to allow editing, and a column's to `True` to keep it read-only. |
| `EmptyTemplate` | TableView | Shown when no rows match or `ItemsSource` is `null` / empty. |
| `GroupHeaderTemplate` | TableView | Template for group headers; data is `TableViewGroupInfo` (`KeyText`, `ItemCountText`). |
| `Header`, `HeaderTemplate`, `Width`, `MinWidth`, `MaxWidth`, `ActualWidth`, `Visibility` | column | Header text and width. Width: pixels (default 120), `Auto`, or star. Default minimum width 20 px. |
| `CanSort`, `CanResize`, `SortCycle`, `SortMemberPath`, `FrozenEdge` | column | `SortCycle`: `AscendingDescending` (default), `AscendingDescendingNone`, `DescendingAscending`, `DescendingAscendingNone`. `FrozenEdge`: `Leading` freezes leading columns. |
| `Binding` | `TableViewTextColumn` | A `{Binding}` (not `{x:Bind}`) naming the displayed property. |
| `CellTemplate` | `TableViewTemplateColumn` | `DataTemplate` for each cell; data is the row item. |
| `SortByColumn`, `ToggleSortDirection`, `ClearSort` | TableView | Sort from code. |
| `CommitEdit`, `CancelEdit`, `IsEditing` | TableView | Control the cell editor. |
| `ExpandAllGroups`, `CollapseAllGroups` | TableView | Expand / collapse every group. |
| `From`, `Filter`, `ClearFilter`, `Sort`, `GroupBy`, `ClearGroupBy` | `TableViewSource` | Reshape the displayed rows without changing the collection. |
| `SelectionChanged`, `Sorting`, `Sorted`, `BeginningEdit`, `CellEditEnding` | TableView events | Selection, sort, and edit notifications. |

## Notes

- **Experimental only.** Available starting in Windows App SDK 2.5.4-experimental; the APIs might change or be removed, and the docs say not to use them in production apps. Using them produces warnings CS8305 (C#) and WMC1501 (XAML), which are expected.
- Limitations in 2.5.4-experimental: single-row selection only; one-column sorting and no keyboard sorting from headers; one grouping level; no column reordering or row headers; only leading columns can be frozen; columns aren't virtualized (designed for about 5 to 50 columns); not a DataGrid replacement.
- Stable-channel alternatives: `ItemsView` or `ListView` with a columnar item template (see the collections pages `items-view.md` and `list-view.md`), or a supported third-party grid control. The community `WinUI.TableView` NuGet package is a separate open-source control with a different API and isn't part of the Windows App SDK.
- A property change on an item doesn't re-filter, re-sort, or re-group that item; rows are reshaped on the next collection change or when you reapply the operation. Use `TableViewSource` and its collection on the UI thread only, and with one TableView at a time.
- If you publish with trimming or Native AOT, mark item classes and comparer classes `partial` (C#/WinRT interop requirement).
- Distinct from the `ItemsView` / `ListView` / `GridView` controls in this skill and from WPF `DataGrid`; this is `Microsoft.UI.Xaml.Controls.Tabular` only.
- The official guide also covers custom comparers, edit events and validation, appearance, tooltips, and keyboard support; read the source page for those.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/table-view (fetched 2026-11-14; page ms.date not re-checked). Index: https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/ (fetched 2026-11-14).

## Related

- [items-view.md](./items-view.md)
- [list-view.md](./list-view.md)
- [grid-view.md](./grid-view.md)
