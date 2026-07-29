# CUDA Dynamic Parallelism

Lets a kernel running on the GPU launch new kernels (a "parent" grid launching "child" grids), instead of requiring all kernel launches to originate from host code, using the same `<<<>>>` syntax on the device (CDP2) or PTX-level `cudaLaunchDevice`/`cudaGetParameterBuffer` calls.

## Signature / Usage

```cuda
__global__ void childKernel() {
    printf("Hello ");
}

__global__ void parentKernel() {
    childKernel<<<1,1>>>();
    if (cudaSuccess != cudaGetLastError()) {
        return;
    }
}

int main(int argc, char *argv[]) {
    parentKernel<<<1,1>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `<<<>>>` (device-side) | Same triple-angle-bracket launch syntax as host code, usable from within a `__global__` function under CDP. |
| `cudaStreamFireAndForget` | Special stream for child launches with no ordering guarantee relative to the parent's completion. |
| `cudaStreamTailLaunch` | Special stream guaranteeing the child launch runs only after the parent grid (and its descendants) fully complete. |
| `cudaGetLastError()` | Device-side error check after a nested launch, same signature as the host-side call. |
| `cudaDeviceGetAttribute()` | Device-side attribute query; used instead of `cudaGetDeviceProperties` which is host-only. |
| `cudaDeviceSetLimit` with `cudaLimitDevRuntimePendingLaunchCount` | Configures how many pending child-grid launches the device runtime can buffer before blocking. |
| `cudaLaunchDevice()` / `cudaGetParameterBuffer()` | PTX-level device-side launch API underlying the `<<<>>>` syntax, for cases needing manual parameter buffer construction. |
| `__isGlobal()` | Intrinsic to check whether a pointer references global memory, relevant since local/shared memory pointers are not valid across parent/child grid boundaries. |

## Notes

- Memory scope rules for parent/child grids: global and mapped memory pointers are shared and valid across the boundary; local and shared memory pointers are not — passing a pointer to a parent's local or shared memory into a child kernel is undefined behavior. Texture memory is shared read-only.
- `cudaDeviceSynchronize()` from device code was part of legacy CDP1 and is removed in CDP2 — use `cudaStreamTailLaunch` for the "wait for child to finish before continuing" pattern instead.
- `cudaSetDevice()` is not supported in the device runtime; a kernel cannot change which device it is running on.
- Nested-launch overhead and pending-launch-count limits (`cudaLimitDevRuntimePendingLaunchCount`) should be considered for kernels that launch large numbers of children, since the device runtime buffers pending launches up to that limit before blocking.

## Related

- [A Tour of CUDA Features](../core/feature-survey.md)
- [CUDA Graphs](./cuda-graphs.md)
