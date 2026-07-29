# Lazy Loading

Controls whether the CUDA driver JIT-loads modules and kernels only when first needed (`CU_MODULE_LAZY_LOADING`, the modern default) rather than eagerly at process/module load time, reducing application startup time and initial memory footprint.

## Signature / Usage

```c
#include <cuda.h>
#include <assert.h>
#include <iostream>

int main() {
    CUmoduleLoadingMode mode;
    assert(CUDA_SUCCESS == cuInit(0));
    assert(CUDA_SUCCESS == cuModuleGetLoadingMode(&mode));
    std::cout << "CUDA Module Loading Mode is "
              << ((mode == CU_MODULE_LAZY_LOADING) ? "lazy" : "eager") << std::endl;
    return 0;
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `CUDA_MODULE_LOADING` | Environment variable controlling loading mode (`LAZY` or `EAGER`) at process startup. |
| `cuModuleGetLoadingMode` | Driver API query returning the active `CUmoduleLoadingMode` (`CU_MODULE_LAZY_LOADING` or eager). |
| `cuModuleLoad` / `cuModuleGetFunction` | Driver API module/kernel loading calls whose actual work is deferred until first use under lazy loading. |
| `cudaFuncGetAttributes` | Runtime API call that forces a kernel to be loaded (since it needs the kernel's compiled attributes), usable to force eager loading of a specific kernel under lazy loading. |

## Notes

- Lazy loading requires a minimum CUDA Runtime and Driver version and specific compiler/kernel requirements — check the official page's requirements section before assuming it is active on a given toolkit/driver combination.
- Because kernels load on first use rather than at module load, the first launch of each kernel bears additional latency; this can distort naive performance measurements that don't account for one-time load cost.
- Lazy loading can affect concurrent kernel execution and large memory allocation timing since module loading itself consumes device memory and time at first-use rather than upfront.

## Related

- [A Tour of CUDA Features](../core/feature-survey.md)
- [The CUDA Driver API](../core/driver-api.md)
