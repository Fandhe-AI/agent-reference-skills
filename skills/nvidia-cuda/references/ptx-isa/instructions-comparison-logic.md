# Comparison, Selection, Logic and Shift Instructions

Comparison/selection, half-precision comparison, and logic/shift instructions (PTX ISA 9.4 §9.7.7–9.7.9).

## Signature / Usage

```ptx
setp.lt.s32  p|q, a, b;  // p = (a < b); q = !(a < b);
selp.u32 %r1,1,0,%p;    // convert predicate to 32-bit value
shl.b32  q,a,2;
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Comparison and selection (9.7.7) | `set`, `setp`, `selp`, `slct` |
| Half precision comparison (9.7.8) | `set`, `setp` (`.f16` / `.f16x2` variants) |
| Logic and shift (9.7.9) | `and`, `or`, `xor`, `not`, `cnot`, `lop3`, `shf`, `shl`, `shr` |

| Comparison suffix | Meaning |
| --- | --- |
| `.eq` / `.ne` | Equal / not equal |
| `.lt` / `.le` / `.gt` / `.ge` | Less-than / less-equal / greater-than / greater-equal |
| `.equ` / `.neu` / `.ltu` / `.leu` / `.gtu` / `.geu` | Unordered variants (for floating-point comparisons with NaN) |

## Notes

- PTX ISA 9.4 — Chapter 9.7.7–9.7.9
- PTX ISA 9.4: `set` gained the instruction types `.u8x4`, `.s8x4`, `.u16x2`, `.s16x2` (release notes wording: "Adds support for instruction types .u8x4, .s8x4, .u16x2, .s16x2 for set instruction"). Section numbers shifted by one from 9.3 because 9.4 inserted Alternate Floating-Point Instructions as 9.7.6.
- `setp` writes a predicate register; `set` writes an integer/float result; `selp` selects between two operands based on a predicate without branching.
- `lop3` performs an arbitrary three-input boolean function selected by an immediate lookup table.

## Related

- [instructions-arithmetic](./instructions-arithmetic.md)
- [instructions-control-flow](./instructions-control-flow.md)
