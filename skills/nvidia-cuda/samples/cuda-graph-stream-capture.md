# CUDA Graph via Stream Capture

Record a sequence of stream operations into a `cudaGraph_t` with `cudaStreamBeginCapture` / `cudaStreamEndCapture`, instantiate it once, then replay it many times with `cudaGraphLaunch` to amortize per-launch CPU overhead.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>

// Each block reduces its slice of input into one partial sum in output[blockIdx.x].
// The grid-stride loop lets a fixed-size grid cover an input of any length,
// since numBlocks * blockDim can be far smaller than n.
__global__ void reduce(const float *input, double *output, size_t n)
{
    extern __shared__ double sdata[];
    size_t tid = threadIdx.x;
    double sum = 0.0;
    for (size_t i = blockIdx.x * blockDim.x + tid; i < n; i += (size_t)blockDim.x * gridDim.x) {
        sum += (double)input[i];
    }
    sdata[tid] = sum;
    __syncthreads();
    for (size_t s = blockDim.x / 2; s > 0; s >>= 1) {
        if (tid < s) {
            sdata[tid] += sdata[tid + s];
        }
        __syncthreads();
    }
    if (tid == 0) {
        output[blockIdx.x] = sdata[0];
    }
}

// Single-block final reduction of the per-block partial sums into one scalar.
__global__ void reduceFinal(const double *partials, double *result, size_t n)
{
    extern __shared__ double sdata[];
    size_t tid = threadIdx.x;
    sdata[tid] = (tid < n) ? partials[tid] : 0.0;
    __syncthreads();
    for (size_t s = blockDim.x / 2; s > 0; s >>= 1) {
        if (tid < s) {
            sdata[tid] += sdata[tid + s];
        }
        __syncthreads();
    }
    if (tid == 0) {
        *result = sdata[0];
    }
}

int main(void)
{
    const size_t inputSize = 1 << 20;
    const size_t numBlocks = 256;
    const int graphLaunchIterations = 3;

    float *inputVec_d;
    double *outputVec_d, *result_d;
    cudaMalloc(&inputVec_d, sizeof(float) * inputSize);
    cudaMalloc(&outputVec_d, sizeof(double) * numBlocks);
    cudaMalloc(&result_d, sizeof(double));

    float *inputVec_h;
    cudaMallocHost(&inputVec_h, sizeof(float) * inputSize);
    double result_h = 0.0;

    cudaStream_t stream1;
    cudaGraph_t graph;
    cudaStreamCreate(&stream1);

    // Everything enqueued on stream1 between Begin/EndCapture becomes a
    // graph node instead of executing immediately — the calls below record
    // the topology once.
    cudaStreamBeginCapture(stream1, cudaStreamCaptureModeGlobal);
    cudaMemcpyAsync(inputVec_d, inputVec_h, sizeof(float) * inputSize, cudaMemcpyHostToDevice, stream1);
    cudaMemsetAsync(outputVec_d, 0, sizeof(double) * numBlocks, stream1);
    reduce<<<numBlocks, 256, 256 * sizeof(double), stream1>>>(inputVec_d, outputVec_d, inputSize);
    reduceFinal<<<1, 256, 256 * sizeof(double), stream1>>>(outputVec_d, result_d, numBlocks);
    cudaMemcpyAsync(&result_h, result_d, sizeof(double), cudaMemcpyDeviceToHost, stream1);
    cudaStreamEndCapture(stream1, &graph);

    // Instantiation is the expensive, one-time step (topological validation,
    // resource allocation); it must happen only once per graph shape.
    cudaGraphExec_t graphExec;
    cudaGraphInstantiate(&graphExec, graph, NULL, NULL, 0);

    cudaStream_t streamForGraph;
    cudaStreamCreate(&streamForGraph);
    for (int i = 0; i < graphLaunchIterations; ++i) {
        // Replaying the instantiated graph skips per-node CPU launch
        // overhead entirely — the whole sequence is submitted as one unit.
        cudaGraphLaunch(graphExec, streamForGraph);
    }
    cudaStreamSynchronize(streamForGraph);

    cudaGraphExecDestroy(graphExec);
    cudaGraphDestroy(graph);
    cudaStreamDestroy(stream1);
    cudaStreamDestroy(streamForGraph);
    cudaFree(inputVec_d);
    cudaFree(outputVec_d);
    cudaFree(result_d);
    cudaFreeHost(inputVec_h);
    return 0;
}
```

## Notes

- `cudaStreamBeginCapture(stream, cudaStreamCaptureModeGlobal)` switches the stream into capture mode; operations issued on it record graph nodes instead of executing, until the matching `cudaStreamEndCapture`.
- Fork/join across multiple streams during capture (recording work on a second stream that `cudaStreamWaitEvent`s on the capturing stream) is legal and produces parallel branches in the resulting graph, but this minimal example captures on a single stream for clarity.
- `cudaGraphInstantiate` performs the one-time validation and resource setup; the returned `cudaGraphExec_t` is what `cudaGraphLaunch` replays, and it can be relaunched an arbitrary number of times without re-instantiating.
- The graph and its instantiated executable are independent objects — destroying `graph` after instantiation is safe and does not invalidate `graphExec`.
- `reduce`'s grid-stride loop (`i += blockDim.x * gridDim.x`) is required because `numBlocks * blockDim.x` (256 * 256 = 65,536) is far smaller than `inputSize` (1 << 20 = 1,048,576); a single `i = blockIdx.x * blockDim.x + tid` load per thread would silently drop most of the input from the sum.
- Derived from the official NVIDIA/cuda-samples sample "simpleCudaGraphs" (`cudaGraphsUsingStreamCapture`, cpp/3_CUDA_Features), tag `v13.3`.
