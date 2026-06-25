# MLModelAsset

An abstraction over a compiled Core ML model, whether it lives on disk (`.mlmodelc`) or entirely in memory as a specification `Data` blob. Use with `MLModel.load(_:configuration:completionHandler:)`.

## Signature / Usage

```swift
class MLModelAsset: NSObject

// From compiled file on disk
let asset = try MLModelAsset(url: compiledModelURL)

// From in-memory specification
let asset = try MLModelAsset(specification: specData)

// From specification with blob overrides
let asset = try MLModelAsset(specification: specData, blobMapping: [blobURL: blobData])

// Load the model
MLModel.load(asset, configuration: config) { result in
    switch result {
    case .success(let model): /* use model */
    case .failure(let error): /* handle error */
    }
}
```

## Notes

iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+. Designed for dynamic/downloaded model workflows. Use `functionNames(completionHandler:)` and `modelDescription(completionHandler:)` to inspect the asset before loading.

## Related

- [MLModel](./mlmodel.md)
- [MLModelDescription](./mlmodeldescription.md)
