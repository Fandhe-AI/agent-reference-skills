# XAML overview

XAML (Extensible Application Markup Language) is the declarative markup language used to define UI in WinUI 3 / Windows App SDK and UWP apps. UI structure and properties are described in `.xaml` files, and logic/events are handled in a paired code-behind file.

## Signature / Usage

```xml
<Page
    x:Class="Application1.BlankPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
>
```

## Notes

- All valid XAML is also valid XML, but XAML adds its own concepts on top (for example, property element syntax). See [XAML syntax guide](./xaml-syntax-guide.md).
- Every XAML file declares two core namespaces in its root element: the default namespace (`xmlns=`, contains built-in WinUI controls/types) and the XAML-language namespace (`xmlns:x=`, mapped to the `x:` prefix, provides core language features like `x:Key`, `x:Class`, `x:Name`, `x:Uid`).
- To use custom or third-party types in XAML, map a namespace prefix to a code namespace: `xmlns:myTypes="using:myCompany.myTypes"`.
- `d:` (designer) and `mc:` (markup compatibility) prefixes appear in tool-generated XAML for design-time tooling and can be ignored at runtime.
- Markup extensions use curly-brace syntax (`{StaticResource ...}`) to set a property to something that can't be expressed as a plain string, such as a resource reference or data binding. Markup extensions can be nested; the innermost is evaluated first.
- Attach event handlers as an attribute with the handler method name as the value: `<Button Click="showUpdatesButton_Click">`.
- A `ResourceDictionary` stores reusable objects (brushes, styles, templates) identified by `x:Key`. See [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md).
- Names assigned with `x:Name` must be unique within their namescope. See [XAML namescopes](./xaml-namescopes.md).
- XAML is case-sensitive and only supports UTF-8/UTF-16 encoding.
- You can't set breakpoints in `.xaml` files; parse failures throw `XamlParseException` at runtime with line-number context.
- C# and C++/WinRT are supported for both WinUI 3 / Windows App SDK and UWP apps. C++/CX applies to UWP only and isn't supported for WinUI 3.

## Related

- [XAML syntax guide](./xaml-syntax-guide.md)
- [XAML namespaces and namespace mapping](./xaml-namespaces-and-namespace-mapping.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
- [XAML namescopes](./xaml-namescopes.md)
- [x:Bind markup extension](./x-bind-markup-extension.md)
- [StaticResource markup extension](./staticresource-markup-extension.md)
