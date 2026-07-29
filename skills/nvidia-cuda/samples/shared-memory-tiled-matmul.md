# Shared Memory Tiled Matrix Multiply

Stage sub-matrices in `__shared__` memory and synchronize with `__syncthreads()` so each thread block reuses data loaded by its own threads instead of re-reading global memory per element.

```cpp
#include <cuda_runtime.h>

#define BLOCK_SIZE 16

// C = A * B, where A is wA-wide and B is wB-wide (both BLOCK_SIZE-aligned).
__global__ void matrixMulTiled(float *C, const float *A, const float *B, int wA, int wB)
{
    int bx = blockIdx.x, by = blockIdx.y;
    int tx = threadIdx.x, ty = threadIdx.y;

    int aBegin = wA * BLOCK_SIZE * by;
    int aEnd   = aBegin + wA - 1;
    int aStep  = BLOCK_SIZE;
    int bBegin = BLOCK_SIZE * bx;
    int bStep  = BLOCK_SIZE * wB;

    float Csub = 0;

    for (int a = aBegin, b = bBegin; a <= aEnd; a += aStep, b += bStep) {
        __shared__ float As[BLOCK_SIZE][BLOCK_SIZE];
        __shared__ float Bs[BLOCK_SIZE][BLOCK_SIZE];

        // Each thread loads exactly one element of each sub-matrix into
        // shared memory, turning wA/BLOCK_SIZE global reads per element
        // into a single one shared across the whole block.
        As[ty][tx] = A[a + wA * ty + tx];
        Bs[ty][tx] = B[b + wB * ty + tx];

        // Block until every thread has finished loading before any thread
        // reads from the shared tile.
        __syncthreads();

        for (int k = 0; k < BLOCK_SIZE; ++k) {
            Csub += As[ty][k] * Bs[k][tx];
        }

        // Block again so no thread starts overwriting As/Bs for the next
        // tile while others are still accumulating from the current one.
        __syncthreads();
    }

    int c = wB * BLOCK_SIZE * by + BLOCK_SIZE * bx;
    C[c + wB * ty + tx] = Csub;
}
```

## Notes

- `__shared__` arrays are allocated per thread block and shared by all threads in that block; they persist only for the block's lifetime and must be re-declared (and reloaded) each loop iteration when reused as a rolling tile buffer.
- The first `__syncthreads()` prevents a read-before-write race (a thread reading `As`/`Bs` before another thread in the block has written its element); the second prevents a write-after-read race on the next iteration's load.
- `BLOCK_SIZE` must evenly divide `wA` and `wB` in this simplified form; production kernels add boundary handling for non-aligned matrix dimensions.
- Derived from the official NVIDIA/cuda-samples sample "matrixMul" (cpp/0_Introduction), tag `v13.3`.
