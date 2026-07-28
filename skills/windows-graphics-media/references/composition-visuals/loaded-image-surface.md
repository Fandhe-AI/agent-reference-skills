# LoadedImageSurface

Represents a composition surface that an image is downloaded, decoded, and loaded onto, from a URI or an `IRandomAccessStream`. Supplies pixels to a [CompositionSurfaceBrush](./composition-surface-brush.md).

## Signature / Usage

```csharp
Compositor compositor = new Compositor();
CompositionSurfaceBrush imageBrush = compositor.CreateSurfaceBrush();

LoadedImageSurface loadedSurface =
    LoadedImageSurface.StartLoadFromUri(new Uri("ms-appx:///Assets/myPic.jpg"), new Size(200.0, 400.0));

// loadedSurface is 0x0 until decoding completes (see LoadCompleted event).
imageBrush.Surface = loadedSurface;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| StartLoadFromUri(Uri) / StartLoadFromUri(Uri, Size) | static method | Loads an image from a URI, optionally decoding to a maximum size (otherwise natural size). |
| StartLoadFromStream(IRandomAccessStream) / StartLoadFromStream(IRandomAccessStream, Size) | static method | Loads an image from a stream, optionally with a maximum decode size. |
| DecodedSize | Size (read-only) | Size of the decoded image in device-independent pixels. |
| NaturalSize | Size (read-only) | Natural size of the image as defined in the source file, in physical pixels. |
| LoadCompleted | event | Fires when the image has been downloaded, decoded, and loaded onto the surface. |
| Close() | method | Explicitly disposes the surface's resources. |

## Notes

- Namespace: `Windows.UI.Xaml.Media` (UWP-origin WinRT API, also usable from Windows App SDK / WinUI 3 desktop apps).
- Supports JPEG, PNG, BMP, GIF (first frame only — no animated GIF), TIFF, JPEG XR, and ICO; decoding is backed by WIC (Windows Imaging Component).
- Underlying surface starts at 0x0 and resizes once decoding completes off the UI thread; check `LoadCompleted` before relying on final dimensions.
- Not available prior to Windows 10 version 1703 (SDK 15063).

## Related

- [CompositionSurfaceBrush](./composition-surface-brush.md)
- [Compositor](./compositor.md)
