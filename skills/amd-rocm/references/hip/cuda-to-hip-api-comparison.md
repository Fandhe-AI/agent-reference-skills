# CUDA to HIP API Function Comparison

Direct name mapping between CUDA runtime API symbols and their HIP equivalents; the `cuda` prefix maps to `hip` with the same suffix in the common case.

## Signature / Usage

```cpp
// #include <cuda_runtime.h>   ->
#include <hip/hip_runtime.h>
```

## Options / Props

| CUDA | HIP |
| --- | --- |
| `#include <cuda_runtime.h>` | `#include <hip/hip_runtime.h>` |
| `cudaError_t` | `hipError_t` |
| `cudaEvent_t` | `hipEvent_t` |
| `cudaStream_t` | `hipStream_t` |
| `cudaMalloc` | `hipMalloc` |
| `cudaFree` | `hipFree` |
| `cudaStreamCreateWithFlags` | `hipStreamCreateWithFlags` |
| `cudaStreamNonBlocking` | `hipStreamNonBlocking` |
| `cudaStreamDestroy` | `hipStreamDestroy` |
| `cudaEventCreate` | `hipEventCreate` |
| `cudaEventRecord` | `hipEventRecord` |
| `cudaEventSynchronize` | `hipEventSynchronize` |
| `cudaEventElapsedTime` | `hipEventElapsedTime` |
| `cudaEventDestroy` | `hipEventDestroy` |
| `cudaMemcpyAsync` | `hipMemcpyAsync` |
| `cudaMemcpyHostToDevice` | `hipMemcpyHostToDevice` |

## Notes

- This page covers the mechanical 1:1 symbol renaming for common runtime API surface only; not every CUDA API has a HIP equivalent, and some HIP APIs behave differently at the margins (e.g. warp size, driver/runtime API split) — see `porting-cuda-to-hip.md`.
- `hipify-clang`/`hipify-perl` automate this renaming across a whole codebase; see `hipify.md` for the tool itself and its own supported-API tables for library-level (cuBLAS/cuSPARSE/cuFFT/...) coverage.
- CUDA itself is covered by the separate `nvidia-cuda` skill; this page only documents the HIP-side name.

## Related

- [porting-cuda-to-hip.md](./porting-cuda-to-hip.md)
- [hipify.md](./hipify.md)
