# MeshDeformer

An interface for all deformation types in a deformation definition, both built-in and custom. You override all functions to implement a custom `MeshDeformer`, and can in general ignore all but the constructors for built-in deformers.

## Signature / Usage

```swift
protocol MeshDeformer : Decodable, Encodable, Equatable, Sendable

static var type: String
var type: String
var options: MeshDeformerOptions
var mode: MeshDeformerExecutionMode
static var mode: MeshDeformerExecutionMode
func deform(parameter: MeshDeformParameterGPU, encoder: any MTLComputeCommandEncoder)
func deform(parameter: MeshDeformParameterCPU)
func isDeformerEqual(other: any MeshDeformer) -> Bool
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `static var type` | `String` | Provide a unique identifier for type of deformer. There can only be one `deform` function associated with each type String; each `deform` can vary greatly based on run time options and input. Default implementation provided |
| `var type` | `String` | Provide a unique identifier for type of deformer, default implementation provided |
| `options` | `MeshDeformerOptions` | Provide options for the deformer, default implementation is provided |
| `mode` / `static var mode` | `MeshDeformerExecutionMode` | Specify which `deform` function will be called, default implementation is provided |
| `deform(parameter:encoder:)` | `MeshDeformParameterGPU`, `any MTLComputeCommandEncoder` | Deform the mesh on the GPU (the preferred method) |
| `deform(parameter:)` | `MeshDeformParameterCPU` | Deform the mesh on the CPU (may be useful for debugging), a no-op is allowed, default implementation is provided |
| `isDeformerEqual(other:)` | `(any MeshDeformer) -> Bool` | Default implementation is provided |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforming types listed on the page: `BlendShapeDeformer`, `BoundingBoxCalculator`, `RenormalizingDeformer`, `SkinningDeformer`, `SubdivisionSurfaceDeformer`.
- Source: https://developer.apple.com/documentation/realitykit/meshdeformer (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformerOptions](./meshdeformeroptions.md)
- [MeshDeformationStack](./meshdeformationstack.md)
- [MeshDeformerComponent](./meshdeformercomponent.md)
- [SkinningDeformer](./skinningdeformer.md)
- [BlendShapeDeformer](./blendshapedeformer.md)
- [RenormalizingDeformer](./renormalizingdeformer.md)
- [SubdivisionSurfaceDeformer](./subdivisionsurfacedeformer.md)
- [BoundingBoxCalculator](./boundingboxcalculator.md)
