# DirectML Helper Functions

Reference C++ helper functions commonly used with DirectML: `DMLCalcBufferTensorSize` for computing minimum buffer sizes, and `CalculateStrides` for computing NCHW/NHWC strides with optional broadcasting.

## Signature / Usage

```cpp
inline UINT64 DMLCalcBufferTensorSize(
    DML_TENSOR_DATA_TYPE dataType,
    UINT dimensionCount,
    _In_reads_(dimensionCount) const UINT* sizes,
    _In_reads_opt_(dimensionCount) const UINT* strides);
```

```cpp
enum class Layout { NCHW, NHWC };

// Given dimension sizes (in NCHW order), calculates the strides to achieve a desired layout.
std::array<uint32_t, 4> CalculateStrides(
    Layout layout,
    std::array<uint32_t, 4> sizes,
    std::array<bool, 4> broadcast);
```

## Options / Props

| Function | Description |
|---|---|
| `DMLCalcBufferTensorSize` | Computes the minimum number of bytes required for a buffer tensor of the given type, sizes, and strides: `IndexOfLastElement = dot(Sizes - 1, Strides)`, then `roundup((IndexOfLastElement + 1) * ElementSizeInBytes, 4)`. |
| `CalculateStrides` | Computes N/C/H/W strides for a 4D tensor in NCHW or NHWC layout, zeroing the stride of any dimension marked for broadcasting. |

## Notes

- DirectML requires all bound buffers to have a total size that is DWORD (4-byte) aligned; `DMLCalcBufferTensorSize` rounds the computed minimum size up to the nearest 4-byte boundary.
- Element size depends on `DML_TENSOR_DATA_TYPE`: 4 bytes for FLOAT32/UINT32/INT32, 2 bytes for FLOAT16/UINT16/INT16, 1 byte for UINT8/INT8, 8 bytes for FLOAT64/UINT64/INT64.
- If `strides` is null in `DMLCalcBufferTensorSize`, the size is simply the product of all `sizes` times the element size (i.e. a packed tensor).

## Related

- [Using strides to express padding, memory layout](./strides-padding-layout.md)
- [Tensors (DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC)](./tensors.md)
- [DirectMLX](./directmlx.md)
