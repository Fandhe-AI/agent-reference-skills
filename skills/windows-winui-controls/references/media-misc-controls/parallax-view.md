# ParallaxView

A container that associates the scroll position of a foreground element (e.g. a list) with a background element (e.g. an image), creating a 3D depth effect via differing scroll rates.

## Signature / Usage

```xaml
<ParallaxView Source="{x:Bind MyScrollViewer}"
              VerticalShift="100">
    <Image Source="background.jpg"/>
</ParallaxView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | UIElement | The element that is, or contains, the `ScrollViewer` driving the parallax motion. |
| Child | UIElement | The background content of the `ParallaxView` (content property). |
| VerticalShift / HorizontalShift | double | Range of motion (in pixels) of the child element along each axis. |
| IsVerticalShiftClamped / IsHorizontalShiftClamped | bool | Whether the parallax ratio is clamped to `MaxVerticalShiftRatio` / `MaxHorizontalShiftRatio`. |
| MaxVerticalShiftRatio / MaxHorizontalShiftRatio | double | Clamp value (0.0-1.0) for the parallax ratio relative to source scroll velocity. |
| VerticalSourceStartOffset / VerticalSourceEndOffset | double | Scroll offsets at which parallax motion starts/ends (vertical). Horizontal equivalents also exist. |
| VerticalSourceOffsetKind / HorizontalSourceOffsetKind | ParallaxSourceOffsetKind | How the start/end offset values are interpreted. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.ParallaxView` (WinUI 3). Distinct from CSS/JS parallax scroll libraries and Motion (Framer Motion) parallax patterns.
- See the Parallax design guidance article for recommended motion patterns.

## Related

- [MediaPlayerElement](./media-player-element.md)
