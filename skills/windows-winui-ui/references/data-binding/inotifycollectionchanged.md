# INotifyCollectionChanged

Interface that a collection implements to notify the binding engine when items are added, removed, or the collection otherwise changes, so items controls can refresh incrementally instead of re-reading the whole collection.

## Signature / Usage

```csharp
public interface INotifyCollectionChanged
{
    event NotifyCollectionChangedEventHandler CollectionChanged;
}
```

```csharp
// The most common way to get INotifyCollectionChanged support in C# is to
// use (or derive from) ObservableCollection<T>, which implements it already.
public class RecordingViewModel
{
    public ObservableCollection<Recording> Recordings { get; } = new();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CollectionChanged | `NotifyCollectionChangedEventHandler` event | Raised when items are added, removed, replaced, moved, or the collection is reset. |

## Notes

- In C# (CLR), use `System.Collections.Specialized.INotifyCollectionChanged` — implemented already by `System.Collections.ObjectModel.ObservableCollection<T>`; extend `ObservableCollection<T>` (or implement `IList` + this interface) for a custom observable collection.
- In C++/WinRT, the WinRT equivalent is `IObservableVector<IInspectable>` (e.g. `winrt::single_threaded_observable_vector<T>`) or `IBindableObservableVector` (`Microsoft.UI.Xaml.Interop.IBindableObservableVector`).
- Only needed when a bound list must reflect items being added/removed at run time. A static `List<T>` is sufficient (and cheaper) for collections that don't change after initialization.
- Combine with `ISupportIncrementalLoading` on the collection to support incremental/virtualized loading of large data sources into list controls.

## Related

- [ObservableCollection](./observablecollection.md)
- [INotifyPropertyChanged](./inotifypropertychanged.md)
- [ItemsSource binding](./itemssource-binding.md)
