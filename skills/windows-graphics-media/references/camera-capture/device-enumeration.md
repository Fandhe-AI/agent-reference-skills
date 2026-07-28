# DeviceInformation.FindAllAsync (Camera Enumeration)

Enumerates the video capture (and other) devices available on the system, used to list the cameras a user can choose from before initializing `MediaCapture`.

## Signature / Usage

```csharp
public static IAsyncOperation<DeviceInformationCollection> FindAllAsync(DeviceClass deviceClass)
```

```csharp
using Windows.Devices.Enumeration;

DeviceInformationCollection cameraDevices =
    await DeviceInformation.FindAllAsync(DeviceClass.VideoCapture);

foreach (DeviceInformation device in cameraDevices)
{
    // device.Id, device.Name, device.IsEnabled
}
```

An equivalent AQS-based selector for video capture devices can be obtained from `MediaDevice.GetVideoCaptureSelector()` and passed to `DeviceInformation.FindAllAsync(String)`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `deviceClass` | `DeviceClass` | Enum specifying the device category to enumerate; use `VideoCapture` for cameras, `AudioCapture` for microphones. |

`DeviceInformation` properties relevant to camera enumeration:

| Name | Type | Description |
|------|------|-------------|
| `Id` | `String` | Unique identifier for the device; assign to `MediaCaptureInitializationSettings.VideoDeviceId`. |
| `Name` | `String` | Display-only friendly name; do not use to identify a specific device. |
| `IsEnabled` | `Boolean` | Whether the device is currently enabled. |
| `IsDefault` | `Boolean` | Whether this device is the default for its class. |

## Notes

- Namespace: `Windows.Devices.Enumeration` (WinRT).
- `DeviceInformation.FindAllAsync(DeviceClass)` returns a one-time snapshot. Use `DeviceInformation.CreateWatcher(DeviceClass)` for live add/remove/update notifications.
- The returned `Id` is passed to `MediaCaptureInitializationSettings.VideoDeviceId` to select a specific camera when initializing `MediaCapture`.

## Related

- [MediaCaptureInitializationSettings](./media-capture-initialization-settings.md)
- [MediaCapture](./media-capture.md)
