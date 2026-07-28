# Canvas

Defines an area within which you can explicitly position child objects using coordinates relative to the Canvas area.

## Signature / Usage

```xaml
<Canvas Width="640" Height="480">
    <Rectangle Canvas.Left="30" Canvas.Top="30"
       Fill="Red" Width="200" Height="200" />
</Canvas>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Canvas.Left (attached) | `double` | Horizontal offset from the parent Canvas's left edge |
| Canvas.Top (attached) | `double` | Vertical offset from the parent Canvas's top edge |
| Canvas.ZIndex (attached) | `int` | Draw order among overlapping siblings; higher draws on top; default 0, negative values allowed |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class `Panel`. Distinct from WPF `System.Windows.Controls.Canvas` and HTML `<canvas>` / `@ark-ui/react` primitives.
- Uses absolute positioning; does not account for window size, scaling, or orientation, so `Grid` or `StackPanel` is usually a better choice for adaptive UI. Canvas is typically used for graphics or small static areas within a larger adaptive layout.
- Canvas objects can be nested; coordinates are relative to the immediate containing Canvas.
- `Stretch` alignment values are ignored; unsized children size to their content. Child content is not clipped to, nor constrained by, the panel bounds.

## Related

- [Grid](./grid.md)
- [StackPanel](./stackpanel.md)
- [Panel](./panel.md)
