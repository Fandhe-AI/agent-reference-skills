# Shapes

Drawing primitives in `Microsoft.UI.Xaml.Shapes` — `Rectangle`, `Ellipse`, `Line`, `Polygon`, `Polyline`, and `Path` — each a `UIElement` whose boundary is defined by a `Geometry` and rendered with `Fill`/`Stroke` brushes.

## Signature / Usage

```xaml
<Ellipse Fill="SteelBlue" Height="200" Width="200" />

<Rectangle Fill="Blue" Width="200" Height="100"
           Stroke="Black" StrokeThickness="3"
           RadiusX="50" RadiusY="10" />

<Line Stroke="Red" X2="400" />

<Polygon Fill="LightBlue" Points="10,200,60,140,130,140,180,200" />

<Polyline Stroke="Black" StrokeThickness="4"
          Points="10,200,60,140,130,140,180,200" />

<Path Stroke="DarkGoldenRod" StrokeThickness="3"
      Data="M 100,200 C 100,25 400,350 400,175 H 280" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Fill | Brush | Interior paint. Ignored by `Line` (no interior space). |
| Stroke | Brush | Perimeter outline paint. Required (with non-zero `StrokeThickness`) for the outline to render at all. |
| StrokeThickness | double | Outline thickness; 0 (default) draws no outline. |
| RadiusX / RadiusY (Rectangle only) | double | Rounds corners; each defines the axis of an ellipse describing the corner curve. Max is `Width`/2 and `Height`/2 respectively. |
| X1 / Y1 / X2 / Y2 (Line only) | double | Endpoint coordinates; default 0, so `<Line X2="400"/>` alone draws `(0,0)`→`(400,0)`. |
| Points (Polygon / Polyline only) | PointCollection | Comma-separated coordinate list in XAML; boundary connects consecutive points. `Polygon` implicitly closes last point to first, `Polyline` does not. |
| Data (Path only) | Geometry | A geometry description — either an SVG-compatible path mini-language string (`M`/`C`/`H`/…) or an explicit `Geometry` object (commonly a `GeometryGroup` containing `PathGeometry`/`RectangleGeometry`/`EllipseGeometry`). |

## Notes

- Package: `Microsoft.UI.Xaml.Shapes` (WinUI 3). Distinct from `System.Windows.Shapes` (WPF, covered in `windows-interop-modernize`) and unrelated to the lower-level Direct2D geometry types (`ID2D1PathGeometry` etc.) in `windows-graphics-media`.
- An `Ellipse` with equal `Width`/`Height` renders as a circle; its layout slot is still the bounding rectangle.
- For a rectangle wrapping child content, prefer `Border` (auto-sizes to content, has `CornerRadius`) over `Rectangle`, which uses fixed dimensions and no child content. `Rectangle` is commonly used instead as a control-template "FocusVisual" part.
- `Path.Data` string syntax is SVG-path-compatible, useful for porting SVG artwork or output from design tools (e.g. Blend).

## Related

- [Image](./image.md)
