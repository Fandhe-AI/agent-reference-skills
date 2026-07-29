# Math API

Device-callable math functions grouped into standard (accuracy-prioritized) functions, fast-but-lower-precision intrinsics, and integer bit-manipulation intrinsics.

## Signature / Usage

```cpp
__global__ void kernel(float* out, float x) {
    out[0] = sinf(x);     // standard, higher precision
    out[1] = __sinf(x);   // intrinsic, faster/lower precision
    out[2] = __popc(0xFF);
}
```

## Options / Props

| Category | Examples | Notes |
| --- | --- | --- |
| Standard functions | `sinf()`, `cosf()`, `sqrtf()`, `logf()`, `fma()`, `fabs()`, `isnan()`, `isinf()`, `copysign()`, `frexp()`, `ldexp()`, `hypot()`, `pow()` | Prioritize accuracy; most achieve 0-2 ULP error versus the C++ standard library |
| Fast intrinsics | `__sinf()`, `__cosf()`, `__expf()` | Device-only fast approximations trading precision for speed; ~1-18 ULP error depending on the operation |
| Integer intrinsics | `__clz()` (count leading zeros), `__popc()` (population count), `__funnelshift_l()` | Bit-manipulation and specialized integer operations |

## Notes

- ULP (units in the last place) is the absolute difference between a HIP math function's result and the corresponding standard-library function's result; check the official per-function ULP table before relying on an intrinsic in numerically sensitive code.
- Documented against HIP 7.14.x (ROCm 7.x), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-07.

## Related

- [cpp-language-extensions.md](./cpp-language-extensions.md)
- [kernel-language-cpp-support.md](./kernel-language-cpp-support.md)
