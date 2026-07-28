# ID2D1Geometry

Represents a geometry resource and defines helper methods for manipulating and measuring geometric shapes. Interfaces that inherit from ID2D1Geometry (ID2D1RectangleGeometry, ID2D1EllipseGeometry, ID2D1RoundedRectangleGeometry, [ID2D1PathGeometry](./id2d1pathgeometry.md), ID2D1GeometryGroup, ID2D1TransformedGeometry) define specific shapes.

## Signature / Usage

```cpp
D2D1_RECT_F bounds;
hr = pGeometry->GetBounds(D2D1::Matrix3x2F::Identity(), &bounds);

BOOL contains = FALSE;
hr = pGeometry->FillContainsPoint(D2D1::Point2F(10, 10), D2D1::Matrix3x2F::Identity(), &contains);
```

## Options / Props

| Method | Description |
|------|-------------|
| GetBounds / GetWidenedBounds | Retrieves the bounds of the geometry, optionally widened by a stroke. |
| FillContainsPoint / StrokeContainsPoint | Hit-tests whether a point is inside the fill/stroke of the geometry. |
| ComputeArea / ComputeLength / ComputePointAtLength | Computes measurement properties as if the geometry were flattened. |
| CombineWithGeometry | Combines this geometry with another using a D2D1_COMBINE_MODE, writing the result to a sink. |
| Simplify / Outline / Widen | Produces a simplified, outlined, or widened version of the geometry via an ID2D1SimplifiedGeometrySink. |
| Tessellate | Produces a set of triangles covering the geometry, written to an ID2D1TessellationSink. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Resource. Created by [ID2D1Factory](./id2d1factory.md) (e.g. `CreatePathGeometry`, `CreateRectangleGeometry`).
- Geometries are immutable and device-independent: create once and retain for the app lifetime, or until they need to be modified (path geometries are populated once via a sink and then immutable).
- Used to draw outlines/fills (`DrawGeometry`/`FillGeometry` on [ID2D1RenderTarget](./id2d1rendertarget.md)) and for hit-testing and clip regions.

## Related

- [ID2D1PathGeometry](./id2d1pathgeometry.md)
- [ID2D1GeometrySink](./id2d1geometrysink.md)
- [ID2D1Factory](./id2d1factory.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
