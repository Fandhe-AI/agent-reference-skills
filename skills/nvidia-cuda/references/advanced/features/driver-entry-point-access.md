# Driver Entry Point Access

Retrieves function pointers to CUDA Driver and Runtime API entry points at runtime (`cuGetProcAddress` / `cudaGetDriverEntryPointByVersion`), decoupling an application's minimum required driver version from the driver version it was linked against — useful for accessing newer API versions or per-thread-default-stream variants without a hard link-time dependency.

## Signature / Usage

```c
#include <cudaTypedefs.h>

PFN_cuStreamBeginCapture_v10010 pfn_cuStreamBeginCapture_v2;
CUdriverProcAddressQueryResult driverStatus;
cuGetProcAddress("cuStreamBeginCapture", &pfn_cuStreamBeginCapture_v2,
                 10010, CU_GET_PROC_ADDRESS_DEFAULT, &driverStatus);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cuGetProcAddress` | Driver API: retrieves a versioned function pointer for a named driver entry point (e.g. `cuStreamBeginCapture`), given a requested API version and flags. |
| `cudaGetDriverEntryPointByVersion` | Runtime API equivalent for retrieving driver entry points by version. |
| `cuDriverGetVersion` | Retrieves the currently installed driver's version, to check compatibility before requesting a specific entry-point version. |
| `CUdriverProcAddressQueryResult` | Status type reporting why a `cuGetProcAddress` lookup succeeded, fell back, or failed. |
| `cuStreamBeginCapture` / `cuStreamBeginCapture_v2`, `cuMemAllocAsync`, `cuLaunchKernel` / `cuLaunchKernel_ptsz` | Example entry points commonly retrieved this way, including per-thread-default-stream (`_ptsz`) variants. |
| `cuDeviceGetUuid` / `cuDeviceGetExecAffinitySupport` | Further example entry points retrievable via this mechanism. |
| Typedef headers `cudaTypedefs.h` / `cudaGLTypedefs.h` / `cudaProfilerTypedefs.h` | Provide the `PFN_*` function pointer typedefs matching `cuda.h` / `cudaGL.h` / `cudaProfiler.h` respectively. |

## Notes

- Requesting a specific API version via `cuGetProcAddress` lets an application built against an older CUDA Toolkit still opt into a newer driver entry point's behavior at runtime, without recompiling against the newer header.
- `_ptsz` (per-thread default stream) suffixed variants (e.g. `cuLaunchKernel_ptsz`) are retrievable through this mechanism and are relevant when an application is compiled with `--default-stream per-thread`.
- Check `CUdriverProcAddressQueryResult` to distinguish an exact-version match from a fallback to an older/newer compatible version, or an outright failure (e.g. driver too old for the requested version).

## Related

- [The CUDA Driver API](../core/driver-api.md)
- [A Tour of CUDA Features](../core/feature-survey.md)
