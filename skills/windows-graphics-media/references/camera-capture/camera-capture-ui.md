# CameraCaptureUI

Provides a full-window, ready-made UI for capturing photos, audio, and video from a camera, including controls for trimming video, time-delayed capture, and camera settings.

## Signature / Usage

```csharp
public sealed class CameraCaptureUI
```

```csharp
CameraCaptureUI dialog = new CameraCaptureUI();
Size aspectRatio = new Size(16, 9);
dialog.PhotoSettings.CroppedAspectRatio = aspectRatio;

StorageFile file = await dialog.CaptureFileAsync(CameraCaptureUIMode.Photo);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PhotoSettings` | `CameraCaptureUIPhotoCaptureSettings` | Settings for capturing photos: aspect ratio, image size, format, resolution, whether cropping is allowed. |
| `VideoSettings` | `CameraCaptureUIVideoCaptureSettings` | Settings for capturing videos: format, maximum resolution, maximum duration, whether trimming is allowed. |

## Methods

| Name | Description |
|------|-------------|
| `CaptureFileAsync(CameraCaptureUIMode)` | Launches the `CameraCaptureUI` experience. `mode` is `Photo`, `Video`, or `PhotoOrVideo`. Returns a `StorageFile`, or `null` if the user cancels. |

## Notes

- Namespace: `Windows.Media.Capture` (WinRT).
- Do **not** declare the `webcam` or `microphone` capabilities in the app manifest when using `CameraCaptureUI` — it is a trusted first-party experience that the user must initiate, and declaring these capabilities can cause Store certification failures.
- Contrast with `MediaCapture`, which requires declaring `webcam`/`microphone` capabilities because it captures programmatically without a user-initiated button press.

## Related

- [MediaCapture](./media-capture.md)
- [Camera capabilities and privacy](./camera-capabilities-privacy.md)
