# Explicit Memory Transfer

Allocate device memory with `hipMalloc`, copy explicitly with `hipMemcpy`, and use pinned host memory (`hipHostMalloc`) to speed up transfers.

```cpp
#include <hip/hip_runtime.h>
#include <cstdlib>
#include <cstring>
#include <iostream>

#define HIP_CHECK(expr)                                                    \
    {                                                                      \
        const hipError_t status = (expr);                                 \
        if (status != hipSuccess) {                                       \
            std::cerr << "HIP error " << status << ": "                   \
                      << hipGetErrorString(status) << " at " << __FILE__  \
                      << ":" << __LINE__ << std::endl;                    \
            std::exit(EXIT_FAILURE);                                     \
        }                                                                 \
    }

int main()
{
    constexpr std::size_t elements   = 1 << 20;
    constexpr std::size_t size_bytes = elements * sizeof(int);

    // Pageable host memory (regular new[]/malloc) requires an implicit
    // staging copy through a pinned buffer during hipMemcpy.
    int* pageable_host = new int[elements];

    // Pinned (page-locked) host memory lets the DMA engine transfer directly,
    // which is faster for repeated or large transfers but limited in quantity.
    int* pinned_host_input;
    int* pinned_host_output;
    HIP_CHECK(hipHostMalloc(&pinned_host_input, size_bytes));
    HIP_CHECK(hipHostMalloc(&pinned_host_output, size_bytes));
    std::memset(pinned_host_output, 0, size_bytes);

    int *device_input, *device_result;
    HIP_CHECK(hipMalloc(&device_input, size_bytes));
    HIP_CHECK(hipMalloc(&device_result, size_bytes));

    // Copy from pinned host memory to the device.
    HIP_CHECK(hipMemcpy(device_input, pinned_host_input, size_bytes, hipMemcpyHostToDevice));

    // Use memory on the device, i.e. execute kernels.

    // Copy the result back, e.g. after a kernel writes into device_result.
    HIP_CHECK(hipMemcpy(pinned_host_output, device_result, size_bytes, hipMemcpyDeviceToHost));

    HIP_CHECK(hipFree(device_result));
    HIP_CHECK(hipFree(device_input));
    HIP_CHECK(hipFreeHost(pinned_host_input));
    HIP_CHECK(hipFreeHost(pinned_host_output));
    delete[] pageable_host;
    return 0;
}
```

## Notes

- `hipMemcpy` is synchronous with respect to the host; it blocks until the transfer completes, unlike `hipMemcpyAsync` used with streams.
- Pageable host memory (`new`/`malloc`) is always staged through an internal pinned buffer by the driver, adding a copy; `hipHostMalloc`-allocated (pinned) memory skips that staging step.
- Pinned memory is a limited system resource — over-allocating it can starve the OS and other processes, so pin only the buffers actually used for repeated transfers.
- Always pair `hipHostMalloc` with `hipFreeHost` (not the regular `hipFree` or `delete[]`).
- This is the HIP API (`hipMalloc`, `hipMemcpy`, `hipHostMalloc`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples samples "HIP-Doc/.../Device-Memory/explicit_copy" and "HIP-Doc/.../Host-Memory/pinned_host_memory" (MIT License), tag `therock-7.14`.
