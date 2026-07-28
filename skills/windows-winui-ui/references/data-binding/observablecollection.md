# ObservableCollection<T>

Generic collection (`System.Collections.ObjectModel.ObservableCollection<T>`) that implements `INotifyCollectionChanged`, providing change notifications to bound items controls when items are added or removed.

## Signature / Usage

```csharp
using System.Collections.ObjectModel;

public class RecordingViewModel
{
    public ObservableCollection<Recording> Recordings { get; } = new();

    public RecordingViewModel()
    {
        Recordings.Add(new Recording { ArtistName = "Johann Sebastian Bach" });
    }
}
```

```xaml
<ListView ItemsSource="{x:Bind ViewModel.Recordings}" />
```

## Notes

- Use `ObservableCollection<T>` (one-way/two-way bind) when the UI must update as items are added/removed at run time; use `List<T>` (one-time bind) for a fixed collection that doesn't change after initialization — cheaper and avoids listener overhead.
- Due to a known WinUI Release-mode bug with .NET 8+, prefer `List<T>` for static collections when you don't need runtime collection-change notification.
- For items controls to update when a *property* of an item in the collection changes (not just collection membership), those item objects should implement `INotifyPropertyChanged`.
- In C++/WinRT, the equivalent is `IObservableVector<IInspectable>`, e.g. `winrt::single_threaded_observable_vector<T>()`.

## Related

- [INotifyCollectionChanged](./inotifycollectionchanged.md)
- [INotifyPropertyChanged](./inotifypropertychanged.md)
- [ItemsSource binding](./itemssource-binding.md)
- [CollectionViewSource](./collectionviewsource.md)
