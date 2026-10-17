---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-camera
---

# Camera domain

Make your camera app's actions available to Apple Intelligence and Siri by adopting schemas for common camera actions.

## Signature / Usage

```swift
@AppIntent(schema: .camera.openInCaptureMode)
struct NavigateToCaptureModeIntent: OpenIntent {
    var target: <#CaptureMode#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `openInCaptureMode` | Intent (`AppSchema.CameraIntent`) | An intent schema that opens the camera in the specified mode. | "Open the camera." / "Take a photo." |
| `setDevice` | Intent (`AppSchema.CameraIntent`) | Changes the camera to the specified position. | (none listed) |
| `startCapture` | Intent (`AppSchema.CameraIntent`) | Starts a capture or opens the camera in a specified mode with a timer setting. | "Start recording." / "Record a video." |
| `stopCapture` | Intent (`AppSchema.CameraIntent`) | Stops a recording in progress. | (none listed) |
| `switchDevice` | Intent (`AppSchema.CameraIntent`) | Toggles between front and back camera. | "Flip the camera." / "Turn the camera." |
| `captureDevice` | Enum (`AppSchema.CameraEnum`) | An enum schema for a capture device parameter. | — |
| `captureDuration` | Enum (`AppSchema.CameraEnum`) | An enum schema for a capture duration parameter. | — |
| `captureMode` | Enum (`AppSchema.CameraEnum`) | An enum schema for a capture mode parameter. | — |

## Notes

- The `.camera` domain: protocols `AppSchema.CameraIntent`, `AppSchema.CameraEnum` (there is no camera entity group on the domain page). Enums are "Types for static parameters".
- `AppSchema.CameraIntent` and `openInCaptureMode`: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+. Domain page itself carries no platform metadata.
- Xcode generates a template implementation when you type `camera_` and select a schema from the suggestions list.
- Distinct from camera capture APIs (AVFoundation capture, `CameraCaptureIntent` in intent-types); this page is only the app schema for Apple Intelligence and Siri.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Photos domain](./domain-photos.md)
- [CameraCaptureIntent](../intent-types/cameracaptureintent.md)
