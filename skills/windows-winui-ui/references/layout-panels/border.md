# Border

A container control that draws a border, background, or both, around another object.

## Signature / Usage

```xaml
<Border Background="Coral" Width="300" Padding="10" CornerRadius="20">
    <TextBlock FontSize="16">Text Surrounded by a Border</TextBlock>
</Border>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Child | `UIElement` | The single content object contained by the Border |
| Background | `Brush` | Fill inside the border |
| BorderBrush | `Brush` | Brush used to paint the border |
| BorderThickness | `Thickness` | Thickness of the border on each side |
| CornerRadius | `CornerRadius` | Rounds the border corners |
| Padding | `Thickness` | Space between the border line and the child content |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `FrameworkElement`. Distinct from `System.Windows.Controls.Border` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` `Box`/border styling props.
- A Border can contain only one child object; wrap multiple objects in a container such as `StackPanel` first.
- `StackPanel` also exposes `BorderBrush`/`BorderThickness`/`CornerRadius`/`Padding` directly, letting you draw a border without a separate `Border` element.

## Related

- [StackPanel](./stackpanel.md)
- [Viewbox](./viewbox.md)
- [Alignment, Margin, and Padding](./alignment-margin-padding.md)
