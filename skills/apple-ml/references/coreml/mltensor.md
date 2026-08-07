# MLTensor

A multi-dimensional array of numerical or Boolean scalars tailored to ML use cases, with methods to perform transformations and mathematical operations efficiently using an ML compute device.

## Signature / Usage

```swift
struct MLTensor

let a = MLTensor([1.0, 2.0, 3.0, 4.0], shape: [2, 2])
let b = a.transposed()
let c = a.matmul(b)
let softmaxed = a.softmax(alongAxis: -1)
let result = try await c.shapedArray(of: Float.self)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shape` | `[Int]` | The shape of the tensor |
| `scalarType` | `any MLTensorScalar.Type` | The type of scalars in the tensor |
| `scalarCount` | `Int` | The number of scalar elements in the tensor |
| `rank` | `Int` | The number of dimensions of the tensor |
| `isScalar` | `Bool` | Indicates if the tensor is a scalar (rank 0) |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Provides arithmetic (`+`, `-`, `*`, `/`, `%`), trigonometric, exponential/power, reduction (`sum()`, `mean()`, `min()`, `max()`), matrix (`matmul()`, `transposed()`), indexing/slicing (`gathering(atIndices:)`, `argmax()`, `argsort()`), shape manipulation (`reshaped(to:)`, `flattened()`, `squeezingShape()`), padding/resizing, and comparison/logical operators
- Operations execute on an ML compute device chosen via `withMLTensorComputePolicy(_:_:)`; results are read back asynchronously (e.g. `shapedArray(of:)`)

## Related

- [MLComputePolicy](./mlcomputepolicy.md)
- [MLMultiArray](./mlmultiarray.md)
