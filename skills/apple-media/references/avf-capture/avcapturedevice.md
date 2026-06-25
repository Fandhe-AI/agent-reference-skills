# AVCaptureDevice

An object that represents a hardware or virtual capture device like a camera or microphone.

## Signature / Usage

```swift
// Discover a specific device type
let discovery = AVCaptureDevice.DiscoverySession(
    deviceTypes: [.builtInWideAngleCamera],
    mediaType: .video,
    position: .back
)
let device = discovery.devices.first

// Or use the default device
let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back)

// Configure (lock required)
try device?.lockForConfiguration()
device?.focusMode = .continuousAutoFocus
device?.unlockForConfiguration()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uniqueID` | `String` | Unique identifier for the device |
| `localizedName` | `String` | Human-readable name |
| `deviceType` | `AVCaptureDevice.DeviceType` | The type of capture device |
| `position` | `AVCaptureDevice.Position` | Physical position (front/back/unspecified) |
| `isConnected` | `Bool` | Whether the device is currently connected |
| `isSuspended` | `Bool` | Whether the device is suspended |
| `isVirtualDevice` | `Bool` | Whether the device is a virtual (fusion) device |
| `constituentDevices` | `[AVCaptureDevice]` | Physical devices comprising a virtual device |
| `systemPressureState` | `AVCaptureDevice.SystemPressureState` | Current thermal/resource pressure |
| `isContinuityCamera` | `Bool` | Whether this is a Continuity Camera device |
| `systemPreferredCamera` | `AVCaptureDevice?` | System-selected preferred camera (class property) |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 1.0+
- Always call `lockForConfiguration()` before modifying focus, exposure, or white balance; release with `unlockForConfiguration()`.
- Request authorization via `AVCaptureDevice.requestAccess(for:completionHandler:)` before accessing camera or microphone.
- Prefer `AVCaptureDevice.DiscoverySession` over deprecated `devices()` class methods.

## Related

- [AVCaptureDevice.DiscoverySession](./avcapturedevice-discoverysession.md)
- [AVCaptureDeviceInput](./avcapturedeviceinput.md)
- [AVCaptureSession](./avcapturesession.md)
