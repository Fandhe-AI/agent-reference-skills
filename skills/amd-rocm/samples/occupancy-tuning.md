# Occupancy Tuning

Use `hipOccupancyMaxPotentialBlockSize` to have the runtime suggest a block size for a kernel, and `hipOccupancyMaxActiveBlocksPerMultiprocessor` to compare the resulting theoretical occupancy against a manually-chosen block size.

```cpp
#include <hip/hip_runtime.h>
#include <iostream>

__global__ void pairwise_product_kernel(float* C, const float* A, const float* B, const unsigned int size)
{
    const unsigned int idx = blockDim.x * blockIdx.x + threadIdx.x;
    if (idx < size) {
        C[idx] = A[idx] * B[idx];
    }
}

void print_occupancy(int block_size)
{
    // HIP-Clang always reports 0 for hipDeviceProp_t::maxThreadsPerMultiProcessor,
    // so query the attribute instead of hipGetDeviceProperties.
    int max_threads_per_mp = 0;
    hipDeviceGetAttribute(&max_threads_per_mp, hipDeviceAttributeMaxThreadsPerMultiProcessor, 0);

    int num_blocks = 0;
    hipOccupancyMaxActiveBlocksPerMultiprocessor(&num_blocks, pairwise_product_kernel, block_size, 0);
    if (max_threads_per_mp > 0) {
        double occupancy = static_cast<double>(num_blocks) * block_size / max_threads_per_mp * 100;
        std::cout << "Theoretical occupancy: " << occupancy << "%\n";
    } else {
        std::cout << "Theoretical occupancy: unavailable (maxThreadsPerMultiProcessor not reported)\n";
    }
}

void deploy_kernel_automatic_parameters(float* d_C, const float* d_A, const float* d_B, unsigned int size)
{
    int min_grid_size = 0;
    int block_size    = 0;
    // Asks the runtime for the block size that maximizes occupancy for
    // this specific kernel on the current device, instead of guessing.
    hipOccupancyMaxPotentialBlockSize(&min_grid_size, &block_size, pairwise_product_kernel, 0, 0);

    const unsigned int grid_size = (size + block_size - 1) / block_size;
    pairwise_product_kernel<<<dim3(grid_size), dim3(block_size), 0, hipStreamDefault>>>(d_C, d_A, d_B, size);
    hipDeviceSynchronize();

    print_occupancy(block_size);
}
```

## Notes

- `hipOccupancyMaxPotentialBlockSize` returns a suggested `block_size` and the corresponding `min_grid_size` needed to fully occupy the device for a given kernel — a starting point for tuning rather than a guarantee of the fastest configuration.
- `hipOccupancyMaxActiveBlocksPerMultiprocessor` reports how many blocks of a given size can be resident on one multiprocessor simultaneously; multiplying by `block_size` and dividing by the max threads per multiprocessor gives the theoretical occupancy percentage used to compare configurations. Query that limit via `hipDeviceGetAttribute(&v, hipDeviceAttributeMaxThreadsPerMultiProcessor, dev)` — the `hipDeviceProp_t::maxThreadsPerMultiProcessor` field is always 0 under HIP-Clang (see `references/hip/device-management.md`), which would make the division blow up.
- Both APIs account for the kernel's actual register and shared-memory usage on the current device, so the suggested block size can differ across GPU architectures for the same kernel.
- This is the HIP API (`hipOccupancyMaxPotentialBlockSize`, `hipOccupancyMaxActiveBlocksPerMultiprocessor`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent (`cudaOccupancyMaxPotentialBlockSize`) is not currently covered by a samples page in the nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/occupancy" (MIT License), tag `therock-7.14`.
