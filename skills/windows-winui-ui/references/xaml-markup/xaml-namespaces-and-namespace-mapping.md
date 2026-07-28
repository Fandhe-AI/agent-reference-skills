# XAML namespaces and namespace mapping

Explains the `xmlns` mappings found in the root element of most XAML files, and how to map custom types and assemblies for use in XAML.

## Signature / Usage

```xaml
<Page
    x:Class="MSDNSample.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:MSDNSample"
    xmlns:custom1="using:CustomClasses">
```

## Options / Props

| Prefix | Namespace value | Purpose |
|--------|------------------|---------|
| (default, no prefix) | `http://schemas.microsoft.com/winfx/2006/xaml/presentation` | Built-in framework types (`Microsoft.UI.Xaml.*` in WinUI 3, `Windows.UI.Xaml.*` in UWP). |
| `x:` | `http://schemas.microsoft.com/winfx/2006/xaml` | XAML language elements (`x:Class`, `x:Key`, `x:Name`, etc.). |
| `d:` | `http://schemas.microsoft.com/expression/blend/2008` | Designer/Blend design-time attributes (`d:DesignHeight`, `d:DataContext`, etc.); ignored at runtime. |
| `mc:` | `http://schemas.openxmlformats.org/markup-compatibility/2006` | Markup compatibility mode, usually paired with `mc:Ignorable` to hide `d:` attributes from the runtime parser. |
| `local:` | `using:<project default namespace>` | Conventionally mapped to the project's own code namespace (same namespace as `x:Class`). |
| custom prefix | `using:<code namespace>` | Maps any custom code namespace for use as XAML object elements. |

## Notes

- Custom type mapping uses the `using:` token instead of a URI, e.g. `xmlns:myTypes="using:myCompany.myTypes"`, then reference with `<myTypes:CustomButton/>`.
- Assemblies backing a mapped namespace aren't named in the mapping itself — they must be a project/dependent-assembly reference; primary-app types need only the namespace mapping.
- Nested types (e.g. an enum nested in a class) cannot be used from XAML — the parser can't distinguish a dot that's part of a nested type name from a namespace separator.
- Attached property owner-type prefixes must be included even when the target element shares the same mapped namespace/prefix, because the attribute isn't assumed to inherit the element's XML namespace.
- `vsm:` prefix is a legacy carryover from other Microsoft XAML technologies — remove it and use the default namespace for `VisualState`/`VisualStateGroup` instead.
- Package: `Microsoft.UI.Xaml` namespace mapping (WinUI 3) uses `Microsoft.UI.*`/`Microsoft.UI.Xaml.*` code namespaces; UWP apps use `Windows.UI.*`/`Windows.UI.Xaml.*`. Both map to the same default XAML presentation namespace URI.

## Related

- [XAML overview](./xaml-overview.md)
- [x:Class attribute](./x-class-attribute.md)
- [Custom attached properties](./custom-attached-properties.md)
