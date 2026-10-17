---
source: https://developer.apple.com/documentation/appintents/audioplaybackintent
---

# AudioPlaybackIntent

An App Intent that plays, pauses, or otherwise modifies audio playback state when it executes.

## Signature / Usage

```swift
protocol AudioPlaybackIntent : SystemIntent
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS (version not listed on the page), watchOS 10.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- Adopt this protocol to indicate to the system that the App Intent plays audio. The system can then avoid dialogue or other experiences that might interrupt that audio.
- The page declares no members.
- Listed under "Media actions" with `AudioRecordingIntent`, `CameraCaptureIntent`, `PlayVideoIntent`, `VideoCategory`. Audio session / playback APIs themselves belong to apple-media.

## Related

- [AudioRecordingIntent](./audiorecordingintent.md)
- [CameraCaptureIntent](./cameracaptureintent.md)
- [PlayVideoIntent](./playvideointent.md)
- [SystemIntent](./systemintent.md)
