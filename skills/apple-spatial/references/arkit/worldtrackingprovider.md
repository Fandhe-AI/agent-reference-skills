# WorldTrackingProvider

A `DataProvider` that supplies live device pose data and persistent world anchors for a visionOS AR session.

## Signature / Usage

```swift
let worldTracking = WorldTrackingProvider()
try await session.run([worldTracking])

// Query device pose at a renderer timestamp
if let deviceAnchor = worldTracking.queryDeviceAnchor(atTimestamp: timestamp) {
    let transform = deviceAnchor.originFromAnchorTransform
}

// Observe world anchor updates
for await update in worldTracking.anchorUpdates {
    // update.anchor is a WorldAnchor
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anchorUpdates` | `AnchorUpdateSequence<WorldAnchor>` | Async sequence of `WorldAnchor` add/update/remove events |
| `allAnchors` | `[WorldAnchor]?` | Snapshot of all currently tracked world anchors |
| `state` | `DataProviderState` | Current provider status |
| `isSupported` | `Bool` (static) | Whether the runtime supports world tracking |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | Authorizations needed (`.worldSensing`) |

## Notes

- visionOS 1.0+, macOS 26.0+
- `queryDeviceAnchor(atTimestamp:)` returns a predicted `DeviceAnchor` for the given renderer timestamp.
- Anchor management: `addAnchor(_:)`, `removeAnchor(_:)`, `removeAnchor(forID:)`, `removeAllAnchors()`.

## Related

- [ARKitSession](./arkitsession.md)
- [DeviceAnchor](./deviceanchor.md)
