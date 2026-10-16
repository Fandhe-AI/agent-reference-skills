# NDArrayDescriptor

A description of an array's shape, scalar type, and memory layout expectations. Obtained from an `InferenceFunctionDescriptor` for a specific input or output.

## Signature / Usage

```swift
struct NDArrayDescriptor

let valueDescriptor = functionDescriptor.inputDescriptor(of: "x")!
guard case .ndArray(let ndArrayDescriptor) = valueDescriptor else { ... }
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `shape` | `var shape: [Int]` | The length of each dimension |
| `scalarType` | `var scalarType: NDArray.ScalarType` | The scalar type of the array |
| `rank` | `var rank: Int` | The number of dimensions |
| `hasDynamicShape` | `var hasDynamicShape: Bool` | Whether the shape has any dynamic dimensions |
| `interleaveLayout` | `var interleaveLayout: NDArray.InterleaveLayout?` | The interleaved layout, or `nil` if there is no interleave |
| `minimumByteCount` | `var minimumByteCount: Int` | Minimum bytes needed for storage with this descriptor's shape and preferred strides |
| `preferredStrides` | `var preferredStrides: [Int]` | The strides that avoid data layout transformations during inference |
| `resolvingDynamicDimensions(_:)` | `func resolvingDynamicDimensions([Int]) -> NDArrayDescriptor` | Returns a new descriptor with all dynamic dimensions replaced by concrete values |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Equatable`, `Sendable`.
- The descriptor holds the expectations for an array passed to an `InferenceFunction`. Most are strict: if `scalarType` is `.float32`, the array you provide must use `.float32`.
- Source: https://developer.apple.com/documentation/coreai/ndarraydescriptor

## Related

- [NDArray](./ndarray.md)
- [InferenceFunctionDescriptor](./inferencefunctiondescriptor.md)
- [InferenceFunction](./inferencefunction.md)
