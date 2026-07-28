# x:Key attribute

Uniquely identifies elements that are created and referenced as resources within a `ResourceDictionary`.

## Signature / Usage

```xaml
<ResourceDictionary>
  <object x:Key="stringKeyValue" .../>
</ResourceDictionary>

<!-- implicit ResourceDictionary -->
<object.Resources>
  <object x:Key="stringKeyValue" .../>
</object.Resources>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| stringKeyValue | string | Must conform to the XamlName grammar (ASCII letters/digits/underscore, no leading digit). |

## Notes

- Key uniqueness is enforced at load time within a single `ResourceDictionary`; non-unique keys cause a XAML parse exception.
- `x:Key` is exclusive to resource dictionaries; `x:Name` applies everywhere in XAML. A `FindName` call using a key value will not retrieve a keyed resource.
- A resource can omit `x:Key` if it is a targeted `Style` or `ControlTemplate` (or a `DataTemplate` with `TargetType`); in that case the implicit key is the `TargetType` value.
- The code equivalent of `x:Key` is the *key* parameter of `Insert` on the underlying `ResourceDictionary`.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace.

## Related

- [x:Name attribute](./x-name-attribute.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
- [StaticResource markup extension](./staticresource-markup-extension.md)
