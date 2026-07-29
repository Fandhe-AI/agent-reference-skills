# Auto-Tuning GEMM

## Signature / Usage

```python
config_kernel_dict = {}  # key: (dtype, kernel_config) -> compiled kernel

for mma_tiler_mn, cluster_shape_mn, use_2cta_instrs, use_tma_store in search_space:
    key = (dtype, mma_tiler_mn, cluster_shape_mn, use_2cta_instrs, use_tma_store)
    if key not in config_kernel_dict:
        config_kernel_dict[key] = cute.compile(gemm_kernel, ...)
    # benchmark: 5-10 warmup, 100-1000 timed iterations, CUDA events + sync

input_to_kernel = {}  # secondary cache: input shape -> best kernel config
```

## Options / Props

| Step | Description |
| --- | --- |
| 1. Define search space | Enumerate valid parameter combinations |
| 2. Benchmark configurations | Test each and identify the best performer |
| 3. Enable caching | Reduce tuning overhead via kernel reuse (CuTe DSL's separate compile/execute workflow) |

| Blackwell GEMM search parameter | Meaning |
| --- | --- |
| `mma_tiler_mn` | Matrix tile dimensions for MMA instructions |
| `cluster_shape_mn` | CTAs per cluster dimension |
| `use_2cta_instrs` | Whether to use Blackwell 2-CTA MMA instructions |
| `use_tma_store` | Whether to use TMA for the epilogue store |

## Notes

- Benchmarking best practices: 5-10 warmup iterations for GPU stabilization, 100-1,000 timed iterations for statistical validity, CUDA events with synchronization for precision timing, GPU frequency locking via `nvidia-smi`, and outlier removal via min/avg statistics.
- A second cache layer (input-to-kernel dictionary, keyed by e.g. tensor shape) avoids re-tuning identical input scenarios.

## Related

- [JIT Caching](./dsl-jit-caching.md)
- [Blackwell SM100 GEMM](../cpp/blackwell-sm100-gemm.md)
