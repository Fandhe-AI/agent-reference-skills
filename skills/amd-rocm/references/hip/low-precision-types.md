# Low Precision Floating Point Types

HIP types and conversion functions for FP4, FP6, FP8, float16, and bfloat16, plus `gfx950` microscaling extensions (hipExt, `__amd_*` C APIs).

## Signature / Usage

```cpp
#include <hip/hip_fp8.h>

__hip_fp8_storage_t convert_float_to_fp8(
  float in, /* Input val */
  __hip_fp8_interpretation_t interpret, /* interpretation of number E4M3/E5M2 */
  __hip_saturation_t sat /* Saturation behavior */
  ) {
  return __hip_cvt_float_to_fp8(in, sat, interpret);
}
```

C++ style classes:

```cpp
__hip_fp8_e4m3 fp8_val(1.1f);
__hip_fp8_e4m3_fnuz fp8_val_fnuz(1.1f); // gfx94x
```

## Options / Props

| Format | Header | Layout (sign / exponent / mantissa) | Classes | Vector types |
| --- | --- | --- | --- | --- |
| FP4 E2M1 | `hip/hip_fp4.h` | 1 / 2 / 1 | `__hip_fp4_e2m1` | `__hip_fp4x2_e2m1`, `__hip_fp4x4_e2m1` |
| FP6 E3M2 | `hip/hip_fp6.h` | 1 / 3 / 2 | `__hip_fp6_e3m2` | `__hip_fp6x2_e3m2`, `__hip_fp6x4_e3m2` |
| FP6 E2M3 | `hip/hip_fp6.h` | 1 / 2 / 3 | `__hip_fp6_e2m3` | `__hip_fp6x2_e2m3`, `__hip_fp6x4_e2m3` |
| FP8 E4M3 | `hip/hip_fp8.h` | 1 / 4 / 3 | `__hip_fp8_e4m3`, `__hip_fp8_e4m3_fnuz` | `__hip_fp8x2_e4m3`, `__hip_fp8x4_e4m3` (and `_fnuz`) |
| FP8 E5M2 | `hip/hip_fp8.h` | 1 / 5 / 2 | `__hip_fp8_e5m2`, `__hip_fp8_e5m2_fnuz` | `__hip_fp8x2_e5m2`, `__hip_fp8x4_e5m2` (and `_fnuz`) |
| float16 | `hip/hip_fp16.h` | 1 / 5 / 10 | `__half` | `__half2` |
| bfloat16 | `hip/hip_bf16.h` | 1 / 8 / 7 | `__hip_bfloat16` | `__hip_bfloat162` |

Hardware support (native acceleration):

| Device | FP4 E2M1 | FP6 (E3M2 / E2M3) | FP8 FNUZ | FP8 OCP |
| --- | --- | --- | --- | --- |
| CDNA1 / CDNA2 | No | No | No | No |
| CDNA3 | No | No | Yes | No |
| CDNA4 | Yes | Yes | No | Yes |
| RDNA2 / RDNA3 | No | No | No | No |
| RDNA4 | No | No | No | Yes |

float16 and bfloat16 are supported on all GPU architectures.

Conversion functions shown on the page:

| Function | Description |
| --- | --- |
| `__hip_cvt_float_to_fp4(in, __HIP_E2M1, sat)` | float to FP4 |
| `__hip_cvt_fp4_to_halfraw(fp4, __HIP_E2M1)` | FP4 to half |
| `__hip_cvt_float_to_fp6(in, interpret, sat)` | float to FP6 (`__HIP_E2M3` / `__HIP_E3M2`) |
| `__hip_cvt_fp6_to_halfraw(fp6, interpret)` | FP6 to half |
| `__hip_cvt_float_to_fp8(in, sat, interpret)` | float to FP8 |
| `__hip_cvt_fp8_to_float(in, interpret)` / `__hip_cvt_fp8_to_halfraw(in, interpret)` | FP8 to float / half |
| `__float2half` / `__half2float` | float16 conversion |
| `__float2bfloat16` / `__bfloat162float` | bfloat16 conversion |

hipExt microscaling storage types (selection): `__amd_scale_t` (E8M0), `__amd_fp8_storage_t`, `__amd_fp8x2_storage_t`, `__amd_fp8x8_storage_t`, `__amd_fp4x2_storage_t`, `__amd_fp4x8_storage_t`, `__amd_bf16_storage_t`, `__amd_bf16x2_storage_t`, `__amd_bf16x8_storage_t`, `__amd_bf16x32_storage_t`, `__amd_fp16_storage_t`, `__amd_fp16x2_storage_t`, `__amd_fp16x8_storage_t`, `__amd_fp16x32_storage_t`, `__amd_floatx2_storage_t`, `__amd_floatx8_storage_t`, `__amd_floatx16_storage_t`, `__amd_floatx32_storage_t`, `__amd_fp6x32_storage_t`, `__amd_shortx2_storage_t`.

C API naming: all names start with `__amd`, `_` separates parts, `cvt` converts formats, `sr` means stochastic rounding (takes a seed), `scale` applies the `__amd_scale_t` input, `create` builds composite types, `extract` pulls values out of composites. Example:

```cpp
float __amd_cvt_fp8_to_float(const __amd_fp8_storage_t, const __amd_fp8_interpretation_t);
__amd_fp8_storage_t __amd_cvt_float_to_fp8_sr(const float, const __amd_fp8_interpretation_t, const unsigned int /* sr seed */);
```

C++ hipExt structs (exclusive to `gfx950`): `__hipext_ocp_fp8_e4m3`, `__hipext_ocp_fp8_e5m2`, `__hipext_ocp_fp8x2_e4m3`, `__hipext_ocp_fp8x2_e5m2`, `__hipext_ocp_fp6x32_e2m3`, `__hipext_ocp_fp6x32_e3m2`, `__hipext_ocp_fp4x2_e2m1`, with constructors taking optional stochastic-rounding seed and `__amd_scale_t`, and `get_scaled_*` getters.

## Notes

- FP8-FNUZ supports only finite and NaN values (no Inf), gaining one extra exponent value; NaN is sign bit set with all other bits zero. FNUZ classes are available on gfx94x only; on a gfx94x GPU the type defaults to FNUZ.
- FP8-OCP follows the Open Compute Project 8-bit floating point specification.
- The official FP4 / FP6 round-trip examples check `gcnArchName` for `gfx950`; the FP8 example accepts gfx94 / gfx950 / gfx12.
- hipExt APIs are 1:1 mappings of hardware instructions where possible; `gfx950` provides hardware acceleration.
- The official page lists the full `__amd_cvt_*` C API table; consult it for specific format pairs rather than inferring names.
- Source: `rocm.docs.amd.com/projects/HIP/en/latest/reference/low_fp_types.html` (rocm-systems `projects/hip/docs`, commit `d2fcac49fed8c335ba363c1a560fd29feb71039a`). Headers live in ROCm/clr `hipamd/include/hip/amd_detail/amd_hip_{fp4,fp6,fp8,fp16,bf16}.h`.

## Related

- [math-api.md](./math-api.md)
- [complex-math-api.md](./complex-math-api.md)
- [hardware-features.md](./hardware-features.md)
