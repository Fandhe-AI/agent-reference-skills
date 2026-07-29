# Math Functions

The Metal Standard Library's common, integer, relational, math, and geometric function families (`<metal_common>`, `<metal_integer>`, `<metal_relational>`, `<metal_math>`, `<metal_geometric>`), plus the `metal::fast` / `metal::precise` namespaces that pick between the two accuracy variants.

## Signature / Usage

```metal
float a = sin(x);          // fast or precise, depending on -ffast-math
float b = fast::sin(x);    // explicit fast variant
float c = precise::cos(x); // explicit precise variant
```

## Options / Props

| Header / family | Representative functions | Description |
| --- | --- | --- |
| `<metal_common>` | `clamp`, `mix`, `saturate`, `sign`, `smoothstep`, `step` | Generic scalar/vector `half`/`float` helpers; `clamp` and `saturate` have `fast`/`precise` variants (differ only in NaN handling) |
| `<metal_integer>` | `abs`, `absdiff`, `addsat`/`subsat`, `clamp`, `clz`/`ctz`, `hadd`/`rhadd`, `mad24`/`mul24`, `madsat`, `max`/`min`/`max3`/`min3`/`median3`, `popcount`, `reverse_bits`, `rotate`, `extract_bits`/`insert_bits`, `interleave`/`deinterleave` (4.1+) | Integer scalar/vector arithmetic and bit manipulation; `mad24`/`mul24` operate correctly only on 24-bit-range operands |
| `<metal_relational>` | `all`, `any`, `isfinite`, `isinf`, `isnan`, `isnormal`, `isordered`, `isunordered`, `not`, `select`, `signbit` | Componentwise / scalar boolean tests and selection over floating-point or boolean vectors |
| `<metal_math>` | `sin`/`cos`/`tan`/`asin`/`acos`/`atan`/`atan2`, `sinh`/`cosh`/`tanh` + inverses, `sinpi`/`cospi`/`tanpi`, `exp`/`exp2`/`exp10`/`log`/`log2`/`log10`, `pow`/`powr`, `sqrt`/`rsqrt`, `ceil`/`floor`/`round`/`rint`/`trunc`/`fract`, `fma`, `fmax`/`fmin`/`fmax3`/`fmin3`/`fmedian3`, `fmod`, `fdim`, `frexp`/`ldexp`/`ilogb`, `modf`, `nextafter` (3.1+), `copysign` | Full transcendental/rounding/decomposition library over `half`/`float`; most have `fast`/`precise` variants selectable via `-ffast-math` or the `metal::fast`/`metal::precise` namespaces; symbolic constants `MAXFLOAT`/`M_PI_F`/... and `half`/`bfloat` equivalents in `<metal_math>` |
| `<metal_matrix>` | `determinant(floatnxn\|halfnxn)`, `transpose(floatnxm\|halfnxm)` | Square-matrix determinant and matrix transpose |
| `<metal_geometric>` | `cross`, `dot`, `distance`/`distance_squared`, `length`/`length_squared`, `normalize`, `faceforward`, `reflect`, `refract` | Vector-geometry ops over `floatn`/`halfn`; `distance`/`length`/`normalize` have `fast`/`precise` variants |

## Notes

- Precision contracts (ULP tables, `-ffast-math` accuracy deltas) are summarized separately in `numerical-compliance.md` rather than repeated per function here.
- This is the `.metal`-source standard library (`metal::` namespace); it is not a host Metal framework API, and it is a different symbol set from the CUDA/HIP math intrinsics (`__sinf`, `hip::fast_math`) documented in the `nvidia-cuda` / `amd-rocm` skills.
- SIMD-group/quad-group reduction functions (`simd_sum`, `quad_max`, ...) look similar to reductions but operate across threads, not across a single thread's data — see `simdgroup-functions.md`.

## Related

- [numerical-compliance.md](./numerical-compliance.md)
- [data-types.md](./data-types.md)
- [simdgroup-functions.md](./simdgroup-functions.md)
