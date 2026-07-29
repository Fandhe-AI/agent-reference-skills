# Execution Control and Kernel Launch

Functions for launching kernels (beyond the `<<<>>>` syntax) and querying/setting per-function launch attributes.

## Signature / Usage

```cpp
void* args[] = { &a, &b };
hipModuleLaunchKernel(function, gridX, gridY, gridZ, blockX, blockY, blockZ,
                       sharedMemBytes, stream, args, nullptr);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipLaunchKernelEx` | Launches a kernel using a specified launch configuration structure; forwards kernel arguments variadically |
| `hipExtLaunchKernel` | Launches a kernel from a function pointer, with arguments and shared memory, on a stream |
| `hipExtLaunchKernelGGL` | Templated launcher accepting grid/block dimensions, shared memory, stream, and variadic kernel arguments |
| `hipExtLaunchMultiKernelMultiDevice` | Launches kernels across multiple devices, guaranteeing all listed kernels dispatch on their respective streams before any other enqueued work runs |
| `hipModuleLaunchKernel` | Standard driver-API kernel launch with explicit grid/block dimensions and parameter array |
| `hipExtModuleLaunchKernel` | Driver-API launch with explicit grid/block/shared-memory and optional event-based timing |
| `hipHccModuleLaunchKernel` | Legacy launch function; superseded by `hipExtModuleLaunchKernel` |
| `hipLaunchKernelExC` | Like `hipLaunchKernelEx` but accepts a generic function pointer |
| `hipDrvLaunchKernelEx` | Driver-API launcher using HIP function objects with a configuration structure |
| `hipFuncSetAttribute` / `hipFuncGetAttribute` / `hipFuncGetAttributes` | Set/query function-level launch attributes |
| `hipFuncSetCacheConfig` / `hipFuncSetSharedMemConfig` | Configure per-function cache/shared-memory behavior |
| `hipKernelSetAttribute` / `hipKernelGetFunction` | Manage kernel-specific settings and retrieve a function handle |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Prefer `hipExtModuleLaunchKernel` over the legacy `hipHccModuleLaunchKernel`.

## Related

- [module-context-management.md](./module-context-management.md)
- [occupancy.md](./occupancy.md)
- [programming-model.md](./programming-model.md)
