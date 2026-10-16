# Process bitmaps with OpenCV

Use `SoftwareBitmap` with OpenCV through a native Windows Runtime component (`OpenCVBridge` / `OpenCVHelper`) that exposes a `Blur` method and converts a `SoftwareBitmap` to an OpenCV `Mat`.

## Signature / Usage

```csharp
// Outline assembled from the API names in the article (the article's full listing is a code include)
// Source image: decode with BitmapDecoder into a SoftwareBitmap, then ensure Bgra8 + Premultiplied
if (src.BitmapPixelFormat != BitmapPixelFormat.Bgra8 || src.BitmapAlphaMode != BitmapAlphaMode.Premultiplied)
    src = SoftwareBitmap.Convert(src, BitmapPixelFormat.Bgra8, BitmapAlphaMode.Premultiplied);

var dst = new SoftwareBitmap(src.BitmapPixelFormat, src.PixelWidth, src.PixelHeight, src.BitmapAlphaMode);
new OpenCVBridge.OpenCVHelper().Blur(src, dst);
// Display via SoftwareBitmapSource assigned to a XAML Image
```

## Notes

- Component steps: add a native "Windows Runtime Component (Universal Windows)" project named `OpenCVBridge`, add NuGet packages `OpenCV.Win.Core` and `OpenCV.Win.ImgProc`, implement `OpenCVHelper`, then reference the project from the app.
- `OpenCV.Win.Core` and `OpenCV.Win.ImgProc` are not regularly updated and do not pass Store compliance checks; experimentation only.
- `GetPointerToPixelData`: `SoftwareBitmap.LockBuffer` (read/write) -> `BitmapBuffer.CreateReference` -> `IMemoryBufferReference` -> `QueryInterface` for `IMemoryBufferByteAccess` -> `GetBuffer` to get a `char` array. Returns false if any step fails.
- `TryConvert` builds an OpenCV `Mat` with `CV_8UC4`, so the bitmap must be BGRA8 with premultiplied alpha. It returns a shallow copy so processing operates on the bitmap's own pixel buffer.
- `Blur` uses `TryConvert` for source and target, then calls OpenCV ImgProc `blur`.
- Image data must be in CPU memory, not GPU memory. For APIs that let you choose memory location (such as `MediaCapture`), specify CPU memory.
- UWP-era article (`windows/uwp/audio-video-camera`).
- Source: https://learn.microsoft.com/en-us/windows/uwp/audio-video-camera/process-software-bitmaps-with-opencv (ms.date 03/19/2018).

## Related

- [SoftwareBitmap](./software-bitmap.md)
- [Use OpenCV with MediaFrameReader](./use-opencv-with-mediaframereader.md)
- [MediaFrameReader](./media-frame-reader.md)
