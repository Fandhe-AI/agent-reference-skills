# SkinningDeformer

A deformation that binds a 3D mesh to an underlying skeleton.

## Signature / Usage

```swift
struct SkinningDeformer : MeshDeformer

init(skinsTangentFrame: Bool)
var skinsTangentFrame: Bool
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skinsTangentFrame` | `Bool` | Specifies whether to skin normals, tangents, and bitangents |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforms to `MeshDeformer`, `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.
- Related fix in the visionOS 27 release notes: skinning animation or high subdivision level on complex geometry could cause excessive memory growth and app termination (177731588). See `SubdivisionSurfaceDeformer`.
- Source: https://developer.apple.com/documentation/realitykit/skinningdeformer (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformer](./meshdeformer.md)
- [MeshDeformerComponent](./meshdeformercomponent.md)
- [BlendShapeDeformer](./blendshapedeformer.md)
- [SubdivisionSurfaceDeformer](./subdivisionsurfacedeformer.md)
