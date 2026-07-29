# Architecture-Specific MMA Programming Guides (Index)

## Signature / Usage

Navigation page covering three architecture-specific CuTe DSL MMA programming guides.

```text
mma_docs/
├── wmma_programming.html    → warp-level MMA (SM80+)
├── wgmma_programming.html   → Hopper warpgroup MMA (SM90a)
└── tcgen05_programming.html → Blackwell tcgen05 MMA (SM100)
```

## Options / Props

| Guide | Common sections |
| --- | --- |
| Warp-level MMA | GMEM->MMA data flow, TiledMMA/MMA Ops setup, tensor partitioning, pre/post-conditions, making fragments, executing the GEMM main loop, complete workflow, beyond simple dense MMAs |
| Warpgroup MMA | Same, plus SMEM layout creation for A/B |
| tcgen05 MMA | Same, plus reading the accumulator from TMEM |

## Notes

- This is a navigation/index page; content lives in the three linked guides.

## Related

- [MMA: WMMA Programming (Warp-Level)](./mma-wmma-programming.md)
- [MMA: WGMMA Programming (Hopper)](./mma-wgmma-programming.md)
- [MMA: tcgen05 Programming (Blackwell)](./mma-tcgen05-programming.md)
