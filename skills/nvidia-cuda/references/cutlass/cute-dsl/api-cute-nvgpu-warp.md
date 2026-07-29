# CuTe DSL API: cute.nvgpu.warp

## Signature / Usage

```python
import cutlass.cute.nvgpu.warp as warp

op = warp.MmaF16BF16Op(shape=(16, 8, 16))   # SM80+
```

## Options / Props

| Symbol | Description |
| --- | --- |
| `Field` (enum) | Runtime-modifiable MMA Atom fields: `ACCUMULATE` (`accum_c`), `SFA` (`sf_a`), `SFB` (`sf_b`) |
| `MmaF16BF16Op` | F16/BF16, shapes (16,8,8) / (16,8,16), SM80+; row-major A, column-major B |
| `MmaTF32Op` | Wraps `mma.sync.aligned.m16n8k{K}.row.col.f32.tf32.tf32.f32`, F32 accumulation |
| `MmaFP8Op` | E4M3/E5M2, shapes (16,8,16) / (16,8,32), SM89+ |
| `MmaMXF4Op` | MXF4 block-scaled, E2M1 input + UE8M0 scale, shape (16,8,64), SM120+ |
| `MmaMXF4NVF4Op` | Mixed-precision block-scaled, E2M1 input + UE4M3 scale, shape (16,8,64), SM120+ |
| `MmaMXF8Op` | MXF8 block-scaled, E4M3/E5M2 input + UE8M0 scale |
| `MmaMXF8F6F4Op` | Mixed-precision block-scaled, independent A/B dtypes, shape (16,8,32), UE8M0 scale, SM120+ |
| `LdMatrix8x8x16bOp` | `ldmatrix.m8n8`, optional transpose/unpacking |
| `LdMatrix16x8x8bOp` | 8-bit `ldmatrix` lowering to `.m16n16` with Ampere-style address/value permutation |
| `LdMatrix16x16x8bOp` | `ldmatrix.m16n16` with `.b4x16_p64` / `.b6x16_p32` / `.b8` unpacking modes |
| `StMatrix8x8x16bOp` | `stmatrix.m8n8`, optional transpose/unpacking |
| `StMatrix16x8x8bOp` | `stmatrix.m16n8`, transpose/unpacking configurations |

## Related

- [MMA: WMMA Programming (Warp-Level)](./mma-wmma-programming.md)
- [CuTe DSL API: cute_nvgpu](./api-cute-nvgpu.md)
