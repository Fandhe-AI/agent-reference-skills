# MeshDeformerComponent

The component that applies mesh deformations to an `Entity`.

## Signature / Usage

```swift
struct MeshDeformerComponent

init(from: [MeshDeformationStack]) throws
var deformations: [MeshDeformationStack]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `deformations` | `[MeshDeformationStack]` | The deformations applied to the entity |
| `init(from:)` | `([MeshDeformationStack]) throws` | Validates the deformation and throws errors if a configuration problem is detected |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforms to `Component`, `Sendable`, `SendableMetatype`.
- Part of the "Mesh deformation" collection: "Reshape and animate the geometry of 3D models at runtime, applying skinning, blend shapes, and subdivision."
- Source: https://developer.apple.com/documentation/realitykit/meshdeformercomponent (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformationStack](./meshdeformationstack.md)
- [MeshDeformer](./meshdeformer.md)
- [SkinningDeformer](./skinningdeformer.md)
- [BlendShapeDeformer](./blendshapedeformer.md)
