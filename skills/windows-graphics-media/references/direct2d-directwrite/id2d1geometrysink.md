# ID2D1GeometrySink

Describes a geometric path that can contain lines, arcs, cubic Bezier curves, and quadratic Bezier curves. Obtained from [ID2D1PathGeometry::Open](./id2d1pathgeometry.md).

## Signature / Usage

```cpp
pSink->BeginFigure(D2D1::Point2F(0, 0), D2D1_FIGURE_BEGIN_FILLED);
pSink->AddLine(D2D1::Point2F(200, 0));
pSink->AddBezier(D2D1::BezierSegment(
    D2D1::Point2F(150, 50), D2D1::Point2F(150, 150), D2D1::Point2F(200, 200)));
pSink->EndFigure(D2D1_FIGURE_END_CLOSED);
hr = pSink->Close();
```

## Options / Props

| Method | Description |
|------|-------------|
| BeginFigure (inherited) | Starts a new figure at the specified point. |
| AddLine | Adds a line segment from the current point to the specified end point. |
| AddBezier | Adds a cubic Bezier curve from the current point to the specified end point. |
| AddQuadraticBezier / AddQuadraticBeziers | Adds one or more quadratic Bezier curves. |
| AddArc | Adds a single arc to the path geometry. |
| EndFigure (inherited) | Ends the current figure, optionally closing it. |
| Close (inherited) | Closes the geometry sink; no further methods can be called. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1SimplifiedGeometrySink (adds arcs and quadratic beziers to BeginFigure/AddLine/EndFigure/Close).
- A geometry consists of one or more figures; each figure is opened with `BeginFigure` and closed with `EndFigure`. Call `Close` once all figures are added.

## Related

- [ID2D1PathGeometry](./id2d1pathgeometry.md)
- [ID2D1Geometry](./id2d1geometry.md)
