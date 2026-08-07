# Handle Device Orientation with MediaCapture

Applies rotation correction to the camera preview, captured photos, and captured video in a WinUI 3 desktop app, using a `CameraRotationHelper` class driven by the camera's `EnclosureLocation` and a `SimpleOrientationSensor`.

## Signature / Usage

```csharp
public class CameraRotationHelper
{
    public CameraRotationHelper(EnclosureLocation cameraEnclosureLocation);

    public event EventHandler<bool> OrientationChanged;

    public VideoRotation GetCameraPreviewOrientation();
    public PhotoOrientation GetCapturePhotoOrientation();
    public int GetCaptureVideoOrientation();
    public void Dispose();
}
```

```csharp
var devices = await DeviceInformation.FindAllAsync(DeviceClass.VideoCapture);
var deviceInfo = devices.FirstOrDefault(d => d.Id == cameraDevice.VideoDeviceId);

_rotationHelper = new CameraRotationHelper(deviceInfo?.EnclosureLocation);
_rotationHelper.OrientationChanged += (s, e) =>
    DispatcherQueue.TryEnqueue(UpdatePreviewRotation);

// Apply to preview
_mediaCapture.SetPreviewRotation(_rotationHelper.GetCameraPreviewOrientation());

// Apply to a captured photo (via EXIF property, ImageProperties.Orientation is read-only)
var photoOrientation = _rotationHelper.GetCapturePhotoOrientation();
await file.Properties.SavePropertiesAsync(
    new List<KeyValuePair<string, object>> {
        new("System.Photo.Orientation", photoOrientation) });
```

## Methods

| Name | Description |
|------|-------------|
| `GetCameraPreviewOrientation()` | Returns the `VideoRotation` to apply to the preview stream via `MediaCapture.SetPreviewRotation`. |
| `GetCapturePhotoOrientation()` | Returns the `PhotoOrientation` (EXIF-style) to write into a captured photo's `System.Photo.Orientation` property. |
| `GetCaptureVideoOrientation()` | Returns the clockwise rotation in degrees to apply when encoding captured video. |
| `Dispose()` | Unregisters the `SimpleOrientationSensor.OrientationChanged` handler. |

## Notes

- WinUI 3 desktop apps don't need continuous-rotation handling like mobile apps, but still must correct for camera sensor mounting angle and external-webcam rotation.
- External cameras (`EnclosureLocation` is `null` or `Panel.Unknown`) are treated as `NotRotated` / `PhotoOrientation.Normal` / `0`.
- Front-panel cameras are mirrored by convention; the helper flips the rotation value (`(360 - rotation) % 360`) for them.
- `SimpleOrientationSensor.GetDefault()` can return `null` on devices without an orientation sensor — handle that case.
- Packaged apps declare the `webcam` `DeviceCapability` in `Package.appxmanifest`; unpackaged apps rely on the OS-level "Let desktop apps access your camera" setting instead.

## Related

- [MediaCapture](./media-capture.md)
- [Camera preview access](./simple-camera-preview-access.md)
