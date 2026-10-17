---
source: https://developer.apple.com/documentation/appintents/systemintent
---

# SystemIntent

Designates intent types provided by App Intents.

## Signature / Usage

```swift
protocol SystemIntent : AppIntent
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (version not listed on the page), watchOS 9.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. The page declares no members and has no overview text.
- Inherited by (per the source relationships): `AudioPlaybackIntent`, `AudioRecordingIntent`, `AudioStartingIntent` (deprecated), `CameraCaptureIntent`, `DeleteIntent`, `LiveActivityIntent`, `LiveActivityStartingIntent` (deprecated), `OpenIntent`, `PauseWorkoutIntent`, `PlayVideoIntent`, `PushToTalkTransmissionIntent`, `ResumeWorkoutIntent`, `ShowInAppSearchResultsIntent`, `StartDiveIntent`, `StartWorkoutIntent`, `UndoableIntent`.
- Conforming types: `OpenURLIntent`, `RunSystemShortcutIntent`.
- Not part of this list (they inherit `AppIntent` directly): `SetValueIntent`, `DeprecatedAppIntent`, `URLRepresentableIntent`, `ProgressReportingIntent`, `CustomIntentMigratedAppIntent`.

## Related

- [OpenIntent](./openintent.md)
- [DeleteIntent](./deleteintent.md)
- [ShowInAppSearchResultsIntent](./showinappsearchresultsintent.md)
- [AudioPlaybackIntent](./audioplaybackintent.md)
- [AudioRecordingIntent](./audiorecordingintent.md)
- [CameraCaptureIntent](./cameracaptureintent.md)
- [PlayVideoIntent](./playvideointent.md)
- [PushToTalkTransmissionIntent](./pushtotalktransmissionintent.md)
- [OpenURLIntent](./openurlintent.md)
