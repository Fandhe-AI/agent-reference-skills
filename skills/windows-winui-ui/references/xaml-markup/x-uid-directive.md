# x:Uid directive

Provides a unique identifier for a markup element, used by XAML localization processes and tools (for example, resources from a `.resw` resource file).

## Signature / Usage

```xaml
<object x:Uid="stringID" .../>
```

```xaml
<Button x:Uid="GoButton" Content="Go"/>
<!-- resource file entry: "GoButton.Content" replaces the display text -->
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| stringID | string | Uniquely identifies the element in an app; becomes part of the resource path (`ms-resource:///Resources/<x:Uid>`). |

## Notes

- Resource file entries are named `<x:Uid>.<PropertyName>`, e.g. `GoButton.Content`, `GoButton.FlowDirection`.
- Discrete from `x:Name`: `x:Name` uniqueness is governed by XAML namescope; `x:Uid` uniqueness is governed by the package resource index (PRI) system, and it is legal for the same `x:Uid` to appear on multiple elements as long as they share the same resolution logic. All XAML files in a project share a single resource scope for `x:Uid` resolution.
- To target an attached property from a resource file, use `Title.[using:Microsoft.UI.Xaml.Controls]Canvas.Top` syntax.
- Cannot be applied to property elements.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace.

## Related

- [x:Name attribute](./x-name-attribute.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
