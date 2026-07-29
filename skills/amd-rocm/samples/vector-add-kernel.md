# Vector Add Kernel

Define a `__global__` kernel, launch it with `<<<>>>` grid/block configuration, and check for launch errors.

```cpp
#include <hip/hip_runtime.h>
#include <cstdlib>
#include <iostream>
#include <numeric>
#include <vector>

#define HIP_CHECK(expr)                                                    \
    {                                                                      \
        const hipError_t err = (expr);                                    \
        if (err != hipSuccess) {                                          \
            std::cerr << "HIP error: " << hipGetErrorString(err) << " at " \
                      << __LINE__ << "\n";                                 \
            std::exit(EXIT_FAILURE);                                      \
        }                                                                 \
    }

// Each thread computes a*x[i]+y[i]; the bounds check guards the last
// (partial) block from writing past the end of the vectors.
__global__ void saxpy_kernel(const float a, const float* d_x, float* d_y, const unsigned int size)
{
    const unsigned int global_idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (global_idx < size) {
        d_y[global_idx] = a * d_x[global_idx] + d_y[global_idx];
    }
}

int main()
{
    constexpr unsigned int size        = 1000000;
    constexpr size_t        size_bytes  = size * sizeof(float);
    constexpr unsigned int block_size  = 256;
    constexpr unsigned int grid_size   = (size + block_size - 1) / block_size;
    constexpr float         a          = 2.f;

    std::vector<float> x(size), y(size);
    std::iota(x.begin(), x.end(), 1.f);
    std::fill(y.begin(), y.end(), 1.f);

    float *d_x{}, *d_y{};
    HIP_CHECK(hipMalloc(&d_x, size_bytes));
    HIP_CHECK(hipMalloc(&d_y, size_bytes));
    HIP_CHECK(hipMemcpy(d_x, x.data(), size_bytes, hipMemcpyHostToDevice));
    HIP_CHECK(hipMemcpy(d_y, y.data(), size_bytes, hipMemcpyHostToDevice));

    // Launch the kernel on the default stream.
    saxpy_kernel<<<dim3(grid_size), dim3(block_size), 0, hipStreamDefault>>>(a, d_x, d_y, size);

    // Kernel launches are asynchronous; hipGetLastError only reports
    // configuration errors detected at launch time, not in-kernel faults.
    HIP_CHECK(hipGetLastError());

    HIP_CHECK(hipMemcpy(y.data(), d_y, size_bytes, hipMemcpyDeviceToHost));

    HIP_CHECK(hipFree(d_x));
    HIP_CHECK(hipFree(d_y));
    return 0;
}
```

## Notes

- `blockIdx.x * blockDim.x + threadIdx.x` is the canonical 1D global thread index; the `if (global_idx < size)` guard is required whenever `size` is not an exact multiple of `block_size`.
- `grid_size` uses ceiling division so the last block still covers the remainder without out-of-bounds writes.
- Kernel launches (`<<<...>>>`) do not return an error code directly; call `hipGetLastError()` immediately after the launch to catch configuration failures.
- This is the HIP API (`hipMalloc`, `<<<>>>` launch, `hipStream_t`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/saxpy" (MIT License), tag `therock-7.14`.
