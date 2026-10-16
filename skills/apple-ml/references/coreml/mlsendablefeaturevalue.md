# MLSendableFeatureValue

A sendable feature value. Similar to `MLFeatureValue` but it can be passed across concurrency domains; once in the target domain, convert it to an `MLFeatureValue`.

## Signature / Usage

```swift
struct MLSendableFeatureValue
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(_:)` | initializer | Creates a feature value containing a double-precision floating-point value |
| `init(undefined:)` | initializer | Creates an undefined feature value of a specific `MLFeatureType` |
| `doubleValue` | `Double?` | The double-precision value, if the contained value is a double |
| `float16Value` | `Float16?` | The 16-bit floating-point value, if the contained value is a 16-bit float |
| `floatValue` | `Float?` | The single-precision value, if the contained value is a float |
| `integerValue` | `Int?` | The integer value, if the contained value is an integer |
| `integerDictionaryValue` | `[Int : Double]?` | The integer dictionary value, if the contained value is a dictionary of integers to numbers |
| `stringValue` | `String?` | The string value, if the contained value is a string |
| `stringArrayValue` | `[String]?` | The string array value, if the contained value is an array of string |
| `stringDictionaryValue` | `[String : Double]?` | The string dictionary value, if the contained value is a dictionary of strings to numbers |
| `isScalar` | `Bool` | Whether the value is a single number |
| `isShapedArray` | `Bool` | Whether the value is a shaped array |
| `isUndefined` | `Bool` | Whether the value is missing or undefined |
| `type` | `MLFeatureType` | The type of value |
| `shapedArrayValue(of:)` | `func <Scalar>(of: Scalar.Type) -> MLShapedArray<Scalar>?` | Returns the shaped array value, if the contained value is a shaped array of the specified type |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Conforms to `Copyable`, `CustomDebugStringConvertible`, `Equatable`, `Escapable`, `Sendable`, `SendableMetatype`
- Source: https://developer.apple.com/documentation/coreml/mlsendablefeaturevalue

## Related

- [MLFeatureValue](./mlfeaturevalue.md)
- [MLFeatureProvider](./mlfeatureprovider.md)
- [MLShapedArray](./mlshapedarray.md)
