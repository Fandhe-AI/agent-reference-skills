# Compute Capabilities

Per-architecture hardware limits (max resident threads/warps/blocks per SM, shared memory size, FP32:FP64 throughput ratio) indexed by compute capability, plus how to query a device's compute capability and how feature availability maps to architecture- vs. family-specific compute capabilities.

## Signature / Usage

```c
cudaDeviceProp prop;
cudaGetDeviceProperties(&prop, device);
int major = prop.major;
int minor = prop.minor;
// compute capability is major.minor, e.g. 9.0
```

Runtime query with the CUDA C++ Standard Library (libcu++) (new in CPG 13.5):

```cpp
#include <cuda/devices>
int computeCapabilityMajor = cuda::device_attributes::compute_capability_major(device_id);
int computeCapabilityMinor = cuda::device_attributes::compute_capability_minor(device_id);
// single driver call
cuda::compute_capability computeCapability = cuda::device_attributes::compute_capability(device_id);
computeCapabilityMajor                     = computeCapability.major_cap();
computeCapabilityMinor                     = computeCapability.minor_cap();
```

Architecture traits (`<cuda/devices>`, CPG 5.1.3.1 "Retrieve Features and Technical Specifications"):

```cpp
#include <cuda/devices>
#include <cuda_runtime.h>
#include <cstdio>
#include <cstdlib>
#include <exception>

int main() {
    int device_count;
    cudaError_t status = cudaGetDeviceCount(&device_count);
    if (status != cudaSuccess) {
        std::printf("CUDA error: %s\n", cudaGetErrorString(status));
        return EXIT_FAILURE;
    }
    try {
        for (int device = 0; device < device_count; ++device) {
            auto compute_capability = cuda::device_attributes::compute_capability(device);
            auto traits             = cuda::arch_traits_for(compute_capability);
            std::printf("Device %d, compute capability %d.%d\n",
                        device, traits.compute_capability_major,
                        traits.compute_capability_minor);
            std::printf("  max_shared_memory_per_block_optin: %zu bytes\n",
                        traits.max_shared_memory_per_block_optin);
            std::printf("  total_constant_memory:             %zu bytes\n",
                        traits.total_constant_memory);
            std::printf("  max_blocks_per_multiprocessor:     %d\n",
                        traits.max_blocks_per_multiprocessor);
        }
    } catch (const std::exception& e) {
        // CCCL device queries and architecture traits lookup can throw.
        std::printf("%s\n", e.what());
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}
```

## Options / Props

| Specification | 7.5 | 8.0 | 8.6 | 8.7 | 8.9 | 9.0 | 10.0 | 10.3 | 10.7 | 11.0 | 12.x |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FP32 to FP64 Throughput Ratio | 32:1 | 2:1 | 64:1 | 64:1 | 64:1 | 2:1 | 2:1 | 64:1 | 4:1 | 64:1 | 64:1 |
| Max Resident Blocks per SM | 16 | 32 | 16 | 16 | 24 | 32 | 32 | 32 | 16 | 24 | 24 |
| Max Resident Warps per SM | 32 | 64 | 48 | 48 | 48 | 64 | 64 | 64 | 32 | 48 | 48 |
| Max Resident Threads per SM | 1024 | 2048 | 1536 | 1536 | 1536 | 2048 | 2048 | 2048 | 1024 | 1536 | 1536 |
| Max Shared Memory per SM | 64 KB | 164 KB | 100 KB | 164 KB | 100 KB | 228 KB | 228 KB | 228 KB | 328 KB | 228 KB | 100 KB |
| Max Shared Memory per Block | 64 KB | 163 KB | 99 KB | 163 KB | 99 KB | 227 KB | 227 KB | 227 KB | 327 KB | 227 KB | 99 KB |
| Green contexts: min SM partition size (useFlags 0) | 2 | 4 | 4 | 4 | 4 | 8 | 8 | 8 | 8 | 8 | 8 |
| Green contexts: SM co-scheduled alignment (useFlags 0) | 2 | 2 | 2 | 2 | 2 | 8 | 8 | 8 | 8 | 8 | 8 |

Unified data cache and shared-memory carveout sizes for CC 10.7 (CPG 13.4): unified data cache 336 KB; SMEM capacity sizes 0, 8, 16, 32, 64, 100, 132, 164, 196, 228, 328 KB (CC 10.0 / 10.3 / 11.0: 256 KB cache, same list without 328). Tensor Core input types for CC 10.7: FP64, TF32, BF16, FP16, FP8, FP6, FP4 (not INT8 or INT4). Family-specific targets: `compute_100f` is compatible with CC 10.0, 10.3, and 10.7; `compute_103f` with 10.3 and 10.7; `compute_107f` with 10.7 only.

