# MPSNDArray

`MPSNDArray` is a general N-dimensional array (unlike `MPSImage`'s fixed image/feature-channel layout), used by MPSGraph and the newer `MPSNDArray*` kernel family for arbitrary-rank tensor storage, including quantized layouts.

## Signature / Usage

```swift
let descriptor = MPSNDArrayDescriptor(dataType: .float32, shape: [1, 128, 128, 3])
let array = MPSNDArray(device: device, descriptor: descriptor)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dataType` | `MPSDataType` | — | Element type, including quantized types (int4/int8 via affine or LUT descriptors) |
| `shape` / `dimensionSizes` | `[NSNumber]` | — | Per-dimension extents; rank is arbitrary (not fixed to 2D/4D like `MPSMatrix`/`MPSImage`) |
| `MPSNDArrayAffineQuantizationDescriptor` | — | — | Describes affine (scale/zero-point) quantization for `MPSNDArrayAffineInt4Dequantize` |
| `MPSNDArrayLUTQuantizationDescriptor` | — | — | Describes lookup-table quantization for `MPSNDArrayLUTDequantize` |
| `encode(withMTL4CommandEncoder:sourceArray:destinationArray:)` (27.0+) | `(any MTL4ComputeCommandEncoder, MPSNDArray, MPSNDArray)` | — | Encodes an `MPSNDArrayUnaryKernel` onto a Metal 4 compute encoder; `MPSNDArrayMultiaryKernel` has the `sourceArrays:` counterpart |
| `reshape(withMTL4CommandEncoder:sourceArray:shape:destinationArray:)` (27.0+) | `(any MTL4ComputeCommandEncoder, MPSNDArray, [NSNumber], MPSNDArray)` | — | `MPSNDArrayIdentity` reshape on a Metal 4 encoder; a `dimensionCount:dimensionSizes:` overload also exists |
| `reshape(withSourceArray:shape:)` (27.0+) | `(MPSNDArray, [NSNumber]) -> MPSNDArray?` | — | CPU-side reshape returning a new array view of the source, or `nil` if aliasing is not possible |

## Notes

- Kernel subclasses (`MPSNDArrayMatrixMultiplication`, `MPSNDArrayGather`, `MPSNDArrayStridedSlice`, `MPSNDArrayUnaryKernel`/`BinaryKernel`/`MultiaryKernel` and their `*GradientKernel` counterparts) operate directly on `MPSNDArray`, forming the lower-level tensor-op layer MPSGraph is built on.
- The Metal 4 encode and reshape variants associate their commands with `MTLStageDispatch`; synchronize your workloads against that stage to prevent race conditions. Shape arguments use TensorFlow dimension order.
- Source (retrieved 2026-11-14; DocC JSON, `introducedAt` 27.0, no beta flag): https://developer.apple.com/documentation/metalperformanceshaders/mpsndarrayunarykernel/encode(withmtl4commandencoder:sourcearray:destinationarray:), https://developer.apple.com/documentation/metalperformanceshaders/mpsndarraymultiarykernel/encode(withmtl4commandencoder:sourcearrays:destinationarray:), https://developer.apple.com/documentation/metalperformanceshaders/mpsndarrayidentity/reshape(withmtl4commandencoder:sourcearray:shape:destinationarray:), https://developer.apple.com/documentation/metalperformanceshaders/mpsndarrayidentity/reshape(withsourcearray:shape:)
- Available since iOS/tvOS 13.0, macOS 10.15, visionOS 1.0.
- `MPSNDArray` is separate from Core AI's `NDArray` ("A multidimensional array of scalar values used for model inference", iOS/iPadOS/tvOS/visionOS/watchOS 27.0+; covered by the apple-ml skill), from Metal 4's `MTLTensor` (see `metal-compute/tensors.md`), and from MLX's `mx.array`.
- Distinct from Metal's own buffer/texture types (apple-graphics skill); `MPSNDArray` is MPS's tensor-shaped storage abstraction layered on top of `MTLBuffer`.

## Related

- [mpsgraph](./mpsgraph.md)
- [mpsgraph-tensor](./mpsgraph-tensor.md)
- [MPSMatrix](./mpsmatrix.md)
