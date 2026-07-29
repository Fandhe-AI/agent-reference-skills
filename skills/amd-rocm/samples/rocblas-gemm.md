# rocBLAS GEMM

Perform a matrix-matrix multiply on device memory with `rocblas_sgemm`, using a `rocblas_handle` created once and reused across calls.

```cpp
#include <hip/hip_runtime.h>
#include <rocblas/rocblas.h>
#include <vector>

int main()
{
    const rocblas_int m = 5, n = 5, k = 5;
    const float h_alpha = 1.f, h_beta = 1.f;
    const rocblas_operation trans_a = rocblas_operation_none;
    const rocblas_operation trans_b = rocblas_operation_none;

    const rocblas_int lda = m, ldb = k, ldc = m;
    const int size_a = k * lda, size_b = n * ldb, size_c = n * ldc;

    // Host-side operands: A and C filled with 1s, B set to identity so the
    // expected result is easy to check by hand.
    std::vector<float> h_a(size_a, 1.f);
    std::vector<float> h_b(size_b, 0.f);
    for (int i = 0; i < k && i < n; ++i) {
        h_b[i * ldb + i] = 1.f;
    }
    std::vector<float> h_c(size_c, 1.f);

    float *d_a{}, *d_b{}, *d_c{};
    hipMalloc(&d_a, size_a * sizeof(float));
    hipMalloc(&d_b, size_b * sizeof(float));
    hipMalloc(&d_c, size_c * sizeof(float));

    // Copy host data into device memory before invoking the GEMM.
    hipMemcpy(d_a, h_a.data(), sizeof(float) * size_a, hipMemcpyHostToDevice);
    hipMemcpy(d_b, h_b.data(), sizeof(float) * size_b, hipMemcpyHostToDevice);
    hipMemcpy(d_c, h_c.data(), sizeof(float) * size_c, hipMemcpyHostToDevice);

    rocblas_handle handle;
    rocblas_create_handle(&handle);

    // Alpha/beta are passed from host memory; rocblas_pointer_mode_device
    // would instead require them to live in device memory.
    rocblas_set_pointer_mode(handle, rocblas_pointer_mode_host);

    // C = alpha * op(A) * op(B) + beta * C, dispatched asynchronously on
    // the handle's associated stream.
    rocblas_sgemm(handle, trans_a, trans_b, m, n, k,
                  &h_alpha, d_a, lda, d_b, ldb, &h_beta, d_c, ldc);

    // hipMemcpy back from d_c blocks until the GEMM (and any prior stream
    // work) has completed, so no separate hipDeviceSynchronize is needed
    // before reading the result via a blocking copy.
    hipMemcpy(h_c.data(), d_c, sizeof(float) * size_c, hipMemcpyDeviceToHost);

    rocblas_destroy_handle(handle);
    hipFree(d_a);
    hipFree(d_b);
    hipFree(d_c);
    return 0;
}
```

## Notes

- `rocblas_sgemm` computes `C = alpha * op(A) * op(B) + beta * C` for single-precision matrices; `trans_a`/`trans_b` select whether `A`/`B` are used as-is (`rocblas_operation_none`) or transposed.
- `rocblas_set_pointer_mode(handle, rocblas_pointer_mode_host)` is required when `alpha`/`beta` are ordinary host-memory floats (as in this snippet); with `rocblas_pointer_mode_device` they would instead need to be device pointers.
- A `rocblas_handle` carries the library's internal stream/workspace state; create it once with `rocblas_create_handle` and reuse it across calls rather than recreating it per GEMM.
- This is the HIP/rocBLAS API (`rocblas_handle`, `rocblas_sgemm`) for AMD GPUs, not the CUDA/cuBLAS API of the same shape; the closest nvidia-cuda counterpart (`cutlass-cpp-device-gemm.md`) uses CUTLASS rather than cuBLAS directly, so the API surfaces differ beyond just the AMD/NVIDIA naming.
- Derived from the official ROCm/rocm-examples sample "Libraries/rocBLAS/level_3/gemm" (MIT License), tag `therock-7.14`.
