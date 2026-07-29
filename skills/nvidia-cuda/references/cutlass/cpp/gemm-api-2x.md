# GEMM API (2.x)

## Signature / Usage

```cpp
using Gemm = cutlass::gemm::device::Gemm<
    ElementA, LayoutA, ElementB, LayoutB, ElementC, LayoutC, ElementAccumulator,
    cutlass::arch::OpClassTensorOp, cutlass::arch::Sm70 /* ... */>;

using ThreadblockMma = cutlass::gemm::threadblock::MmaPipelined</* ... */>;
```

## Options / Props

| Level | Component | Description |
| --- | --- | --- |
| Device-wide | `cutlass::gemm::device::Gemm` | Basic GEMM |
| Device-wide | `cutlass::gemm::device::GemmArray` | Batched GEMM via pointer arrays |
| Device-wide | `cutlass::gemm::device::GemmBatched` | Batched GEMM via strides |
| Device-wide | `cutlass::gemm::device::GemmSplitKParallel` | Partitioned-K GEMM |
| Threadblock | `cutlass::gemm::threadblock::MmaPipelined` | Loads global-memory tiles to shared memory, computes with warp-level operators, uses `PredicatedTileIterator` for boundary-safe traversal |
| Warp | `MmaTensorOp` | Tensor Core math, loads shared-memory tiles into registers |
| Warp | `MmaSimt` | SIMT math on CUDA Cores |
| Thread | Register-only GEMM (CUDA Cores only) | Template accepts `GemmShape`, element types, layouts, optional `Operator` |
| Instruction | `mma_sm70.h` / `mma_sm75.h` | Volta / Turing Tensor Core instruction templates |

## Notes

- Model structure: outer CTA-level loop over matrix dimensions → threadblock-level main K loop → warp-level nested loop → instruction-level hardware op (Tensor Core or SIMT).
- Efficient epilogue is row-major; for column-major output, A and B are transposed and swapped (`A x B = C => Transpose(B) x Transpose(A) = Transpose(C)`), supporting all `{N,T} x {N,T} => {N,T}` combinations.

## Related

- [CUTLASS 2.x](./cutlass-2x.md)
- [Layout (2.x)](./layout-2x.md)
- [Tile Iterator Concept](./tile-iterator-concept.md)
- [GEMM API (3.x)](./gemm-api-3x.md)
