# Get a Preview Frame from the Camera

Captures a single frame from an already-running `MediaCapture` preview stream as a `SoftwareBitmap`, for lightweight image analysis (e.g. barcode scanning, face detection) without a full photo capture.

## Signature / Usage

```csharp
using var previewFrame = new VideoFrame(
    BitmapPixelFormat.Bgra8, (int)previewProperties.Width, (int)previewProperties.Height);

await _mediaCapture.GetPreviewFrameAsync(previewFrame);
SoftwareBitmap bitmap = SoftwareBitmap.Copy(previewFrame.SoftwareBitmap);
```

```csharp
// Or get a frame in the stream's native format, with no VideoFrame argument
var previewFrame = await _mediaCapture.GetPreviewFrameAsync();
SoftwareBitmap previewBitmap = previewFrame.SoftwareBitmap;
```

## Notes

- Requires an already-initialized `MediaCapture` with a running preview.
- Passing an empty `VideoFrame` (no pixel format specified) via `GetPreviewFrameAsync()` returns the frame in the preview stream's current format; passing a `VideoFrame` created with a specific `BitmapPixelFormat`/size lets the API convert for you.
- `VideoFrame` implements `IDisposable` — use `using`, and copy out the `SoftwareBitmap` (`SoftwareBitmap.Copy`) if you need it to outlive the frame.
- To display the bitmap in an `Image` control, convert to `Bgra8` + `Premultiplied` alpha via `SoftwareBitmap.Convert` and wrap it in a `Microsoft.UI.Xaml.Media.Imaging.SoftwareBitmapSource` (not the UWP `Windows.UI.Xaml` namespace) via `SoftwareBitmapSource.SetBitmapAsync`.
- Update UI-bound `Image.Source` via `DispatcherQueue.TryEnqueue`, not `CoreDispatcher.RunAsync`.
- Dispose both the `VideoFrame` and `SoftwareBitmap` promptly after use to release underlying buffers.

## Related

- [MediaCapture](./media-capture.md)
- [Camera preview access](./simple-camera-preview-access.md)
- [SoftwareBitmap](./software-bitmap.md)
