# RoomTrackingProvider

A source of real-time information about the room that a person is currently in.

## Signature / Usage

```swift
final class RoomTrackingProvider
```

```swift
init()
```

```swift
let roomTracking = RoomTrackingProvider()

let session = ARKitSession()
try await session.run([roomTracking])

for await update in roomTracking.anchorUpdates {
    let roomAnchor = update.anchor
    // handle roomAnchor.geometry, roomAnchor.isCurrentRoom, etc.
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `currentRoomAnchor` | `RoomAnchor?` | The room a person is in currently, if any |
| `allAnchors` | `[RoomAnchor]` | Array of room anchors the provider is tracking |
| `state` | `DataProviderState` | State of the room-tracking provider |
| `anchorUpdates` | `AnchorUpdateSequence<RoomAnchor>` | Asynchronous sequence of room anchor updates |
| `isSupported` (type property) | `Bool` | Whether the device supports room tracking |
| `requiredAuthorizations` (type property) | `[ARKitSession.AuthorizationType]` | Required authorization types |

## Notes

- visionOS 2.0+ only.
- Conforms to `DataProvider`, `CustomStringConvertible`, `Sendable`, `SendableMetatype`.
- `RoomAnchor` carries room geometry and `SurfaceClassification` data for walls, floors, and other surfaces.

## Related

- [ObjectTrackingProvider](./object-tracking.md)
- [RealityView](./realityview.md)
