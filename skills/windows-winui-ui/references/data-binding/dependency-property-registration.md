# DependencyProperty.Register / RegisterAttached / PropertyMetadata

Static methods on `DependencyProperty` for defining custom dependency properties (regular or attached), plus the `PropertyMetadata` class describing their default value and change-callback behavior.

## Signature / Usage

```csharp
public static DependencyProperty Register(
    string name, Type propertyType, Type ownerType, PropertyMetadata typeMetadata);

public static DependencyProperty RegisterAttached(
    string name, Type propertyType, Type ownerType, PropertyMetadata defaultMetadata);
```

```csharp
public class MyControl : Control
{
    public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(
        nameof(Label), typeof(string), typeof(MyControl), new PropertyMetadata(default(string)));

    public string Label
    {
        get => (string)GetValue(LabelProperty);
        set => SetValue(LabelProperty, value);
    }
}
```

```csharp
// Attached property example
public abstract class AquariumServices : DependencyObject
{
    public enum Buoyancy { Floats, Sinks, Drifts }

    public static readonly DependencyProperty BuoyancyProperty = DependencyProperty.RegisterAttached(
        "Buoyancy", typeof(Buoyancy), typeof(AquariumServices),
        new PropertyMetadata(Buoyancy.Floats));

    public static void SetBuoyancy(DependencyObject element, Buoyancy value) =>
        element.SetValue(BuoyancyProperty, value);

    public static Buoyancy GetBuoyancy(DependencyObject element) =>
        (Buoyancy)element.GetValue(BuoyancyProperty);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | string | Name of the dependency property being registered. |
| propertyType | `Type` | Type of the property's value. |
| ownerType | `Type` | The `DependencyObject`-derived type that owns the property. |
| typeMetadata / defaultMetadata | `PropertyMetadata` | Default value and optional `PropertyChangedCallback`. `null` is equivalent to `PropertyMetadata.Create(null)`. |
| PropertyMetadata.DefaultValue | object | Default value used until a local value, style setter, or binding overrides it. |
| PropertyMetadata.CreateDefaultValueCallback | `CreateDefaultValueCallback` | Thread-safe alternative to a fixed default value; used with `PropertyMetadata.Create(...)`. |

## Notes

- `Register` returns a `DependencyProperty` identifier, conventionally stored as `public static readonly` on the owning class, and used with `GetValue`/`SetValue` in the CLR-style wrapper property.
- `RegisterAttached` differs only in that the identifier is exposed via static `Get<Name>`/`Set<Name>` methods rather than an instance CLR property, so any `DependencyObject` can carry the value (e.g. `Grid.Row`, `Canvas.Left`).
- A `PropertyChangedCallback` referenced in `PropertyMetadata` must be a `static` method on the class that owns the `DependencyProperty` identifier.
- Registration typically happens during static class initialization in C# (so it runs before first use); C++ has no static initializer equivalent and instead needs an app-wide helper method invoked during `Application` startup.
- Use `PropertyMetadata.Create(...)` instead of the constructor overloads if the default-value mechanism must be thread-safe.
- `DependencyProperty`-backed properties are automatically observable — no `INotifyPropertyChanged` implementation is needed for `{x:Bind}`/`{Binding}` to detect changes made through `SetValue` or a binding.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [INotifyPropertyChanged](./inotifypropertychanged.md)
