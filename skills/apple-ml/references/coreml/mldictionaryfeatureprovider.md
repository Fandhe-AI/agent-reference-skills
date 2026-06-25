# MLDictionaryFeatureProvider

A convenience `MLFeatureProvider` backed by a `[String: Any]` dictionary. Use this to pass model inputs without writing a custom provider class.

## Signature / Usage

```swift
class MLDictionaryFeatureProvider: MLFeatureProvider

let provider = try MLDictionaryFeatureProvider(dictionary: [
    "image": cvPixelBuffer,
    "threshold": 0.5
])

let output = try model.prediction(from: provider)

// Access by subscript
let imageValue: MLFeatureValue? = provider["image"]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dictionary` | `[String : MLFeatureValue]` | The underlying dictionary of wrapped feature values |
| `featureNames` | `Set<String>` | All feature names available (from `MLFeatureProvider`) |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+. The initializer converts `Any` values to `MLFeatureValue` and throws if a value cannot be converted. Conforms to `NSSecureCoding` and `NSFastEnumeration`.

## Related

- [MLFeatureProvider](./mlfeatureprovider.md)
- [MLFeatureValue](./mlfeaturevalue.md)
- [MLModel](./mlmodel.md)
