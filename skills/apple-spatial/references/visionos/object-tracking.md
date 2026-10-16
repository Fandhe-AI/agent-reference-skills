# ObjectTrackingProvider

A source of real-time position of reference objects in a person's environment. Configures ARKit to track reference objects and delivers a stream of `ObjectAnchor` updates.

## Signature / Usage

```swift
final class ObjectTrackingProvider
```

```swift
init(referenceObjects: [ReferenceObject], trackingConfiguration: ObjectTrackingProvider.TrackingConfiguration?)
```

```swift
let objectTracking = ObjectTrackingProvider(referenceObjects: referenceObjects)

let session = ARKitSession()
try await session.run([objectTracking])

for await update in objectTracking.anchorUpdates {
    let anchor = update.anchor
    // handle anchor.originFromAnchorTransform, anchor.isTracked, etc.
}
```

## Options / Props

| Name | Type | Description |
|--------|------|-------------|
| `state` | `DataProviderState` | State of the object-tracking provider |
| `allAnchors` | `[ObjectAnchor]` | All object anchors currently being tracked |
| `anchorUpdates` | `AnchorUpdateSequence<ObjectAnchor>` | Asynchronous sequence of anchor updates |
| `trackingConfiguration` | `ObjectTrackingProvider.TrackingConfiguration` | Current parameters configuring object tracking |
| `isSupported` (type property) | `Bool` | Whether the device supports object tracking |
| `requiredAuthorizations` (type property) | `[ARKitSession.AuthorizationType]` | Required authorization types |

## Notes

- visionOS 2.0+ only.
- Conforms to `DataProvider`, `CustomStringConvertible`, `Sendable`.
- Requires `ReferenceObject` assets (created via the reference object capture app) passed to the initializer.
- `ObjectTrackingProvider.Error` describes object-tracking-specific error values.
- visionOS 27 release notes: in contexts where ARC is not enabled, callers of the C API functions for loading reference objects (`ar_reference_object_load_from_url`, `ar_reference_object_load_with_name`, and similar) must call `ar_retain` inside the completion handler on the returned reference objects, and on errors if they are held beyond the handler. Otherwise the items are invalid after the handler finishes (173812495). (Source: https://developer.apple.com/documentation/visionos-release-notes/visionos-27-release-notes)
- Run on an `ARKitSession` alongside other data providers as needed.

## Related

- [RoomTrackingProvider](./room-tracking.md)
- [RealityView](./realityview.md)
