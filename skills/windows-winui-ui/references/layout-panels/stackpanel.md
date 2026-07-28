# StackPanel

Arranges child elements into a single line that can be oriented horizontally or vertically.

## Signature / Usage

```xaml
<StackPanel Margin="20">
    <Rectangle Fill="Red" Width="50" Height="50" Margin="5" />
    <Rectangle Fill="Blue" Width="50" Height="50" Margin="5" />
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Orientation | `Orientation` | `Vertical` (default) or `Horizontal` stacking direction |
| Spacing | `double` | Uniform space between child elements |
| BorderBrush / BorderThickness / CornerRadius / Padding | various | Draw a border directly on the panel without a separate `Border` element |
| Background | `Brush` | Fill for the panel content area (inherited from `Panel`) |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel`, implements `IInsertionPanel`, `IScrollSnapPointsInfo`. Distinct from WPF `System.Windows.Controls.StackPanel`, `@ark-ui/react` / `@chakra-ui/react` `Stack`, and Jetpack Compose `Column`/`Row`.
- Stacks items top-to-bottom by default; set `Orientation="Horizontal"` for left-to-right.
- `Stretch` alignment is respected in the direction opposite `Orientation`; in the stacking direction, elements size to their content.
- Content is not constrained by the panel's bounds in the stacking direction, so scrollable content can overflow without showing scrollbars unless explicitly constrained.
- Insert items at a specific index in code-behind with `UIElementCollection.InsertAt`.

## Related

- [Grid](./grid.md)
- [WrapPanel](./wrappanel.md)
- [Border](./border.md)
- [Panel](./panel.md)
