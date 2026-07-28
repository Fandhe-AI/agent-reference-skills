# Data Binding (System.Windows.Data.Binding)

WPF data binding connects a UI element (binding target) to a data source (binding source) so that changes in one can automatically propagate to the other, via the `Binding` object or `{Binding}` markup extension.

## Signature / Usage

```xaml
<TextBox Text="{Binding Path=Name, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}"/>
```

```csharp
public class Employee : INotifyPropertyChanged
{
    private string _name;
    public string Name
    {
        get => _name;
        set { _name = value; PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name))); }
    }
    public event PropertyChangedEventHandler PropertyChanged;
}

// Code-behind
DataContext = new Employee { Name = "Alex" };
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Binding.Path` | `PropertyPath` | Property path on the source to bind to |
| `Binding.Source` / `ElementName` / `RelativeSource` | various | Explicit binding source (overrides inherited `DataContext`) |
| `Binding.Mode` | `BindingMode` | `OneWay`, `TwoWay`, `OneWayToSource`, `OneTime`, `Default` |
| `Binding.UpdateSourceTrigger` | `UpdateSourceTrigger` | When target→source updates fire: `PropertyChanged`, `LostFocus`, `Explicit` |
| `FrameworkElement.DataContext` | `object` | Inherited default binding source for descendant elements |

## Notes

- The **target property must be a dependency property** (see `wpf-dependency-property.md`); most read-only dependency properties can't be binding targets.
- The binding source should implement `INotifyPropertyChanged` (or be an `ObservableCollection<T>` for lists) so the target updates automatically when the source changes.
- `DataContext` is inherited down the visual tree unless explicitly overridden on a descendant.
- WinUI 3 supports the same `{Binding}` markup extension plus **`x:Bind`**, a compiled, type-safe binding WPF does not have (`x:Bind` resolves at compile time and defaults to `OneTime` for non-`UserControl` sources, unlike `{Binding}`'s runtime resolution). WinForms uses a separate `System.Windows.Forms.Binding` / `BindingSource` model, not dependency properties.

## Related

- [wpf-dependency-property.md](./wpf-dependency-property.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)
