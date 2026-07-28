# {TemplateBinding} markup extension

Links the value of a property in a control template to the value of another exposed property on the templated control. Can only be used within a `ControlTemplate` definition in XAML.

## Signature / Usage

```xaml
<object propertyName="{TemplateBinding sourceProperty}" .../>

<!-- for a Setter property in a template or style -->
<Setter Property="propertyName" Value="{TemplateBinding sourceProperty}" .../>
```

```xaml
<TextBlock Text="{TemplateBinding Text}" .... />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| propertyName | dependency property | The property being set in the template part. |
| sourceProperty | dependency property | The property on the templated type being forwarded. Both must be dependency properties and matching types (no converter support). |

## Notes

- Attempting to use `TemplateBinding` outside a `ControlTemplate` definition results in a parser error.
- Always a one-way binding.
- No backing class representation exists in code; it's exclusively a XAML markup concept.
- If a converter is needed, use the verbose equivalent: `{Binding RelativeSource={RelativeSource TemplatedParent}, Converter="..." ...}`.
- Starting with Windows 10 version 1809 (SDK 17763), `{x:Bind}` can be used anywhere `TemplateBinding` is used in a `ControlTemplate`; `TargetType` on the `ControlTemplate` becomes required (not optional) in that case, and both function bindings and two-way bindings become available.
- Package: `Microsoft.UI.Xaml.Markup` (WinUI 3) / `Windows.UI.Xaml.Markup` (UWP).

## Related

- [RelativeSource markup extension](./relativesource-markup-extension.md)
- [x:Bind markup extension](./x-bind-markup-extension.md)
- [Dependency properties overview](./dependency-properties-overview.md)
