# Intro to CUDA Python

Practical introduction to writing CUDA kernels in Python, covering the CUDA Python ecosystem, kernel definition and launch, thread indexing, memory management, synchronization, and error checking.

## Signature / Usage

```python
from numba import cuda

@cuda.jit
def vecadd(A, B, C):
    idx = cuda.grid(1)
    C[idx] = A[idx] + B[idx]

vecadd[num_thread_blocks, threads_per_block](A, B, C)
```

Launch syntax: `kernel_name[num_thread_blocks, threads_per_block](args)`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `cuda.core` | package | Main CUDA Python component for device control |
| `CuPy` | package | GPU array library; handles GPU array creation and CPU↔GPU data transfer (`cp.array()`, `cp.asnumpy()`) |
| `numba.cuda` | package | Kernel-authoring toolkit providing the `@cuda.jit` decorator and device intrinsics |
| `@cuda.jit` | decorator | Marks a Python function as a CUDA kernel |
| `cuda.threadIdx` / `cuda.blockIdx` / `cuda.blockDim` / `cuda.gridDim` | intrinsic | Thread position within block, block position within grid, thread-block dimensions, grid dimensions (each with `.x` / `.y` / `.z`) |
| `cuda.grid(n)` | intrinsic | Shorthand that computes a thread's global index across an `n`-dimensional grid |
| `cp.synchronize()` / `cuda.synchronize()` | function | Device-wide synchronization between host and GPU execution |

## Notes

- Kernel launch syntax mirrors CUDA C++'s triple chevron notation using Python subscript syntax: `kernel_name[number_of_thread_blocks, threads_per_block](arguments)`.
- CuPy arrays remain on their respective device (host or GPU) unless explicitly copied with `cp.array()` (host → device) or `cp.asnumpy()` (device → host).
- Error checking in CUDA Python follows Python's standard exception mechanism, layered on top of the same underlying `cudaError_t` semantics as CUDA C++.
- This page's full worked example (input validation plus a complete vector-add kernel with error handling) is in source section 2.2.5 "Putting it All Together"; only the minimal kernel-definition and launch syntax are reproduced above per this skill's one-example convention.

## Related

- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Programming Model](./programming-model.md)
- [Writing SIMT Kernels](./writing-cuda-kernels.md)
