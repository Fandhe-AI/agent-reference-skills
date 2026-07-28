# ItemsSource binding

Binding an items control's `ItemsSource` property (`ItemsControl.ItemsSource`, implemented by `ListView`, `GridView`, `ComboBox`, etc.) to a collection, with an `ItemTemplate` describing how each item renders.

## Signature / Usage

```xaml
<ListView ItemsSource="{x:Bind ViewModel.Recordings}"
          HorizontalAlignment="Center" VerticalAlignment="Center">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:Recording">
            <StackPanel Orientation="Horizontal" Margin="6">
                <SymbolIcon Symbol="Audio" Margin="0,0,12,0"/>
                <StackPanel>
                    <TextBlock Text="{x:Bind ArtistName}" FontWeight="Bold"/>
                    <TextBlock Text="{x:Bind CompositionName}"/>
                </StackPanel>
            </StackPanel>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

```csharp
public class RecordingViewModel
{
    public List<Recording> Recordings { get; } = new();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ItemsSource | `IEnumerable` (C#) / `IVector` (C++/WinRT) | The collection to display. `List<T>` for static (one-time) collections; `ObservableCollection<T>` for collections that change at run time and must notify the UI. |
| ItemTemplate | `DataTemplate` | Per-item rendering template. Requires `x:DataType` for `{x:Bind}` to compile-time validate bindings inside it. |

## Notes

- Without an `ItemTemplate`, the framework falls back to `ToString()` per item (returns the type name by default) — always supply an `ItemTemplate` for anything beyond debugging.
- For a details/master-details view, either bind the details panel to `SelectedItem` of the items control (`{Binding SelectedItem, ElementName=myListView}`), or bind both the items control and the details view to a shared `CollectionViewSource`. Both approaches currently require `{Binding}`, not `{x:Bind}`, because `{x:Bind}` doesn't do element-to-`SelectedItem` or `DataContext`-relative binding the same way.
- For very large or streaming sources, bind to a type implementing `ISupportIncrementalLoading` (plus `INotifyCollectionChanged`) instead of loading the entire collection up front.
- Custom collection classes: implement `IList<object>`/`IEnumerable` (or extend `List<T>`) to support binding; extend `ObservableCollection<T>` or implement `IList` + `INotifyCollectionChanged` to support collection-change notification. Binding to generic `IList<T>`/`IEnumerable<T>` directly (without deriving a concrete class) is not supported.

## Related

- [ObservableCollection](./observablecollection.md)
- [INotifyCollectionChanged](./inotifycollectionchanged.md)
- [CollectionViewSource](./collectionviewsource.md)
- [{x:Bind} markup extension](./x-bind-markup-extension.md)
