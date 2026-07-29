# ISupportIncrementalLoading

Interface that a collection implements to support incremental (virtualized) loading, so an items control can request more items on demand instead of the whole source being loaded up front.

## Signature / Usage

```csharp
public interface ISupportIncrementalLoading
{
    bool HasMoreItems { get; }
    IAsyncOperation<LoadMoreItemsResult> LoadMoreItemsAsync(uint count);
}
```

```csharp
// Typically combined with ObservableCollection<T> (which already provides
// INotifyCollectionChanged) via a custom base class.
public class IncrementalLoadingCollection<T> : ObservableCollection<T>, ISupportIncrementalLoading
{
    public bool HasMoreItems => /* true while more items remain on the server */ true;

    public IAsyncOperation<LoadMoreItemsResult> LoadMoreItemsAsync(uint count)
    {
        return AsyncInfo.Run(async (c) =>
        {
            var items = await FetchNextPageAsync(count);
            foreach (var item in items)
            {
                Add(item);
            }
            return new LoadMoreItemsResult { Count = (uint)items.Count };
        });
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| HasMoreItems | `bool` (get) | Whether the source has more items available to load. |
| LoadMoreItemsAsync(count) | `IAsyncOperation<LoadMoreItemsResult>` | Called by the items control to request up to `count` more items; the returned result's `Count` reports how many were actually added. |

## Notes

- Bind an `ItemsControl` (e.g. `ListView`, `GridView`) to a collection implementing this interface; the control calls `LoadMoreItemsAsync` automatically as the user scrolls near the end of the loaded items.
- Combine with `INotifyCollectionChanged` (`ObservableCollection<T>` already implements it) so newly loaded items are reflected in the UI as they're added.
- Only one `LoadMoreItemsAsync` call should be in flight at a time — guard re-entrancy in the implementation.

## Related

- [ItemsSource binding](./itemssource-binding.md)
- [INotifyCollectionChanged](./inotifycollectionchanged.md)
- [ObservableCollection](./observablecollection.md)