### cuda::arch_traits_t fields (CPG 13.5)

`<cuda/devices>` provides `cuda::arch_traits<sm_id>()` (architecture fixed at compile time), `cuda::arch_traits_for(sm_id)` (architecture specified at run time) and `cuda::device::current_arch_traits()` (architecture the code is being compiled for; device code only). `sm_id` is an enumerator of the form `cuda::arch_id::sm_XY`, where `XY` is the major and minor versions of the compute capability. Architecture traits describe limits and features common to all devices of a GPU architecture; properties of a particular device (for example the number of SMs or the clock frequency) come from `cuda::device_attributes`.

| Specification / feature | `cuda::arch_traits_t` field |
| --- | --- |
| Warp reduce functions | `redux_intrinsic` |
| Hardware-accelerated `memcpy_async` (Pipelines) | `cp_async_supported` |
| Thread Block Cluster | `cluster_supported` |
| Tensor Memory Accelerator (TMA) unit | `tma_supported` |
| Maximum number of resident grids per device | `max_resident_grids` |
| Maximum x-dimension of a grid | `max_grid_dim_x` |
| Maximum y- or z-dimension of a grid | `max_grid_dim_y`, `max_grid_dim_z` |
| Maximum x- or y-dimensionality of a thread block | `max_block_dim_x`, `max_block_dim_y` |
| Maximum z-dimension of a thread block | `max_block_dim_z` |
| Maximum number of threads per block | `max_threads_per_block` |
| Warp size | `warp_size` |
| Maximum number of resident blocks per SM | `max_blocks_per_multiprocessor` |
| Maximum number of resident warps per SM | `max_warps_per_multiprocessor` |
| Maximum number of resident threads per SM | `max_threads_per_multiprocessor` |
| Number of 32-bit registers per SM | `max_registers_per_multiprocessor` |
| Maximum number of 32-bit registers per thread block | `max_registers_per_block` |
| Maximum number of 32-bit registers per thread | `max_registers_per_thread` |
| Maximum amount of shared memory per SM | `max_shared_memory_per_multiprocessor` |
| Maximum amount of shared memory per thread block, with explicit opt-in | `max_shared_memory_per_block_optin` |
| Maximum amount of shared memory per thread block, without opt-in (48 KB) | `max_shared_memory_per_block` |
| Constant memory size | `total_constant_memory` |

## Notes

- Compute capability has two components: architecture-specific features (require an exact major.minor match or higher within a family) and family-specific features (available across a whole family of compute capabilities regardless of minor version).
- The table above is a subset of the official page's specification tables, covering compute capabilities 7.5, 8.0, 8.6, 8.7, 8.9, 9.0, 10.0, 10.3, 10.7, 11.0, and 12.x (the full tables add grid/block limits, registers, local/constant/texture memory, etc.); consult the official page for the complete matrix.
- Correction (CPG 13.4.2, read from the HTML table with its `colspan` cells): earlier revisions of this page's table had shifted columns for several rows (e.g. FP32:FP64 for 10.0 and 12.x, resident blocks per SM for 8.9 / 9.0 / 12.x, shared memory per SM for 12.x); the table above follows the 13.4.2 HTML.
- CC 10.7: kernels using the 328 KB shared-memory configuration must explicitly enable `cudaSharedMemoryModeAllowOversizedSharedMemory` by setting either the `cudaFuncAttributeSharedMemoryMode` function attribute or the `cudaLaunchAttributeSharedMemoryMode` launch attribute.
- TMA data validity reporting for bulk-asynchronous copies (new in CPG 13.5 feature table): available on compute capability 10.7 only; requires the `compute_107f` or the `compute_107a` compilation target. Code compiled for the family-specific `compute_107f` target runs on devices of compute capability 10.7 and on any later members of the same family; code compiled for the architecture-specific `compute_107a` target runs only on devices of compute capability 10.7.
- Since CPG 13.5 the page also documents compute capability retrieval through libcu++ (`<cuda/devices>`) in addition to `cudaDeviceGetAttribute()`, `cuDeviceGetAttribute()` and NVML `nvmlDeviceGetCudaComputeCapability()`.
- Verified against CPG v13.5 (retrieved 2026-11-14); the CPG 13.4.2 correction above still applies to the table.
- Source: https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html (CPG v13.5, retrieved 2026-11-14)
- Feature Set Compiler Targets determine which `-arch`/`-gencode` value is required to use a given feature — a kernel using a family-specific feature can target the family's baseline compute capability rather than every individual minor version.

## Related

- [The CUDA Driver API](../core/driver-api.md)
- [CUDA Environment Variables](./environment-variables.md)
