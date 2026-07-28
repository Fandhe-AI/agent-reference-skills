# CompositionSurfaceBrush

Paints a [SpriteVisual](./sprite-visual.md) with pixels from an `ICompositionSurface`, such as a [LoadedImageSurface](./loaded-image-surface.md).

## Signature / Usage

```csharp
SpriteVisual imageVisual = compositor.CreateSpriteVisual();
imageVisual.Size = new Vector2(300, 200);

CompositionSurfaceBrush imageBrush = compositor.CreateSurfaceBrush();
imageBrush.Surface = imageSurface; // e.g. a LoadedImageSurface
imageBrush.Stretch = CompositionStretch.UniformToFill;
imageBrush.HorizontalAlignmentRatio = 0.5f;
imageBrush.VerticalAlignmentRatio = 0.5f;

imageVisual.Brush = imageBrush;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Surface | ICompositionSurface | The surface (e.g. a `LoadedImageSurface`) whose pixels paint the brush. |
| Stretch | CompositionStretch | Scaling applied to the surface content relative to the target `SpriteVisual`'s size. |
| HorizontalAlignmentRatio / VerticalAlignmentRatio | float (0–1) | Positions the stretched content within the visual; default vertical is 0.5 (centered). |
| AnchorPoint / CenterPoint / Offset / Scale / RotationAngle / RotationAngleInDegrees / TransformMatrix | various | Custom transformations applied after stretch/alignment, in the coordinate space of the target `SpriteVisual`. |
| BitmapInterpolationMode | CompositionBitmapInterpolationMode | Pixel interpolation algorithm used when surface pixels don't map 1:1 to visual pixels. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Inherits from `CompositionBrush`. The UWP equivalent is `Windows.UI.Composition.CompositionSurfaceBrush`.
- Transformation order: (1) content is stretched/aligned per `Stretch`/`HorizontalAlignmentRatio`/`VerticalAlignmentRatio`, then (2) any other transform properties (`Offset`, `Scale`, `RotationAngle`, ...) are applied.
- Commonly paired with [LoadedImageSurface](./loaded-image-surface.md) to draw a downloaded/decoded image onto a `SpriteVisual`.

## Related

- [SpriteVisual](./sprite-visual.md)
- [LoadedImageSurface](./loaded-image-surface.md)
- [Compositor](./compositor.md)
