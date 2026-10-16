# LowLevelDeformation

An object that encodes blend-shape, skinning, and renormalization passes into a Metal compute command encoder.

## Signature / Usage

```swift
final class LowLevelDeformation

func encode(into: any MTLComputeCommandEncoder) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `descriptor` | `LowLevelDeformation.Descriptor` | The descriptor used to create this deformation |
| `input` | `LowLevelDeformation.Mesh` | The input vertex data for this deformation |
| `output` | `LowLevelDeformation.Mesh` | The output vertex data for this deformation |
| `vertexCount` | `Int` | The number of vertices in the mesh |
| `skinning` | `LowLevelDeformation.Skinning` | The skinning data accessors for this deformation |
| `blendShape` | `LowLevelDeformation.BlendShape` | The blend-shape data accessors for this deformation |
| `renormalization` | `LowLevelDeformation.Renormalization` | The renormalization data accessors for this deformation |
| `encode(into:)` | `(any MTLComputeCommandEncoder) throws` | Encodes the configured deformation passes into the given command encoder |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+. Not listed for macOS or Mac Catalyst in the page's availability metadata (the declaration block lists Mac Catalyst among its platforms; the availability list does not).
- Nested types: `Descriptor` (per-frame data requirements), `Mesh` (handle to input or output vertex data), `VertexSemantic` (intended usage of a vertex attribute), `VertexAttribute` (format and stride of a single vertex attribute), `Skinning` / `BlendShape` / `Renormalization` (buffer accessors), `Pipeline` (compiled compute pipeline for a specific combination of mesh layouts and deformer stages), `Error` (error type thrown by every throwing method and initializer).
- `LowLevelDeformationContext` (class): "An object that manages shared resources for `LowLevelDeformation` instances." It is documented on its own page and is not covered here.
- Source: https://developer.apple.com/documentation/realitykit/lowleveldeformation (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformer](./meshdeformer.md)
- [SkinningDeformer](./skinningdeformer.md)
- [BlendShapeDeformer](./blendshapedeformer.md)
- [RenormalizingDeformer](./renormalizingdeformer.md)
