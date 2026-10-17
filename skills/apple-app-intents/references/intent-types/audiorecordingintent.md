---
source: https://developer.apple.com/documentation/appintents/audiorecordingintent
---

# AudioRecordingIntent

An app intent that starts, stops or otherwise modifies audio recording state.

## Signature / Usage

```swift
protocol AudioRecordingIntent : SystemIntent
```

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- Adopt this protocol to create an app intent for audio recording functionality and tell the system that the app records audio. As a result of this intent, the system displays an audio recording indicator.
- Important: in iOS, iPadOS, and watchOS, when you adopt `AudioRecordingIntent` you must start a Live Activity when you begin the audio recording and keep it active as long as you record audio. If you don't start a Live Activity, the audio recording stops.
- The page declares no members.
- ActivityKit Live Activity APIs are not covered by this skill; see apple-app-services for the WidgetKit / ActivityKit side.

## Related

- [AudioPlaybackIntent](./audioplaybackintent.md)
- [CameraCaptureIntent](./cameracaptureintent.md)
- [SystemIntent](./systemintent.md)
