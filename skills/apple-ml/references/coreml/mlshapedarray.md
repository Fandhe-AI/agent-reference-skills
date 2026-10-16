# MLShapedArray

A machine learning collection type that stores scalar values in a multidimensional array. The Swift counterpart to `MLMultiArray`.

## Signature / Usage

```swift
struct MLShapedArray<Scalar> where Scalar : MLShapedArrayScalar
```

`MLShapedArray` is one of the underlying types of `MLFeatureValue` that stores scalar values. Convert a shaped array to an `MLMultiArray` with the `MLMultiArray` `init(_:)` initializer, and convert back with the `MLShapedArray` `init(_:)` initializer. All elements are of the same type, which must conform to `MLShapedArrayScalar`: `Int32`, `Float`, `Double`.

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init(scalar:)` | `init(scalar: Scalar)` | Creates a shaped array with exactly one value and zero dimensions |
| `init(scalars:shape:)` | `init<S>(scalars: S, shape: [Int])` | Initializes with a sequence and the shape |
| `init(mutating:shape:)` | `init(mutating: CVPixelBuffer, shape: [Int])` | Creates a shaped array using a pixel buffer as the backing storage |
| `init(_:)` | `init(_: MLMultiArray)` | Creates a shaped array from a multiarray |
| `init(concatenating:alongAxis:)` | `init<S>(concatenating: S, alongAxis: Int)` | Merges a sequence of shaped arrays into one along an axis |
| `init(unsafeUninitializedShape:initializingWith:)` | `init(unsafeUninitializedShape: [Int], initializingWith: (inout UnsafeMutableBufferPointer<Scalar>, [Int]) throws -> Void) rethrows` | Creates a shaped array from a shape and a closure that initializes its memory |
| `init(data:shape:)` | `init(data: Data, shape: [Int])` | Creates a shaped array from a block of data and a shape |
| `init(data:shape:strides:)` | `init(data: Data, shape: [Int], strides: [Int])` | Creates a shaped array from data, a shape, and strides |
| `changingLayout(to:)` | `func changingLayout(to: MLShapedArrayBufferLayout) -> MLShapedArray<Scalar>` | Returns a copy with the specified buffer layout |
| `expandingShape(at:)` | `func expandingShape(at: Int) -> MLShapedArray<Scalar>` | Returns a new shaped array with expanded dimensions |
| `reshaped(to:)` | `func reshaped(to: [Int]) -> MLShapedArray<Scalar>` | Returns a new reshaped shaped array |
| `squeezingShape()` | `func squeezingShape() -> MLShapedArray<Scalar>` | Returns a new squeezed shaped array |
| `transposed()` | `func transposed() -> MLShapedArray<Scalar>` | Returns a new transposed shaped array |
| `transposed(permutation:)` | `func transposed(permutation: [Int]) -> MLShapedArray<Scalar>` | Returns a transposed shaped array using a custom permutation |
| `withPixelBufferIfAvailable(_:)` | `func <R>((CVPixelBuffer) throws -> R) rethrows -> R?` | Reads the underlying pixel buffer |
| `withMutablePixelBufferIfAvailable(_:)` | `func <R>((CVPixelBuffer) throws -> R) rethrows -> R?` | Writes to the underlying pixel buffer |
| `withUnsafeMutableShapedBufferPointer(using:_:)` | `func <R>(using: MLShapedArrayBufferLayout, (inout UnsafeMutableBufferPointer<Scalar>, [Int], [Int]) throws -> R) rethrows -> R` | Calls the closure with a pointer to the mutable storage that has a specified buffer layout |
| `init(from:)` / `encode(to:)` | `Decoder` / `Encoder` | Decoding / encoding when `Scalar` also conforms to `Decodable` / `Encodable` |

## Notes

- iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, tvOS 15.0+, visionOS 1.0+, watchOS 8.0+
- Each dimension is typically meaningful, e.g. an image input as C x H x W (channels, height, width); the number of dimensions and the size of each define the array's shape
- Some models use a one-dimensional multiarray, which is conceptually identical to a conventional `Array`
- To inspect a model's multiarray shape and constraints: `MLModel.modelDescription` -> `MLModelDescription.inputDescriptionsByName` / `outputDescriptionsByName` -> `MLFeatureDescription.multiArrayConstraint` -> `MLMultiArrayConstraint.shape` and `shapeConstraint`
- Conforms to `BidirectionalCollection`, `Collection`, `MutableCollection`, `RandomAccessCollection`, `Sequence`, `ExpressibleByArrayLiteral`, `CustomStringConvertible`, `Decodable`, `Encodable`, `Equatable`, `MLShapedArrayProtocol`, `Sendable`, `Copyable`, `Escapable`, `SendableMetatype`
- Most methods are available when `Scalar` conforms to `MLShapedArrayScalar`
- Source: https://developer.apple.com/documentation/coreml/mlshapedarray

## Related

- [MLMultiArray](./mlmultiarray.md)
- [MLFeatureValue](./mlfeaturevalue.md)
- [MLSendableFeatureValue](./mlsendablefeaturevalue.md)
- [MLTensor](./mltensor.md)
