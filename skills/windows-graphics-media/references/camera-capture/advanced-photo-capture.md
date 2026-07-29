# AdvancedPhotoCapture

Captures HDR (high dynamic range) or low-light-enhanced photos using Windows' built-in processing algorithms. The system captures multiple frames and composites them into a single output image; for HDR captures you can optionally access a reference frame before the final composite completes.

## Signature / Usage

```csharp
private AdvancedPhotoCapture m_advancedCapture;

// Check support, then configure a mode
bool hdrSupported = mediaCapture.VideoDeviceController.AdvancedPhotoControl.SupportedModes
    .Contains(AdvancedPhotoMode.Hdr);

var settings = new AdvancedPhotoCaptureSettings { Mode = AdvancedPhotoMode.Hdr };
mediaCapture.VideoDeviceController.AdvancedPhotoControl.Configure(settings);

m_advancedCapture = await mediaCapture.PrepareAdvancedPhotoCaptureAsync(
    ImageEncodingProperties.CreateUncompressed(MediaPixelFormat.Nv12));

m_advancedCapture.AllPhotosCaptured += (sender, args) => { /* re-enable capture UI */ };
m_advancedCapture.OptionalReferencePhotoCaptured += (sender, args) => { /* handle early reference frame */ };

AdvancedCapturedPhoto photo = await m_advancedCapture.CaptureAsync();
using (CapturedFrame frame = photo.Frame)
{
    // frame.SoftwareBitmap is only populated for uncompressed Nv12 encoding
}

await m_advancedCapture.FinishAsync();
```

## Options / Props

| Name | Description |
|------|-------------|
| `AdvancedPhotoControl.SupportedModes` | `IReadOnlyList<AdvancedPhotoMode>`; check for `AdvancedPhotoMode.Hdr` or `AdvancedPhotoMode.LowLight` to determine device support. |
| `AdvancedPhotoControl.Configure(AdvancedPhotoCaptureSettings)` | Applies the desired `AdvancedPhotoCaptureSettings.Mode` before preparing capture. |
| `MediaCapture.PrepareAdvancedPhotoCaptureAsync(ImageEncodingProperties)` | Returns the configured `AdvancedPhotoCapture` object. |
| `AdvancedPhotoCapture.CaptureAsync()` / `CaptureAsync(Object context)` | Captures a photo, returning an `AdvancedCapturedPhoto`; the `context` overload is echoed back in `OptionalReferencePhotoCapturedEventArgs.Context`. |
| `AdvancedPhotoCapture.OptionalReferencePhotoCaptured` | Event with an intermediate `CapturedFrame`, raised before HDR post-processing completes. Not raised on devices with hardware HDR. |
| `AdvancedPhotoCapture.AllPhotosCaptured` | Event signaling all source frames are captured, so a new capture may begin (post-processing may still be in progress). |
| `AdvancedPhotoCapture.FinishAsync()` | Releases the object and its resources. |
| `AdvancedCapturedPhoto.Frame` | `CapturedFrame` representing the captured image; exposes `.SoftwareBitmap` (only for uncompressed Nv12 encoding) and can be copied to a stream/file. |

## Notes

- Namespace: `Windows.Media.Capture` (`AdvancedPhotoCapture`, `AdvancedCapturedPhoto`); `AdvancedPhotoControl` and `AdvancedPhotoCaptureSettings` are in `Windows.Media.Devices`.
- Distinct from `LowLagPhotoCapture`, which minimizes shutter lag for a single ordinary photo rather than applying HDR/low-light compositing across multiple frames.
- Since Windows 10 version 1709, recording video and using `AdvancedPhotoCapture` concurrently is supported; check `AdvancedPhotoControl.SupportedModes` again immediately after starting/stopping recording, since the supported mode list can change.
- When `AdvancedPhotoCapture` is set to HDR mode, `FlashControl.Enabled` is ignored and flash never fires.
- Low-light mode falls back to a regular capture automatically if the system determines the low-light algorithm isn't needed for the current scene.

## Related

- [LowLagPhotoCapture](./low-lag-photo-capture.md)
- [MediaCapture](./media-capture.md)
- [SoftwareBitmap](./software-bitmap.md)
- [VariablePhotoSequence](./variable-photo-sequence.md)
