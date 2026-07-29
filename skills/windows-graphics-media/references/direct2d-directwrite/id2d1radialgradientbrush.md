# ID2D1RadialGradientBrush

Paints an area with a radial gradient defined by an ellipse (center, x-radius, y-radius) and a gradient origin offset, mapping gradient stop position 0.0 to the origin and 1.0 to the ellipse boundary.

## Signature / Usage

```cpp
ID2D1GradientStopCollection* pGradientStops = nullptr;
D2D1_GRADIENT_STOP stops[2] = { /* ... */ };
m_pRenderTarget->CreateGradientStopCollection(stops, 2, &pGradientStops);

ID2D1RadialGradientBrush* pBrush = nullptr;
hr = m_pRenderTarget->CreateRadialGradientBrush(
    D2D1::RadialGradientBrushProperties(
        D2D1::Point2F(150, 150),   // center
        D2D1::Point2F(0, 0),       // gradient origin offset
        100, 100),                 // radiusX, radiusY
    pGradientStops,
    &pBrush
    );
```

## Options / Props

| Method | Description |
|------|-------------|
| GetCenter / SetCenter | Gets/sets the center of the gradient ellipse in the brush's coordinate space. |
| GetGradientOriginOffset / SetGradientOriginOffset | Gets/sets the offset of the gradient origin relative to the ellipse center. |
| GetRadiusX / SetRadiusX | Gets/sets the x-radius of the gradient ellipse. |
| GetRadiusY / SetRadiusY | Gets/sets the y-radius of the gradient ellipse. |
| GetGradientStopCollection | Retrieves the ID2D1GradientStopCollection associated with the brush. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Brush. Created via [ID2D1RenderTarget::CreateRadialGradientBrush](./id2d1rendertarget.md), analogous to `CreateLinearGradientBrush`.
- If the gradient origin (center + offset) falls outside the ellipse bounds, the brush still renders but the gradient mapping is not well-defined.
- `D2D1_EXTEND_MODE` on the gradient stop collection controls how areas beyond the ellipse are painted, same as for the linear gradient brush.
- A device-dependent resource: recreate it whenever the render target is recreated.

## Related

- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1LinearGradientBrush](./id2d1lineargradientbrush.md)
- [ID2D1SolidColorBrush](./id2d1solidcolorbrush.md)
