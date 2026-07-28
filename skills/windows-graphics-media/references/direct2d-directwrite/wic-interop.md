# Windows Imaging Component (WIC) interop

Direct2D does not provide methods for loading or decoding image files itself; instead it relies on the Windows Imaging Component (WIC) to decode bitmaps (from files, resources, or streams) and convert them into a Direct2D-compatible pixel format before creating an [ID2D1Bitmap1](./id2d1bitmap1.md).

## Signature / Usage

```cpp
IWICBitmapDecoder* pDecoder = nullptr;
IWICBitmapFrameDecode* pSource = nullptr;
IWICFormatConverter* pConverter = nullptr;

hr = pIWICFactory->CreateDecoderFromFilename(
    uri, nullptr, GENERIC_READ, WICDecodeMetadataCacheOnLoad, &pDecoder);
hr = pDecoder->GetFrame(0, &pSource);

// Convert to 32bppPBGRA (DXGI_FORMAT_B8G8R8A8_UNORM + D2D1_ALPHA_MODE_PREMULTIPLIED).
hr = pIWICFactory->CreateFormatConverter(&pConverter);
hr = pConverter->Initialize(
    pSource, GUID_WICPixelFormat32bppPBGRA,
    WICBitmapDitherTypeNone, nullptr, 0.f, WICBitmapPaletteTypeMedianCut);

hr = pRenderTarget->CreateBitmapFromWicBitmap(pConverter, nullptr, &pBitmap);
```

## Options / Props

| Method | Description |
|------|-------------|
| IWICImagingFactory::CreateDecoderFromFilename / CreateDecoderFromStream | Creates an IWICBitmapDecoder for a file or in-memory stream (e.g. a loaded application resource). |
| IWICImagingFactory::CreateFormatConverter | Creates an IWICFormatConverter used to convert to the pixel format Direct2D requires. |
| ID2D1RenderTarget::CreateBitmapFromWicBitmap | Creates an [ID2D1Bitmap1](./id2d1bitmap1.md) by copying a converted WIC bitmap source. |
| ID2D1DeviceContext::CreateBitmapFromWicBitmap | Device-context equivalent, additionally accepting color context information. |

## Notes

- Namespace: Win32 COM (`wincodec.h` for WIC types; `d2d1.h`/`d2d1_1.h` for the Direct2D bitmap creation methods). Distinct from Android/Apple image-decoding APIs.
- Direct2D bitmaps require the `GUID_WICPixelFormat32bppPBGRA` format; always run the decoded frame through an `IWICFormatConverter` before calling `CreateBitmapFromWicBitmap`.
- Used for loading images from files, application resources, or in-memory streams for use as Direct2D bitmaps, brushes, or effect inputs.

## Related

- [ID2D1Bitmap1](./id2d1bitmap1.md)
- [ID2D1RenderTarget](./id2d1rendertarget.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
