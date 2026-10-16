# BlendShapeDeformer

A blend-shape deformation that interpolates between N meshes according to a weighted sum. Consumes information from the `BlendShapeWeightsComponent`.

## Signature / Usage

```swift
struct BlendShapeDeformer : MeshDeformer

init()
```

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforms to `MeshDeformer`, `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.
- The only documented member is `init()`; weights come from `BlendShapeWeightsComponent` on the entity.
- Source: https://developer.apple.com/documentation/realitykit/blendshapedeformer (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformer](./meshdeformer.md)
- [MeshDeformerComponent](./meshdeformercomponent.md)
- [SkinningDeformer](./skinningdeformer.md)
