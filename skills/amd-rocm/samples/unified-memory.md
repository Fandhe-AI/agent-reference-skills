# Unified Memory

Allocate memory accessible from both host and device with `hipMallocManaged`, then use `hipMemPrefetchAsync` and `hipMemAdvise` to steer the migration behavior of the unified memory pages.

```cpp
#include <hip/hip_runtime.h>
#include <cstdlib>
#include <iostream>

#define HIP_CHECK(expr)                                                    \
    {                                                                      \
        const hipError_t err = (expr);                                    \
        if (err != hipSuccess) {                                          \
            std::cerr << "HIP error: " << hipGetErrorString(err) << " at " \
                      << __LINE__ << "\n";                                \
            std::exit(EXIT_FAILURE);                                     \
        }                                                                 \
    }

__global__ void add(int* a, int* b, int* c) { *c = *a + *b; }

int main()
{
    int deviceId;
    HIP_CHECK(hipGetDevice(&deviceId));

    int *a, *b, *c;
    // Memory allocated with hipMallocManaged is accessible from both host
    // and device code without an explicit hipMemcpy.
    HIP_CHECK(hipMallocManaged(&a, sizeof(*a)));
    HIP_CHECK(hipMallocManaged(&b, sizeof(*b)));
    HIP_CHECK(hipMallocManaged(&c, sizeof(*c)));

    // Hint that a and b will be read-mostly and accessed by the GPU, and
    // set their preferred physical location to the GPU. These are advisory
    // hints only; correctness does not depend on them.
    HIP_CHECK(hipMemAdvise(a, sizeof(*a), hipMemAdviseSetPreferredLocation, deviceId));
    HIP_CHECK(hipMemAdvise(a, sizeof(*a), hipMemAdviseSetAccessedBy, deviceId));
    HIP_CHECK(hipMemAdvise(a, sizeof(*a), hipMemAdviseSetReadMostly, deviceId));
    HIP_CHECK(hipMemAdvise(b, sizeof(*b), hipMemAdviseSetPreferredLocation, deviceId));
    HIP_CHECK(hipMemAdvise(b, sizeof(*b), hipMemAdviseSetAccessedBy, deviceId));
    HIP_CHECK(hipMemAdvise(b, sizeof(*b), hipMemAdviseSetReadMostly, deviceId));

    *a = 1;
    *b = 2;

    // Explicitly prefetch to the GPU ahead of the kernel touching it, to
    // avoid a page fault stalling the first access.
    HIP_CHECK(hipMemPrefetchAsync(a, sizeof(*a), deviceId, 0));
    HIP_CHECK(hipMemPrefetchAsync(b, sizeof(*b), deviceId, 0));
    HIP_CHECK(hipMemPrefetchAsync(c, sizeof(*c), deviceId, 0));

    add<<<1, 1>>>(a, b, c);

    // Prefetch the result back to the CPU before the host reads *c.
    HIP_CHECK(hipMemPrefetchAsync(c, sizeof(*c), hipCpuDeviceId, 0));
    HIP_CHECK(hipDeviceSynchronize());

    std::cout << *a << " + " << *b << " = " << *c << std::endl;

    HIP_CHECK(hipFree(a));
    HIP_CHECK(hipFree(b));
    HIP_CHECK(hipFree(c));
    return 0;
}
```

## Notes

- `hipMallocManaged` memory migrates on demand between host and device on first touch; `hipMemPrefetchAsync` moves it ahead of time to avoid a page-fault stall on first kernel access.
- `hipMemAdvise` (e.g. `hipMemAdviseSetReadMostly`, `hipMemAdviseSetPreferredLocation`, `hipMemAdviseSetAccessedBy`) only hints at migration policy — it does not change program correctness.
- Standard unified memory (`hipMallocManaged` without explicit prefetch/advise) requires Heterogeneous Memory Management (HMM) support and the environment variable `HSA_XNACK` set to `1`, per the official ROCm/rocm-examples "standard_unified_memory" sample comment; without XNACK enabled, managed allocations fall back to a more limited unified-memory mode.
- This is the HIP API (`hipMallocManaged`, `hipMemPrefetchAsync`, `hipMemAdvise`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill.
- Derived from the official ROCm/rocm-examples samples "HIP-Doc/.../Unified-Memory-Management/standard_unified_memory", "data_prefetching", and "unified_memory_advice" (MIT License), tag `therock-7.14`.
