# ListView and GridView data virtualization

Incremental and random-access data virtualization patterns for large `ListView`/`GridView` data sets, via `ISupportIncrementalLoading` and `IItemsRangeInfo`.

## Signature / Usage

```csharp
public class IncrementalLoadingCollection : ObservableCollection<Item>, ISupportIncrementalLoading
{
    public bool HasMoreItems => /* true if more items remain */ true;

    public IAsyncOperation<LoadMoreItemsResult> LoadMoreItemsAsync(uint count)
    {
        return LoadMoreItemsAsyncImpl(count).AsAsyncOperation();
    }

    private async Task<LoadMoreItemsResult> LoadMoreItemsAsyncImpl(uint count)
    {
        var newItems = await FetchFromBackendAsync(count);
        foreach (var item in newItems) Add(item);
        return new LoadMoreItemsResult { Count = (uint)newItems.Count };
    }
}
```

## Options / Props

| Technique | Required interfaces | Behavior |
|-----------|----------------------|----------|
| Incremental data virtualization | `IList`, `INotifyCollectionChanged`/`IObservableVector<T>`, `ISupportIncrementalLoading` | Sequential loading; `HasMoreItems` / `LoadMoreItemsAsync(count)` called as the user approaches the end of loaded data |
| Random access data virtualization | `IList`, `INotifyCollectionChanged`/`IObservableVector<T>`, optionally `IItemsRangeInfo`, `ISelectionInfo` | Fetch from an arbitrary index range; `IItemsRangeInfo` reports the viewport range plus a buffer/focused/first-item set so the data source can fetch and prune a cache |

## Notes

- `ISupportIncrementalLoading` and `IItemsRangeInfo` remain available in Windows App SDK, so the same incremental/random-access patterns from UWP apply to WinUI 3 apps.
- Make data-fetch requests asynchronous — never block the UI thread; prefer moderately sized ("chunky, not chatty") batch requests.
- `IItemsRangeInfo` is per-instance of an items control (it holds control-specific state); if multiple controls share a data source, use a separate instance per control (a shared cache with more complex pruning logic is possible).
- Combine with `ListViewBase.ShowsScrollingPlaceholders` and `x:Phase` (see `optimize-gridview-and-listview.md`) so partially-loaded data still scrolls smoothly.

## Related

- [Optimize ListView and GridView performance](./optimize-gridview-and-listview.md)
