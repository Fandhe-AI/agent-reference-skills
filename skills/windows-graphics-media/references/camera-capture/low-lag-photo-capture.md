# LowLagPhotoCapture

Provides methods for taking a low shutter-lag photo, minimizing the delay between the capture request and the actual exposure.

## Signature / Usage

```csharp
public sealed class LowLagPhotoCapture
```

```csharp
ImageEncodingProperties imgFormat = ImageEncodingProperties.CreateJpeg();
LowLagPhotoCapture lowLagCapture = await mediaCapture.PrepareLowLagPhotoCaptureAsync(imgFormat);

CapturedPhoto photo = await lowLagCapture.CaptureAsync();

await lowLagCapture.FinishAsync();
```

## Methods

| Name | Description |
|------|-------------|
| `CaptureAsync()` | Asynchronously captures a low shutter-lag photo. |
| `FinishAsync()` | Releases the `LowLagPhotoCapture` object and its resources. Must be called before the `MediaCapture` object can record video. |

## Notes

- Namespace: `Windows.Media.Capture` (WinRT).
- Obtained via `MediaCapture.PrepareLowLagPhotoCaptureAsync(ImageEncodingProperties)`, which must be called before `CaptureAsync()`.
- If the media type is changed or an effect is added/removed, call `PrepareLowLagPhotoCaptureAsync` again to create a new `LowLagPhotoCapture` object.

## Related

- [MediaCapture](./media-capture.md)
- [LowLagMediaRecording](./low-lag-media-recording.md)
