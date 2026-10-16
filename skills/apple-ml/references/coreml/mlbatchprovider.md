# MLBatchProvider

An interface that represents a collection of feature providers.

## Signature / Usage

```swift
protocol MLBatchProvider
```

Similar to `MLFeatureProvider`, this interface allows you to define your own batch provider. If you collect your data asynchronously or it is memory intensive, implement this protocol on your data structure to optimize performance with batch processing.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `features(at:)` | `func features(at: Int) -> any MLFeatureProvider` | Returns the feature provider at the given index (required) |
| `count` | `Int` | The number of feature providers in this batch (required) |

## Notes

- iOS 12.0+, iPadOS 12.0+, Mac Catalyst 13.1+, macOS 10.14+, tvOS 12.0+, visionOS 1.0+, watchOS 5.0+
- Conforming type in Core ML: `MLArrayBatchProvider`

## Related

- [MLArrayBatchProvider](./mlarraybatchprovider.md)
- [MLFeatureProvider](./mlfeatureprovider.md)
