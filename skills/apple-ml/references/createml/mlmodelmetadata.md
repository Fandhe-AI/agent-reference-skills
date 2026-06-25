# MLModelMetadata

A struct for attaching descriptive metadata to a Core ML model at export time. Metadata is visible in Xcode when the model is imported.

## Signature / Usage

```swift
let metadata = MLModelMetadata(
    author: "Jane Smith",
    shortDescription: "Classifies dog breeds from photos",
    license: "MIT",
    version: "1.0",
    additional: ["trainingDataset": "Stanford Dogs"]
)

try classifier.write(to: modelURL, metadata: metadata)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `author` | `String` | Author of the model |
| `shortDescription` | `String` | Brief description of the model |
| `license` | `String?` | License governing use of the model |
| `version` | `String` | Model version string |
| `additional` | `[String: String]?` | Arbitrary key-value pairs for extra information |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Pass `nil` for `metadata` in `write(to:metadata:)` to export without metadata

## Related

- [MLImageClassifier](./mlimageclassifier.md)
- [MLTextClassifier](./mltextclassifier.md)
