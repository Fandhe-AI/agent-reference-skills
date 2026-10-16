# MLModelStructure

An enum representing the structure of a model.

## Signature / Usage

```swift
// Load the model structure.
let modelStructure = await try MLModelStructure.load(contentsOf: modelURL)
switch modelStructure {
case .program(let program):
   // Examine ML Program model.
case .neuralNetwork(let neuralNetwork):
   // Examine Neural network model
case .pipeline(let pipeline)
   // Examine Pipeline model
default:
   // The model type is something else.
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `neuralNetwork(_:)` | case | Represents a NeuralNetwork model; associated value is `MLModelStructure.NeuralNetwork` |
| `pipeline(_:)` | case | Represents a Pipeline model; associated value is `MLModelStructure.Pipeline` |
| `program(_:)` | case | Represents an ML Program model; associated value is `MLModelStructure.Program` |
| `unsupported` | case | Represents an unsupported model |
| `load(asset:)` | `static func load(asset: MLModelAsset) async throws -> MLModelStructure` | Loads the model structure asynchronously from the model asset |
| `load(contentsOf:)` | `static func load(contentsOf: URL) async throws -> MLModelStructure` | Loads the model structure asynchronously from its on-disk location |

## Notes

- iOS 17.4+, iPadOS 17.4+, Mac Catalyst 17.4+, macOS 14.4+, tvOS 17.4+, visionOS 1.0+, watchOS 10.4+
- Conforms to `Sendable`, `SendableMetatype`
- Nested structs: `MLModelStructure.NeuralNetwork`, `MLModelStructure.Pipeline`, `MLModelStructure.Program`
- The snippet above is verbatim from the official page (including its `await try` ordering and the missing colon after `case .pipeline(let pipeline)`); correct these when compiling

## Related

- [MLComputePlan](./mlcomputeplan.md)
- [MLComputePolicy](./mlcomputepolicy.md)
- [MLModelAsset](./mlmodelasset.md)
