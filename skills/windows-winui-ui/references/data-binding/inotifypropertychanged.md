# INotifyPropertyChanged

Interface used to notify binding clients that a property value has changed, making a class an *observable* binding source for `OneWay`/`TwoWay` bindings.

## Signature / Usage

```csharp
public interface INotifyPropertyChanged
{
    event PropertyChangedEventHandler PropertyChanged;
}
```

```csharp
using System.ComponentModel;
using System.Runtime.CompilerServices;

public class HostViewModel : INotifyPropertyChanged
{
    private string nextButtonText;

    public event PropertyChangedEventHandler PropertyChanged = delegate { };

    public HostViewModel()
    {
        NextButtonText = "Next";
    }

    public string NextButtonText
    {
        get { return nextButtonText; }
        set
        {
            nextButtonText = value;
            OnPropertyChanged();
        }
    }

    public void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PropertyChanged | `PropertyChangedEventHandler` event | Raised when a property value changes; the event args carry the changed property's name. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Data.INotifyPropertyChanged` (WinRT) for WinUI 3. In .NET/C# code, this is hidden in favor of `System.ComponentModel.INotifyPropertyChanged`, which the binding engine also understands.
- Raise `PropertyChanged` with `PropertyName = string.Empty` (or, for C++/WinRT, an equivalent all-properties signal) to indicate all non-indexer properties changed. `null` is not supported (unlike WPF). Use `"Item[<indexer>]"` or `"Item[]"` for indexer properties.
- `{x:Bind}` subscribes to `PropertyChanged` for `OneWay`/`TwoWay` bindings; `{x:Bind}` function bindings can also react to `PropertyChanged` fired with the function's name.
- A lighter-weight alternative to deriving from `DependencyObject` and exposing a `DependencyProperty` — useful for classes that already have a base class.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [ObservableCollection](./observablecollection.md)
- [INotifyCollectionChanged](./inotifycollectionchanged.md)
