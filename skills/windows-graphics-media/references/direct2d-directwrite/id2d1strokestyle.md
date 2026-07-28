# ID2D1StrokeStyle

Describes the caps, miter limit, line join, and dash information for a stroke.

## Signature / Usage

```cpp
float dashes[] = {1.0f, 2.0f, 2.0f, 3.0f, 2.0f, 2.0f};

hr = m_pD2DFactory->CreateStrokeStyle(
    D2D1::StrokeStyleProperties(
        D2D1_CAP_STYLE_FLAT, D2D1_CAP_STYLE_FLAT, D2D1_CAP_STYLE_ROUND,
        D2D1_LINE_JOIN_MITER, 10.0f, D2D1_DASH_STYLE_CUSTOM, 0.0f),
    dashes, ARRAYSIZE(dashes),
    &m_pStrokeStyleCustom
    );

m_pRenderTarget->DrawLine(
    D2D1::Point2F(0, 310), D2D1::Point2F(200, 310),
    m_pCornflowerBlueBrush, 10.0f, m_pStrokeStyleCustom
    );
```

## Options / Props

| Method | Description |
|------|-------------|
| GetStartCap / GetEndCap / GetDashCap | Retrieves the shape used at the start/end/dash ends of a stroke. |
| GetLineJoin | Retrieves the type of joint used at the vertices of a shape's outline. |
| GetMiterLimit | Retrieves the limit on the ratio of miter length to half the stroke thickness. |
| GetDashStyle / GetDashOffset | Retrieves the dash pattern style and starting offset. |
| GetDashes / GetDashesCount | Copies the custom dash pattern array / retrieves its length. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Resource. Created via [ID2D1Factory::CreateStrokeStyle](./id2d1factory.md).
- A device-independent resource: create once and retain for the app lifetime.
- Passed to `DrawRectangle`, `DrawGeometry`, `DrawLine`, etc. on [ID2D1RenderTarget](./id2d1rendertarget.md).

## Related

- [ID2D1Factory](./id2d1factory.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
