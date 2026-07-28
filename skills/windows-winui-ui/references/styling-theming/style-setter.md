# Style, Setter, BasedOn

`Style` sets one or more control property values (via `Setter` elements) and reuses them across multiple controls for a consistent appearance. `BasedOn` lets a style inherit from another style.

## Signature / Usage

```xaml
<Page.Resources>
    <Style x:Key="PurpleStyle" TargetType="Button">
        <Setter Property="FontFamily" Value="Segoe UI"/>
        <Setter Property="FontSize" Value="14"/>
        <Setter Property="Foreground" Value="Purple"/>
    </Style>

    <!-- Implicit style: no x:Key, applies to every Button that doesn't set Style -->
    <Style TargetType="Button">
        <Setter Property="BorderBrush" Value="Green"/>
    </Style>
</Page.Resources>

<Button Content="Button" Style="{StaticResource PurpleStyle}"/>
<Button Content="Button"/>
```

```xaml
<!-- BasedOn: inherit from another style targeting a compatible type -->
<Style x:Key="BasicStyle" TargetType="ContentControl">
    <Setter Property="Width" Value="130" />
    <Setter Property="Height" Value="30" />
</Style>

<Style x:Key="ButtonStyle" TargetType="Button" BasedOn="{StaticResource BasicStyle}">
    <Setter Property="BorderBrush" Value="Orange" />
</Style>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TargetType | `TypeName` | FrameworkElement-derived type the style applies to. Required. If omitted, an `x:Key` is required and the style key becomes a string, not the type. |
| Setter.Property | `string` | Name of the dependency property to set. |
| Setter.Value | `object` | Value to assign; can use attribute or property-element syntax (e.g. a nested `LinearGradientBrush`). |
| BasedOn | `{StaticResource}` | Reference to a parent `Style`. Must target the same type or a type derived from the base style's `TargetType`. Values not set locally are inherited; locally set values override. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `Style`/`Setter` types). Distinct from `System.Windows.Style` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` style props, and Jetpack Compose `Modifier`-based styling.
- A style without `x:Key` is applied **implicitly** to every control of its `TargetType` that doesn't set an explicit `Style`. A style with `x:Key` must be applied explicitly via `Style="{StaticResource key}"`.
- If a style's `TargetType` doesn't match the control it's applied to, a XAML exception occurs at runtime.
- For built-in WinUI controls (`Microsoft.UI.Xaml.Controls` namespace) prefer `BasedOn="{StaticResource Default<ControlName>Style}"` when writing a custom style, to inherit the latest look; when redefining the control's own resource keys directly, `BasedOn` is not needed since the default style is metadata-defined.
- A `Setter` for the `Template` property is how most control restyling actually happens; see `ControlTemplate`.
- "Lightweight styling" — overriding named theme brushes (e.g. `ButtonBackground`, `ButtonBackgroundPointerOver`) inside a `ResourceDictionary.ThemeDictionaries` block — is often a lighter-weight alternative to writing a full `Style`/`ControlTemplate`.

## Related

- [ControlTemplate](./control-template.md)
- [ResourceDictionary](./resource-dictionary.md)
- [ThemeResource and Theme Dictionaries](./theme-resources.md)
