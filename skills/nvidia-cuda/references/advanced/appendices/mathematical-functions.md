# Floating-Point Computation

CUDA's floating-point behavior (IEEE-754 compliance, subnormals, FMA, rounding) and the CUDA C++ Mathematical Standard Library's per-function ULP error bounds across `float`, `double`, half, bfloat16, and quad precision, plus faster/less-accurate device-only intrinsic equivalents.

## Signature / Usage

```
x = 1.0008
x^2 - 1 = 1.60064e-4               (true value)
rn(x^2 - 1) = 1.6006e-4            (single rounding, fused multiply-add)
rn(rn(x^2) - 1) = 1.6000e-4        (two roundings, separate multiply then add)
```

## Options / Props

| Function category | Examples | Typical max ULP error |
| --- | --- | --- |
| Basic Operations | `fabs`, `fmod`, `remainder`, `remquo`, `fma`, `fmax`, `fmin`, `fdim`, `nan` | 0 |
| Exponential Functions | `exp`, `exp2`, `expm1`, `log`, `log10`, `log2`, `log1p` | 0-2 (float), 1 (double) |
| Power Functions | `pow`, `sqrt`, `cbrt`, `hypot` | 4/0/1/3 (float), 2/0/1/2 (double) |
| Trigonometric | `sin`, `cos`, `tan`, inverse variants | 2-4 (float/double) |
| Hyperbolic | `sinh`, `cosh`, `tanh`, `asinh`, `acosh`, `atanh` | 1-4 depending on function/type |
| Error and Gamma Functions | `erf`, `erfc`, `tgamma`, `lgamma` | 2-10 |
| Nearest Integer Operations | `ceil`, `floor`, `trunc`, `round`, `rint` | 0 |
| Floating-Point Manipulation | `frexp`, `ldexp`, `modf`, `scalbn`, `ilogb`, `logb`, `nextafter`, `copysign` | 0 |
| Classification and Comparison | `isfinite`, `isinf`, `isnan`, `signbit` | 0 |

### Single-precision-only intrinsics added in CPG 13.5

| Function | Computes | Error |
| --- | --- | --- |
| `__sin2pif(x)` | sin(2πx) | 2^-20 abs error for x in [-1, 1]; larger otherwise |
| `__cos2pif(x)` | cos(2πx) | 2^-19.9 abs error for x in [-1, 1]; larger otherwise |
| `__sincos2pif(x, sptr, cptr)` | sin(2πx), cos(2πx) | Component-wise, the same as `__sin2pif(x)` and `__cos2pif(x)` |

## Notes

- CUDA supports five floating-point types with varying IEEE-754 compliance and hardware requirements: bfloat16, half precision (`__half`), single precision (`float`), double precision (`double`), and quad precision (`__float128`/`_Float128`).
- FMA (fused multiply-add) computes `a*b+c` with a single rounding step instead of two, improving accuracy for expressions like `x^2 - 1` — see the worked example above.
- Device-only intrinsic math functions (e.g. `__expf`, `__sinf`) trade accuracy for a single-instruction, lower-latency implementation compared to the standard CUDA Math API functions (`exp`, `sin`, etc.), which are available on both host and device with documented ULP error bounds.
- The ULP error bounds above are representative examples per category; consult the official page's full per-function tables (Tables 53-61 in CPG v13.5) for exact bounds on a specific function and precision.
- Section numbering: since CPG 13.5 this appendix is Section 5.6 (Section 5.5 is Improving CUDA Compilation Time).
- Source: https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/mathematical-functions.html (CPG v13.5, retrieved 2026-11-14)

## Related

- [C++ Language Support](./cpp-language-support.md)
- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
- [Improving CUDA Compilation Time](./compile-time.md)
