# ID2D1BitmapBrush

Paints an area with a bitmap. Like all brushes it defines an infinite plane of content; since bitmaps are finite, the brush relies on horizontal and vertical extend modes to determine how the plane is filled beyond the bitmap bounds (tiling, clamping, or mirroring).

## Signature / Usage

```cpp
ID2D1BitmapBrush* pBitmapBrush = nullptr;
hr = m_pRenderTarget->CreateBitmapBrush(
    m_pBitmap,
    D2D1::BitmapBrushProperties(D2D1_EXTEND_MODE_WRAP, D2D1_EXTEND_MODE_WRAP),
    &pBitmapBrush
    );

m_pRenderTarget->FillRectangle(&rc, pBitmapBrush);
```

## Options / Props

| Method | Description |
|------|-------------|
| GetBitmap / SetBitmap | Gets/sets the bitmap source the brush paints with. |
| GetExtendModeX / SetExtendModeX | Gets/sets how the brush horizontally tiles areas that extend past the bitmap (`D2D1_EXTEND_MODE_CLAMP`, `_WRAP`, `_MIRROR`). |
| GetExtendModeY / SetExtendModeY | Gets/sets how the brush vertically tiles areas that extend past the bitmap. |
| GetInterpolationMode / SetInterpolationMode | Gets/sets the interpolation mode used when the bitmap is scaled or rotated. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Brush. Created via [ID2D1RenderTarget::CreateBitmapBrush](./id2d1rendertarget.md); the device-context equivalent is `ID2D1DeviceContext::CreateBitmapBrush` (see [ID2D1DeviceContext](./id2d1devicecontext.md)).
- One of the four fundamental brush types alongside [ID2D1SolidColorBrush](./id2d1solidcolorbrush.md), [ID2D1LinearGradientBrush](./id2d1lineargradientbrush.md), and [ID2D1RadialGradientBrush](./id2d1radialgradientbrush.md).
- A device-dependent resource: recreate it whenever the render target is recreated.

## Related

- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1SolidColorBrush](./id2d1solidcolorbrush.md)
- [ID2D1LinearGradientBrush](./id2d1lineargradientbrush.md)
