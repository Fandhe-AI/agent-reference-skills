# MeshDeformationStack

A set of `MeshDeformer`s to apply in order to a mesh, or a proper subset of the mesh specified by `Target`s. If at any point a deformer in the stack updates, all deformers later in the stack will also update.

## Signature / Usage

```swift
struct MeshDeformationStack

init()
init(deformers: [any MeshDeformer], targets: [MeshScope])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `deformers` | `[any MeshDeformer]` | The deformers to apply in order to a mesh |
| `targets` | `[MeshScope]` | The set of `MeshScope`s that will be deformed by the stack |
| `init()` | — | Default empty initializer |
| `init(deformers:targets:)` | — | Initializer with deformers and target configurations |
| `==(_:_:)` | `(MeshDeformationStack, MeshDeformationStack) -> Bool` | Equality comparison |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforms to `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.
- `MeshScope` is "the elements of a mesh resource that a deformation stack applies to".
- Source: https://developer.apple.com/documentation/realitykit/meshdeformationstack (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformerComponent](./meshdeformercomponent.md)
- [MeshDeformer](./meshdeformer.md)
- [MeshDeformerOptions](./meshdeformeroptions.md)
