# CameraCaptureUI

Provides a full-window, ready-made UI for capturing photos, audio, and video from a camera, including controls for trimming video, time-delayed capture, and camera settings.

## Signature / Usage

```csharp
public sealed class CameraCaptureUI
```

```csharp
// UWP (namespace Windows.Media.Capture): parameterless constructor
CameraCaptureUI dialog = new CameraCaptureUI();
// Windows App SDK / WinUI 3 (namespace Microsoft.Windows.Media.Capture, since 1.7):
// CameraCaptureUI dialog = new CameraCaptureUI(this.AppWindow.Id);

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

- Two distinct classes exist, both named `CameraCaptureUI`: UWP apps use `Windows.Media.Capture.CameraCaptureUI` (parameterless constructor). Windows App SDK apps (WinUI 3, Windows App SDK 1.7+) use `Microsoft.Windows.Media.Capture.CameraCaptureUI`, whose constructor takes a `Microsoft.UI.WindowId` — e.g. `new CameraCaptureUI(this.AppWindow.Id)`. Both expose `PhotoSettings`/`VideoSettings` and an async `CaptureFileAsync(CameraCaptureUIMode)` returning `StorageFile`. UWP apps must keep using the legacy `Windows.Media.Capture` class; use the App SDK class only from a Windows App SDK app.
- (UWP class) Do **not** declare the `webcam` or `microphone` capabilities in the app manifest when using `CameraCaptureUI` — it is a trusted first-party experience that the user must initiate, and declaring these capabilities can cause Store certification failures. The manifest-capability guidance is not restated in the Windows App SDK how-to; confirm against the App SDK app's own manifest requirements before assuming it carries over unchanged.
- Contrast with `MediaCapture`, which requires declaring `webcam`/`microphone` capabilities because it captures programmatically without a user-initiated button press.

## Related

- [MediaCapture](./media-capture.md)
- [Camera capabilities and privacy](./camera-capabilities-privacy.md)
