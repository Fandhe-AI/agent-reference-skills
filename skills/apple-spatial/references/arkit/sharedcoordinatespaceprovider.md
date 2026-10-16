# SharedCoordinateSpaceProvider

Provides ability to establish a shared coordinate space among multiple participants.

## Signature / Usage

```swift
final class SharedCoordinateSpaceProvider

init()
func push(data: SharedCoordinateSpaceProvider.CoordinateSpaceData)
var nextCoordinateSpaceData: SharedCoordinateSpaceProvider.CoordinateSpaceData?
var eventUpdates: some AsyncSequence<SharedCoordinateSpaceProvider.Event, Never>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | — | Create a shared coordinate space provider. |
| `push(data:)` | `(CoordinateSpaceData)` | Push data to the shared coordinate space provider. |
| `nextCoordinateSpaceData` | `CoordinateSpaceData?` | Get the next coordinate space data to be broadcast to all participants. |
| `eventUpdates` | `some AsyncSequence<Event, Never>` | A sequence of events that have occurred. |
| `isSharingEnabled` | `Bool` | Returns true if coordinate space sharing is enabled, false otherwise. |
| `participantIdentifier` | `UUID` | Get the identifier of the local participant. |
| `state` | `DataProviderState` | The state of this shared coordinate space provider. |
| `isSupported` | `Bool` (static) | Determines whether this device supports the shared coordinate space provider. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The authorization type(s) required by the shared coordinate space provider. |
| `CoordinateSpaceData` | `struct` | A coordinate space data object. |
| `Event` | `enum` | Events that can occur in a shared coordinate space. |

## Notes

- visionOS 26.0+. Conforms to `DataProvider`.
- Use outside a FaceTime call requires the "Shared Coordinate Space access" entitlement (`com.apple.developer.arkit.shared-coordinate-space.allow`): "You may access the shared coordinate space outside the context of a FaceTime call with the Shared Coordinate Space access entitlement."
- Source: https://developer.apple.com/documentation/arkit/sharedcoordinatespaceprovider (fetched 2026-10 from the DocC JSON).

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)
