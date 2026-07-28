# Alignment, margin, and padding

Every `FrameworkElement` in a XAML Windows app has dimension, alignment, margin, and padding properties that control layout behavior, positioning, and spacing relative to a parent container.

## Signature / Usage

```xaml
<Grid BorderBrush="Blue" BorderThickness="4" Width="200">
    <TextBox Text="This is text in a TextBox." Margin="20" Padding="16,24"/>
</Grid>
```

## Options / Props

| Property | Values | Description |
|------|-------------|------|
| `HorizontalAlignment` | Left, Center, Right, Stretch | Positions an element horizontally within its parent container. |
| `VerticalAlignment` | Top, Center, Bottom, Stretch | Positions an element vertically within its parent container. |
| `HorizontalContentAlignment` / `VerticalContentAlignment` | same as above | Positions child elements within a container. |
| `TextAlignment` | Left (default), Center, Right, Justify | Aligns text within a text element; left-alignment is recommended by default. |
| `Margin` | uniform or `left,top,right,bottom` | Empty space around an element; not part of the element for hit-testing. Margins between adjacent peers are additive. |
| `Control.Padding` / `Border.Padding` / `ItemsPresenter.Padding` / `TextBlock.Padding` | uniform or per-side | Space between an element's inner border and its child content; a positive value shrinks the content area. |

## Notes

- `Stretch` is the default for both alignment axes; a real-number `Height`/`Width` cancels `Stretch` and it behaves like `Center`. Some controls (e.g. `Button`) override the default `Stretch` in their default style.
- Margin and Padding are additive when both are applied to related elements; the apparent gap is margin + padding.
- Negative margins are permitted but commonly cause clipping/overdraw and are discouraged.
- General recommendation: use fixed measurements only on key elements and rely on fluid layout elsewhere for responsive behavior; keep all dimensions/margins/padding in increments of 4 epx.
- Recommended window gutters: 12 epx for window widths under 640px, 24 epx for larger widths.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP). Distinct from `System.Windows.Controls` (WPF) alignment/margin/padding, and from the JS `@ark-ui/react` / `@chakra-ui/react` layout primitives.

## Related

- [Screen sizes and breakpoints](./layout-screen-sizes-and-breakpoints.md)
- [Spacing, gutters, and content density](./layout-spacing-and-density.md)
- [Responsive design techniques](./layout-responsive-design.md)
