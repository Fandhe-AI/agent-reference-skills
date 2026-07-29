# Layouts and Tensors (2.x)

## Signature / Usage

```cpp
layout::ColumnMajor layout(lda);
int offset = layout({row, column}); // row + lda * column

layout::RowMajor layout2(lda);
int offset2 = layout2({row, column}); // lda * row + column
```

## Options / Props

| Term | Meaning |
| --- | --- |
| Size | Number of elements in a tensor |
| Capacity | Number of elements needed to represent the tensor in memory |
| Rank | Number of logical dimensions |
| Extent | Size of each logical dimension |
| `TensorRef<T, Layout>` | Pointer + layout; unbounded tensor reference, avoids parameter proliferation |
| `TensorView<T, Layout>` | `TensorRef` + `extent` vector; bounded, supports `contains()` for bounds checking |

| Existing layout | Category |
| --- | --- |
| `PitchLinear`, `ColumnMajor`, `RowMajor`, `ColumnMajorInterleaved`, `RowMajorInterleaved` | Matrix layouts |
| `TensorNHWC` | Tensor layout |
| `TensorOpCongruous`, `TensorOpCrosswise` | Shared-memory layouts |

## Notes

- A `Layout` type must expose `kRank`, `kStrideRank`, coordinate types, `operator()` (offset calculation), and `capacity()` (memory requirement) — it maps logical coordinates to physical memory offsets and doubles as a partial-specialization type system.
- This is the CUTLASS 2.x `layout::*` API (pointer + `Layout` object model, `TensorRef`/`TensorView`); CUTLASS 3.x replaces it with `cute::Layout` / `cute::Tensor` — see [CuTe: Layout](./cute-layout.md).

## Related

- [CUTLASS 2.x](./cutlass-2x.md)
- [GEMM API (2.x)](./gemm-api-2x.md)
- [CuTe: Layout](./cute-layout.md)
