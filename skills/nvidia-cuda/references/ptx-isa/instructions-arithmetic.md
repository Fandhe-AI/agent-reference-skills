# Arithmetic Instructions

Integer, extended-precision integer, floating-point, half-precision floating-point, and mixed-precision floating-point, and alternate floating-point (FP8 / FP6 / FP4) arithmetic instructions (PTX ISA 9.5 §9.7.1–9.7.6).

## Signature / Usage

```ptx
add.type1        d, a, b;
add.cc.type  d, a, b;
fma.rnd{.ftz}{.sat}.f32  d, a, b, c;
sin.approx{.2pi}{.ftz}.f32  d, a;
cos.approx{.2pi}{.ftz}.f32  d, a;

// Alternate floating-point (9.7.6, PTX ISA 9.4): four packed FP8/FP6/FP4 values per register
add{.rnd}{.satfinite}.cdtype.atype  d, a, c;      // .cdtype = { .e5m2x4, .e4m3x4 }; .rnd = { .rn }
// .atype = { .e5m2x4, .e4m3x4, .e3m2x4, .e2m3x4, .e2m1x4, .e2m1p4x4, .ue8m0x4 }
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Integer arithmetic (9.7.1) | `add`, `sub`, `mul`, `mad`, `clmad`, `mul24`, `mad24`, `sad`, `div`, `rem`, `abs`, `neg`, `min`, `max`, `popc`, `clz`, `bfind`, `fns`, `brev`, `bfe`, `bfi`, `szext`, `bmsk`, `dp4a`, `dp2a` |
| Extended-precision integer (9.7.2) | `add.cc`, `addc`, `sub.cc`, `subc`, `mad.cc`, `madc` |
| Floating-point (9.7.3) | `testp`, `copysign`, `add`, `sub`, `mul`, `fma`, `mad`, `div`, `abs`, `neg`, `min`, `max`, `rcp`, `sqrt`, `rsqrt`, `sin`, `cos`, `lg2`, `ex2`, `tanh` |
| Half precision floating-point (9.7.4) | `add`, `sub`, `mul`, `fma`, `neg`, `abs`, `min`, `max`, `tanh`, `ex2` (`.f16` / `.f16x2` / `.bf16`) |
| Mixed precision floating-point (9.7.5) | `add`, `sub`, `fma`, `mul` |
| Alternate floating-point (9.7.6) | `add`, `sub`, `mul`, `fma` on packed FP8 / FP6 / FP4 types (`.e5m2x4`, `.e4m3x4`, `.e3m2x4`, `.e2m3x4`, `.e2m1x4`, `.e2m1p4x4`, `.ue8m0x4`) |

| Modifier | Meaning |
| --- | --- |
| `.rn` / `.rz` / `.rm` / `.rp` | Rounding mode: nearest-even / toward-zero / toward -∞ / toward +∞ |
| `.sat` | Saturate result to the representable range |

## Notes

- PTX ISA 9.5 — Chapter 9.7.1–9.7.6
- PTX ISA 9.4 additions: `add` / `sub` / `mul` / `fma` now accept `.f16x2` / `.bf16x2` / `.f32x2` types and FP8/FP6/FP4 x4 packed types. Alternate floating-point (9.7.6) forms: `add{.rnd}{.satfinite}.cdtype.atype d, a, c;`, `sub` likewise, `mul{.rnd}{.satfinite}.dtype.atype.ctype d, a, c;` (`.dtype = { .e5m2x4, .e4m3x4 }`), `fma{.rnd}{.satfinite}.cdtype.atype.btype d, a, b, c;`; `.rnd = { .rn }`. Operands `d` and `c` are `.b32`; operand `a` is `.b16` when `.atype` is `.e2m1x4`, otherwise `.b32`. `.satfinite` clamps to the sign-preserved MAX_NORM of the destination format; without it an `.e4m3x4` result beyond range becomes NaN. Target: `sm_100a`, `sm_103a`.
- PTX ISA 9.5 additions: `sin` / `cos` accept the `.2pi` qualifier (support introduced in PTX ISA 9.5; supported on all target architectures). By default the input `a` is in radians; with `.2pi` it is interpreted in cycles, i.e. in a normalized domain where 1.0 represents one complete turn, and `.ftz` is required when `.2pi` is specified. Maximum absolute error with `.2pi` (cycles): `sin` 2^-20 over [-1 .. 1] and 2^-14.2 over [-50 .. +50]; `cos` 2^-19.9 and 2^-14.2 over the same ranges; outside [-50 .. +50] only best effort is provided. Examples: `sin.approx.2pi.ftz.f32  sb, b;` / `cos.approx.2pi.ftz.f32  cb, b;`.
- Extended-precision instructions (`.cc` suffix, `addc`/`madc`) propagate a carry flag to implement multi-word arithmetic.

## Related

- [instructions-comparison-logic](./instructions-comparison-logic.md)
- [instruction-set-overview](./instruction-set-overview.md)
