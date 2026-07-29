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

## Related

- [CuTe DSL API: cute_nvgpu](./api-cute-nvgpu.md)
- [CuTe DSL API: cute_nvgpu_cpasync](./api-cute-nvgpu-cpasync.md)
