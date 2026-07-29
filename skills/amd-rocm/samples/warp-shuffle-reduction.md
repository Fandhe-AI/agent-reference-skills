# Warp Shuffle Reduction

Exchange values between threads in the same wavefront/warp with `__shfl`, and query the architecture's actual `warpSize` at runtime rather than assuming a fixed width.

```cpp
#include <hip/hip_runtime.h>
#include <cstdlib>
#include <iostream>

// Transposes a width x width matrix (width <= warpSize) using a single
// warp/wavefront's shuffle instruction instead of shared memory.
__global__ void matrix_transpose_kernel(float* out, const float* in, const unsigned int width)
{
    const unsigned int x = threadIdx.x;
    const unsigned int y = threadIdx.y;

    if (x < width && y < width) {
        // Each lane loads its own element first.
        const float val = in[y * width + x];

        // Then fetches the element owned by the lane at the transposed
        // (x, y) -> (y, x) position, so the actual value exchange happens
        // through the shuffle itself rather than through the write index.
        // AMD devices use __shfl directly; NVIDIA (via HIP's CUDA backend)
        // requires the newer __shfl_sync with an explicit active-thread mask.
#if defined(__HIP_PLATFORM_AMD__)
        out[y * width + x] = __shfl(val, x * width + y);
#elif defined(__HIP_PLATFORM_NVIDIA__)
        out[y * width + x] = __shfl_sync(__activemask(), val, x * width + y);
#endif
    }
}

int main()
{
    constexpr unsigned int width = 4;

    // The wavefront size is architecture-dependent (64 on CDNA, 32 on
    // RDNA) and must be queried at runtime rather than hard-coded.
    hipDeviceProp_t props;
    hipGetDeviceProperties(&props, 0);
    if (width * width > static_cast<unsigned int>(props.warpSize)) {
        std::cerr << "Matrix has more elements than the architecture's warp size.\n";
        return EXIT_FAILURE;
    }

    const dim3 block_dim(width, width);
    const dim3 grid_dim(1);

    constexpr unsigned int size       = width * width;
    constexpr std::size_t  size_bytes = size * sizeof(float);
    float *d_matrix{}, *d_transposed{};
    hipMalloc(&d_matrix, size_bytes);
    hipMalloc(&d_transposed, size_bytes);

    matrix_transpose_kernel<<<grid_dim, block_dim>>>(d_transposed, d_matrix, width);
    hipDeviceSynchronize();

    hipFree(d_matrix);
    hipFree(d_transposed);
    return 0;
}
```

## Notes

- `warpSize` (queried via `hipGetDeviceProperties`) is **64 on CDNA GPUs and 32 on RDNA GPUs**, unlike CUDA where the warp size is always 32; code that assumes a fixed width silently breaks when moved between AMD architecture generations.
- `__shfl` (no `_sync` suffix, no explicit mask) is the AMD/HIP form; the `_sync` variant with an explicit active-mask argument is only needed for the NVIDIA backend, guarded here by `__HIP_PLATFORM_AMD__` / `__HIP_PLATFORM_NVIDIA__`.
- Because the matrix has no more elements than the warp size in this example, no `__syncthreads()` is needed — the shuffle instruction itself is intra-warp synchronous.
- This sample has no direct nvidia-cuda counterpart page: the wavefront-size portability concern (64 vs 32, CDNA vs RDNA) is AMD-specific and does not apply to CUDA's fixed 32-thread warp, which the separate nvidia-cuda skill covers with the plain `__shfl_sync` form instead.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/warp_shuffle" (MIT License), tag `therock-7.14`.
