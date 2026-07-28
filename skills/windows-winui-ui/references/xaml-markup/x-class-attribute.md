# x:Class attribute

Configures XAML compilation to join partial classes between markup and code-behind. The code partial class is defined in a separate code file; the markup partial class is generated during XAML compilation.

## Signature / Usage

```xaml
<object x:Class="namespace.classname" ...>
  ...
</object>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| namespace | string | Optional. Namespace containing the partial class; separated from *classname* with a dot. |
| classname | string | Required. Name of the partial class connecting the loaded XAML to its code-behind. |

## Notes

- `x:Class` can only be declared on the root element of a compiled XAML file/object tree (Page build action), or on the `Application` root. Declaring it elsewhere, or on a non-compiled XAML file, is a compile-time error.
- The class cannot be a nested class; it must be `public` and `partial`.
- The separator between namespace and classname components is always a dot (`.`), even in C++ code files where the namespace separator is `::`.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace.

## Related

- [XAML namespaces and namespace mapping](./xaml-namespaces-and-namespace-mapping.md)
- [x:Name attribute](./x-name-attribute.md)
