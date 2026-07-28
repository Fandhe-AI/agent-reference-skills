# ID2D1DeviceContext

Represents a set of state and command buffers that are used to render to a target. Extends [ID2D1RenderTarget](./id2d1rendertarget.md) with bitmap-backed device-dependent creation, effects, and image drawing. The device context can render to a target bitmap or a command list.

## Signature / Usage

```cpp
ID2D1Bitmap1* pTargetBitmap = nullptr;
hr = pContext->CreateBitmapFromDxgiSurface(dxgiSurface, &bitmapProps, &pTargetBitmap);
pContext->SetTarget(pTargetBitmap);

pContext->BeginDraw();
pContext->Clear(D2D1::ColorF(D2D1::ColorF::White));
pContext->DrawImage(pEffect);
hr = pContext->EndDraw();
```

## Options / Props

| Method | Description |
|------|-------------|
| CreateBitmap / CreateBitmapFromDxgiSurface / CreateBitmapFromWicBitmap | Creates an ID2D1Bitmap1 target/source surface. |
| CreateEffect | Creates an [ID2D1Effect](./id2d1effect.md) for the specified class ID. |
| CreateCommandList | Creates an ID2D1CommandList for recording and replaying drawing commands. |
| CreateImageBrush / CreateBitmapBrush | Creates brushes from images or bitmaps. |
| DrawImage | Draws an ID2D1Image (bitmap, effect output, or command list) to the device context. |
| DrawBitmap | Draws a bitmap to the render target (overload with perspective transform). |
| SetTarget / GetTarget | Sets/gets the bitmap or command list the context renders to. |
| GetDevice | Gets the [ID2D1Device](./id2d1device.md) associated with the context. |
| SetUnitMode / GetUnitMode | Sets/gets whether values are interpreted as DIPs or pixels. |

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from [ID2D1RenderTarget](./id2d1rendertarget.md); created via [ID2D1Device::CreateDeviceContext](./id2d1device.md).
- Introduced with Direct2D 1.1; required for effects (`CreateEffect`/`DrawImage`) and DXGI-surface bitmap targets.

## Related

- [ID2D1Device](./id2d1device.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1Bitmap1](./id2d1bitmap1.md)
- [ID2D1Effect](./id2d1effect.md)
