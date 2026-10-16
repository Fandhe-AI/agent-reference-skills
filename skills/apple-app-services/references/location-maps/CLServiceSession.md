# CLServiceSession

An object that provides diagnostics about an app's authorization to use location services. It represents the app's current goal for location authorization for a specific workflow.

## Signature / Usage

```swift
final class CLServiceSession

init(authorization: CLServiceSession.AuthorizationRequirement)
init(authorization: CLServiceSession.AuthorizationRequirement, fullAccuracyPurposeKey: String)
final func invalidate()
var diagnostics: CLServiceSession.Diagnostics
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `diagnostics` | `CLServiceSession.Diagnostics` | Describes the current state of the services session |
| `AuthorizationRequirement.always` | enum case | Session needs "Always" authorization |
| `AuthorizationRequirement.whenInUse` | enum case | Session needs "When In Use" authorization |
| `AuthorizationRequirement.none` | enum case | Session does not need authorization |

Each element yielded by `CLServiceSession.Diagnostics` (an `AsyncSequence` class) is a `CLServiceSession.Diagnostic` (struct), which exposes these `Bool` properties:

| Name | Type |
|------|------|
| `alwaysAuthorizationDenied` | `Bool` |
| `authorizationDenied` | `Bool` |
| `authorizationDeniedGlobally` | `Bool` |
| `authorizationRequestInProgress` | `Bool` |
| `authorizationRestricted` | `Bool` |
| `fullAccuracyDenied` | `Bool` |
| `insufficientlyInUse` | `Bool` |
| `serviceSessionRequired` | `Bool` |

## Notes

- Swift: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, tvOS 18.0+, watchOS 11.0+, visionOS 1.0+. No macOS availability is listed for the Swift declaration.
- Do not instantiate `CLServiceSession` directly; create one with `init(authorization:)` or `init(authorization:fullAccuracyPurposeKey:)`.
- Each object is an "Explicit Service Session" for one workflow. The session requests the person's authorization to meet its requirement if possible, including re-asking after temporary authorization lapses due to time spent in the background.
- `CLServiceSession.Diagnostics` is a `final class` conforming to `AsyncSequence` whose elements are `CLServiceSession.Diagnostic` structs; observe it to see how authorization state differs from the stated goal.
- Call `invalidate()` when the app or app extension no longer needs to monitor authorization access to location services.
- Conforms to `Sendable` and `SendableMetatype`. `AuthorizationRequirement` conforms to `Equatable` and `Hashable`.
- Source: https://developer.apple.com/documentation/corelocation/clservicesession-pt7n

## Related

- [CLLocationManager](./CLLocationManager.md)
- [CLBackgroundActivitySession](./CLBackgroundActivitySession.md)
- [CLAuthorizationStatus](./CLAuthorizationStatus.md)
- [CLAccuracyAuthorization](./CLAccuracyAuthorization.md)
