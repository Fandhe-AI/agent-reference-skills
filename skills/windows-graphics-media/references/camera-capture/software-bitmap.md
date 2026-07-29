# SoftwareBitmap

Represents an uncompressed, in-memory bitmap. It is the common image type produced by camera preview/frame APIs (`MediaFrameReader`, `CapturedFrame`) and consumed by imaging APIs (`BitmapEncoder`/`BitmapDecoder`, `SoftwareBitmapSource` for XAML display).

## Signature / Usage

```csharp
public sealed class SoftwareBitmap : System.IDisposable
```

```csharp
// Construct an empty bitmap directly
var bitmap = new SoftwareBitmap(BitmapPixelFormat.Bgra8, 1920, 1080, BitmapAlphaMode.Premultiplied);

// Or decode one from a file (see BitmapDecoder)
SoftwareBitmap decoded = await decoder.GetSoftwareBitmapAsync();

// Convert to a pixel format/alpha mode required by a consumer (e.g. FaceDetector needs Gray8/Nv12,
// SoftwareBitmapSource for XAML display needs Bgra8 + Premultiplied)
SoftwareBitmap converted = SoftwareBitmap.Convert(decoded, BitmapPixelFormat.Gray8);

using (BitmapBuffer buffer = converted.LockBuffer(BitmapBufferAccessMode.Read))
{
    // Access buffer.CreateReference() for direct pixel access
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `SoftwareBitmap(BitmapPixelFormat, Int32, Int32, BitmapAlphaMode)` / `(BitmapPixelFormat, Int32, Int32)` | Constructors that allocate a new bitmap of the given pixel format, width, and height. |
| `PixelWidth` / `PixelHeight` | Dimensions of the bitmap, in pixels. |
| `BitmapPixelFormat` / `BitmapAlphaMode` | The pixel format (e.g. `Bgra8`, `Nv12`, `Gray8`) and alpha mode (e.g. `Premultiplied`) of the bitmap. |
| `IsReadOnly` | Whether the bitmap can be modified. |
| `DpiX` / `DpiY` | Dots per inch in each direction. |
| `Convert(SoftwareBitmap, BitmapPixelFormat, BitmapAlphaMode)` / `Convert(SoftwareBitmap, BitmapPixelFormat)` | Static methods that return a new bitmap converted to a different pixel format/alpha mode. |
| `Copy(SoftwareBitmap)` | Static method that creates a copy of a bitmap. |
| `CopyFromBuffer(IBuffer)` / `CopyToBuffer(IBuffer)` | Copy pixel data in from, or out to, an `IBuffer` (e.g. a XAML `WriteableBitmap.PixelBuffer`). |
| `CreateCopyFromBuffer(IBuffer, BitmapPixelFormat, Int32, Int32, ...)` | Static method that deep-copies pixel data from a buffer into a new bitmap. |
| `CreateCopyFromSurfaceAsync(IDirect3DSurface, ...)` | Static method that deep-copies a Direct3D surface into a new bitmap. |
| `LockBuffer(BitmapBufferAccessMode)` | Returns a `BitmapBuffer` for direct read/write access to the pixel data. |
| `Close()` / `Dispose()` | Releases the bitmap and its resources. |

## Notes

- Namespace: `Windows.Graphics.Imaging` (WinRT).
- Most camera and face-analysis APIs only support a limited subset of pixel formats (e.g. `FaceDetector`/`FaceTracker` require `Gray8` or `Nv12`; `SoftwareBitmapSource` for XAML display requires `Bgra8` with `Premultiplied` alpha) — use `Convert` to bridge between them.
- Use `BitmapDecoder.GetSoftwareBitmapAsync` to create a `SoftwareBitmap` from an encoded image file/stream, and `BitmapEncoder` to write one back out.
- Always dispose (`using`/`Dispose()`) `SoftwareBitmap` instances promptly; they hold native memory.

## Related

- [MediaFrameReader](./media-frame-reader.md)
- [AdvancedPhotoCapture](./advanced-photo-capture.md)
- [FaceTracker](./face-tracker.md)
- [VariablePhotoSequence](./variable-photo-sequence.md)
