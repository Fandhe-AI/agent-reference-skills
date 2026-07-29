# Porting CUDA to HIP

Guide for migrating an existing CUDA C/C++ codebase to HIP so it builds and runs on AMD GPUs (and continues to build on NVIDIA GPUs via HIP's CUDA backend).

## Signature / Usage

```cpp
#ifdef __HIP_PLATFORM_AMD__
  // AMD-specific path
#endif
#ifdef __HIP_DEVICE_COMPILE__
  // device-compilation-pass-only logic, replaces CUDA's __CUDA_ARCH__
#endif
```

## Options / Props

| Aspect | Guidance |
| --- | --- |
| Workflow | Start from working CUDA code, convert incrementally, test each converted section before moving on |
| Automation | `hipify-clang` (robust, clang-based parsing) or `hipify-perl` (no CUDA install required); see `hipify.md` |
| `__HIP_PLATFORM_AMD__` | Macro identifying the AMD GPU platform build |
| `__HIP_DEVICE_COMPILE__` | Distinguishes the device compilation pass from host, replacing CUDA's `__CUDA_ARCH__` |
| Warp size | Never assume 32 or 64; AMD architectures vary (see `hardware-implementation.md`). Query `warpSize` at runtime; lane-mask bit operations may need 64-bit integers on 64-wide warps |
| Driver vs. runtime API | HIP consolidates CUDA's separate driver/runtime APIs; `hipCtx*`/`hipModule*` exist but are considered legacy for new code in favor of `hipSetDevice` and stream-based APIs |
| Compilation | Build with `amdclang++` or `hipcc`; `hipconfig` reports platform/compiler configuration; include `hip/hip_runtime.h` |

## Notes

- This is the AMD HIP porting entry point; for the mechanical CUDA↔HIP function name mapping see `cuda-to-hip-api-comparison.md`, and for the automated conversion tool see `hipify.md`. CUDA itself is covered by the separate `nvidia-cuda` skill.

## Related

- [cuda-to-hip-api-comparison.md](./cuda-to-hip-api-comparison.md)
- [hipify.md](./hipify.md)
- [hardware-implementation.md](./hardware-implementation.md)
