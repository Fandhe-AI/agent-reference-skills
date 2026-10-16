# NDArray

A multidimensional array of scalar values used for model inference. Stores data in a layout defined by its `shape`, `scalarType`, and `strides`.

## Signature / Usage

```swift
struct NDArray

// Create an `NDArray` that matches the expected type and shape.
var input = NDArray(shape: [3, 4], scalarType: .float32)

// Access a mutable view to write data into the array.
var mutableView = input.mutableView(as: Float.self)
guard let elements = mutableView.contiguousElements else {
    // Handle non-contiguous memory layout.
}
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init(shape:scalarType:)` | `init(shape: [Int], scalarType: NDArray.ScalarType)` | Creates an array with the specified shape and scalar type |
| `init(shape:scalarType:strides:)` | `init(shape: [Int], scalarType: NDArray.ScalarType, strides: [Int])` | Creates an array with the specified shape, scalar type, and strides |
| `init(shape:scalarType:strides:interleaveLayout:)` | `init(shape: [Int], scalarType: NDArray.ScalarType, strides: [Int], interleaveLayout: NDArray.InterleaveLayout)` | Creates an array with the provided shape, scalar type, strides, and interleaved dimension |
| `init(scalars:shape:)` | `init<Scalar>(scalars: some Sequence, shape: [Int])` | Copies a sequence of scalars, stored in row-major order |
| `init(descriptor:)` | `init(descriptor: consuming NDArrayDescriptor)` | Creates an array with the shape and preferred strides from the descriptor |
| `shape` | `var shape: [Int]` | The length of each dimension |
| `scalarType` | `var scalarType: NDArray.ScalarType` | The scalar type of the array |
| `strides` | `var strides: [Int]` | The distance, in elements, between consecutive values along each dimension |
| `interleaveLayout` | `var interleaveLayout: NDArray.InterleaveLayout?` | The interleaved layout, or `nil` if there is no interleave |
| `view(as:)` | `func view<T>(as: T.Type) -> NDArray.View<T>` | Read-only, typed view of the elements |
| `mutableView(as:)` | `func mutableView<T>(as: T.Type) -> NDArray.MutableView<T>` | Mutable, typed view of the elements |
| `rawView()` | `func rawView() -> NDArray.RawView` | Read-only, raw view of the storage |
| `mutableRawView()` | `func mutableRawView() -> NDArray.MutableRawView` | Mutable, raw view of the storage |

Nested types: `NDArray.View` (immutable non-owning view), `NDArray.MutableView`, `NDArray.RawView` (type-erased immutable), `NDArray.MutableRawView` (type-erased mutable), `NDArray.ScalarType` (enum, e.g. `.float32`), `NDArray.InterleaveLayout` (interleaved memory layout of a dimension), `NDArray.RangeExpression` (protocol for subscripts).

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Escapable`, `InferenceValue.ViewRepresentable`, `InferenceValue.MutableViewRepresentable`, `Sendable`.
- An `NDArray` is read-only by default; write through `mutableView(as:)`, read through a view.
- Name distance: Core AI `NDArray` is distinct from `MPSNDArray` (Metal Performance Shaders; see the apple-silicon skill) and from Core ML `MLMultiArray` / `MLTensor`.
- Source: https://developer.apple.com/documentation/coreai/ndarray

## Related

- [NDArrayDescriptor](./ndarraydescriptor.md)
- [InferenceValue](./inferencevalue.md)
- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
