# Precision Support

Data-type / precision support matrix for HIP C++ scalar types across CDNA1-4 and RDNA2-4 architectures. Use this to decide which reduced-precision types (fp8/fp6/fp4) are hardware-native on a given target before writing kernels or selecting a matrix-multiply library backend.

## Signature / Usage

```cpp
// Types are guarded by architecture in HIP headers; check support here before use
#include <hip/hip_fp8.h>
__hip_fp8_e4m3 x;  // native on CDNA4 (gfx950) and RDNA4 (gfx1201); not on CDNA3 (gfx942)
```

## Options / Props

| HIP C++ Type | CDNA1 | CDNA2 | CDNA3 | CDNA4 | RDNA2 | RDNA3 | RDNA4 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| int8_t, uint8_t | Y | Y | Y | Y | Y | Y | Y |
| int16_t, uint16_t | Y | Y | Y | Y | Y | Y | Y |
| int32_t, uint32_t | Y | Y | Y | Y | Y | Y | Y |
| int64_t, uint64_t | Y | Y | Y | Y | Y | Y | Y |
| `__hip_fp4_e2m1` | N | N | N | Y | N | N | N |
| `__hip_fp6_e2m3` | N | N | N | Y | N | N | N |
| `__hip_fp6_e3m2` | N | N | N | Y | N | N | N |
| `__hip_fp8_e4m3_fnuz` | N | N | Y | N | N | N | N |
| `__hip_fp8_e5m2_fnuz` | N | N | Y | N | N | N | N |
| `__hip_fp8_e4m3` | N | N | N | Y | N | N | Y |
| `__hip_fp8_e5m2` | N | N | N | Y | N | N | Y |
| half (float16) | Y | Y | Y | Y | Y | Y | Y |
| bfloat16 | Y | Y | Y | Y | Y | Y | Y |
| float (float32) | Y | Y | Y | Y | Y | Y | Y |
| double (float64) | Y | Y | Y | Y | Y | Y | Y |

## Notes

- CDNA3 (MI300 series) only supports the `_fnuz` (finite, no unsigned zero) fp8 variants; CDNA4 (MI350 series) switches to the standard `e4m3`/`e5m2` encodings and adds fp4/fp6, matching the newer OCP micro-scaling formats.
- RDNA4 is the first RDNA generation with native fp8 (`e4m3`/`e5m2`, non-`_fnuz`); RDNA2/RDNA3 have no native sub-8-bit or fp8 float type.
- Integer types (int8-int64) and the standard IEEE float types (fp16/bf16/fp32/fp64) are supported across every listed generation; only the reduced-precision fp4/fp6/fp8 matrix types vary.
- These are AMD CDNA/RDNA hardware precision terms and are distinct from NVIDIA's tensor-core precision set (e.g. TF32, per-SM FP8 support varies by NVIDIA compute capability).

## Related

- [cdna-architecture.md](./cdna-architecture.md)
- [mi300-microarchitecture.md](./mi300-microarchitecture.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
