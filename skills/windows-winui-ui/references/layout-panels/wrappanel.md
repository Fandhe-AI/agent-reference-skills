# WrapPanel

Positions child elements in sequential order, wrapping to a new line once the available width (or height) is exhausted.

## Signature / Usage

```xaml
<WrapPanel Orientation="Horizontal" ItemSpacing="8" LineSpacing="8">
    <Button Content="One"/>
    <Button Content="Two"/>
    <Button Content="Three"/>
</WrapPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Orientation | `Orientation` | Direction items are laid out before wrapping |
| ItemSpacing | `double` | Space between items along the orientation axis |
| LineSpacing | `double` | Space between wrapped lines |
| ItemsStretch | enum | Whether/how items stretch to fill a line |
| Padding | `Thickness` | Inner padding of the panel |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3), currently marked `[Windows.Foundation.Metadata.Experimental]` and only available under the `windows-app-sdk-2.0-experimental` moniker. Base class `Panel`. Distinct from `VariableSizedWrapGrid`/`ItemsWrapGrid` (grid-cell based wrapping) and CSS `flex-wrap` / `@ark-ui/react` wrap primitives.
- Being experimental, its API surface may change before general availability; avoid depending on it in production apps without pinning the experimental moniker.

## Related

- [VariableSizedWrapGrid](./variablesizedwrapgrid.md)
- [ItemsWrapGrid](./itemswrapgrid.md)
- [Panel](./panel.md)
