# CuTe DSL API: cute.nvgpu.tcgen05

## Signature / Usage

```python
import cutlass.cute.nvgpu.tcgen05 as tcgen05

op = tcgen05.MmaF16BF16Op(cta_group=tcgen05.CtaGroup.TWO)
copy_atom = tcgen05.make_tmem_copy(...)
tcgen05.commit(mbarrier)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Enums | `Repetition` (x1..x128), `TmemLoadRedOp`, `Pack` (`NONE`, `PACK_16b_IN_32b`), `Unpack` (`NONE`, `UNPACK_32b_IN_16b`), `OperandSource`, `CtaGroup` (`ONE`, `TWO`), `Field` (`NEGATE_A`, `NEGATE_B`, `ACCUMULATE`, `SFA`, `SFB`, `DISABLE_OUTPUT_LANE`), `SmemLayoutAtomKind` |
| TMEM load ops | `Ld16x64bOp`, `Ld16x128bOp`, `Ld16x256bOp`, `Ld16x32bx2Op`, `Ld32x32bOp` |
| TMEM store ops | `St16x64bOp`, `St16x128bOp`, `St16x256bOp`, `St16x32bx2Op`, `St32x32bOp` |
| MMA ops | `MmaTF32Op` (Mma-K=8), `MmaF16BF16Op` (Mma-K=16), `MmaI8Op` (Mma-K=32), `MmaFP8Op` (deprecated), `MmaF8F6F4Op` (mixed A/B dtypes), `MmaMXF8Op` (deprecated, block-scaled), `MmaMXF8F6F4Op` (block-scaled mixed), `MmaMXF4Op` (block-scaled E2M1), `MmaMXF4NVF4Op` (block-scaled, variable scale dtype) |
| Utility | `make_smem_layout_atom()`, `tile_to_mma_shape()`, `commit()` (signals prior MMA completion via mbarrier), `is_tmem_load()` / `is_tmem_store()`, `get_tmem_copy_properties()`, `find_tmem_tensor_col_offset()`, `make_tmem_copy()` / `make_s2t_copy()`, `get_s2t_smem_desc_tensor()`, `make_umma_smem_desc()` (swizzle-aware) |

## Related

- [MMA: tcgen05 Programming (Blackwell)](./mma-tcgen05-programming.md)
- [CuTe DSL API: utils_sm100](./api-utils-sm100.md)
- [CuTe DSL API: cute_nvgpu](./api-cute-nvgpu.md)
