# Shared Memory Tiled Matmul

Tile a matrix multiplication kernel through `__shared__` memory with `__syncthreads()` barriers between the load and compute phases.

```cpp
#include <hip/hip_runtime.h>

// Multiplies A (a_rows x a_cols) by B (a_cols x b_cols) into C.
// Each thread computes one element of C, cooperatively loading square
// BlockSize x BlockSize tiles into shared memory to avoid re-reading the
// same values from global memory for every output element in a block.
// Matrix dimensions are assumed to be exact multiples of BlockSize.
template <unsigned int BlockSize>
__global__ void matrix_multiplication_kernel(const float* A, const float* B, float* C, const unsigned int a_cols)
{
    const unsigned int tx = threadIdx.x;
    const unsigned int ty = threadIdx.y;
    const unsigned int bx = blockIdx.x;
    const unsigned int by = blockIdx.y;

    const unsigned int b_cols = blockDim.x * gridDim.x;
    const unsigned int steps  = a_cols / BlockSize;

    float thread_result = 0.0F;
    for (unsigned int step = 0; step < steps; step++) {
        __shared__ float a_values[BlockSize][BlockSize];
        __shared__ float b_values[BlockSize][BlockSize];

        const unsigned int a_idx = BlockSize * (a_cols * by + step);
        const unsigned int b_idx = BlockSize * (b_cols * step + bx);

        a_values[ty][tx] = A[a_idx + a_cols * ty + tx];
        b_values[ty][tx] = B[b_idx + b_cols * ty + tx];

        // All threads must finish loading the tile before any thread reads it.
        __syncthreads();

        for (unsigned int i = 0; i < BlockSize; i++) {
            thread_result += a_values[ty][i] * b_values[i][tx];
        }

        // All threads must finish reading the tile before it is overwritten
        // by the next iteration's load.
        __syncthreads();
    }

    const unsigned int block_offset = b_cols * BlockSize * by + BlockSize * bx;
    C[block_offset + b_cols * ty + tx] = thread_result;
}
```

## Notes

- Two `__syncthreads()` calls per tile step are both required: the first ensures the whole tile is loaded before any thread starts multiplying, the second ensures every thread has finished reading before the next step overwrites the same `__shared__` arrays.
- The kernel is templated on `BlockSize` so the `__shared__` tile arrays have a compile-time size; `blockDim` at launch must match `BlockSize` exactly.
- `a_cols` must be an exact multiple of `BlockSize`, since `steps = a_cols / BlockSize` assumes no remainder tile.
- This is the HIP API (`__shared__`, `__syncthreads()`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/matrix_multiplication" (MIT License), tag `therock-7.14`.
