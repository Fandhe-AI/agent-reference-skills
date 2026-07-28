# ID2D1LinearGradientBrush

Paints an area with a linear gradient along a line between a start point and end point, extruded perpendicular to that line.

## Signature / Usage

```cpp
ID2D1GradientStopCollection* pGradientStops = nullptr;
D2D1_GRADIENT_STOP stops[2] = { /* ... */ };
m_pRenderTarget->CreateGradientStopCollection(stops, 2, &pGradientStops);

ID2D1LinearGradientBrush* pBrush = nullptr;
hr = m_pRenderTarget->CreateLinearGradientBrush(
    D2D1::LinearGradientBrushProperties(D2D1::Point2F(0, 0), D2D1::Point2F(200, 0)),
    pGradientStops,
    &pBrush
    );
```

## Options / Props

| Method | Description |
|------|-------------|
| GetStartPoint / SetStartPoint | Gets/sets the starting coordinates of the gradient in brush space. |
| GetEndPoint / SetEndPoint | Gets/sets the ending coordinates of the gradient in brush space. |
| GetGradientStopCollection | Retrieves the ID2D1GradientStopCollection associated with the brush. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Brush. Created via [ID2D1RenderTarget::CreateLinearGradientBrush](./id2d1rendertarget.md).
- Start/end coordinates are absolute in brush space, not relative to the render target size; `D2D1_EXTEND_MODE` on the gradient stop collection controls how areas beyond the gradient axis are painted.
- A device-dependent resource: recreate it whenever the render target is recreated.

## Related

- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1SolidColorBrush](./id2d1solidcolorbrush.md)
