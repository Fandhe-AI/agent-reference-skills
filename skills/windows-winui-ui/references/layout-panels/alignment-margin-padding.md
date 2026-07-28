# Alignment, Margin, and Padding

Guidance on using `HorizontalAlignment`/`VerticalAlignment`, `Margin`, and `Padding` to position elements and content legibly and consistently.

## Signature / Usage

```xaml
<Grid BorderBrush="Blue" BorderThickness="4" Width="200">
    <TextBox Text="This is text in a TextBox." Margin="20" Padding="16,24"/>
</Grid>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| HorizontalAlignment / VerticalAlignment | `Left`/`Center`/`Right`/`Stretch`, `Top`/`Center`/`Bottom`/`Stretch` | Positions an element within its parent container; `Stretch` is the default |
| HorizontalContentAlignment / VerticalContentAlignment | same enums | Positions a `Control`'s child content within the control |
| Margin | `Thickness` | Outer empty space around an element; not part of `ActualHeight`/`ActualWidth` or hit-testing |
| Padding | `Thickness` | Inner space between an element's border and its content; defined separately per class (`Control.Padding`, `Border.Padding`, `TextBlock.Padding`, etc.), not on `FrameworkElement` |

## Notes

- `Margin="20"` applies uniformly; `Margin="0,10,5,25"` applies left, top, right, bottom in that order.
- Margins are additive between adjacent peers (two 10px margins between siblings produce 20px of gap).
- A real-number `Height`/`Width` cancels a `Stretch` alignment, which then behaves like `Center`.
- Margin and Padding are additive when both are applied — apparent distance is margin + padding.
- Recommended: keep all dimensions, margins, and padding in multiples of 4 effective pixels (epx) for crisp rendering across scale factors; use ~12 epx gutters on narrow windows (<640px) and ~24 epx on wider ones.

## Related

- [Layout Fundamentals](./layout-fundamentals.md)
- [Border](./border.md)
- [Responsive Layouts](./responsive-layouts.md)
