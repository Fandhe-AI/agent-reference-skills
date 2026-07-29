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

## Notes

- Kernel subclasses (`MPSNDArrayMatrixMultiplication`, `MPSNDArrayGather`, `MPSNDArrayStridedSlice`, `MPSNDArrayUnaryKernel`/`BinaryKernel`/`MultiaryKernel` and their `*GradientKernel` counterparts) operate directly on `MPSNDArray`, forming the lower-level tensor-op layer MPSGraph is built on.
- Available since iOS/tvOS 13.0, macOS 10.15, visionOS 1.0.
- Distinct from Metal's own buffer/texture types (apple-graphics skill); `MPSNDArray` is MPS's tensor-shaped storage abstraction layered on top of `MTLBuffer`.

## Related

- [mpsgraph](./mpsgraph.md)
- [mpsgraph-tensor](./mpsgraph-tensor.md)
- [MPSMatrix](./mpsmatrix.md)
