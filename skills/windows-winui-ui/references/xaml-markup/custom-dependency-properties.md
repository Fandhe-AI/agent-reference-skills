# Custom dependency properties

How to define and implement custom dependency properties, including registration, property wrappers, default values, and property-changed callbacks.

## Signature / Usage

```csharp
public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(
  nameof(Label),
  typeof(String),
  typeof(ImageWithLabelControl),
  new PropertyMetadata(null, new PropertyChangedCallback(OnLabelChanged))
);

public String Label
{
    get { return (String)GetValue(LabelProperty); }
    set { SetValue(LabelProperty, value); }
}

private static void OnLabelChanged(DependencyObject d, DependencyPropertyChangedEventArgs e) {
    var iwlc = d as ImageWithLabelControl;
    var s = e.NewValue as String;
    iwlc.HasLabelValue = !String.IsNullOrEmpty(s);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | string | First `Register` parameter; must be unique within the registering type (and its inherited members). Must also be a valid XAML name if you want to set it in XAML. |
| propertyType | Type | The CLR type of the property value. |
| ownerType | Type | The `DependencyObject`-derived class registering the property. |
| typeMetadata | PropertyMetadata | Optional; supplies a default value and/or a `PropertyChangedCallback`. |

## Notes

- Checklist: call `Register`, define a `public static readonly DependencyProperty` identifier named `<Name>Property`, define a wrapper property whose `get`/`set` call `GetValue`/`SetValue` only (no extra logic — the XAML parser bypasses the wrapper and talks to `SetValue` directly, so any extra logic behaves inconsistently between XAML and code).
- Consider making a property a dependency property when it needs: `Style` setting, `{Binding}` targeting, `Storyboard` animation, or property-changed notification.
- `PropertyMetadata` supplies a default value (restored by `ClearValue`) and/or a `PropertyChangedCallback` static method that receives `DependencyPropertyChangedEventArgs` with `OldValue`/`NewValue`.
- For structures/enumerations, the changed callback may fire even when the value didn't really change (a side effect of box/unbox) — compare `OldValue`/`NewValue` yourself.
- **Avoid unintentional singletons**: don't construct a reference-type default value inline in `PropertyMetadata` — all instances would share it. Set it in the class constructor instead, or expose a static default on the type.
- **Collection-type dependency properties**: initialize the collection instance in the constructor, not as the `PropertyMetadata` default value (same singleton risk); collections generally aren't animated, pre-populated via style/template, or required to be dependency properties for binding — prefer plain CLR properties plus `INotifyCollectionChanged`/`ObservableCollection<T>`.
- Dependency property identifiers must be `public static readonly`; `internal`/`private` breaks the property system. There is no way to register a read-only dependency property.
- Don't set dependency property values inside constructors of `DependencyObject`-derived classes.
- Package: `Microsoft.UI.Xaml.DependencyProperty.Register` (WinUI 3) / `Windows.UI.Xaml.DependencyProperty.Register` (UWP).

## Related

- [Dependency properties overview](./dependency-properties-overview.md)
- [Custom attached properties](./custom-attached-properties.md)
