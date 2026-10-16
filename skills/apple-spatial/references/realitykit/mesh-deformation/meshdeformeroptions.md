# MeshDeformerOptions

Specifies constant options for `MeshDeformer`.

## Signature / Usage

```swift
struct MeshDeformerOptions

init()
init(cadence: MeshDeformerOptions.Cadence, inputSpec: MeshDeformerVertexOptions, outputSpec: MeshDeformerVertexOptions)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cadence` | `MeshDeformerOptions.Cadence` | Determines the update frequency for the deformer type |
| `inputSpec` | `MeshDeformerVertexOptions` | The expected vertex buffer input spec for the deformer type |
| `outputSpec` | `MeshDeformerVertexOptions` | The expected vertex buffer output spec for the deformer type |
| `init()` | — | Defaults to on demand, and reads and writes positions only |
| `init(cadence:inputSpec:outputSpec:)` | — | Specify your own cadence and read / write options |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- `MeshDeformerOptions.Cadence` (enum): specifies when RealityKit applies the custom deformer functions.
- Related types in the same collection (abstracts only, no separate pages):
  - `MeshDeformerVertexOptions` (struct): allows developers to specify which vertex types in the mesh to allocate in the input and output buffers for mesh deformations.
  - `MeshDeformerExecutionMode` (enum): specifies which `MeshDeformer.deform` function will be called when used with custom deformers.
  - `MeshDeformParameter` (struct): base class for GPU and CPU custom deform function input.
  - `MeshDeformParameterCPU` / `MeshDeformParameterGPU` / `MeshDeformParametersCPU` / `MeshDeformParametersGPU`: convenience aliases.
  - `MeshDeformCPUBufferInput` / `MeshDeformGPUBufferInput`: the underlying type of deformer input data buffers for the CPU / GPU functions.
  - `MeshDeformCPUBufferOutput` / `MeshDeformGPUBufferOutput`: the underlying type of deformer output data buffers for the CPU / GPU functions (the GPU page abstract reads "input" in the source).
  - `MeshScope` (struct): the elements of a mesh resource that a deformation stack applies to.
- Source: https://developer.apple.com/documentation/realitykit/meshdeformeroptions (fetched 2026-10 from the DocC JSON; alias abstracts from https://developer.apple.com/documentation/realitykit/scene-content-mesh-deformation).

## Related

- [MeshDeformer](./meshdeformer.md)
- [MeshDeformationStack](./meshdeformationstack.md)
