# Stream Overlap with Event Timing

Split work across multiple `cudaStream_t` so device-to-host transfers and kernel launches overlap instead of serializing, and measure the effect with `cudaEvent_t` timers.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>

__global__ void increment(int *g_data, int inc_value)
{
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    g_data[idx] = g_data[idx] + inc_value;
}

int main(void)
{
    const int n = 1 << 20;
    const int nstreams = 4;
    size_t bytes = n * sizeof(int);

    int *h_data = NULL;
    cudaHostAlloc((void **)&h_data, bytes, cudaHostAllocDefault);
    int *d_data = NULL;
    cudaMalloc((void **)&d_data, bytes);
    cudaMemset(d_data, 0, bytes);

    cudaStream_t streams[nstreams];
    for (int i = 0; i < nstreams; ++i) {
        cudaStreamCreate(&streams[i]);
    }

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    dim3 threads(512);
    dim3 blocks(n / (nstreams * threads.x));

    cudaEventRecord(start, 0);
    // Each stream owns a disjoint slice of d_data/h_data, so its kernel
    // launch and its device-to-host copy can run concurrently with the
    // other streams' work — the GPU has no correctness-relevant ordering
    // to enforce across streams here.
    for (int i = 0; i < nstreams; ++i) {
        int *streamData = d_data + i * n / nstreams;
        increment<<<blocks, threads, 0, streams[i]>>>(streamData, 1);
        cudaMemcpyAsync(h_data + i * n / nstreams, streamData, bytes / nstreams, cudaMemcpyDeviceToHost, streams[i]);
    }
    cudaEventRecord(stop, 0);
    cudaEventSynchronize(stop);

    float elapsedMs = 0.0f;
    cudaEventElapsedTime(&elapsedMs, start, stop);
    printf("elapsed: %.2f ms\n", elapsedMs);

    for (int i = 0; i < nstreams; ++i) {
        cudaStreamDestroy(streams[i]);
    }
    cudaEventDestroy(start);
    cudaEventDestroy(stop);
    cudaFree(d_data);
    cudaFreeHost(h_data);
    return 0;
}
```

## Notes

- Work must be partitioned into disjoint memory regions per stream (`streamData = d_data + i * n / nstreams`); issuing overlapping regions from different streams reintroduces the race the streams were meant to avoid.
- `cudaEventRecord(event, 0)` records into the default (legacy) stream; timing spans that include multiple non-default streams still work because `cudaEventSynchronize` waits for the event regardless of which stream recorded it, as long as the recorded event is after all the work of interest.
- `cudaEventElapsedTime` requires both events to have completed — call `cudaEventSynchronize(stop)` (or a device sync) before reading the elapsed time, otherwise the result is undefined.
- The host array must be pinned (`cudaHostAlloc`) for the `cudaMemcpyAsync` calls to actually overlap with kernel execution across streams; a pageable host pointer forces an implicit synchronous copy.
- Derived from the official NVIDIA/cuda-samples sample "simpleStreams" (cpp/0_Introduction), tag `v13.3`.
