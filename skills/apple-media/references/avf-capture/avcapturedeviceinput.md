# AVCaptureDeviceInput

A capture input that provides media from an `AVCaptureDevice` to a capture session.

## Signature / Usage

```swift
do {
    let input = try AVCaptureDeviceInput(device: device)
    if session.canAddInput(input) {
        session.addInput(input)
    }
} catch {
    // Handle configuration error
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `device` | `AVCaptureDevice` | The capture device providing media |
| `videoMinFrameDurationOverride` | `CMTime` | Overrides the device's minimum frame duration |
| `activeLockedVideoFrameDuration` | `CMTime` | Locked frame duration (reciprocal of frame rate) |
| `isLockedVideoFrameDurationSupported` | `Bool` | Whether locked frame durations are supported |
| `unifiedAutoExposureDefaultsEnabled` | `Bool` | Whether unified auto-exposure defaults are enabled |
| `multichannelAudioMode` | `AVCaptureDeviceInput.MultichannelAudioMode` | Multichannel audio recording mode |
| `isWindNoiseRemovalEnabled` | `Bool` | Whether wind noise removal is active |
| `isAudioZoomEnabled` | `Bool` | Whether audio zoom is enabled |
| `isCinematicVideoCaptureEnabled` | `Bool` | Whether Cinematic Video effect is active |
| `simulatedAperture` | `Float` | Simulated aperture for Cinematic Video depth of field |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 1.0+
- `init(device:)` is a throwing initializer — wrap in `do/catch`.
- Use `ports(for:sourceDeviceType:sourceDevicePosition:)` to access constituent device ports of a virtual device.

## Related

- [AVCaptureDevice](./avcapturedevice.md)
- [AVCaptureSession](./avcapturesession.md)
