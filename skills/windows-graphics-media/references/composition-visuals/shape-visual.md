# ShapeVisual / CompositionSpriteShape / CompositionGeometry

Composition's own vector-shape drawing system — a `ContainerVisual` variant (`ShapeVisual`) that hosts a tree of `CompositionShape`s instead of (or alongside) child visuals, analogous to an SVG/vector layer and distinct from drawing pixels via Direct2D onto a [CompositionDrawingSurface](./composition-drawing-surface.md). `CompositionSpriteShape` pairs a `CompositionGeometry` (the outline: rectangle, rounded rectangle, ellipse, line, or path) with a `FillBrush`/`StrokeBrush` to render it.

## Signature / Usage

```csharp
ShapeVisual shapeVisual = compositor.CreateShapeVisual();
shapeVisual.Size = new Vector2(200, 200);

CompositionRoundedRectangleGeometry geometry = compositor.CreateRoundedRectangleGeometry();
geometry.Size = new Vector2(160, 80);
geometry.CornerRadius = new Vector2(12, 12);

CompositionSpriteShape roundedRect = compositor.CreateSpriteShape(geometry);
roundedRect.Offset = new Vector2(20, 60);
roundedRect.FillBrush = compositor.CreateColorBrush(Colors.SteelBlue);
roundedRect.StrokeBrush = compositor.CreateColorBrush(Colors.White);
roundedRect.StrokeThickness = 2;

shapeVisual.Shapes.Add(roundedRect);
ElementCompositionPreview.SetElementChildVisual(hostGrid, shapeVisual);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ShapeVisual.Shapes | `CompositionShapeCollection` | The collection of `CompositionShape`s (typically `CompositionSpriteShape` or a `CompositionContainerShape` group) drawn by this visual, in order. |
| ShapeVisual.ViewBox | CompositionViewBox | Optional viewbox mapping shape-tree coordinates onto the visual's rendered size (like SVG `viewBox`). |
| CompositionSpriteShape.Geometry | CompositionGeometry | The outline (`CompositionRectangleGeometry`, `CompositionRoundedRectangleGeometry`, `CompositionEllipseGeometry`, `CompositionLineGeometry`, or `CompositionPathGeometry`) this shape draws. |
| CompositionSpriteShape.FillBrush / StrokeBrush | CompositionBrush | Brushes painting the shape's interior and outline respectively (solid, gradient, or surface/effect brush). |
| CompositionSpriteShape.StrokeThickness | float | Width of the outline. |
| CompositionSpriteShape.StrokeDashArray / StrokeDashOffset / StrokeStartCap / StrokeEndCap / StrokeDashCap / StrokeLineJoin / StrokeMiterLimit | various | Dash pattern and line-cap/join styling for the stroke. |
| CompositionSpriteShape.Offset / Scale / RotationAngle / CenterPoint / TransformMatrix | various | Per-shape transform, independent of the geometry's own coordinates. |
| CompositionGeometry.TrimStart / TrimEnd / TrimOffset | float (0–1) | Trims the drawn portion of the geometry's path — animating these produces a "draw-on" line/stroke effect. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `ShapeVisual` inherits from `ContainerVisual` → `Visual`; `CompositionSpriteShape` inherits from the abstract `CompositionShape`; concrete geometries inherit from the abstract `CompositionGeometry`. The UWP equivalents are the corresponding `Windows.UI.Composition.*` types.
- `ShapeVisual` is itself a `ContainerVisual`, so it can also host normal child `Visual`s via its inherited `Children` collection alongside its `Shapes`.
- Created via `Compositor.CreateShapeVisual()`, `CreateSpriteShape()`/`CreateSpriteShape(CompositionGeometry)`, and the per-geometry factories (`CreateRectangleGeometry`, `CreateRoundedRectangleGeometry`, `CreateEllipseGeometry`, `CreateLineGeometry`, `CreatePathGeometry`).
- `TrimStart`/`TrimEnd`/`StrokeDashArray` are all independently animatable, making `CompositionGeometry`/`CompositionSpriteShape` the standard building block for vector line-drawing and progress-ring–style animations.
- Distinct from `windows-winui-ui`'s XAML `Microsoft.UI.Xaml.Shapes` (`Path`, `Rectangle`, `Ellipse` — retained-mode XAML elements laid out by the XAML tree) and from Direct2D `ID2D1Geometry`/`ID2D1PathGeometry` (immediate-mode drawing onto a render target, covered in this skill's direct2d-directwrite category) — this is the WinRT composition-visual-tree shape system.

## Related

- [ContainerVisual](./container-visual.md)
- [SpriteVisual](./sprite-visual.md)
- [Compositor](./compositor.md)
- [CompositionDrawingSurface](./composition-drawing-surface.md)
