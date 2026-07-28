# ID2D1SolidColorBrush

Paints an area with a solid color.

## Signature / Usage

```cpp
hr = m_pRenderTarget->CreateSolidColorBrush(
    D2D1::ColorF(D2D1::ColorF::Black, 1.0f),
    &m_pBlackBrush
    );

m_pRenderTarget->FillRectangle(&rcBrushRect, m_pYellowGreenBrush);
m_pRenderTarget->DrawRectangle(&rcBrushRect, m_pBlackBrush, 1, nullptr);
```

## Options / Props

| Method | Description |
|------|-------------|
| GetColor | Retrieves the color of the solid color brush. |
| SetColor | Specifies the color of this solid-color brush. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Brush. Created via [ID2D1RenderTarget::CreateSolidColorBrush](./id2d1rendertarget.md).
- A device-dependent resource; can only be used with the render target that created it (or its compatible targets).

## Related

- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1LinearGradientBrush](./id2d1lineargradientbrush.md)
