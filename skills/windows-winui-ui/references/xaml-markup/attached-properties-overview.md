# Attached properties overview

An attached property is a XAML concept that lets a property/value pair be set on an object even though the property isn't part of that object's own type definition. Attached properties are typically implemented as a specialized form of dependency property without a conventional property wrapper on the owner type.

## Signature / Usage

```xaml
<Canvas>
  <Button Canvas.Left="50">Hello</Button>
</Canvas>
```

```csharp
myCheckBox.SetValue(Canvas.TopProperty, 75);
// equivalent: Canvas.SetTop(myCheckBox, 75);
```

## Notes

- Set in XAML using `AttachedPropertyProvider.PropertyName` syntax.
- Common scenarios: child-to-parent layout communication (`Canvas.Left`/`Canvas.Top`, `Grid`, `VariableSizedWrapGrid`), control template part influence (`ScrollViewer`, `VirtualizingStackPanel`), unrelated service access (`Typography`, `VisualStateManager`, `AutomationProperties`, `ToolTipService`), and animation targeting (`Storyboard`).
- Implemented via a static `DependencyProperty` field plus static `Get*`/`Set*` accessor methods (no instance property wrapper) — this pattern lets both the XAML parser and code call them.
- To specify an attached property as an animation target path, enclose it in parentheses: `(Canvas.Left)`. Custom attached properties cannot be animated (existing WinUI implementation limitation).
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP). Distinct from CSS attribute selectors or React/Vue custom attributes.

## Related

- [Custom attached properties](./custom-attached-properties.md)
- [Dependency properties overview](./dependency-properties-overview.md)
- [XAML syntax guide](./xaml-syntax-guide.md)
