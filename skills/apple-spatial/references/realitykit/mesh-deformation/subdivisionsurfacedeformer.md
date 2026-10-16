# SubdivisionSurfaceDeformer

OpenSubdiv surface deformation.

## Signature / Usage

```swift
struct SubdivisionSurfaceDeformer : MeshDeformer

init()
```

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforms to `MeshDeformer`, `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.
- The only documented member is `init()`.
- visionOS 27 release notes (RealityKit, Resolved Issues): "Fixed: Skinning animation or high subdivision level on complex geometry can cause excessive memory growth and may cause the app to be terminated due to high memory usage." (177731588)
- Source: https://developer.apple.com/documentation/realitykit/subdivisionsurfacedeformer (fetched 2026-10 from the DocC JSON); release note from https://developer.apple.com/documentation/visionos-release-notes/visionos-27-release-notes.

## Related

- [MeshDeformer](./meshdeformer.md)
- [SkinningDeformer](./skinningdeformer.md)
- [MeshDeformationStack](./meshdeformationstack.md)
