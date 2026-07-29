# CompositionLinearGradientBrush / CompositionRadialGradientBrush

Brushes that paint a [SpriteVisual](./sprite-visual.md) (or shape) with a multi-stop color gradient. `CompositionGradientBrush` is the abstract base holding shared gradient state (`ColorStops`, `ExtendMode`, `MappingMode`, transform properties); `CompositionLinearGradientBrush` adds a `StartPoint`/`EndPoint` axis, `CompositionRadialGradientBrush` adds `EllipseCenter`/`EllipseRadius`.

## Signature / Usage

```csharp
CompositionLinearGradientBrush gradientBrush = compositor.CreateLinearGradientBrush();
gradientBrush.StartPoint = new Vector2(0, 0);
gradientBrush.EndPoint = new Vector2(1, 1);
gradientBrush.MappingMode = CompositionMappingMode.Relative;

gradientBrush.ColorStops.Add(compositor.CreateColorGradientStop(0.0f, Colors.OrangeRed));
gradientBrush.ColorStops.Add(compositor.CreateColorGradientStop(1.0f, Colors.MediumPurple));

spriteVisual.Brush = gradientBrush;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ColorStops | `CompositionColorGradientStopCollection`, inherited | Ordered `CompositionColorGradientStop` (`Color` + `Offset` 0–1) values. |
| ExtendMode | CompositionGradientExtendMode, inherited | How the gradient is drawn outside its defined vector/space (`Clamp`, `Wrap`, `Mirror`). |
| MappingMode | CompositionMappingMode, inherited | Whether `StartPoint`/`EndPoint` (or the radial equivalents) are `Relative` (0–1, relative to the painted area) or `Absolute` coordinates. |
| InterpolationSpace | CompositionColorSpace, inherited | Color space used when interpolating between stops (`Auto`, `Rgb`, `RgbLinear`, `Hsl`, ...). |
| AnchorPoint / CenterPoint / Offset / Scale / RotationAngle / RotationAngleInDegrees / TransformMatrix | various, inherited | Transform properties applied to the brush itself, independent of the gradient axis. |
| StartPoint / EndPoint | Vector2 | `CompositionLinearGradientBrush` only: the two-dimensional coordinates defining the gradient axis. |
| EllipseCenter / EllipseRadius | Vector2 | `CompositionRadialGradientBrush` only: center and radius of the gradient ellipse. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `CompositionGradientBrush` inherits from `CompositionBrush`; `CompositionLinearGradientBrush`/`CompositionRadialGradientBrush` are `sealed` direct subclasses. The UWP equivalent is `Windows.UI.Composition.CompositionLinearGradientBrush`/`CompositionRadialGradientBrush`.
- Created via `Compositor.CreateLinearGradientBrush()` / `CreateRadialGradientBrush()`, then populated through `ColorStops.Add(compositor.CreateColorGradientStop(offset, color))` — see [Compositor](./compositor.md).
- Only supported with `Rgb` and `RgbLinear` `CompositionColorSpace`.
- Distinct from two other same-named-concept brushes in this repository: `Microsoft.UI.Xaml.Media.LinearGradientBrush` (the `windows-winui-ui` skill's XAML brush, set via `Background`/`Fill` in markup) is a different type in a different namespace from this Composition-visual-tree brush; and Direct2D's `ID2D1LinearGradientBrush` (this skill's direct2d-directwrite category) is the C++/COM equivalent used when drawing directly with a Direct2D render target rather than painting a `SpriteVisual`.

## Related

- [SpriteVisual](./sprite-visual.md)
- [Compositor](./compositor.md)
- [ID2D1LinearGradientBrush](../direct2d-directwrite/id2d1lineargradientbrush.md)
