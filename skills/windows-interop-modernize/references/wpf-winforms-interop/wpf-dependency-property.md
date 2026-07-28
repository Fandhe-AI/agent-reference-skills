# DependencyProperty

`System.Windows.DependencyProperty` backs WPF's property system. A dependency property extends a plain CLR property with support for data binding, styling, animation, resource references, metadata overrides, and property-value inheritance — features not available to properties backed by a private field.

## Signature / Usage

```csharp
public static readonly DependencyProperty IsSpinningProperty = DependencyProperty.Register(
    "IsSpinning", typeof(bool), typeof(MainWindow));

public bool IsSpinning
{
    get => (bool)GetValue(IsSpinningProperty);
    set => SetValue(IsSpinningProperty, value);
}
```

## Options / Props

| Member | Description |
|--------|-------------|
| `DependencyProperty.Register(name, propertyType, ownerType, metadata?)` | Registers a new dependency property and returns its identifier |
| `DependencyObject.GetValue(DependencyProperty)` | Reads the effective value through the property system |
| `DependencyObject.SetValue(DependencyProperty, value)` | Sets a local value through the property system |
| `DependencyProperty.OverrideMetadata` | Changes default value / callbacks for a property in a derived class without reimplementing it |
| naming convention | The identifier field must be named `<PropertyName>Property` |

## Notes

- Only types deriving from `DependencyObject` can own dependency properties; only `UIElement`/`ContentElement`-derived types are useful as data-binding/animation targets.
- Value precedence (highest to lowest, roughly): animation > local value > style/template setter > inherited value > default value.
- `DependencyObject` does **not** implement `INotifyPropertyChanged`; use dependency properties (or `INotifyPropertyChanged` on plain view-model classes) for binding sources.
- WinUI 3 uses the same `DependencyProperty` concept (`Microsoft.UI.Xaml.DependencyProperty`, `DependencyProperty.Register`) — the pattern transfers directly, but it is a distinct type in a distinct namespace. WinForms has no dependency-property system; `System.Windows.Forms.Control` properties are plain CLR properties with events (e.g. `TextChanged`).

## Related

- [wpf-routed-events.md](./wpf-routed-events.md)
- [wpf-data-binding.md](./wpf-data-binding.md)
- [wpf-styles-templates.md](./wpf-styles-templates.md)
