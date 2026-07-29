# GEMM API (3.x)

## Signature / Usage

```cpp
// Device layer: stateful, reusable GEMM handle (host-facing, like cuBLAS)
using Gemm = cutlass::gemm::device::GemmUniversalAdapter<GemmKernel>;

// Kernel layer: composes a collective mainloop + collective epilogue
using GemmKernel = cutlass::gemm::kernel::GemmUniversal<
    ProblemShape, CollectiveMainloop, CollectiveEpilogue>;

// Collective layer: mainloop over tiles
using CollectiveMainloop = cutlass::gemm::collective::CollectiveMma<
    DispatchPolicy /* e.g. MainloopSm90TmaGmmaWarpSpecialized<Stages, ClusterShape> */,
    TileShape, ElementA, StrideA, ElementB, StrideB, TiledMma, TiledCopy /* ... */>;

// CollectiveBuilder derives an optimized CollectiveMma from 2.x-style parameters
using CollectiveMainloop = typename cutlass::gemm::collective::CollectiveBuilder<
    Arch, OpClass, ElementA, LayoutA, AlignA,
    ElementB, LayoutB, AlignB,
    ElementAccumulator, TileShape, ClusterShape,
    StageCountAutoCarveout</* smem budget */>, KernelSchedule>::CollectiveOp;
```

## Options / Props

| Level | Role |
| --- | --- |
| Device | Host-side interface (`GemmUniversalAdapter`) — manages parameter lifetime and kernel invocation |
| Kernel | Grid-level scheduling; `GemmUniversal` composes a collective mainloop + collective epilogue; handles execution ordering, thread marshalling, grid swizzling, input tiling |
| Collective | Largest group of threads onto which MMA/Copy atoms are tiled; coordinates async array copies, MMA on shared-memory tiles, and cluster/threadblock/warp synchronization |
| Tiled MMA / Copy | `cute::TiledMma` / `cute::TiledCopy` build larger operations from atoms, invoked via `cute::gemm()` / `cute::copy()` |
| Atom | Smallest unit of threads+data that must jointly execute one hardware math/copy instruction |

| Component | Notes |
| --- | --- |
| `CollectiveMma` template params | `DispatchPolicy` (algorithm/arch specialization), `TiledMma`, `TiledCopy`, memory layouts, transform ops |
| Dispatch policy examples | `MainloopSm90TmaGmmaWarpSpecialized<Stages, ClusterShape>` |
| Kernel schedule examples | `KernelCpAsyncWarpSpecialized`, `KernelTmaWarpSpecializedCooperative` (multiple schedules can compose with a single mainloop) |
| `CollectiveBuilder` | Accepts 2.x-equivalent parameters and constructs an optimized `CollectiveMma`; supports fully static instantiation when problem shapes are compile-time known |
| Epilogue | `include/cutlass/epilogue/collective/`; standard implementations `DefaultEpilogue`, `Epilogue` |

## Notes

- Five-level hierarchy: Device → Kernel → Collective → Tiled MMA/Copy → Atom.

## Related

- [CUTLASS 3.x Design](./cutlass-3x-design.md)
- [Blackwell SM100 GEMM](./blackwell-sm100-gemm.md)
- [CuTe: MMA Atom](./cute-mma-atom.md)
