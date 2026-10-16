# AIModelAsset

An unspecialized source model asset. Use it to inspect a model's structure and metadata without the expensive specialization step. It cannot perform inference.

## Signature / Usage

```swift
struct AIModelAsset

let asset = try AIModelAsset(contentsOf: modelURL)
guard let summary = try asset.summary(includingStatistics: true) else { return }
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init(contentsOf:)` | `init(contentsOf: URL) throws` | Creates a model asset from the contents of the specified URL |
| `isValid(at:)` | `static func isValid(at: URL) -> Bool` | Whether the URL contains a valid model asset |
| `metadata` | `var metadata: AIModelAsset.Metadata` | The author-provided metadata for the asset |
| `summary(includingStatistics:)` | `func summary(includingStatistics: Bool) throws -> AIModelAsset.Summary?` | Returns the model summary |
| `url` | `let url: URL` | The file URL of the model asset bundle on disk |
| `updateMetadata(_:)` | `func updateMetadata((inout AIModelAsset.Metadata) throws -> Void) throws` | Updates the asset metadata |
| `removeDerivedArtifacts()` | `func removeDerivedArtifacts() throws` | Removes all derived artifacts for the model's program |

Supporting types: `AIModelAsset.FunctionDescriptor` (a function in the model's program), `AIModelAsset.Metadata` (author, license, custom key-value pairs), `AIModelAsset.Summary` (structure and statistics), `AIModelAsset.ValueDescriptor` (a function input or output value).

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Unlike `AIModel`, an asset can only query information: function signatures, input and output descriptions, compute and storage types, and author-provided metadata.
- Source: https://developer.apple.com/documentation/coreai/aimodelasset

## Related

- [AIModel](./aimodel.md)
- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
