# GEMM Heuristics

## Signature / Usage

```bash
pip install nvidia-matmul-heuristics

# 1. define a problem JSON (dims, dtypes, batch count, layout)
# 2. configure CMake with the heuristics problem file + per-problem config count
# 3. profile the generated CSV testlist
./tools/profiler/cutlass_profiler --kernels-from-csv=heuristics_testlist.csv
```

```python
# direct Python API for custom emitters / pre-built kernels
from heuristics import filter_manifest_and_write_heuristics_file
```

## Options / Props

| Item | Value |
| --- | --- |
| Purpose | Reduce the autotuning search space so only a subset of valid kernels needs building/profiling for a given GEMM problem set |
| Supported data types | f8, f16, f32 |
| Supported architectures | Hopper (sm9x), Blackwell (sm10x) |
| Backing tool | `nvidia-matmul-heuristics` — analytical heuristic ranking kernels by estimated performance for a problem size and hardware SKU |

## Notes

- `cutlass_library`'s heuristics layer is a filtering step ahead of `cutlass_profiler`, not a replacement for it — the output CSV testlist still feeds the profiler for ground-truth measurement.

## Related

- [Quickstart](./quickstart.md)
- [Profiler](./profiler.md)
- [GEMM Performance Measurement](./gemm-performance-measurement.md)
