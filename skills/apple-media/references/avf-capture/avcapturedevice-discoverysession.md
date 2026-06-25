# AVCaptureDevice.DiscoverySession

An object that finds capture devices matching specific criteria such as device type, media type, and position.

## Signature / Usage

```swift
let session = AVCaptureDevice.DiscoverySession(
    deviceTypes: [.builtInWideAngleCamera, .builtInUltraWideCamera],
    mediaType: .video,
    position: .back
)

let devices = session.devices
// Observe `devices` via KVO for hardware connect/disconnect events
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `devices` | `[AVCaptureDevice]` | Devices matching the session's search criteria (KVO-observable) |
| `supportedMultiCamDeviceSets` | `[Set<AVCaptureDevice>]` | Device combinations usable simultaneously in a multi-camera session |

### `init(deviceTypes:mediaType:position:)` parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `deviceTypes` | `[AVCaptureDevice.DeviceType]` | Device types to search for (e.g., `.builtInWideAngleCamera`) |
| `mediaType` | `AVMediaType?` | Media type filter (e.g., `.video`, `.audio`); `nil` matches all |
| `position` | `AVCaptureDevice.Position` | Physical position filter: `.front`, `.back`, `.unspecified` |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 2.1+
- Prefer this over the deprecated `AVCaptureDevice.devices()` class methods.
- Key-value observe the `devices` property to react to cameras being connected or disconnected at runtime.
- Use `supportedMultiCamDeviceSets` to determine valid device combinations for `AVCaptureMultiCamSession`.

## Related

- [AVCaptureDevice](./avcapturedevice.md)
- [AVCaptureDeviceInput](./avcapturedeviceinput.md)
- [AVCaptureSession](./avcapturesession.md)
