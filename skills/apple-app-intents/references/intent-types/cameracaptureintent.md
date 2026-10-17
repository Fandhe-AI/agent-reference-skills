---
source: https://developer.apple.com/documentation/appintents/cameracaptureintent
---

# CameraCaptureIntent

Designates intent that will launch an activity that uses device's camera to capture photos or videos. Marking your intent with this protocol makes it available as a possible action for Camera quick action.

## Signature / Usage

```swift
protocol CameraCaptureIntent : SystemIntent
```

Members (from the Topics section):

```swift
associatedtype AppContext : Decodable, Encodable, Sendable = Never
static var appContext: Self.AppContext? { get }
static func updateAppContext(Self.AppContext?) async throws
```

## Options / Props

| Name | Description |
| --- | --- |
| `AppContext` | Container type used for storing and retrieving app specific information that can be accessed whenever (and wherever) this intent gets run. |
| `appContext` | An app context that an app can use to pass necessary information to the sandboxed capture extension. The system will retrieve this app context when necessary and inject it for use during (sentence truncated in source). |
| `updateAppContext(_:)` | Whenever the in-app context for this intent changes any process containing this intent can call this method to provide updated state to the system. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+. The page lists no macOS, tvOS, visionOS, or watchOS availability.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- The page has no overview text beyond the abstract. Capture extension APIs (LockedCameraCapture) are outside the scope of this skill; see apple-media for camera capture.

## Related

- [AudioPlaybackIntent](./audioplaybackintent.md)
- [AudioRecordingIntent](./audiorecordingintent.md)
- [PlayVideoIntent](./playvideointent.md)
- [SystemIntent](./systemintent.md)
