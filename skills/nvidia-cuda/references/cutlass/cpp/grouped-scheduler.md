# Grouped Kernel Schedulers

## Signature / Usage

```cpp
// persistent-kernel loop
while (problem_visitor.next_tile()) {
  // compute the tile next_tile() selected for this threadblock
}
```

```cpp
// scheduler mode selection
cutlass::gemm::kernel::GroupScheduleMode mode =
    cutlass::gemm::kernel::GroupScheduleMode::kDeviceOnly;      // default
// or GroupScheduleMode::kHostPrecompute

// load-balance problems by sorting on descending K before round-robin assignment
sort_problems(problem_sizes);
```

## Options / Props

| Item | Description |
| --- | --- |
| Grouped kernel | Persistent kernel executing multiple problems (GEMM, SYR2K) in one launch; launches fewer threadblocks than tiles, each threadblock handling multiple tiles across problems |
| `next_tile()` | Scheduler call determining which tile the calling threadblock computes next |
| Grouped GEMM scheduler | Round-robin tile assignment; `thread_idx` starts at `blockIdx.x`, incremented by `gridDim.x`; maps `tile_idx` to a problem via `problem_tile_start`, then to an in-problem tile via rasterization |
| Grouped Rank2K scheduler | Specialized for triangular matrices (SYR2K/HER2K); maps threadblock id `t` to tile `(i, j)` via `i = ceil(sqrt(2t + 2.25) - 0.5) - 1`, `j = t - i(i+1)/2`; non-square grids use square "macro tile" mapping first; upper-triangular swaps row/column |
| `GroupScheduleMode::kDeviceOnly` | Default; all scheduling on-device, warp-parallel prefix sums per problem |
| `GroupScheduleMode::kHostPrecompute` | Host precomputes `(problem_idx, problem_starting_tile)` per block; best when host precompute overlaps other device work, and for low-intensity problems where scheduler time otherwise dominates |
| `sort_problems()` | Sorts problems by descending K dimension before round-robin assignment to balance per-block work |

## Notes

- Standard grouped-GEMM scheduling is inefficient for triangular problems because many round-robin tiles land outside the triangular region, causing load imbalance — hence the dedicated Rank2K scheduler.
- Sorting by descending K before round-robin assignment measurably improves load balance (example given: unsorted grouping of K=128 and K=1024 GEMMs leaves some blocks doing only high-K tiles; sorting spread the work, improving runtime by roughly 30% in the documented example). Profile both sorted and unsorted variants since results vary by configuration.

## Related

- [GEMM API (3.x)](./gemm-api-3x.md)
- [GEMM Heuristics](./gemm-heuristics.md)
