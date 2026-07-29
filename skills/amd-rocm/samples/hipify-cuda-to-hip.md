# Hipify CUDA to HIP

Port a `.cu` CUDA source to portable HIP by mapping `cuda*` API names to their `hip*` equivalents one-for-one, as `hipify-perl`/`hipify-clang` do automatically.

```cpp
// Before: CUDA source (main.cu)
#include <cuda_runtime.h>

#define CHECK(cmd)                                                                          \
    {                                                                                       \
        cudaError_t error = cmd;                                                            \
        if (error != cudaSuccess) {                                                         \
            std::cerr << "error: " << cudaGetErrorString(error) << " (" << error << ") at "  \
                      << __FILE__ << ":" << __LINE__ << "\n";                                \
            exit(EXIT_FAILURE);                                                             \
        }                                                                                    \
    }

template <typename T>
__global__ void vector_square_kernel(T* out, T* in, const size_t size)
{
    const size_t offset = blockIdx.x * blockDim.x + threadIdx.x;
    const size_t stride = blockDim.x * gridDim.x;
    for (size_t i = offset; i < size; i += stride) {
        out[i] = in[i] * in[i];
    }
}

int main()
{
    cudaDeviceProp props;
    CHECK(cudaGetDeviceProperties(&props, 0));

    float *d_in, *d_out;
    CHECK(cudaMalloc(&d_in, size_in_bytes));
    CHECK(cudaMalloc(&d_out, size_in_bytes));
    CHECK(cudaMemcpy(d_in, h_in.data(), size_in_bytes, cudaMemcpyHostToDevice));

    vector_square_kernel<<<grid_size, threads_per_block>>>(d_out, d_in, size);

    CHECK(cudaMemcpy(h_out.data(), d_out, size_in_bytes, cudaMemcpyDeviceToHost));
}
```

```cpp
// After: HIP source (main.hip), produced by hipify-perl/hipify-clang
#include <hip/hip_runtime.h>

#define CHECK(cmd)                                                                          \
    {                                                                                       \
        hipError_t error = cmd;                                                             \
        if (error != hipSuccess) {                                                          \
            std::cerr << "error: " << hipGetErrorString(error) << " (" << error << ") at "   \
                      << __FILE__ << ":" << __LINE__ << "\n";                                \
            exit(EXIT_FAILURE);                                                             \
        }                                                                                    \
    }

template <typename T>
__global__ void vector_square_kernel(T* out, T* in, const size_t size)
{
    const size_t offset = blockIdx.x * blockDim.x + threadIdx.x;
    const size_t stride = blockDim.x * gridDim.x;
    for (size_t i = offset; i < size; i += stride) {
        out[i] = in[i] * in[i];
    }
}

int main()
{
    hipDeviceProp_t props;
    CHECK(hipGetDeviceProperties(&props, 0));

    float *d_in, *d_out;
    CHECK(hipMalloc(&d_in, size_in_bytes));
    CHECK(hipMalloc(&d_out, size_in_bytes));
    CHECK(hipMemcpy(d_in, h_in.data(), size_in_bytes, hipMemcpyHostToDevice));

    vector_square_kernel<<<grid_size, threads_per_block>>>(d_out, d_in, size);

    CHECK(hipMemcpy(h_out.data(), d_out, size_in_bytes, hipMemcpyDeviceToHost));
}
```

## Notes

- Every `cuda*` symbol maps to a same-shaped `hip*` symbol: `cudaError_t`→`hipError_t`, `cudaGetErrorString`→`hipGetErrorString`, `cudaDeviceProp`→`hipDeviceProp_t`, `cudaMalloc`→`hipMalloc`, `cudaMemcpy`/`cudaMemcpyHostToDevice`→`hipMemcpy`/`hipMemcpyHostToDevice`, `cudaGetDeviceProperties`→`hipGetDeviceProperties`.
- The `__global__` kernel body and the `<<<grid, block>>>` launch syntax are unchanged — hipify only rewrites the runtime API surface (`#include`, types, and function names), not kernel code or launch syntax.
- The resulting `.hip` file compiles with `hipcc` for either an AMD or an NVIDIA backend, whereas the original `.cu` file only targets NVIDIA's `nvcc`.
- This is the HIP porting workflow for AMD GPUs (mapping CUDA symbols to the HIP runtime), not a CUDA-side sample; it has no counterpart page in the nvidia-cuda skill because the transformation is one-directional (CUDA source in, HIP source out).
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/hipify" (`main.cu` and its `README.md`), MIT License, tag `therock-7.14`.
