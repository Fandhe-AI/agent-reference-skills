# Naming Conventions

## Signature / Usage

```text
[t|b][Family]_[Memory][Operand][AxisSuffix?]

tAgA, tAsA   # TMA load path for operand A: global-memory / shared-memory partitions
tBgB, tBsB   # TMA load path for operand B
tC...        # compute-path partitions, varying memory destination

tTR_*  # TMEM -> Register
tRS_*  # Register -> Shared
bSG_*  # Shared -> Global (via TMA store)
bGS_*  # Global -> Shared (via TMA load)
```

## Options / Props

| Prefix | Memory / space |
| --- | --- |
| `g` | Global memory (GMEM) |
| `s` | Shared memory (SMEM) |
| `r` | Register memory (RMEM) |
| `t` | Tensor memory (TMEM) |

| Operand letters | Domain |
| --- | --- |
| `A`, `B`, `C`, `Acc` | GEMM |
| `Q`, `K`, `V`, `P`, `O` | Attention kernels |
| `Delta`, `State`, `Valpha`, ... | Specialized kernels (as needed) |

| Axis-order suffix | Domain |
| --- | --- |
| `m`/`n`/`k`/`l` | GEMM layouts |
| `q`/`k`/`d`/`l` | Attention layouts (sequence-Q, sequence-K, head-dim, batch) |

## Notes

- This is a Hungarian-style naming reference, not an enforced compiler rule — it documents the conventions used across CUTLASS's own kernel implementations so identifier names are self-describing (which memory space, which operand, which axis order).

## Related

- [DSL Introduction](./dsl-introduction.md)
- [CuTe: Layout](../cpp/cute-layout.md)
