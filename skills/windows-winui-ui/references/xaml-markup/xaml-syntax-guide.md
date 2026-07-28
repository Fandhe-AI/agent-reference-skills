# XAML syntax guide

Explains XAML syntax rules and terminology: object element syntax, attribute syntax, property element syntax, content syntax, and collection syntax, plus attached properties and enumeration values.

## Signature / Usage

```xaml
<!-- Object element syntax -->
<Canvas>
  <Rectangle />
</Canvas>

<!-- Attribute syntax -->
<Rectangle Name="rectangle1" Width="100" Height="100" Fill="Blue" />

<!-- Property element syntax -->
<Rectangle Name="rectangle1" Width="100" Height="100">
  <Rectangle.Fill>
    <SolidColorBrush Color="Blue"/>
  </Rectangle.Fill>
</Rectangle>

<!-- Content syntax (XAML content property) -->
<TextBlock>Hello!</TextBlock>

<!-- Collection syntax (implicit) -->
<StackPanel>
  <TextBlock>Hello</TextBlock>
  <TextBlock>World</TextBlock>
</StackPanel>

<!-- Attached property syntax -->
<Canvas>
  <Button Canvas.Left="50">Hello</Button>
</Canvas>
```

## Notes

- **Object element syntax**: `<objectName></objectName>` or self-closing `<objectName />` instantiates an object.
- **Initialization text**: some structures (`CornerRadius`, `Thickness`, `GridLength`, `Color`) use inner text as constructor-like initialization, e.g. `<Thickness x:Key="TwentyTenThickness">20,10</Thickness>`. `Duration`, `RepeatBehavior`, `Point`, `Rect`, `Size` cannot be declared as object elements and must be set via attribute syntax only.
- **Attribute syntax**: property name = quoted string value, following normal XML attribute rules; attribute order does not matter.
- **Property element syntax**: `<object.property>` nested element; the property element must always have content and cannot be self-closing. Used when a value can't be expressed as a plain string.
- **XAML content property**: some types designate one property (via `ContentPropertyAttribute`) that can be set with inner text/children without a property element, e.g. `Border.Child` or `TextBlock.Text`. The content property must be set entirely before or entirely after other property elements — mixing is invalid.
- **Collection syntax**: XAML treats collection-type properties as implicit; the underlying mechanism calls the collection's `Add` method for each child object element, not a property setter.
- **Attached properties**: syntax is `AttachedPropertyProvider.PropertyName`, e.g. `Canvas.Left="50"`. Used for parent-child layout communication (`Canvas`, `Grid`), control template parts (`ScrollViewer`), or services (`Typography`, `VisualStateManager`, `AutomationProperties`, `ToolTipService`). To reference an attached property in an animation target path, enclose it in parentheses: `(Canvas.Left)`.
- **Literal "{" values**: escape with `"{}"`, e.g. `"{}{"` for a literal opening brace.
- **Enumeration values**: use the unqualified constant name, e.g. `Visibility="Visible"` — never the qualified form (`Visibility.Visible`) or the underlying integer value. Flagwise enumerations (attributed with `FlagsAttribute`, e.g. `ManipulationModes`) use comma-separated constant names with no spaces.
- Primitive-typed properties (double, int, bool, string) always support attribute syntax; other types support it only if a type converter exists (e.g. `Brush` accepts a color string that creates a `SolidColorBrush`).
- Read-only properties cannot be set in XAML.

## Related

- [XAML overview](./xaml-overview.md)
- [Attached properties overview](./attached-properties-overview.md)
- [StaticResource markup extension](./staticresource-markup-extension.md)
- [XAML intrinsic data types](./xaml-intrinsic-data-types.md)
