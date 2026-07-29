# Transforms (RenderTransform)

A transform maps points from one coordinate space to another to change how a `UIElement` renders — translate, rotate, scale, or skew — without altering the element's layout-allotted space. Applied through the `UIElement.RenderTransform` property, commonly in combination with layout panels and `Storyboard` animations.

## Signature / Usage

```xaml
<Rectangle Width="50" Height="50" Fill="RoyalBlue">
    <Rectangle.RenderTransform>
        <RotateTransform x:Name="myTransform" Angle="45" CenterX="25" CenterY="25"/>
    </Rectangle.RenderTransform>
</Rectangle>
```

## Options / Props

| Transform | Key properties | Description |
|-----------|-----------------|-------------|
| `TranslateTransform` | `X`, `Y` | Moves an element in x-y space; no center properties (translation is uniform regardless of pivot). |
| `ScaleTransform` | `ScaleX`, `ScaleY`, `CenterX`, `CenterY` | Scales around a center point. |
| `RotateTransform` | `Angle`, `CenterX`, `CenterY` | Rotates around a center point. |
| `SkewTransform` | `AngleX`, `AngleY`, `CenterX`, `CenterY` | Skews/shears in x-y space. |
| `CompositeTransform` | all of the above combined | Applies scale → skew → rotate → translate in that fixed order. |
| `TransformGroup` | `Children` (collection of `Transform`) | Combines multiple transforms in a caller-chosen order, unlike the fixed order of `CompositeTransform`. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (WinUI 3). Applied via `UIElement.RenderTransform`; the pivot for all transforms except `TranslateTransform` defaults to the element's local (0,0), further adjustable with `UIElement.RenderTransformOrigin` (fractional 0–1 origin) — avoid setting both `RenderTransformOrigin` and a transform's own `CenterX`/`CenterY` at once.
- Transforms are applied **after** the layout pass completes; there is no `LayoutTransform` property in WinUI 3/UWP XAML (unlike WPF), so transformed elements can appear clipped inside a `Grid` cell or other space-allocating container that measured pre-transform dimensions.
- To animate a transform property, target it with `DoubleAnimation`/`DoubleAnimationUsingKeyFrames` via a `Storyboard` — animating `RenderTransform` properties is not treated as a dependent animation, unlike animating `Width`/`Height` directly.
- Hit-testing follows the transformed visual position; z-order for input is still governed by child declaration order (or `Canvas.ZIndex` inside a `Canvas`), unaffected by the transform.
- `TranslateTransform`/`ScaleTransform`/`RotateTransform`/`SkewTransform` share their class names with `System.Windows.Media.*` in WPF (see the windows-interop-modernize skill's WPF/WinForms interop pages) — same names, different namespace and unrelated implementation.
- For 3D perspective effects layered on top of this 2D transform system, see 3-D Perspective Effects.

## Related

- [3-D Perspective Effects](./3-d-perspective-effects.md)
- [Layout Fundamentals](./layout-fundamentals.md)
