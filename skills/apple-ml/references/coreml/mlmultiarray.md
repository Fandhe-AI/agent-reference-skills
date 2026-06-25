# MLMultiArray

A multidimensional numeric array for passing tensor data to and from Core ML models. Supports int32, float16, float32, and float64 element types.

## Signature / Usage

```swift
class MLMultiArray

// Create a 3D float array (C × H × W)
let arr = try MLMultiArray(
    shape: [3, 224, 224],
    dataType: .float32
)

// Typed mutable buffer access
arr.withUnsafeMutableBufferPointer(ofType: Float.self) { buffer, strides in
    buffer[0] = 1.0
}

print(arr.count)     // 150528
print(arr.shape)     // [3, 224, 224]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shape` | `[NSNumber]` | Size of each dimension |
| `dataType` | `MLMultiArrayDataType` | Element type: `.int32`, `.float16`, `.float32`, `.float64` |
| `count` | `Int` | Total number of elements |
| `strides` | `[NSNumber]` | Memory stride for each dimension |
| `pixelBuffer` | `CVPixelBuffer?` | Underlying pixel buffer, if created from one |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+. Use `withUnsafeBufferPointer(ofType:_:)` / `withUnsafeMutableBufferPointer(ofType:_:)` for safe typed access; `dataPointer` is deprecated. Concatenate arrays with `init(byConcatenatingMultiArrays:alongAxis:dataType:)`.

## Related

- [MLFeatureValue](./mlfeaturevalue.md)
- [MLFeatureProvider](./mlfeatureprovider.md)
