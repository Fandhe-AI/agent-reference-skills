# Complex Math API

Built-in complex number types and functions for single (float) and double precision, available on both host and device. A complex number is `z = x + yi`.

## Signature / Usage

```cpp
hipFloatComplex a = make_hipFloatComplex(1.0f, 2.0f);
hipFloatComplex b = make_hipFloatComplex(3.0f, -1.0f);
hipFloatComplex p = hipCmulf(a, b);   // (ac - bd) + (bc + ad)i
hipFloatComplex s = hipCaddf(p, a);
float re = hipCrealf(s);
float im = hipCimagf(s);
```

## Options / Props

Types:

| Type | Description |
| --- | --- |
| `hipFloatComplex` | Single-precision complex (`hipComplex` is an alias) |
| `hipDoubleComplex` | Double-precision complex |

Functions (single / double):

| Category | Single precision | Double precision |
| --- | --- | --- |
| Construction | `make_hipFloatComplex(float a, float b)` (alias `make_hipComplex`) | `make_hipDoubleComplex(double a, double b)` |
| Real part | `float hipCrealf(hipFloatComplex z)` | `double hipCreal(hipDoubleComplex z)` |
| Imaginary part | `float hipCimagf(hipFloatComplex z)` | `double hipCimag(hipDoubleComplex z)` |
| Add | `hipCaddf(p, q)` | `hipCadd(p, q)` |
| Subtract | `hipCsubf(p, q)` | `hipCsub(p, q)` |
| Multiply | `hipCmulf(p, q)` | `hipCmul(p, q)` |
| Divide | `hipCdivf(p, q)` | `hipCdiv(p, q)` |
| Fused multiply-add | `hipCfmaf(hipComplex p, hipComplex q, hipComplex r)` | `hipCfma(p, q, r)` |
| Conjugate | `hipConjf(z)` | `hipConj(z)` |
| Magnitude | `float hipCabsf(z)` | `double hipCabs(z)` |
| Squared magnitude | `float hipCsqabsf(z)` | `double hipCsqabs(z)` |

Conversion: `hipFloatComplex hipComplexDoubleToFloat(hipDoubleComplex z)`, `hipDoubleComplex hipComplexFloatToDouble(hipFloatComplex z)`.

## Notes

- Small vector constructors for `hipComplex` / `hipFloatComplex` initialization (like `float2`, `int4`) changed. Code that relied on a single value initializing all components of a vector or complex type may need updating.
- The official page includes a DFT kernel example (`computeDFT`) using `make_hipFloatComplex`, `hipCmulf`, and `hipCaddf`.
- Source: `rocm.docs.amd.com/projects/HIP/en/latest/reference/complex_math_api.html` (rocm-systems `projects/hip/docs`, commit `d2fcac49fed8c335ba363c1a560fd29feb71039a`).

## Related

- [math-api.md](./math-api.md)
- [low-precision-types.md](./low-precision-types.md)
