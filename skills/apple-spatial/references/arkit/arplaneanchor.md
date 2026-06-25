# ARPlaneAnchor

Represents a 2D planar surface detected in the physical environment by a world-tracking session.

## Signature / Usage

```swift
// Enable plane detection in configuration
configuration.planeDetection = [.horizontal, .vertical]

// Receive via ARSessionDelegate
func session(_ session: ARSession, didAdd anchors: [ARAnchor]) {
    for anchor in anchors.compactMap({ $0 as? ARPlaneAnchor }) {
        print(anchor.alignment, anchor.center, anchor.planeExtent)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `alignment` | `ARPlaneAnchor.Alignment` | Orientation of the plane relative to gravity (horizontal or vertical) |
| `center` | `simd_float3` | Center of the plane in the anchor's local coordinate space |
| `planeExtent` | `ARPlaneExtent` | Estimated width, length, and y-axis rotation of the plane |
| `geometry` | `ARPlaneGeometry` | Coarse triangle mesh representing the plane's shape |
| `classification` | `ARPlaneAnchor.Classification` | Real-world surface type (floor, wall, ceiling, table, etc.) |
| `classificationStatus` | `ARPlaneAnchor.ClassificationStatus` | Current state of the classification process |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+
- The plane's width/length span the **xz-plane** of its local coordinate system; the y-axis is the normal vector.
- `extent` is deprecated; prefer `planeExtent`.
- Check `ARPlaneAnchor.isClassificationSupported` at runtime before relying on `classification`.

## Related

- [ARAnchor](./aranchor.md)
- [ARWorldTrackingConfiguration](./arworldtrackingconfiguration.md)
