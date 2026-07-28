# {StaticResource} markup extension

Provides a value for any XAML attribute by evaluating a reference to an already-defined resource, looked up by key in a `ResourceDictionary`.

## Signature / Usage

```xaml
<object property="{StaticResource key}" .../>
```

```xml
<StackPanel.Resources>
    <local:S2Formatter x:Key="GradeConverter"/>
</StackPanel.Resources>
<TextBlock Style="{StaticResource BasicTextStyle}" Text="Percent grade:" Margin="5" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| key | string | The key for the requested resource, assigned via `x:Key`. Must conform to the XamlName grammar. |

## Notes

- Must not make a forward reference to a resource defined lexically later in the same XAML file — unsupported, and even where it doesn't fail, it carries a performance penalty.
- A key that cannot resolve throws a XAML parse exception at runtime.
- No backing class representation exists for `{StaticResource}` in code; the closest code equivalent is `ResourceDictionary.Contains`/`TryGetValue`.
- Resolved once at XAML load time / app startup and never re-evaluated at runtime — contrast with [ThemeResource](./themeresource-markup-extension.md), which re-evaluates on theme change.
- Visual Studio IntelliSense offers resource keys from the current lookup scope when typing `{StaticResource`; **Go To Definition** (F12) navigates to the defining dictionary.
- Package: `Microsoft.UI.Xaml.Markup` (WinUI 3) / `Windows.UI.Xaml.Markup` (UWP). Distinct from CSS custom properties or Ark UI/Chakra UI theme tokens.

## Related

- [ThemeResource markup extension](./themeresource-markup-extension.md)
- [x:Key attribute](./x-key-attribute.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
