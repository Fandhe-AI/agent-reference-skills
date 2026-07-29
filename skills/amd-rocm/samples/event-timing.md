# Event Timing

Bracket device work with `hipEvent_t` records and measure elapsed time with `hipEventElapsedTime`, synchronizing on the stop event before reading the result.

```cpp
#include <hip/hip_runtime.h>
#include <iostream>
#include <vector>

int main()
{
    constexpr unsigned int width      = 1024;
    constexpr unsigned int size       = width * width;
    constexpr std::size_t  size_bytes = sizeof(float) * size;

    std::vector<float> h_matrix(size);
    float* d_matrix{};
    hipMalloc(&d_matrix, size_bytes);

    hipEvent_t start, stop;
    hipEventCreate(&start);
    hipEventCreate(&stop);

    // Record the start event on the default stream before the operation
    // whose duration is being measured.
    hipEventRecord(start, hipStreamDefault);
    hipMemcpy(d_matrix, h_matrix.data(), size_bytes, hipMemcpyHostToDevice);
    hipEventRecord(stop, hipStreamDefault);

    // hipEventElapsedTime requires the stop event to have already
    // completed; hipEventSynchronize blocks until it has.
    hipEventSynchronize(stop);

    float elapsed_ms{};
    hipEventElapsedTime(&elapsed_ms, start, stop);
    std::cout << "hipMemcpyHostToDevice time = " << elapsed_ms << " ms" << std::endl;

    hipEventDestroy(start);
    hipEventDestroy(stop);
    hipFree(d_matrix);
    return 0;
}
```

## Notes

- `hipEventRecord` only marks a point in a stream's execution order; it does not itself block the host — `hipEventSynchronize(stop)` (or a device sync) is required before `hipEventElapsedTime` can safely read a valid duration.
- Calling `hipEventElapsedTime` before the stop event has completed produces undefined results; always synchronize on the later event first.
- Events measure device-side elapsed time between two points in a stream, which differs from host-side wall-clock timing and is unaffected by host-side scheduling jitter.
- This is the HIP API (`hipEvent_t`, `hipEventElapsedTime`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent (`cudaEvent_t`) is covered inline by the separate nvidia-cuda skill's `stream-overlap.md`.
- Derived from the official ROCm/rocm-examples sample "HIP-Basic/events" (MIT License), tag `therock-7.14`.
