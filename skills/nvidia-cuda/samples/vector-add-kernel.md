# Vector Add Kernel

Define a `__global__` kernel, launch it with a grid/block configuration, and check for launch errors.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>

// Each thread computes one output element; the bounds check guards the
// last (partial) block from writing past the end of the array.
__global__ void vectorAdd(const float *A, const float *B, float *C, int numElements)
{
    int i = blockDim.x * blockIdx.x + threadIdx.x;
    if (i < numElements) {
        C[i] = A[i] + B[i];
    }
}

int main(void)
{
    int numElements = 50000;
    size_t size = numElements * sizeof(float);

    float *h_A = (float *)malloc(size);
    float *h_B = (float *)malloc(size);
    float *h_C = (float *)malloc(size);
    for (int i = 0; i < numElements; ++i) {
        h_A[i] = rand() / (float)RAND_MAX;
        h_B[i] = rand() / (float)RAND_MAX;
    }

    float *d_A = NULL, *d_B = NULL, *d_C = NULL;
    cudaMalloc((void **)&d_A, size);
    cudaMalloc((void **)&d_B, size);
    cudaMalloc((void **)&d_C, size);
    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);

    int threadsPerBlock = 256;
    int blocksPerGrid = (numElements + threadsPerBlock - 1) / threadsPerBlock;
    vectorAdd<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, numElements);

    // Kernel launches are asynchronous — cudaGetLastError only reports
    // configuration errors detected at launch time (e.g. invalid grid/block
    // dims), not runtime faults inside the kernel.
    cudaError_t err = cudaGetLastError();
    if (err != cudaSuccess) {
        fprintf(stderr, "Failed to launch vectorAdd kernel (error code %s)!\n", cudaGetErrorString(err));
        exit(EXIT_FAILURE);
    }

    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);

    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);
    free(h_A);
    free(h_B);
    free(h_C);
    return 0;
}
```

## Notes

- `blockDim.x * blockIdx.x + threadIdx.x` is the canonical 1D global thread index; the `if (i < numElements)` guard is required whenever `numElements` is not an exact multiple of `threadsPerBlock`.
- `blocksPerGrid` uses ceiling division (`(numElements + threadsPerBlock - 1) / threadsPerBlock`) so the last block still covers the remainder without leaving elements unprocessed.
- Kernel launches (`<<<...>>>`) do not return an error code directly; call `cudaGetLastError()` immediately after the launch to catch configuration failures.
- Derived from the official NVIDIA/cuda-samples sample "vectorAdd" (cpp/0_Introduction), tag `v13.3`.
