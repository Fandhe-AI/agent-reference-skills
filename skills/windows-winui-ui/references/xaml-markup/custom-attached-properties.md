# Custom attached properties

How to implement a custom XAML attached property as a dependency property, including the `Get*`/`Set*` accessor convention required for XAML usability.

## Signature / Usage

```csharp
public class GameService : DependencyObject
{
    public static readonly DependencyProperty IsMovableProperty = 
    DependencyProperty.RegisterAttached(
      "IsMovable",
      typeof(Boolean),
      typeof(GameService),
      new PropertyMetadata(false)
    );
    public static void SetIsMovable(UIElement element, Boolean value)
    {
        element.SetValue(IsMovableProperty, value);
    }
    public static Boolean GetIsMovable(UIElement element)
    {
        return (Boolean)element.GetValue(IsMovableProperty);
    }
}
```

```xaml
<UserControl
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:uc="using:UserAndCustomControls" ... >
  <Image uc:GameService.IsMovable="True" .../>
</UserControl>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Get`*PropertyName*`(DependencyObject target)` | static method | Accessor signature: `public static valueType GetPropertyName(DependencyObject target)`. |
| `Set`*PropertyName*`(DependencyObject target, valueType value)` | static method | Accessor signature: `public static void SetPropertyName(DependencyObject target, valueType value)`. |

## Notes

- Register with `DependencyProperty.RegisterAttached` (not `Register`); the identifier field name must be the attached property name + `"Property"`.
- The class where the property is registered does not need to derive from `DependencyObject`, but the accessors' `target` parameter must be typed `DependencyObject` to use the shared property store.
- Accessors are used mainly by the XAML parser but are also callable from imperative code.
- Setting the property from XAML requires mapping a namespace to the owning class's code namespace (`xmlns:uc="using:..."`); the attached-property prefix must be included even if the element being set is in the same mapped namespace.
- Custom attached properties cannot be animated (existing WinUI implementation limitation).
- Package: `Microsoft.UI.Xaml.DependencyProperty.RegisterAttached` (WinUI 3) / `Windows.UI.Xaml.DependencyProperty.RegisterAttached` (UWP).

## Related

- [Attached properties overview](./attached-properties-overview.md)
- [Custom dependency properties](./custom-dependency-properties.md)
- [Dependency properties overview](./dependency-properties-overview.md)
