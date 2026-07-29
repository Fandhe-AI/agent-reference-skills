# GEMM Performance Measurement Methodology Guidelines

## Signature / Usage

```text
warmup loop:   cudaProfilerStart / (warmup kernels) / cudaProfilerStop
profiling loop: cudaEventRecord(start) / (profiled kernels, rotating buffers) / cudaEventRecord(stop)
```

## Options / Props

| Practice | Guidance |
| --- | --- |
| Warmup / profiling separation | Independently configured, bounded by `cudaProfilerStart/Stop` or `cudaEventRecord`; no additional GPU work between kernel launches |
| Buffer rotation | Cycle multiple pre-allocated buffers so caches are cold at each iteration; total duplicate buffer size ≥ 2x L2 cache capacity |
| Data fill | Floating point: uniform `[-1, 1]`; scale factors: `[0, 1]`. Fixed-frequency tests tolerate zero-fill; fixed-power tests need realistic data (affects power draw) |
| Warmup duration | Until power draw stabilizes (~3s for back-to-back GEMMs observed) |
| Iteration count | >1000 profiling iterations for large problems to reduce variance |
| Large Blackwell GEMM recommendation | 10,000 warmups, 4,000 profiling iterations, 1s cool-down between tests |

## Notes

- Two test modes: **fixed frequency** (locked GPU clock, isolates architectural efficiency, tolerates zero-fill data) vs. **fixed power** (DVFS enabled, mimics real deployment, needs careful data-pattern control since power draw is data-dependent).
- Cool-down periods between tests prevent thermal/clock-state interference across measurements.

## Related

- [Profiler](./profiler.md)
- [GEMM Heuristics](./gemm-heuristics.md)
