# CLBackgroundActivitySession

An object that manages a visual indicator keeping your app active in the background so it can continue receiving location updates or monitoring events.

## Signature / Usage

```swift
final class CLBackgroundActivitySession

let session = CLBackgroundActivitySession()
// ... later, when background location access is no longer needed
session.invalidate()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `diagnostics` | `CLBackgroundActivitySession.Diagnostics` | Diagnostic information about the session |

## Key Methods

```swift
init()
func invalidate()
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, visionOS 1.0+, watchOS 10.0+
- Lets when-in-use authorized apps keep receiving location data while backgrounded, without requiring "Always" authorization.
- Marked `final`; cannot be subclassed. Conforms to `Sendable`, `SendableMetatype`.
- Call `invalidate()` to end the session explicitly when background activity is no longer needed.

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLLocationUpdate](./CLLocationUpdate.md)
