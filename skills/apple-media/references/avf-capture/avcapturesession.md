# AVCaptureSession

An object that configures capture behavior and coordinates the flow of data from input devices to capture outputs.

## Signature / Usage

```swift
let session = AVCaptureSession()
session.beginConfiguration()
session.sessionPreset = .high
session.addInput(input)
session.addOutput(output)
session.commitConfiguration()
session.startRunning()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sessionPreset` | `AVCaptureSession.Preset` | Quality level or bit rate of the output |
| `inputs` | `[AVCaptureInput]` | Inputs providing media data to the session |
| `outputs` | `[AVCaptureOutput]` | Output destinations for captured data |
| `connections` | `[AVCaptureConnection]` | Connections between inputs and outputs |
| `isRunning` | `Bool` | Whether the session is currently running |
| `isInterrupted` | `Bool` | Whether the session is interrupted |
| `hardwareCost` | `Float` | Percentage of available hardware budget in use |
| `controls` | `[AVCaptureControl]` | Controls for configuring the camera from hardware |
| `supportsControls` | `Bool` | Whether the session supports controls |
| `maxControlsCount` | `Int` | Maximum number of supported controls |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, Mac Catalyst 14.0+, tvOS 17.0+, visionOS 1.0+
- Always call `startRunning()` on a serial dispatch queue — it is a blocking call that can block the main thread.
- Wrap all configuration changes between `beginConfiguration()` and `commitConfiguration()` to batch them atomically.
- Use `canAddInput(_:)` / `canAddOutput(_:)` before adding to avoid runtime exceptions.

## Related

- [AVCaptureDeviceInput](./avcapturedeviceinput.md)
- [AVCaptureOutput](./avcaptureoutput.md)
- [AVCaptureVideoPreviewLayer](./avcapturevideopreviewlayer.md)
