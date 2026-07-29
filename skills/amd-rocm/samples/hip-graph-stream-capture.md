# HIP Graph Stream Capture

Record a sequence of asynchronous operations on a stream into a `hipGraph_t` with `hipStreamBeginCapture`/`hipStreamEndCapture`, then instantiate and replay it with `hipGraphLaunch`.

```cpp
#include <hip/hip_runtime.h>
#include <cstddef>
#include <vector>

__global__ void kernelA(double* arrayA, std::size_t size)
{
    const std::size_t x = threadIdx.x + blockDim.x * blockIdx.x;
    if (x < size) arrayA[x] *= 2.0;
}

__global__ void kernelB(int* arrayB, std::size_t size)
{
    const std::size_t x = threadIdx.x + blockDim.x * blockIdx.x;
    if (x < size) arrayB[x] = 3;
}

__global__ void kernelC(double* arrayA, const int* arrayB, std::size_t size)
{
    const std::size_t x = threadIdx.x + blockDim.x * blockIdx.x;
    if (x < size) arrayA[x] += arrayB[x];
}

int main()
{
    constexpr int numOfBlocks     = 1024;
    constexpr int threadsPerBlock = 1024;
    constexpr std::size_t arraySize = 1U << 20;

    double* d_arrayA;
    int* d_arrayB;
    std::vector<double> h_array(arraySize, 2.0);

    hipStream_t captureStream;
    hipStreamCreate(&captureStream);

    // Every hip call issued on captureStream between Begin/EndCapture is
    // recorded as a graph node instead of being executed immediately.
    hipStreamBeginCapture(captureStream, hipStreamCaptureModeGlobal);

    hipMallocAsync(reinterpret_cast<void**>(&d_arrayA), arraySize * sizeof(double), captureStream);
    hipMallocAsync(reinterpret_cast<void**>(&d_arrayB), arraySize * sizeof(int), captureStream);
    hipMemcpyAsync(d_arrayA, h_array.data(), arraySize * sizeof(double), hipMemcpyHostToDevice, captureStream);

    kernelA<<<numOfBlocks, threadsPerBlock, 0, captureStream>>>(d_arrayA, arraySize);
    kernelB<<<numOfBlocks, threadsPerBlock, 0, captureStream>>>(d_arrayB, arraySize);
    kernelC<<<numOfBlocks, threadsPerBlock, 0, captureStream>>>(d_arrayA, d_arrayB, arraySize);

    hipMemcpyAsync(h_array.data(), d_arrayA, arraySize * sizeof(double), hipMemcpyDeviceToHost, captureStream);
    hipFreeAsync(d_arrayA, captureStream);
    hipFreeAsync(d_arrayB, captureStream);

    hipGraph_t graph;
    hipStreamEndCapture(captureStream, &graph);

    // Instantiate compiles the recorded graph into an executable form that
    // can be launched repeatedly without re-recording it each time.
    hipGraphExec_t graphExec;
    hipGraphInstantiate(&graphExec, graph, nullptr, nullptr, 0);
    hipGraphDestroy(graph); // the template is no longer needed after instantiation

    // The launch stream does not have to be the one used for capture.
    hipGraphLaunch(graphExec, captureStream);
    hipStreamSynchronize(captureStream);

    hipGraphExecDestroy(graphExec);
    hipStreamDestroy(captureStream);
    return 0;
}
```

## Notes

- Operations between `hipStreamBeginCapture` and `hipStreamEndCapture` are not executed at capture time — they are only recorded as graph nodes; execution happens later via `hipGraphLaunch`.
- `hipGraphInstantiate` produces a `hipGraphExec_t` that can be launched many times with `hipGraphLaunch`, amortizing the recording cost and reducing per-launch CPU overhead versus re-issuing each call individually.
- The `hipGraph_t` template can be destroyed (`hipGraphDestroy`) right after instantiation; only the `hipGraphExec_t` is needed for subsequent launches.
- This is the HIP API (`hipStreamBeginCapture`, `hipGraphInstantiate`, `hipGraphLaunch`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent (`cudaStreamBeginCapture`/`cudaGraphLaunch`) is covered by the separate nvidia-cuda skill's `cuda-graph-stream-capture.md`.
- Derived from the official ROCm/rocm-examples sample "HIP-Doc/.../HIP-Graphs/graph_capture" (MIT License), tag `therock-7.14`.
