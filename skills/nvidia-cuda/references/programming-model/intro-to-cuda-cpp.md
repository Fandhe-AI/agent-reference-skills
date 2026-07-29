# Intro to CUDA C++

Practical introduction to CUDA C++ through a vector-add example, covering kernel definition, launch, thread indexing, memory management, synchronization, and error checking, using the CUDA runtime API.

## Signature / Usage

```cuda
// Kernel definition
__global__ void vecAdd(float* A, float* B, float* C, int vectorLength)
{
    // calculate which element this thread is responsible for computing
    int workIndex = threadIdx.x + blockDim.x * blockIdx.x;

    if (workIndex < vectorLength)
    {
        // Perform computation
        C[workIndex] = A[workIndex] + B[workIndex];
    }
}

int main()
{
    // vectorLength is an integer storing number of elements in the vector
    int threads = 256;
    int blocks = cuda::ceil_div(vectorLength, threads);
    // Kernel invocation using triple chevron notation <<<blocks, threads>>>
    vecAdd<<<blocks, threads>>>(devA, devB, devC, vectorLength);
    // check error state after kernel launch, then wait for completion
    CUDA_CHECK(cudaGetLastError());
    CUDA_CHECK(cudaDeviceSynchronize());
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `__global__` | function specifier | Marks a kernel entry point: a function executed on the GPU and invoked from the host, with `void` return type |
| `__device__` | function specifier | Marks a function callable only from device code (GPU-callable) |
| `__host__ __device__` | function specifier | Marks a function compiled for both CPU and GPU |
| `__device__` (variable) | variable specifier | Places a variable in global memory |
| `__constant__` | variable specifier | Places a variable in constant memory |
| `__managed__` | variable specifier | Places a variable in unified memory |
| `__shared__` | variable specifier | Places a variable in shared memory local to a thread block |
| `threadIdx`, `blockIdx`, `blockDim`, `gridDim` | built-in variable | Thread position within block, block position within grid, thread-block dimensions, grid dimensions, respectively |
| `cudaMallocManaged(ptr, size)` | function | Allocates unified memory accessible from both host and device; the runtime migrates data automatically |
| `cudaMalloc(ptr, size)` / `cudaFree(ptr)` | function | Explicit device memory allocation / deallocation |
| `cudaMallocHost(ptr, size)` / `cudaFreeHost(ptr)` | function | Allocates / frees page-locked host memory, recommended when the buffer is used for host↔device copies |
| `cudaMemcpy(dst, src, size, kind)` | function | Copies memory between host and device (or device to device); `cudaMemcpyDefault` infers the direction |
| `cudaMemset(ptr, value, size)` | function | Sets device memory to a byte value |
| `cudaDeviceSynchronize()` | function | Blocks the host until all preceding GPU work completes |
| `cudaGetLastError()` / `cudaPeekAtLastError()` | function | Returns the last `cudaError_t`; `cudaPeekAtLastError` does not reset the error state, `cudaGetLastError` does |
| `cudaGetErrorString(error)` | function | Converts a `cudaError_t` into a human-readable string |
| `CUDA_LOG_FILE` | environment variable | When set, the CUDA driver writes error messages to the file path given (or to stdout/stderr if set to those names), independent of explicit error checking |
| `__cluster_dims__(x, y, z)` | function attribute | Specifies a compile-time thread block cluster size for a kernel (compute capability 9.0+) |

## Notes

- Compilation: GPU code is compiled with the NVIDIA CUDA Compiler (`nvcc`), which orchestrates the various tools needed for each compilation stage; see the `nvcc` page for details.
- Kernel launch uses "triple chevron notation" `kernel<<<grid, block>>>(args)`: the first parameter is the grid dimensions (in thread blocks), the second is the thread-block dimensions; the maximum threads per block on current GPUs is 1024. Kernel launches are asynchronous with respect to the host.
- Two memory-management approaches: unified memory (`cudaMallocManaged`, automatic migration) versus explicit management (`cudaMallocHost` + `cudaMalloc` + `cudaMemcpy`, manual host/device buffers). Unified memory is simpler; explicit management gives more control over data placement and copy timing.
- Error checking: every CUDA API call returns a `cudaError_t`. The recommended pattern is a `CUDA_CHECK` macro wrapping each call and reporting via `cudaGetErrorString`:

  ```cuda
  #define CUDA_CHECK(expr_to_check) do {            \
      cudaError_t result  = expr_to_check;          \
      if(result != cudaSuccess)                     \
      {                                             \
          fprintf(stderr,                           \
                  "CUDA Runtime Error: %s:%i:%d = %s\n", \
                  __FILE__,                         \
                  __LINE__,                         \
                  result,                           \
                  cudaGetErrorString(result));      \
      }                                             \
  } while(0)
  ```

- Asynchronous errors: because kernel launches are asynchronous, an error occurring during kernel execution is not necessarily visible immediately after the launch call. Checking `cudaGetLastError()` right after launch catches launch-configuration errors; a subsequent `CUDA_CHECK(cudaDeviceSynchronize())` also surfaces errors that occurred during the kernel's execution.
- `CUDA_LOG_FILE` lets CUDA errors be identified even without explicit checking in the code, and also supports callback registration for runtime error handling.
- Thread block clusters (compute capability 9.0+): an optional grouping level above thread blocks, specified either at compile time via the `__cluster_dims__` kernel attribute or at launch time; the grid dimension in the launch is still expressed in units of thread blocks and must be a multiple of the cluster size.

## Related

- [Programming Model](./programming-model.md)
- [Writing SIMT Kernels](./writing-cuda-kernels.md)
- [Intro to CUDA Python](./intro-to-cuda-python.md)
- [NVCC: The NVIDIA CUDA Compiler](./nvcc.md)
