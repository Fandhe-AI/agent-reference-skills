# Efficient GEMM in CUDA

## Signature / Usage

```cpp
// Threadblock-level tile shape drives the outer loop
using ThreadblockShape = cutlass::gemm::GemmShape<128, 128, 32>; // kM, kN, kK
```

## Options / Props

| Level | Role |
| --- | --- |
| Threadblock-level | Each block iteratively loads input tiles (`ThreadblockShape::{kM,kN,kK}`) and accumulates products; larger tiles reduce global-memory fetches but can underutilize threads for small problems |
| Warp-level | Maps to warp parallelism via Tensor Core MMA instructions or thread-level matrix computation; shared-memory access should be bank-conflict-free |
| Instruction-level | MMA (matrix-multiply-accumulate) operations issued to CUDA Cores or Tensor Cores |
| Thread-level | Individual threads process elements held in registers |
| Epilogue | Threads exchange data through shared memory then cooperatively write to global memory via striped access, applying scaling/clamping |

## Notes

- Pipelining: software pipelining (double buffering at threadblock and warp scope) overlaps global-memory loads with compute.
- Parallelized reductions: Split-K partitions the K dimension across threadblocks; Sliced-K partitions K at warp level for large-K efficiency.
- Warp specialization (Hopper+): threadblocks split into producer (DMA, via TMA) and consumer (MMA) warp groups, coordinated through barrier synchronization — see [Pipeline (async)](./pipeline.md).

## Related

- [Functionality](./functionality.md)
- [Pipeline](./pipeline.md)
- [GEMM API (3.x)](./gemm-api-3x.md)
