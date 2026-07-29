# CuTe DSL API: utils (SM90)

## Signature / Usage

```python
import cutlass.utils.sm90 as sm90

layout_a = sm90.make_smem_layout_a(mma_tiler, major_mode, dtype, num_stages)
layout_epi = sm90.make_smem_layout_epi(epi_tile, dtype, num_stages)
```

## Options / Props

| Function | Description |
| --- | --- |
| `get_smem_store_op()` | Selects the largest vectorized SMEM store atom constrained by the output tensor's global-memory layout |
| `make_smem_layout_a()` | Builds tensor A's SMEM layout: partition by MMA tiler → pick heuristic layout atom (majorness + dtype) → tile to MMA shape → apply pipeline staging |
| `make_smem_layout_b()` | Same process as `make_smem_layout_a()`, for tensor B |
| `make_smem_layout_epi()` | Builds SMEM layout for epilogue tensors C/D: heuristic atom by epilogue tile shape + dtype → tile to epilogue dims → pipeline staging; supports optional target shape/ordering |
| `compute_tile_shape_or_override()` | Computes epilogue tile shape from CTA dims + element type, or uses a provided override; supports cooperative execution modes |

## Related

- [CuTe DSL API: utils](./api-utils.md)
- [CuTe DSL API: cute_nvgpu_warpgroup](./api-cute-nvgpu-warpgroup.md)
