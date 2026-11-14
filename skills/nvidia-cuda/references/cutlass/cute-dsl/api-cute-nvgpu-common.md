# CuTe DSL API: cute.nvgpu (Common)

## Signature / Usage

```python
import cutlass.cute.nvgpu as nvgpu

atom = nvgpu.MmaUniversalOp(...)
tma_atom_a, tma_tensor_a = nvgpu.make_tiled_tma_atom_A(...)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Enums | `OperandMajorMode`, `OutputMajorMode` (M=column-major, N=row-major), `MemoryOrder`, `MemoryScope`, `L2PrefetchSize`, `CacheEvictionPriority`, `LoadCacheMode`, `StoreCacheMode`, `SharedSpace` |
| Exception | `OpError` — raised on operation-construction errors |
| Utility | `normalize_field_to_ir_name()` — normalizes a field specifier (enum or exact IR string) to its IR logical name |
| MMA | `MmaUniversalOp` (shared A/B operand + accumulator dtypes), `MmaUniversalTrait` |
| Copy | `CopyUniversalOp` (plain assignment, no memory attrs), `CopyG2ROp`, `CopyR2GOp`, `CopyS2ROp`, `CopyR2SOp`, and their `*Trait` counterparts |
| TMA helpers | `make_tiled_tma_atom_A()` (MK projection), `make_tiled_tma_atom_B()` (NK projection), `make_im2col_tma_atom_A()` (convolution im2col mode) |

## Notes

- v4.8.1: `CopyUniversalOp` does not support memory attributes. `memory_order` / `memory_scope` raise `TypeError`; `l1c_evict_priority` / `invariant` take no effect and emit a `DSLWarning`. Use the specialized copy operations (`CopyG2ROp`, `CopyR2GOp`, `CopyS2ROp`, `CopyR2SOp`) instead.
- Source: https://github.com/NVIDIA/cutlass/blob/v4.8.1/CHANGELOG.md and `python/CuTeDSL/cutlass/cute/nvgpu/common.py` at tag v4.8.1 (retrieved 2026-11-14)

## Related

- [CuTe DSL API: cute_nvgpu](./api-cute-nvgpu.md)
- [CuTe DSL API: cute_nvgpu_cpasync](./api-cute-nvgpu-cpasync.md)
