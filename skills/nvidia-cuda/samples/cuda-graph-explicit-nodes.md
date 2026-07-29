# CUDA Graph via Explicit Node Construction

Build a `cudaGraph_t` node-by-node with `cudaGraphAddKernelNode` / `cudaGraphAddMemcpyNode` / `cudaGraphAddHostNode`, wiring dependencies explicitly instead of inferring them from stream-capture order.

```cpp
#include <cuda_runtime.h>
#include <stdio.h>
#include <vector>

// Each block reduces its slice of input into one partial sum in output[blockIdx.x].
__global__ void reduce(const float *input, double *output, size_t n)
{
    extern __shared__ double sdata[];
    size_t tid = threadIdx.x;
    size_t i = blockIdx.x * blockDim.x + tid;
    sdata[tid] = (i < n) ? (double)input[i] : 0.0;
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

void CUDART_CB hostCallback(void *userData)
{
    double *result = (double *)userData;
    printf("host node saw result = %f\n", *result);
}

int main(void)
{
    const size_t inputSize = 1 << 20;
    const size_t numBlocks = 256;

    float *inputVec_d;
    double *outputVec_d, *result_d;
    cudaMalloc(&inputVec_d, sizeof(float) * inputSize);
    cudaMalloc(&outputVec_d, sizeof(double) * numBlocks);
    cudaMalloc(&result_d, sizeof(double));

    float *inputVec_h;
    cudaMallocHost(&inputVec_h, sizeof(float) * inputSize);
    double result_h = 0.0;

    cudaGraph_t graph;
    cudaGraphCreate(&graph, 0);

    cudaMemcpy3DParms memcpyParams = {0};
    memcpyParams.srcPtr = make_cudaPitchedPtr(inputVec_h, sizeof(float) * inputSize, inputSize, 1);
    memcpyParams.dstPtr = make_cudaPitchedPtr(inputVec_d, sizeof(float) * inputSize, inputSize, 1);
    memcpyParams.extent = make_cudaExtent(sizeof(float) * inputSize, 1, 1);
    memcpyParams.kind   = cudaMemcpyHostToDevice;

    cudaGraphNode_t memcpyNode;
    // No dependency array (NULL, 0): this node has no predecessors, so it
    // can run as soon as the graph is launched.
    cudaGraphAddMemcpyNode(&memcpyNode, graph, NULL, 0, &memcpyParams);

    void *kernelArgs[3] = {(void *)&inputVec_d, (void *)&outputVec_d, (void *)&inputSize};
    cudaKernelNodeParams reduceParams = {0};
    reduceParams.func           = (void *)reduce;
    reduceParams.gridDim        = dim3((unsigned int)numBlocks, 1, 1);
    reduceParams.blockDim       = dim3(256, 1, 1);
    reduceParams.sharedMemBytes = 256 * sizeof(double);
    reduceParams.kernelParams   = kernelArgs;

    cudaGraphNode_t reduceNode;
    cudaGraphNode_t reduceDeps[] = {memcpyNode};
    // Explicitly declares "reduceNode depends on memcpyNode" — the graph
    // scheduler will not start it until memcpyNode has completed.
    cudaGraphAddKernelNode(&reduceNode, graph, reduceDeps, 1, &reduceParams);

    void *finalArgs[3] = {(void *)&outputVec_d, (void *)&result_d, (void *)&numBlocks};
    cudaKernelNodeParams finalParams = {0};
    finalParams.func           = (void *)reduceFinal;
    finalParams.gridDim        = dim3(1, 1, 1);
    finalParams.blockDim       = dim3(256, 1, 1);
    finalParams.sharedMemBytes = 256 * sizeof(double);
    finalParams.kernelParams   = finalArgs;

    cudaGraphNode_t finalNode;
    cudaGraphNode_t finalDeps[] = {reduceNode};
    cudaGraphAddKernelNode(&finalNode, graph, finalDeps, 1, &finalParams);

    cudaHostNodeParams hostParams = {0};
    hostParams.fn       = hostCallback;
    hostParams.userData = &result_h;

    cudaGraphNode_t hostNode;
    cudaGraphNode_t hostDeps[] = {finalNode};
    cudaGraphAddHostNode(&hostNode, graph, hostDeps, 1, &hostParams);

    cudaGraphExec_t graphExec;
    cudaGraphInstantiate(&graphExec, graph, NULL, NULL, 0);

    cudaStream_t streamForGraph;
    cudaStreamCreate(&streamForGraph);
    cudaGraphLaunch(graphExec, streamForGraph);
    cudaStreamSynchronize(streamForGraph);

    cudaGraphExecDestroy(graphExec);
    cudaGraphDestroy(graph);
    cudaStreamDestroy(streamForGraph);
    cudaFree(inputVec_d);
    cudaFree(outputVec_d);
    cudaFree(result_d);
    cudaFreeHost(inputVec_h);
    return 0;
}
```

## Notes

- Each `cudaGraphAdd*Node` call takes an explicit dependency array (e.g. `reduceDeps = {memcpyNode}`); the graph scheduler only starts a node once every node in its dependency array has completed, independent of the order nodes were added.
- A node with an empty dependency array (`NULL, 0`) has no predecessors and is eligible to run immediately when the graph launches, so multiple independent root nodes execute concurrently if hardware resources allow.
- `cudaGraphAddHostNode` runs its callback on a CPU thread once its GPU-side dependencies complete — useful for triggering host-side bookkeeping (logging, moving to the next batch) synchronized to graph progress without a blocking `cudaStreamSynchronize`.
- Rebuilding node parameters and calling `cudaGraphAddKernelNode` again for a changed launch configuration is possible via `cudaGraphExecKernelNodeSetParams` for cheap re-instantiation, avoiding a full graph rebuild when only e.g. kernel arguments change between launches.
- Derived from the official NVIDIA/cuda-samples sample "simpleCudaGraphs" (`cudaGraphsManual`, cpp/3_CUDA_Features), tag `v13.3`.
