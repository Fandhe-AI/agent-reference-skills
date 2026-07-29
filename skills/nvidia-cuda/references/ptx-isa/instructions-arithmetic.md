# Arithmetic Instructions

Integer, extended-precision integer, floating-point, half-precision floating-point, and mixed-precision floating-point arithmetic instructions (PTX ISA 9.3 §9.7.1–9.7.5).

## Signature / Usage

```ptx
add.type1        d, a, b;
add.cc.type  d, a, b;
fma.rnd{.ftz}{.sat}.f32  d, a, b, c;
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Integer arithmetic (9.7.1) | `add`, `sub`, `mul`, `mad`, `clmad`, `mul24`, `mad24`, `sad`, `div`, `rem`, `abs`, `neg`, `min`, `max`, `popc`, `clz`, `bfind`, `fns`, `brev`, `bfe`, `bfi`, `szext`, `bmsk`, `dp4a`, `dp2a` |
| Extended-precision integer (9.7.2) | `add.cc`, `addc`, `sub.cc`, `subc`, `mad.cc`, `madc` |
| Floating-point (9.7.3) | `testp`, `copysign`, `add`, `sub`, `mul`, `fma`, `mad`, `div`, `abs`, `neg`, `min`, `max`, `rcp`, `sqrt`, `rsqrt`, `sin`, `cos`, `lg2`, `ex2`, `tanh` |
| Half precision floating-point (9.7.4) | `add`, `sub`, `mul`, `fma`, `neg`, `abs`, `min`, `max`, `tanh`, `ex2` (`.f16` / `.f16x2` / `.bf16`) |
| Mixed precision floating-point (9.7.5) | `add`, `sub`, `fma` |

| Modifier | Meaning |
| --- | --- |
| `.rn` / `.rz` / `.rm` / `.rp` | Rounding mode: nearest-even / toward-zero / toward -∞ / toward +∞ |
| `.sat` | Saturate result to the representable range |

## Notes

- PTX ISA 9.3 — Chapter 9.7.1–9.7.5
- Extended-precision instructions (`.cc` suffix, `addc`/`madc`) propagate a carry flag to implement multi-word arithmetic.

## Related

- [instructions-comparison-logic](./instructions-comparison-logic.md)
- [instruction-set-overview](./instruction-set-overview.md)
