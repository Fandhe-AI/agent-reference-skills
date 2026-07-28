# {RelativeSource} markup extension

Specifies the source of a `{Binding}` in terms of a relative relationship in the runtime object graph, rather than a named element or explicit data context.

## Signature / Usage

```xaml
<!-- Self mode -->
<Binding RelativeSource="{RelativeSource Self}" .../>
<object property="{Binding RelativeSource={RelativeSource Self} ...}" .../>

<!-- TemplatedParent mode -->
<Binding RelativeSource="{RelativeSource TemplatedParent}" .../>
<object property="{Binding RelativeSource={RelativeSource TemplatedParent} ...}" .../>
```

```XML
<Rectangle
  Fill="Orange" Width="200"
  Height="{Binding RelativeSource={RelativeSource Self}, Path=Width}"
/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Self | Mode value | The target element itself is used as the binding source. Useful for binding one property of an element to another property on the same element. |
| TemplatedParent | Mode value | The `ControlTemplate` applied to the templated control is used as the source. Useful for applying runtime template-level info. |

## Notes

- `Binding.RelativeSource` can be set either as an attribute on a `Binding` object element, or as a component within a `{Binding}` markup extension.
- `Self` is a variation on `ElementName` binding that avoids naming/self-referencing the element; requires matching property types or a `Converter`.
- Also usable to set an object's own `DataContext` to itself, e.g. `DataContext="{Binding DefaultViewModel, RelativeSource={RelativeSource Self}}"`.
- Package: `Microsoft.UI.Xaml.Data` (WinUI 3) / `Windows.UI.Xaml.Data` (UWP).

## Related

- [TemplateBinding markup extension](./templatebinding-markup-extension.md)
- [x:Bind markup extension](./x-bind-markup-extension.md)
