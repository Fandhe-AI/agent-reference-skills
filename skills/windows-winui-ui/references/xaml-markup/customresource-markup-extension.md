# {CustomResource} markup extension

Provides a value for any XAML attribute by evaluating a reference to a resource that comes from a custom resource-lookup implementation, performed by a `CustomXamlResourceLoader` subclass. Advanced — not used by most app scenarios.

## Signature / Usage

```xaml
<object property="{CustomResource key}" .../>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| key | string | The key for the requested resource; how it is assigned depends entirely on the registered `CustomXamlResourceLoader` implementation. |

## Notes

- Doesn't work by default — the base `GetResource` implementation is incomplete. To make it functional:
  1. Derive a class from `CustomXamlResourceLoader` and override `GetResource` (don't call base).
  2. Set `CustomXamlResourceLoader.Current` to your class instance before any page-level XAML using `{CustomResource}` is loaded (typically in the `Application` subclass constructor in `App.xaml.cs`).
  3. Use `{CustomResource}` in XAML pages/resource dictionaries.
- The *resourceId* passed to `GetResource` comes from the *key* argument; other parameters come from context (e.g. the target property).
- Package: `Microsoft.UI.Xaml.Markup` / `Microsoft.UI.Xaml.Resources.CustomXamlResourceLoader` (WinUI 3), `Windows.UI.Xaml.*` (UWP).

## Related

- [StaticResource markup extension](./staticresource-markup-extension.md)
- [ThemeResource markup extension](./themeresource-markup-extension.md)
