# Video and Miscellaneous Instructions

Scalar and SIMD video (packed byte/half-word) arithmetic instructions, and miscellaneous control instructions (PTX ISA 9.3 §9.7.19–9.7.20).

## Signature / Usage

```ptx
vadd.s32.u32.s32.sat      r1, r2.b0, r3.h0;
nanosleep.u32 t;
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Scalar video instructions (9.7.19) | `vadd`, `vsub`, `vabsdiff`, `vmin`, `vmax`, `vshl`, `vshr`, `vmad`, `vset` |
| SIMD video instructions (9.7.19) | `vadd2`, `vsub2`, `vavrg2`, `vabsdiff2`, `vmin2`, `vmax2`, `vset2`, `vadd4`, `vsub4`, `vavrg4`, `vabsdiff4`, `vmin4`, `vmax4`, `vset4` |
| Miscellaneous instructions (9.7.20) | `brkpt`, `nanosleep`, `pmevent`, `trap`, `setmaxnreg` |

## Notes

- PTX ISA 9.3 — Chapter 9.7.19–9.7.20
- The `2`/`4` suffixed video instructions perform SIMD operations on two or four packed sub-word (byte/half-word) elements per operand, used for video/image processing kernels.
- `nanosleep` suspends a thread for an approximate number of nanoseconds; `trap`/`brkpt` raise a trap/breakpoint condition; `setmaxnreg` adjusts the maximum register count a warp may use (used with warp-specialization patterns).

## Related

- [instructions-arithmetic](./instructions-arithmetic.md)
- [instructions-sync-communication](./instructions-sync-communication.md)
