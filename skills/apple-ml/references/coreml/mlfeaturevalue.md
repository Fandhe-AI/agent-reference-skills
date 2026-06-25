# MLFeatureValue

A type-tagged wrapper around a single feature value. Carries one of the scalar, array, image, dictionary, or sequence types defined by `MLFeatureType`.

## Signature / Usage

```swift
class MLFeatureValue

// Numeric
let v = MLFeatureValue(int64: 42)
let v = MLFeatureValue(double: 3.14)

// String
let v = MLFeatureValue(string: "cat")

// Multi-array
let v = MLFeatureValue(multiArray: myMLMultiArray)

// Image (pixel buffer)
let v = MLFeatureValue(pixelBuffer: cvPixelBuffer)

// Dictionary (e.g. bag-of-words)
let v = try MLFeatureValue(dictionary: ["word": 1.0])

// Read back
let score = featureValue.doubleValue
let arr   = featureValue.multiArrayValue
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `MLFeatureType` | The feature type (int64, double, string, multiArray, image, dictionary, sequence) |
| `isUndefined` | `Bool` | `true` when the value is undefined for optional features |
| `int64Value` | `Int64` | Integer value (0 if type is not int64) |
| `doubleValue` | `Double` | Floating-point value (0 if type is not double) |
| `stringValue` | `String` | String value ("" if type is not string) |
| `multiArrayValue` | `MLMultiArray?` | Multi-array value |
| `imageBufferValue` | `CVPixelBuffer?` | Image pixel buffer value |
| `dictionaryValue` | `[AnyHashable : NSNumber]` | Dictionary value |
| `sequenceValue` | `MLSequence?` | Sequence value |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+. Accessing a value accessor of the wrong type returns a zero/empty default rather than throwing.

## Related

- [MLFeatureProvider](./mlfeatureprovider.md)
- [MLMultiArray](./mlmultiarray.md)
- [MLDictionaryFeatureProvider](./mldictionaryfeatureprovider.md)
