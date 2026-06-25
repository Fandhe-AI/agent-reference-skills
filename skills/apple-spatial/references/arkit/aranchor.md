# ARAnchor

Specifies the position and orientation of an item in the physical environment. Tracks static positions relative to the AR world coordinate space.

## Signature / Usage

```swift
let anchor = ARAnchor(name: "MyObject", transform: transform)
session.add(anchor: anchor)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `identifier` | `UUID` | Unique identifier for the anchor |
| `transform` | `simd_float4x4` | Position, orientation, and scale in world coordinate space |
| `name` | `String?` | Optional descriptive name |
| `sessionIdentifier` | `UUID?` | Identifier of the session that owns this anchor |

## Notes

- iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+
- Adding anchors helps ARKit optimize tracking accuracy in the surrounding area.
- If a virtual object moves, remove the old anchor and add a new one at the updated position.
- Key subclasses: `ARPlaneAnchor`, `ARImageAnchor`, `ARObjectAnchor`, `ARFaceAnchor`, `ARBodyAnchor`, `ARMeshAnchor`, `ARGeoAnchor`, `AREnvironmentProbeAnchor`, `ARParticipantAnchor`, `ARAppClipCodeAnchor`.

## Related

- [ARPlaneAnchor](./arplaneanchor.md)
- [ARSession](./arsession.md)
- [ARFrame](./arframe.md)
