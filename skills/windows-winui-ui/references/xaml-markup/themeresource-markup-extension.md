# {ThemeResource} markup extension

Provides a value for any XAML attribute by evaluating a reference to a resource, re-resolving it whenever the active system theme changes. Similar to [StaticResource](./staticresource-markup-extension.md), but dynamic.

## Signature / Usage

```xaml
<object property="{ThemeResource key}" .../>
```

```xml
<Style TargetType="Button">
    <Setter Property="Background" Value="{ThemeResource ButtonBackgroundThemeBrush}" />
    <Setter Property="Foreground" Value="{ThemeResource ButtonForegroundThemeBrush}"/>
</Style>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| key | string | The key for the requested resource, assigned via `x:Key`. Must conform to the XamlName grammar. |

## Notes

- Evaluated at startup based on the active theme; when the user changes theme at runtime, every `{ThemeResource}` reference is re-evaluated and redisplayed. `{StaticResource}` is fixed at load time and never re-evaluates.
- Resources intended for `{ThemeResource}` live in `ResourceDictionary.ThemeDictionaries` — keyed dictionaries named `"Default"`, `"Light"`, `"Dark"`, `"HighContrast"`, etc. Every theme dictionary should define the same set of keys.
- System resources (e.g. `SystemColorButtonFaceColor`) forward values from the OS/user high-contrast preferences and are referenced via `{ThemeResource}` so they re-evaluate on theme change.
- Must not make a forward reference to a resource defined later in the file (same restriction as `{StaticResource}`).
- Supported since Windows 8.1 XAML; not supported for apps targeting Windows 8.
- Package: `Microsoft.UI.Xaml.Markup` (WinUI 3) / `Windows.UI.Xaml.Markup` (UWP).

## Related

- [StaticResource markup extension](./staticresource-markup-extension.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
- [x:Key attribute](./x-key-attribute.md)
