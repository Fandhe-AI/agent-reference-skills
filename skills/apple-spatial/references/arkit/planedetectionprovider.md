# PlaneDetectionProvider

A `DataProvider` that detects and tracks horizontal and vertical planes in a person's surroundings on visionOS.

## Signature / Usage

```swift
let planeDetection = PlaneDetectionProvider(alignments: [.horizontal, .vertical])
try await session.run([planeDetection])

for await update in planeDetection.anchorUpdates {
    let plane = update.anchor  // PlaneAnchor
    print(plane.alignment, plane.extent)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anchorUpdates` | `AnchorUpdateSequence<PlaneAnchor>` | Async sequence of `PlaneAnchor` add/update/remove events |
| `allAnchors` | `[PlaneAnchor]` | All currently tracked plane anchors |
| `alignments` | `[PlaneAnchor.Alignment]` | Configured plane alignments (horizontal, vertical) |
| `state` | `DataProviderState` | Current provider status |
| `isSupported` | `Bool` (static) | Whether the runtime supports plane detection |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | Authorizations needed |

## Notes

- visionOS 1.0+ only.
- `PlaneAnchor` (visionOS struct) is distinct from iOS `ARPlaneAnchor`; it carries alignment, extent, and geometry data.
- Pass desired alignments to `init(alignments:)` to filter detection to horizontal-only, vertical-only, or both.

## Related

- [ARKitSession](./arkitsession.md)
- [SceneReconstructionProvider](./scenereconstructionprovider.md)
- [ARPlaneAnchor](./arplaneanchor.md)
