# DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC and Tensor Layout

`DML_TENSOR_DESC` is a generic, type-erased container for a tensor description used throughout operator descs. `DML_BUFFER_TENSOR_DESC` is the concrete (currently only) tensor description, describing a tensor backed by a Direct3D 12 buffer resource.

## Signature / Usage

```cpp
struct DML_TENSOR_DESC {
  DML_TENSOR_TYPE Type;
  const void      *Desc;
};

struct DML_BUFFER_TENSOR_DESC {
  DML_TENSOR_DATA_TYPE DataType;
  DML_TENSOR_FLAGS     Flags;
  UINT                  DimensionCount;
  const UINT            *Sizes;
  const UINT            *Strides;
  UINT64                TotalTensorSizeInBytes;
  UINT                  GuaranteedBaseOffsetAlignment;
};
```

```cpp
UINT sizes[4] = { 1, 3, 224, 224 }; // {N, C, H, W}
DML_BUFFER_TENSOR_DESC bufferDesc{};
bufferDesc.DataType = DML_TENSOR_DATA_TYPE_FLOAT32;
bufferDesc.DimensionCount = 4;
bufferDesc.Sizes = sizes;
bufferDesc.TotalTensorSizeInBytes =
    DMLCalcBufferTensorSize(bufferDesc.DataType, 4, sizes, nullptr);

DML_TENSOR_DESC tensorDesc{ DML_TENSOR_TYPE_BUFFER, &bufferDesc };
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Type` (DML_TENSOR_DESC) | `DML_TENSOR_TYPE` | Currently only `DML_TENSOR_TYPE_BUFFER`. |
| `Desc` (DML_TENSOR_DESC) | `const void*` | Points to a `DML_BUFFER_TENSOR_DESC` when `Type` is `DML_TENSOR_TYPE_BUFFER`. |
| `DataType` | `DML_TENSOR_DATA_TYPE` | Element data type (for example FLOAT32, FLOAT16). |
| `Flags` | `DML_TENSOR_FLAGS` | Additional tensor options, such as `DML_TENSOR_FLAG_OWNED_BY_DML` (used for graph inputs). |
| `DimensionCount` | `UINT` | Number of dimensions, 1 to 8 depending on the operator (most support at least 4). |
| `Sizes` | `const UINT*` | Size in elements of each dimension. For operators with semantic axes, always ordered `{N, C, H, W}` (4D) or `{N, C, D, H, W}` (5D). |
| `Strides` | `const UINT*` | Optional; elements to traverse to reach the next element along each dimension. A stride of 0 expresses broadcasting; larger-than-packed strides express padding. If omitted, the tensor is contiguously packed. |
| `TotalTensorSizeInBytes` | `UINT64` | Minimum required buffer size in bytes; must be at least the size implied by `Sizes`/`Strides`/`DataType` (computable via the `DMLCalcBufferTensorSize` helper). Buffer tensors are limited to 2^32 − 1 elements. |
| `GuaranteedBaseOffsetAlignment` | `UINT` | Optional minimum alignment (bytes, power of two) guaranteed for the bound buffer range's base offset; larger alignment (32+ bytes recommended) can improve performance via vectorized loads/stores. Minimum alignment is always 16 bytes. |

## Notes

- Corresponding binding type for a buffer tensor is `DML_BINDING_TYPE_BUFFER` (see `DML_BUFFER_BINDING`).
- Layout convention: axes with semantic meaning follow `{N, C, H, W}` for 4D and `{N, C, D, H, W}` for 5D tensors; otherwise dimension order has no fixed meaning.

## Related

- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [Key operators](./operators.md)
