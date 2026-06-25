# SceneReconstructionProvider

A `DataProvider` that supplies live 3D mesh data representing the shape of a person's physical surroundings on visionOS.

## Signature / Usage

```swift
let sceneReconstruction = SceneReconstructionProvider()
try await session.run([sceneReconstruction])

for await update in sceneReconstruction.anchorUpdates {
    let mesh = update.anchor  // MeshAnchor
    // Use mesh.geometry for collision, occlusion, or physics
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anchorUpdates` | `AnchorUpdateSequence<MeshAnchor>` | Async sequence of `MeshAnchor` add/update/remove events |
| `allAnchors` | `[MeshAnchor]` | All currently tracked mesh anchors |
| `state` | `DataProviderState` | Current provider status |
| `modes` | `[SceneReconstructionProvider.Mode]` | Reconstruction modes supplied by this provider |
| `isSupported` | `Bool` (static) | Whether the runtime supports scene reconstruction |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | Authorizations needed |

## Notes

- visionOS 1.0+ only.
- `MeshAnchor` wraps a volume of space with a polygonal mesh; use `MeshAnchor.Geometry` for vertices, normals, and faces.
- Common uses: physics collision shapes, occlusion of virtual objects behind real geometry, spatial audio obstruction.
- `init(modes:)` accepts an array of `SceneReconstructionProvider.Mode` values.

## Related

- [ARKitSession](./arkitsession.md)
- [PlaneDetectionProvider](./planedetectionprovider.md)
