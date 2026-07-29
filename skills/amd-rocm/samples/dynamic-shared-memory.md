# Dynamic Shared Memory

Declare an `extern __shared__` array whose size is determined at launch time rather than compiled in, and pass the byte size as the third `<<<>>>` launch parameter.

```cpp
#include <hip/hip_runtime.h>
#include <vector>

// Transposes a width x width matrix using dynamic shared memory. Because
// the transpose happens in shared memory (not visible across blocks), the
// whole matrix must be processed by a single block.
__global__ void matrix_transpose_kernel(float* out, const float* in, const unsigned int width)
{
    // The unsized array indicates the amount of shared memory is not known
    // at compile time; it is computed at launch and passed as the kernel's
    // third launch-configuration argument.
    extern __shared__ float shared_matrix_memory[];

    const unsigned int x = blockDim.x * blockIdx.x + threadIdx.x;
    const unsigned int y = blockDim.y * blockIdx.y + threadIdx.y;

    shared_matrix_memory[y * width + x] = in[x * width + y];
    __syncthreads();
    out[y * width + x] = shared_matrix_memory[y * width + x];
}

int main()
{
    constexpr unsigned int width       = 4;
    constexpr unsigned int size        = width * width;
    constexpr std::size_t  size_bytes  = sizeof(float) * size;
    // Exactly one width x width matrix of floats is needed in shared memory.
    constexpr std::size_t  shared_memory_bytes = size_bytes;

    float *d_matrix{}, *d_transposed_matrix{};
    hipMalloc(&d_matrix, size_bytes);
    hipMalloc(&d_transposed_matrix, size_bytes);

    // The third launch argument is the dynamic shared memory size in bytes;
    // it is what makes shared_matrix_memory[] a valid, sized allocation.
    matrix_transpose_kernel<<<dim3(1), dim3(width, width), shared_memory_bytes, hipStreamDefault>>>(
        d_transposed_matrix, d_matrix, width);

    hipDeviceSynchronize();
    hipFree(d_matrix);
    hipFree(d_transposed_matrix);
    return 0;
}
```

## Notes

- `extern __shared__ T array[]` declares dynamically-sized shared memory; unlike `__shared__ T array[N]`, its size is not fixed in the kernel source.
- The byte size is supplied as the third argument of the `<<<grid, block, sharedBytes, stream>>>` launch configuration — omitting it (or passing 0) leaves the array with zero usable elements.
- Only one dynamic `extern __shared__` array is allowed per kernel; multiple logical arrays must be manually partitioned out of the same backing buffer.
- This is the HIP API (`extern __shared__`, `<<<>>>` shared-memory argument) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent uses the identical mechanism but is not currently covered by a samples page in the nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/dynamic_shared" (MIT License), tag `therock-7.14`.
