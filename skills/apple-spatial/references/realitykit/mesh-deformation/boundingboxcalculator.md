# BoundingBoxCalculator

Calculates a bounding box based on the current state of the deformed positions.

## Signature / Usage

```swift
struct BoundingBoxCalculator : MeshDeformer

init()
```

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Conforms to `MeshDeformer`, `Decodable`, `Encodable`, `Equatable`, `Sendable`, `SendableMetatype`.
- The only documented member is `init()`.
- Source: https://developer.apple.com/documentation/realitykit/boundingboxcalculator (fetched 2026-10 from the DocC JSON).

## Related

- [MeshDeformer](./meshdeformer.md)
- [MeshDeformationStack](./meshdeformationstack.md)
