# CuTe DSL API: utils

## Signature / Usage

```python
import cutlass.utils as utils

alloc = utils.SmemAllocator()
tensor = alloc.allocate_tensor(dtype, layout)

hw = utils.HardwareInfo()
cap = utils.get_smem_capacity_in_bytes(compute_capability)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Memory management | `SmemAllocator` (raw bytes / numeric types / arrays / tensors with layout), `TmemAllocator` (TMEM allocation, mbarrier sync for 2-CTA), `TmemBufferPool` (sub-allocation from pre-reserved TMEM without manual offsets) |
| Tile scheduling | `PersistentTileSchedulerParams`, `StaticPersistentTileScheduler`, `StaticPersistentRuntimeTileScheduler` (always launches all SMs, runtime tile info), `ClcDynamicPersistentTileSchedulerParams`, `ClcDynamicPersistentTileScheduler` |
| Grouped GEMM support | `GroupSearchResult`, `GroupedGemmGroupSearchState`, `GroupedGemmTileSchedulerHelper` (raw block index -> CTA tile index) |
| Utility functions | `get_smem_capacity_in_bytes()`, `get_kernel_smem_size()`, `get_num_tmem_alloc_cols()`, `compute_tmem_cols_from_layout()` |
| Hardware / layout info | `HardwareInfo` (cache size, SM count), `TensorMapManager`, `LayoutEnum` (row/column major + MMA mode queries), `TransformMode` (`ConvertOnly`, `ConvertScale`) |
| Layout/MMA configuration | `make_smem_layout()`, `make_trivial_tiled_mma()`, `sm90_make_trivial_tiled_mma()`, `get_smem_layout_atom_ab()`, `get_epilogue_tile_shape()` |
| Scale/transform ops | `scale_tma_partition()`, `transform_partition()`, `scale_partition()`, `get_permutation_mnk()` |

## Related

- [CuTe DSL API: utils_sm90](./api-utils-sm90.md)
- [CuTe DSL API: utils_sm100](./api-utils-sm100.md)
- [GEMM Heuristics (C++)](../cpp/gemm-heuristics.md)
