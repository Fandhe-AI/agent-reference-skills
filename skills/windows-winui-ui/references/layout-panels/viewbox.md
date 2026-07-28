# Viewbox

Defines a content decorator that can stretch and scale a single child to fill the available space.

## Signature / Usage

```xaml
<Viewbox Stretch="Uniform" StretchDirection="Both">
    <TextBlock Text="Scales with the Viewbox" />
</Viewbox>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Child | `UIElement` | The single content object scaled by the Viewbox |
| Stretch | `Stretch` | `None`, `Fill`, `Uniform` (default), or `UniformToFill` — how the child is scaled to fit |
| StretchDirection | `StretchDirection` | `UpOnly`, `DownOnly`, or `Both` — whether scaling is allowed to grow, shrink, or both |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `FrameworkElement`. Distinct from `System.Windows.Controls.Viewbox` (WPF) and SVG `viewBox`.
- Viewbox can contain only one child; wrap multiple objects in a container such as `StackPanel` or `Grid` first.
- Commonly used to make text or icon content scale proportionally as its container is resized.

## Related

- [Border](./border.md)
- [Grid](./grid.md)
