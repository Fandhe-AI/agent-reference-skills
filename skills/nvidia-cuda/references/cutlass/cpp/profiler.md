# Profiler

## Signature / Usage

```bash
# build
make cutlass_profiler -j
cmake .. -DCUTLASS_NVCC_ARCHS="70;75;80" -DCUTLASS_LIBRARY_KERNELS=all -DCUTLASS_UNITY_BUILD_ENABLED=ON

# profile a specific problem
cutlass_profiler --operation=Gemm --m=1024 --n=1024 --k=128

# search for the best-performing kernel matching a pattern
cutlass_profiler --kernels=*gemm* --enable-kernel-performance-search --sort-results-flops-per-sec

# sweep K and write a CSV report
cutlass_profiler --kernels=cutlass_simt_sgemm_128x128_nn --m=3456 --n=4096 --k=8:4096:8 --output=report.csv
```

## Options / Props

| Flag | Description |
| --- | --- |
| `--operation` | Operation kind: `Gemm`, sparse GEMM, `Conv2d`, `Conv3d` |
| `--m` / `--n` / `--k` | Problem size (supports ranges, e.g. `8:4096:8`) |
| `--kernels` | Glob filter over kernel names |
| `--enable-kernel-performance-search` | Exhaustive search across candidate kernels |
| `--sort-results-flops-per-sec` | Sort results by measured GFLOP/s |
| `--output` | Write results to CSV |
| `CUTLASS_LIBRARY_INSTANTIATION_LEVEL` | Four-digit instantiation-level control (instruction shapes, MMA shape multipliers, cluster shapes, schedule pruning) — required to manage the combinatorial kernel space on Hopper (SM90) and Blackwell (SM100) |

## Notes

- `emit_kernel_listing.py` lets you emit and test a custom subset of profiler kernels with specific runtime arguments.
- Hopper/Blackwell kernel spaces are large enough that the profiler needs `CUTLASS_LIBRARY_INSTANTIATION_LEVEL` to bound how many instruction-shape/cluster-shape/schedule combinations get instantiated.

## Related

- [Quickstart](./quickstart.md)
- [GEMM Heuristics](./gemm-heuristics.md)
- [GEMM Performance Measurement](./gemm-performance-measurement.md)
