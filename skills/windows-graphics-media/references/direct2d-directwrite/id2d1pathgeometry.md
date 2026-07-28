# ID2D1PathGeometry

Represents a complex shape that may be composed of arcs, curves, and lines.

## Signature / Usage

```cpp
ID2D1GeometrySink* pSink = nullptr;
hr = m_pD2DFactory->CreatePathGeometry(&m_pPathGeometry);

hr = m_pPathGeometry->Open(&pSink);
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
| Open | Retrieves an [ID2D1GeometrySink](./id2d1geometrysink.md) used to populate the path geometry with figures and segments. |
| Stream | Copies the contents of the path geometry to the specified ID2D1GeometrySink. |
| GetFigureCount | Retrieves the number of figures in the path geometry. |
| GetSegmentCount | Retrieves the number of segments in the path geometry. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from [ID2D1Geometry](./id2d1geometry.md). Created via [ID2D1Factory::CreatePathGeometry](./id2d1factory.md).
- A device-independent resource: create once and retain for the app lifetime, or until it needs modification (path geometries are populated once via `Open`, then are immutable).

## Related

- [ID2D1Geometry](./id2d1geometry.md)
- [ID2D1GeometrySink](./id2d1geometrysink.md)
- [ID2D1Factory](./id2d1factory.md)
