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

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `uniqueID` | `String` | — | Unique identifier for the device |
| `localizedName` | `String` | — | Human-readable name |
| `deviceType` | `AVCaptureDevice.DeviceType` | — | The type of capture device |
| `position` | `AVCaptureDevice.Position` | — | Physical position (front/back/unspecified) |
| `isConnected` | `Bool` | — | Whether the device is currently connected |
| `isSuspended` | `Bool` | — | Whether the device is suspended |
| `isVirtualDevice` | `Bool` | — | Whether the device is a virtual (fusion) device |
| `constituentDevices` | `[AVCaptureDevice]` | — | Physical devices comprising a virtual device |
| `systemPressureState` | `AVCaptureDevice.SystemPressureState` | — | Current thermal/resource pressure |
| `isContinuityCamera` | `Bool` | — | Whether this is a Continuity Camera device |
| `systemPreferredCamera` | `AVCaptureDevice?` | — | System-selected preferred camera (class property) |
| `isAutoVideoFrameRateEnabled` | `Bool` (get set) | — | Automatic video frame rate adjustment (iOS 18.0+, macOS 15.0+, tvOS 18.0+) |
| `isBackgroundReplacementEnabled` (class) | `Bool` (get) | — | Whether background replacement is enabled (iOS 18.0+, macOS 15.0+) |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 1.0+
- Always call `lockForConfiguration()` before modifying focus, exposure, or white balance; release with `unlockForConfiguration()`.
- Request authorization via `AVCaptureDevice.requestAccess(for:completionHandler:)` before accessing camera or microphone.
- Prefer `AVCaptureDevice.DiscoverySession` over deprecated `devices()` class methods.
- `AVCaptureDevice.RotationCoordinator` (iOS 17.0+, macOS 14.0+) reports `videoRotationAngleForHorizonLevelPreview` / `videoRotationAngleForHorizonLevelCapture`. Each coordinator is bound to one device, so create a new one when switching cameras; one created with a nil preview layer never reports a preview angle (from the iOS 27 sample "Supporting device rotation in your camera app").
- On iPhone Duo, `position` is a fixed hardware property and does not tell you which way a camera faces; use `AVCaptureDeviceDirectionCoordinator` (AVKit, iOS 27.1+).
- New device types `builtInInnerUltraWideCamera` / `builtInOuterUltraWideCamera` (iOS 27.1+).

## Related

- [AVCaptureDevice.DiscoverySession](./avcapturedevice-discoverysession.md)
- [AVCaptureDeviceInput](./avcapturedeviceinput.md)
- [AVCaptureSession](./avcapturesession.md)
- [AVCaptureDeviceDirectionCoordinator](./avcapturedevicedirectioncoordinator.md)
- [Camera capture accessory (iPhone Duo)](./camera-capture-accessory.md)
