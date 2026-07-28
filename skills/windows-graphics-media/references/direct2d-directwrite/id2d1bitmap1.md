# ID2D1Bitmap1

Represents a bitmap that can be used as a surface for an [ID2D1DeviceContext](./id2d1devicecontext.md) or mapped into system memory, and can contain additional color context information.

## Signature / Usage

```cpp
ID2D1Bitmap1* pTargetBitmap = nullptr;
D2D1_BITMAP_PROPERTIES1 bitmapProperties = D2D1::BitmapProperties1(
    D2D1_BITMAP_OPTIONS_TARGET | D2D1_BITMAP_OPTIONS_CANNOT_DRAW,
    D2D1::PixelFormat(DXGI_FORMAT_B8G8R8A8_UNORM, D2D1_ALPHA_MODE_PREMULTIPLIED)
    );

hr = pContext->CreateBitmapFromDxgiSurface(dxgiSurface, &bitmapProperties, &pTargetBitmap);
pContext->SetTarget(pTargetBitmap);
```

## Options / Props

| Method | Description |
|------|-------------|
| GetSurface | Gets the DXGI surface associated with the bitmap. |
| GetColorContext | Gets the color context information associated with the bitmap. |
| GetOptions | Gets the D2D1_BITMAP_OPTIONS used when creating the bitmap. |
| Map / Unmap | Maps/unmaps the bitmap into system memory for CPU read/write access. |

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from ID2D1Bitmap. Created via [ID2D1DeviceContext::CreateBitmap](./id2d1devicecontext.md) or `CreateBitmapFromWicBitmap`.
- A bitmap is a device-dependent resource: create it after initializing the render target/device context, and recreate it if the target needs recreating.

## Related

- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
