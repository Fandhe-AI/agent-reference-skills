# MLArrayBatchProvider

A convenience wrapper for batches of feature providers. Supports an array of feature providers or a dictionary of arrays of feature values.

## Signature / Usage

```swift
class MLArrayBatchProvider
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(array:)` | `init(array: [any MLFeatureProvider])` | Creates the batch provider based on the array of feature providers |
| `init(dictionary:)` | `init(dictionary: [String : [Any]]) throws` | Creates a batch provider based on feature names and their associated arrays of data |
| `init(featureProviderArray:)` | `init(featureProviderArray: [any MLFeatureProvider])` | Additional initializer (no abstract in source) |
| `array` | `[any MLFeatureProvider]` | The array of feature providers |

## Notes

- iOS 12.0+, iPadOS 12.0+, Mac Catalyst 13.1+, macOS 10.14+, tvOS 12.0+, visionOS 1.0+, watchOS 5.0+
- Inherits from `NSObject`; conforms to `MLBatchProvider`, `NSObjectProtocol`, `Equatable`, `Hashable`, `CVarArg`, `CustomStringConvertible`, `CustomDebugStringConvertible`

## Related

- [MLBatchProvider](./mlbatchprovider.md)
- [MLFeatureProvider](./mlfeatureprovider.md)
- [MLDictionaryFeatureProvider](./mldictionaryfeatureprovider.md)
