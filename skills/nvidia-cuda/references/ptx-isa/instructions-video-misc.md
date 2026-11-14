# Video and Miscellaneous Instructions

Scalar and SIMD video (packed byte/half-word) arithmetic instructions, and miscellaneous control instructions (PTX ISA 9.5 §9.7.20–9.7.21).

## Signature / Usage

```ptx
vadd.s32.u32.s32.sat      r1, r2.b0, r3.h0;
nanosleep.u32 t;
trace.mark{.payload_size} event-id {, payload} {, event-label};
trace.mark.cond{.payload_size} event-id, {!}predicate {, payload} {, event-label};
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Scalar video instructions (9.7.20) | `vadd`, `vsub`, `vabsdiff`, `vmin`, `vmax`, `vshl`, `vshr`, `vmad`, `vset` |
| SIMD video instructions (9.7.20) | `vadd2`, `vsub2`, `vavrg2`, `vabsdiff2`, `vmin2`, `vmax2`, `vset2`, `vadd4`, `vsub4`, `vavrg4`, `vabsdiff4`, `vmin4`, `vmax4`, `vset4` |
| Miscellaneous instructions (9.7.21) | `brkpt`, `nanosleep`, `pmevent`, `trap`, `setmaxnreg`, `trace.mark` |

## Notes

- PTX ISA 9.5 — Chapter 9.7.20–9.7.21
- PTX ISA 9.5 addition `trace.mark` (9.7.21.6): creates and marks a performance-monitoring event whose record is a timestamp plus event information (`event-id`, 12 bits, an immediate in [0..4095], optionally followed by a 32-bit or 64-bit `payload` selected by `.payload_size = { .b32, .b64 }`). With `.cond` the event is generated only if `predicate` evaluates to True (and the guard predicate, if any, is True). The optional `event-label` selects the matching part of the module-level `.metadata_section` and must be declared with `.metadata_label` in exactly one `.metadata` element (see the `.metadata_section` directive in directives). Performance tools may overwrite `event-id` to ensure a unique value. Supported on family-specific `sm_107f` or higher in the same family.
- The `2`/`4` suffixed video instructions perform SIMD operations on two or four packed sub-word (byte/half-word) elements per operand, used for video/image processing kernels.
- `nanosleep` suspends a thread for an approximate number of nanoseconds; `trap`/`brkpt` raise a trap/breakpoint condition; `setmaxnreg` adjusts the maximum register count a warp may use (used with warp-specialization patterns).

## Related

- [instructions-arithmetic](./instructions-arithmetic.md)
- [instructions-sync-communication](./instructions-sync-communication.md)
