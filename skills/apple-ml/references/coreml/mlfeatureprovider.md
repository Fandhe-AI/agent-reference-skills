# MLFeatureProvider

Protocol representing a collection of named feature values for a model's input or output. Adopt this protocol for custom data sources instead of using the Xcode-generated wrapper.

## Signature / Usage

```swift
protocol MLFeatureProvider

// Required conformance
class MyInputProvider: MLFeatureProvider {
    var featureNames: Set<String> { ["image", "threshold"] }

    func featureValue(for name: String) -> MLFeatureValue? {
        switch name {
        case "image": return MLFeatureValue(pixelBuffer: myPixelBuffer)
        case "threshold": return MLFeatureValue(double: 0.5)
        default: return nil
        }
    }
}

let output = try model.prediction(from: MyInputProvider())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `featureNames` | `Set<String>` | All feature names the provider can supply |
| `featureValue(for:)` | `(String) -> MLFeatureValue?` | Returns the value for a given feature name, or `nil` |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+. Prefer adopting this protocol when data is collected asynchronously or when the generated wrapper copies excessive data.

## Related

- [MLDictionaryFeatureProvider](./mldictionaryfeatureprovider.md)
- [MLFeatureValue](./mlfeaturevalue.md)
- [MLModel](./mlmodel.md)
