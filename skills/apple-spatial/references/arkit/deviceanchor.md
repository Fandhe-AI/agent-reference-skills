# DeviceAnchor

A structure representing the position and orientation of Apple Vision Pro in world space. Obtained by querying a `WorldTrackingProvider`.

## Signature / Usage

```swift
let worldTracking = WorldTrackingProvider()
try await session.run([worldTracking])

// In a RealityKit render update or compositor frame:
if let anchor = worldTracking.queryDeviceAnchor(atTimestamp: timestamp) {
    guard anchor.isTracked else { return }
    let headTransform = anchor.originFromAnchorTransform
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `originFromAnchorTransform` | `simd_float4x4` | Transform from device (head) to world origin coordinate space |
| `isTracked` | `Bool` | Whether ARKit is currently tracking the device |
| `trackingState` | `DeviceAnchor.TrackingState` | Detailed tracking state |
| `id` | `UUID` | Unique identifier of this anchor |

## Notes

- visionOS 1.0+, macOS 26.0+
- Not created directly; always obtained from `WorldTrackingProvider.queryDeviceAnchor(atTimestamp:)`.
- Conforms to `Anchor`, `TrackableAnchor`, `ARKitCoordinateSpaceProviding`, `Identifiable`, `Sendable`, `Copyable`.
- The timestamp passed to `queryDeviceAnchor` should match the renderer's current frame timestamp for accurate pose prediction.

## Related

- [WorldTrackingProvider](./worldtrackingprovider.md)
- [ARKitSession](./arkitsession.md)
