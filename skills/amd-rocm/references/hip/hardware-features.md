# Hardware Features by Architecture

Which HIP-visible hardware features are available depends on the target GPU architecture family (RDNA1-3 for Radeon, CDNA1-3 for Instinct).

## Signature / Usage

```cpp
hipDeviceProp_t prop;
hipGetDeviceProperties(&prop, deviceId);
// check prop.arch.* feature flags before using an architecture-specific feature
```

## Options / Props

| Feature | Support |
| --- | --- |
| Atomics on 32/64-bit integers (global/shared memory) | All architectures (RDNA1-3, CDNA1-3) |
| Warp vote functions, memory fences, sync functions, surface functions | All architectures |
| Float16 half-precision ops, packed 16-bit float math | All architectures |
| On-chip ECC | All architectures |
| 3D grid, up to 2^32-1 total threads | All architectures |
| Atomic floating-point add (32/64-bit, global/shared) | RDNA2+/CDNA2+ only |
| Bfloat16 | CDNA1+ and RDNA3 only |
| 8-bit floating-point types, TensorFloat32 | CDNA3 only |
| Packed 32-bit float math, Matrix Cores (MFMA) | CDNA1, CDNA2, CDNA3 only |
| Wavefront size | CDNA: 64-wide; RDNA: native 32-wide, with an experimental 64-wide (CU) mode |

## Notes

- Always check `hipDeviceProp_t`/`hipDeviceGetAttribute` at runtime rather than assuming a feature is present, since support varies by architecture generation (see `hardware-implementation.md`).
- Documented against HIP 7.14.x (ROCm 7.x), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-07.

## Related

- [hardware-implementation.md](./hardware-implementation.md)
- [cooperative-groups.md](./cooperative-groups.md)
- [math-api.md](./math-api.md)
