# Dependency properties overview

The dependency property system computes a property's value based on other inputs (other properties, events, and app state), enabling data binding, styles, storyboarded animations, and property-changed callbacks. Requires the defining type to derive from `DependencyObject`.

## Signature / Usage

```csharp
public static readonly DependencyProperty LabelProperty = DependencyProperty.Register(
  "Label",
  typeof(string),
  typeof(ImageWithLabelControl),
  new PropertyMetadata(null)
);

public string Label
{
    get { return (string)GetValue(LabelProperty); }
    set { SetValue(LabelProperty, value); }
}
```

## Options / Props

| Term | Description |
|------|-------------|
| Dependency property | A property backed by a `DependencyProperty` identifier, usually a static member of the owning `DependencyObject`-derived class. |
| Dependency property identifier | A constant (typically `public static readonly`) that identifies the property for `GetValue`/`SetValue`/`ClearValue` calls. |
| Property wrapper | The `get`/`set` implementation exposing the dependency property as a normal language property. |

## Notes

- **Value precedence** (highest to lowest): 1) animated values, 2) local value (including bindings and `{StaticResource}`, which act as local values), 3) templated properties, 4) style setters, 5) default value.
- Bindings act at local-value precedence; setting a new local value replaces a binding entirely, not just its runtime value.
- To be the *target* of `{Binding}`, a property must be a dependency property; `{x:Bind}` has no such requirement since it uses generated code.
- `SetBinding` is defined only on `FrameworkElement`; use `BindingOperations` to bind any `DependencyObject` property.
- `ClearValue` resets a property to its default value/metadata, re-enabling lower-precedence sources such as style setters.
- All `DependencyObject` instances must be created on the UI thread associated with the current `Window`; access from other threads requires the `DispatcherQueue`.
- Package: `Microsoft.UI.Xaml.DependencyObject` / `Microsoft.UI.Xaml.DependencyProperty` (WinUI 3), `Windows.UI.Xaml.*` (UWP). Distinct from WPF's `System.Windows.DependencyObject` and from React/Vue reactive state.

## Related

- [Custom dependency properties](./custom-dependency-properties.md)
- [Attached properties overview](./attached-properties-overview.md)
- [x:Bind markup extension](./x-bind-markup-extension.md)
- [TemplateBinding markup extension](./templatebinding-markup-extension.md)
