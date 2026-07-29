# x:DefaultBindMode attribute

Sets a default binding mode for `{x:Bind}` expressions on an element and its descendants, overriding `{x:Bind}`'s own default of `OneTime`. Available since Windows 10 version 1607 (SDK 14393).

## Signature / Usage

```xaml
<object x:DefaultBindMode="OneTime | OneWay | TwoWay" .../>
```

```xaml
<StackPanel x:DefaultBindMode="OneWay">
    <!-- Inherits OneWay; no need to write Mode=OneWay on each {x:Bind} -->
    <TextBlock Text="{x:Bind ViewModel.Title}"/>
</StackPanel>
```

## Notes

- Applies only to `{x:Bind}` expressions on the element it's set on and that element's children; an explicit `Mode=` on an individual `{x:Bind}` still overrides it.
- `{x:Bind}` defaults to `OneTime` (unlike `{Binding}`, whose default is `OneWay`) for performance — `OneWay` generates more change-tracking code. Use this attribute to opt a subtree into `OneWay`/`TwoWay` without repeating `Mode=` on every binding.

## Related

- [x:Bind markup extension](./x-bind-markup-extension.md)
- [Property-path syntax](./property-path-syntax.md)
