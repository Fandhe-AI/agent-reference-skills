# CuTe DSL API: utils (SM100)

## Signature / Usage

```python
import cutlass.utils.sm100 as sm100

tile_m, tile_n = sm100.compute_epilogue_tile_size(cta_tile_shape, dtype)
mma = sm100.make_trivial_tiled_mma(dtype_a, dtype_b, cta_group=2, tile_shape=mma_tiler)
bs_mma = sm100.make_blockscaled_trivial_tiled_mma(dtype_a, dtype_b, sf_dtype, ...)
```

## Options / Props

| Function | Description |
| --- | --- |
| `compute_epilogue_tile_size()` | Epilogue subtile `(tile_m, tile_n)`, balancing TMEM load capacity, TMA store alignment, SMEM budget |
| `compute_acc_tmem_cols_per_stage()` | Accumulator TMEM column footprint per pipeline stage |
| `compute_epilogue_tile_shape()` | Epilogue tile dims from CTA tile shape, with optional warp-config overrides |
| `get_smem_store_op()` | Largest vectorized SMEM store op respecting output layout and TMEM-load thread-value ownership |
| `get_tmem_load_op()` | Performant TMEM load copy op for a given epilogue tile, element types, and tcgen05 MMA config |
| `make_smem_layout_a()` / `make_smem_layout_b()` | SMEM layout for A/B via MMA-based partitioning, heuristic atom selection, pipeline staging |
| `make_smem_layout_epi()` | SMEM layout for epilogue tensors (C/D) via heuristic atom selection + staging |
| `make_trivial_tiled_mma()` | Tiled MMA atom with given dtypes, leading dims, CTA grouping, tile shape (SMEM-sourced A by default) |
| `make_blockscaled_trivial_tiled_mma()` | Block-scaled tiled MMA atom with scale-factor parameters |
| `cluster_shape_to_tma_atom_A()` / `_B()` / `_SFB()` | TMA copy atom selection by cluster size and multicast capability, for A / B / scale-factor B |
| `get_permutation_mnk()` | M/N/K permutation for a tiled MMA given tile shape + scale-factor params |
| `get_num_tmem_alloc_cols()` | TMEM column allocation count for given tensor(s), optional rounding |
| `thrfrg_SFA()` / `thrfrg_SFB()` | Thread-fragment scale-factor A/B tensor partitioning for SM120 block-scaled MMA |
| `partition_fragment_SFA()` / `partition_fragment_SFB()` | Register fragment for scale factor A/B via thread-MMA partitioning |
| `get_layoutSFA_TV()` / `get_layoutSFB_TV()` | Thread-Value layout mapping for scale factor A/B |

## Related

- [CuTe DSL API: utils](./api-utils.md)
- [CuTe DSL API: cute_nvgpu_tcgen05](./api-cute-nvgpu-tcgen05.md)
- [Blackwell SM100 GEMM (C++)](../cpp/blackwell-sm100-gemm.md)
