# CuTe DSL API: cute.nvgpu.warpgroup

## Signature / Usage

```python
import cutlass.cute.nvgpu.warpgroup as warpgroup

layout_atom = warpgroup.make_smem_layout_atom(kind=warpgroup.SmemLayoutAtomKind.K_SW128, dtype=...)
warpgroup.fence()
warpgroup.commit_group()
warpgroup.wait_group(k_pipe_mmas)
```

## Options / Props

| Symbol | Description |
| --- | --- |
| `OperandSource` (enum) | Source memory location for the A operand |
| `Field` (enum) | Runtime-modifiable MMA Atom fields: `ACCUMULATE` (`accum_c`) |
| `SmemLayoutAtomKind` (enum) | SM90 SMEM layout atom kinds: `MN_INTER`, `MN_SW32`, `MN_SW64`, `MN_SW128`, `K_INTER`, `K_SW32`, `K_SW64`, `K_SW128` |
| `MmaF16BF16Op` | F16/BF16, Mma-M fixed 64, Mma-N 8–256 (step 8); K-major or MN-major when A is in SMEM; requires SM90a |
| `MmaF8Op` | E4M3/E5M2, Mma-K 32, Mma-M fixed 64, Mma-N 8–256 (step 8); both operands K-major; requires SM90a |
| `make_smem_layout_atom()` | Builds a composed SMEM layout atom (element units) for a given kind + dtype |
| `fence()` | Synchronization primitive (PTX `wgmma.fence`) |
| `commit_group()` | Commits a warpgroup MMA instruction group (PTX `wgmma.commit_group`) |
| `wait_group()` | Waits for completion of a warpgroup instruction group (PTX `wgmma.wait_group`) |

## Related

- [MMA: WGMMA Programming (Hopper)](./mma-wgmma-programming.md)
- [CuTe DSL API: cute_nvgpu](./api-cute-nvgpu.md)
