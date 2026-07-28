# VideoDeviceController

Controls manual device settings on the camera, such as focus, exposure, white balance, flash, zoom, and ISO speed.

## Signature / Usage

```csharp
public sealed class VideoDeviceController
```

```csharp
VideoDeviceController controller = mediaCapture.VideoDeviceController;

if (controller.FocusControl.Supported)
{
    await controller.FocusControl.SetPresetAsync(FocusPreset.Manual);
}

if (controller.ExposureControl.Supported)
{
    await controller.ExposureControl.SetAutoAsync(true);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Focus` / `FocusControl` | `MediaDeviceControl` / `FocusControl` | Get/set the camera's focus setting. |
| `Exposure` / `ExposureControl` | `MediaDeviceControl` / `ExposureControl` | Get/set the camera's exposure time. |
| `WhiteBalance` / `WhiteBalanceControl` | `MediaDeviceControl` / `WhiteBalanceControl` | Get/set the white balance. |
| `Zoom` / `ZoomControl` | `MediaDeviceControl` / `ZoomControl` | Get/set the zoom level. |
| `FlashControl` | `FlashControl` | Controls the camera flash. |
| `TorchControl` | `TorchControl` | Controls the camera torch (continuous light). |
| `IsoSpeedControl` | `IsoSpeedControl` | Controls the ISO film speed. |
| `Brightness` / `Contrast` / `Hue` / `Pan` / `Tilt` / `Roll` | `MediaDeviceControl` | Basic camera adjustment controls. |
| `RegionsOfInterestControl` | `RegionsOfInterestControl` | Sets regions of interest for autofocus/exposure. |
| `LowLagPhoto` / `LowLagPhotoSequence` | control objects | Query low-lag photo capability support. |

## Methods

| Name | Description |
|------|-------------|
| `GetAvailableMediaStreamProperties(MediaStreamType)` | Lists the supported encoding properties for the video device. |
| `GetMediaStreamProperties(MediaStreamType)` / `SetMediaStreamPropertiesAsync(...)` | Get/set the current encoding properties for a stream type. |
| `TryAcquireExclusiveControl(String, MediaCaptureDeviceExclusiveControlReleaseMode)` | Requests exclusive control of a camera. |

## Notes

- Namespace: `Windows.Media.Devices` (WinRT).
- Obtained via `MediaCapture.VideoDeviceController`.
- Some drivers require the preview stream to be running before they can accurately report which controls are supported; checking support before starting preview may report a control as unsupported even when it is available.
- This class is not agile — consider its threading model when marshaling across threads.

## Related

- [MediaCapture](./media-capture.md)
