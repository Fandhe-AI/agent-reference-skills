# Numerical Compliance

How Metal represents `half`/`bfloat`/`float` values with respect to IEEE 754 (INF/NaN/denormals, rounding modes, per-function ULP accuracy contracts under precise vs. `-ffast-math`, and integer/float conversion rules).

## Signature / Usage

```metal
// Selecting the accuracy variant at compile time:
//   -ffast-math          -> fast (relaxed) math variants, see Table 8.2
//   -fno-fast-math       -> precise (IEEE-754-conformant) variants, see Table 8.1
float y = precise::sin(x); // force the precise variant regardless of the compiler flag
```

## Options / Props

| Topic | Contract |
| --- | --- |
| INF / NaN | Required for `half`/`bfloat`/`float` with fast math disabled; with fast math enabled, NaN/INF handling as input or output is undefined. Signaling NaNs are unsupported |
| Denormals | Denormalized `half`/`bfloat`/`float` inputs or outputs of arithmetic may be flushed to zero; flushed sign is undefined |
| Rounding mode | Either round-ties-to-even or round-toward-zero may be used for `half`/`bfloat`/`float` arithmetic |
| Floating-point exceptions | Always disabled |
| Basic ops (`+ - * /`) | Correctly rounded for `half`/`bfloat`/`float`, precise or fast, except `1.0/x` and `x/y` in fast mode which relax to `<=1 ulp` / `<=2.5 ulp` for `float` (domain `2^-126..2^126`) and `<=0.6 ulp` for `bfloat` |
| Precise math functions (`-fno-fast-math`) | Most transcendentals `<=4 ulp` single-precision (`atan`/`atan2` up to 6 ulp, `pow`/`powr` up to 16 ulp); `half` precision tightens most to `<=1 ulp`; `ceil`/`floor`/`round`/`rint`/`trunc`/`fma`/`sqrt`/`ldexp`/`fract` are correctly rounded; `fabs`/`copysign`/`fmax`/`fmin`/`fmod`/`frexp`/`modf`/`ilogb`/`nextafter` are `0 ulp` |
| Fast math functions (`-ffast-math`, default) | Looser or reformulated contracts, e.g. `sin`/`cos`/`cospi`/`sinpi` bounded by absolute error `<=2^-13` in `[-pi,pi]`/`[-1,1]` (larger outside), `exp`/`exp2` `<=3+floor(|2x|) ulp`, `acosh`/`asinh`/`atanh`/`cosh`/`sinh`/`tanh`/`tan`/`log10`/`exp10` defined via explicit reformulations (e.g. `tanh(x) = (t-1)/(t+1)`, `t=exp(2x)`), `fmod` undefined |
| Flush-to-zero edge cases | A function may (1) return the conforming non-FTZ result, (2) flush a subnormal pre-rounding result to zero, (3) return a non-flushed result even if a subnormal operand was flushed, or (4) flush that result too; result sign is undefined whenever flushing occurs |
| Fast-math reassociation | The compiler may reassociate floating-point operations under `-ffast-math`, changing/ignoring signed-zero behavior, assuming no NaN/±INF, and altering underflow/overflow — code relying on exact patterns like `(x + 2^52) - 2^52` or ordered comparisons must disable fast math |
| Int ↔ float conversion | Float→int uses round-toward-zero; NaN→int converts to 0; int/float→float uses round-ties-to-even or round-toward-zero; `half`/`bfloat`→`float` is lossless, `float`→`half`/`bfloat` rounds ties-to-even (fast math does not change conversion accuracy) |
| Texture pixel conversion | Normalized integer↔float texture conversions guarantee `<=1.5 ulp` (exact endpoints, e.g. 8-bit unsigned `0 -> 0.0`, `255 -> 1.0`); texture coordinates passed to `sample`/`read`/`write`/`gather` must not be INF or NaN |

## Notes

- This page distills the precision *contracts* the `math-functions.md` family must satisfy; it does not re-list the functions themselves — see `math-functions.md` for the function catalogue.
- ULP tables here summarize representative rows rather than reproducing every entry of spec Tables 8.1-8.6; consult the official PDF (Version 4.1, section 8) for the complete per-function tables if exhaustive figures are needed.
- This numerical-compliance model applies uniformly across Apple GPU generations exposed through MSL; it is unrelated to the IEEE-754 compliance notes for CUDA/HIP device math covered by the separate `nvidia-cuda` / `amd-rocm` skills.

## Related

- [math-functions.md](./math-functions.md)
- [data-types.md](./data-types.md)
