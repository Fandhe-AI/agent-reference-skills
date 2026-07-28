# ID2D1RenderTarget

Represents an object that can receive drawing commands. Interfaces that inherit from ID2D1RenderTarget (such as ID2D1HwndRenderTarget and [ID2D1DeviceContext](./id2d1devicecontext.md)) render the drawing commands they receive in different ways.

## Signature / Usage

```cpp
m_pRenderTarget->BeginDraw();

m_pRenderTarget->Clear(D2D1::ColorF(D2D1::ColorF::White));
m_pRenderTarget->DrawRectangle(&rc, m_pBlackBrush, 1.0f, nullptr);
m_pRenderTarget->FillGeometry(m_pPathGeometry, m_pYellowGreenBrush);
m_pRenderTarget->DrawBitmap(m_pBitmap, &destRect, 1.0f, D2D1_BITMAP_INTERPOLATION_MODE_LINEAR);
m_pRenderTarget->SetTransform(D2D1::Matrix3x2F::Rotation(45.0f));

HRESULT hr = m_pRenderTarget->EndDraw();
```

## Options / Props

| Method | Description |
|------|-------------|
| BeginDraw | Initiates drawing on this render target. |
| EndDraw | Ends drawing operations and returns the current error state; `D2DERR_RECREATE_TARGET` means the target must be recreated. |
| Clear | Clears the drawing area to the specified color. |
| DrawRectangle / DrawRoundedRectangle / DrawEllipse / DrawGeometry / DrawLine | Draws the outline of a shape using a brush and optional stroke style. |
| FillRectangle / FillRoundedRectangle / FillEllipse / FillGeometry / FillMesh | Paints the interior of a shape using a brush. |
| DrawBitmap | Draws the specified bitmap, optionally scaled to a destination rectangle. |
| DrawText / DrawTextLayout | Draws text using an IDWriteTextFormat or IDWriteTextLayout. |
| SetTransform / GetTransform | Applies/retrieves the current 2D transform for subsequent drawing operations. |
| CreateSolidColorBrush / CreateLinearGradientBrush / CreateRadialGradientBrush / CreateBitmapBrush | Creates brushes bound to this render target. |
| CreateBitmap / CreateBitmapFromWicBitmap / CreateSharedBitmap | Creates device-dependent bitmaps. |
| CreateCompatibleRenderTarget | Creates an offscreen bitmap render target compatible with this one. |
| PushLayer / PopLayer, PushAxisAlignedClip / PopAxisAlignedClip | Manages clip and layer stacks for masked/clipped drawing. |
| SaveDrawingState / RestoreDrawingState | Saves/restores antialiasing mode, transform, and tags. |
| Flush | Executes all pending drawing commands immediately. |

## Notes

- Namespace: Win32 COM (d2d1.h). Inherits from ID2D1Resource. Base class for ID2D1HwndRenderTarget, ID2D1BitmapRenderTarget, ID2D1DCRenderTarget, ID2D1GdiInteropRenderTarget, and [ID2D1DeviceContext](./id2d1devicecontext.md).
- Create render targets once and hold them for the app lifetime, until `EndDraw` returns `D2DERR_RECREATE_TARGET`, at which point both the target and its device-dependent resources must be recreated.
- All drawing calls must occur between `BeginDraw` and `EndDraw`.

## Related

- [ID2D1Factory](./id2d1factory.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1SolidColorBrush](./id2d1solidcolorbrush.md)
- [ID2D1LinearGradientBrush](./id2d1lineargradientbrush.md)
- [ID2D1Geometry](./id2d1geometry.md)
- [ID2D1Bitmap1](./id2d1bitmap1.md)
