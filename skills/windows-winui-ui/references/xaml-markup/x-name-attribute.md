# x:Name attribute

Uniquely identifies object elements for access to the instantiated object from code-behind or general code. Once applied, `x:Name` can be considered equivalent to the variable holding an object reference returned by a constructor.

## Signature / Usage

```xaml
<object x:Name="XAMLNameValue" .../>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| XAMLNameValue | string | Must conform to the XamlName grammar: starts with a letter or underscore, followed by letters/digits/underscore. ASCII only; no leading digit. |

## Notes

- The specified `x:Name` becomes the name of a field created in the underlying code when XAML is processed (via MSBuild target steps that join the partial classes).
- Each `x:Name` must be unique within a XAML namescope (root element level of a page, or the root of a control/data template, or an object tree from `XamlReader.Load`). See [XAML namescopes](./xaml-namescopes.md).
- `x:Name` cannot be set in XAML property element syntax, or in code via `SetValue`. It can only be set using XAML attribute syntax.
- If a type has a settable `Name` property (e.g. `FrameworkElement.Name`, `TextElement.Name`), `Name` and `x:Name` are interchangeable, but specifying both on the same element is an error. Some types only have a read-only `Name` (e.g. `VisualState.Name`) — use `x:Name` there.
- `x:Name` can substitute for `x:Key` on elements within a `ResourceDictionary` (every resource dictionary item must have `x:Key` or `x:Name`), but `x:Name` also generates a code-behind field, making it less efficient than `x:Key`.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace (`x:` prefix). Distinct from `x:Name`/`Name` concepts in WPF (`System.Windows.Markup`), Ark UI, or Chakra UI.

## Related

- [x:Key attribute](./x-key-attribute.md)
- [XAML namescopes](./xaml-namescopes.md)
- [x:Uid directive](./x-uid-directive.md)
