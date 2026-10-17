# CUDA Graph via Explicit Node Construction

Build a `cudaGraph_t` node-by-node with the unified `cudaGraphAddNode` and a `cudaGraphNodeParams` struct, wiring dependencies explicitly instead of inferring them from stream-capture order.

```cpp
#include <cub/cub.cuh>
#include <cuda_runtime.h>
#include <cstdio>
#include <cstdlib>
#include <vector>

#define THREADS_PER_BLOCK 512

typedef struct callBackData
{
    const char *fn_name;
    double     *data;
} callBackData_t;

// Host-callback node body: prints the reduced result, then resets it for the next launch.
inline void CUDART_CB myHostNodeCallback(void *data)
{
    callBackData_t *tmp    = (callBackData_t *)(data);
    double         *result = (double *)(tmp->data);
    printf("[%s] Host callback final reduced sum = %lf\n", tmp->fn_name, *result);
    *result = 0.0;
}

// Pass 1: reduce the input float vector to one partial sum per block.
__global__ void reduce(float *inputVec, double *outputVec, size_t inputSize, size_t outputSize)
{
    typedef cub::BlockReduce<double, THREADS_PER_BLOCK> BlockReduceT;
    __shared__ typename BlockReduceT::TempStorage temp_storage;

    size_t globaltid = blockIdx.x * blockDim.x + threadIdx.x;
    double temp_sum = 0.0;
    for (size_t i = globaltid; i < inputSize; i += (size_t)gridDim.x * blockDim.x)
        temp_sum += (double)inputVec[i];

    double block_sum = BlockReduceT(temp_storage).Sum(temp_sum);
    if (threadIdx.x == 0 && blockIdx.x < outputSize)
        outputVec[blockIdx.x] = block_sum;
}

// Pass 2: reduce the per-block partial sums to a single scalar result.
__global__ void reduceFinal(double *inputVec, double *result, size_t inputSize)
{
    typedef cub::BlockReduce<double, THREADS_PER_BLOCK> BlockReduceT;
    __shared__ typename BlockReduceT::TempStorage temp_storage;

    size_t globaltid = blockIdx.x * blockDim.x + threadIdx.x;
    double temp_sum = 0.0;
    for (size_t i = globaltid; i < inputSize; i += (size_t)gridDim.x * blockDim.x)
        temp_sum += (double)inputVec[i];

    double block_sum = BlockReduceT(temp_storage).Sum(temp_sum);
    if (threadIdx.x == 0)
        result[0] = block_sum;
}

void cudaGraphsManual(float *inputVec_h, float *inputVec_d, double *outputVec_d,
                      double *result_d, size_t inputSize, size_t numOfBlocks)
{
    cudaStream_t                 streamForGraph;
    cudaGraph_t                  graph;
    std::vector<cudaGraphNode_t> nodeDependencies;
    cudaGraphNode_t              memcpyNode, kernelNode;
    double                       result_h = 0.0;

    cudaStreamCreate(&streamForGraph);

    // cudaGraphAddNode is the unified node-creation API: one call for every node type,
    // driven by a cudaGraphNodeParams struct (a .type tag + a union of per-type params).
    // The struct has reserved fields that must be zero, so re-zero it with "= {}" per node.
    cudaGraphNodeParams nodeParams   = {};
    cudaMemcpy3DParms   memcpyParams = {0};

    memcpyParams.srcPtr = make_cudaPitchedPtr(inputVec_h, sizeof(float) * inputSize, inputSize, 1);
    memcpyParams.dstPtr = make_cudaPitchedPtr(inputVec_d, sizeof(float) * inputSize, inputSize, 1);
    memcpyParams.extent = make_cudaExtent(sizeof(float) * inputSize, 1, 1);
    memcpyParams.kind   = cudaMemcpyHostToDevice;

    cudaGraphCreate(&graph, 0);

    // Node 1: H2D memcpy — no dependencies (NULL, 0). The copy descriptor
    // nests in nodeParams.memcpy.copyParams.
    nodeParams                   = {};
    nodeParams.type              = cudaGraphNodeTypeMemcpy;
    nodeParams.memcpy.copyParams = memcpyParams;
    cudaGraphAddNode(&memcpyNode, graph, NULL, /*dependencyData=*/NULL, 0, &nodeParams);
    nodeDependencies.push_back(memcpyNode);

    void *kernelArgs[4] = {(void *)&inputVec_d, (void *)&outputVec_d, &inputSize, &numOfBlocks};

    // Node 2: first reduction kernel — depends on the H2D memcpy.
    nodeParams                       = {};
    nodeParams.type                  = cudaGraphNodeTypeKernel;
    nodeParams.kernel.func           = (void *)reduce;
    nodeParams.kernel.gridDim        = dim3(numOfBlocks, 1, 1);
    nodeParams.kernel.blockDim       = dim3(THREADS_PER_BLOCK, 1, 1);
    nodeParams.kernel.sharedMemBytes = 0;
    nodeParams.kernel.kernelParams   = (void **)kernelArgs;
    nodeParams.kernel.extra          = NULL;
    cudaGraphAddNode(&kernelNode, graph, nodeDependencies.data(), /*dependencyData=*/NULL,
                     nodeDependencies.size(), &nodeParams);
    nodeDependencies.clear();
    nodeDependencies.push_back(kernelNode);

    void *kernelArgs2[3] = {(void *)&outputVec_d, (void *)&result_d, &numOfBlocks};

    // Node 3: final reduction kernel — depends on Node 2.
    nodeParams                       = {};
    nodeParams.type                  = cudaGraphNodeTypeKernel;
    nodeParams.kernel.func           = (void *)reduceFinal;
    nodeParams.kernel.gridDim        = dim3(1, 1, 1);
    nodeParams.kernel.blockDim       = dim3(THREADS_PER_BLOCK, 1, 1);
    nodeParams.kernel.sharedMemBytes = 0;
    nodeParams.kernel.kernelParams   = kernelArgs2;
    nodeParams.kernel.extra          = NULL;
    cudaGraphAddNode(&kernelNode, graph, nodeDependencies.data(), /*dependencyData=*/NULL,
                     nodeDependencies.size(), &nodeParams);
    nodeDependencies.clear();
    nodeDependencies.push_back(kernelNode);

    memset(&memcpyParams, 0, sizeof(memcpyParams));
    memcpyParams.srcPtr = make_cudaPitchedPtr(result_d, sizeof(double), 1, 1);
    memcpyParams.dstPtr = make_cudaPitchedPtr(&result_h, sizeof(double), 1, 1);
    memcpyParams.extent = make_cudaExtent(sizeof(double), 1, 1);
    memcpyParams.kind   = cudaMemcpyDeviceToHost;

    // Node 4: D2H memcpy — copies the scalar result back to the host.
    nodeParams                   = {};
    nodeParams.type              = cudaGraphNodeTypeMemcpy;
    nodeParams.memcpy.copyParams = memcpyParams;
    cudaGraphAddNode(&memcpyNode, graph, nodeDependencies.data(), /*dependencyData=*/NULL,
                     nodeDependencies.size(), &nodeParams);
    nodeDependencies.clear();
    nodeDependencies.push_back(memcpyNode);

    cudaGraphNode_t hostNode;
    callBackData_t  hostFnData;
    hostFnData.data    = &result_h;
    hostFnData.fn_name = "cudaGraphsManual";

    // Node 5: host callback — runs on the CPU after the D2H copy completes.
    // The .host member is cudaHostNodeParamsV2 (fn + userData, plus a syncMode field
    // left at 0 by the zero-init above).
    nodeParams               = {};
    nodeParams.type          = cudaGraphNodeTypeHost;
    nodeParams.host.fn       = myHostNodeCallback;
    nodeParams.host.userData = &hostFnData;
    cudaGraphAddNode(&hostNode, graph, nodeDependencies.data(), /*dependencyData=*/NULL,
                     nodeDependencies.size(), &nodeParams);

    cudaGraphExec_t graphExec;
    cudaGraphInstantiate(&graphExec, graph, NULL, NULL, 0);

    // Refill the host input before each launch so the H2D copy node processes new data.
    for (int i = 0; i < 3; i++) {
        for (size_t j = 0; j < inputSize; j++)
            inputVec_h[j] = (rand() & 0xFF) / (float)RAND_MAX;
        cudaGraphLaunch(graphExec, streamForGraph);
        cudaStreamSynchronize(streamForGraph);
    }

    cudaGraphExecDestroy(graphExec);
    cudaGraphDestroy(graph);
    cudaStreamDestroy(streamForGraph);
}

int main()
{
    size_t size      = 1 << 24;
    size_t maxBlocks = 512;

    float  *inputVec_h = NULL, *inputVec_d = NULL;
    double *outputVec_d = NULL, *result_d = NULL;

    cudaMallocHost(&inputVec_h, sizeof(float) * size);
    cudaMalloc(&inputVec_d, sizeof(float) * size);
    cudaMalloc(&outputVec_d, sizeof(double) * maxBlocks);
    cudaMalloc(&result_d, sizeof(double));

    cudaGraphsManual(inputVec_h, inputVec_d, outputVec_d, result_d, size, maxBlocks);

    cudaFree(inputVec_d);
    cudaFree(outputVec_d);
    cudaFree(result_d);
    cudaFreeHost(inputVec_h);
    return EXIT_SUCCESS;
}
```

## Notes

- Every node is created with the same `cudaGraphAddNode(&node, graph, dependencies, /*dependencyData=*/NULL, numDependencies, &nodeParams)` call; the node kind is selected by `nodeParams.type` (`cudaGraphNodeTypeMemcpy` / `cudaGraphNodeTypeKernel` / `cudaGraphNodeTypeHost`) and the per-type fields live in the matching union member (`.memcpy.copyParams`, `.kernel`, `.host`).
- Migration: v13.3 of this sample used the per-type calls `cudaGraphAddMemcpyNode` / `cudaGraphAddKernelNode` / `cudaGraphAddHostNode`; v13.4 replaces them with `cudaGraphAddNode`. Reset `nodeParams` with `= {}` before each node because the struct has reserved fields that must be zero.
- A node waits for every node in its dependency array; an empty array (`NULL, 0`) makes it a root that can start as soon as the graph launches.
- Host-callback state: `myHostNodeCallback` resets `*result` to `0.0` after printing, and the host input is refilled before each `cudaGraphLaunch`, so one instantiated graph processes new data on every launch.
- In v13.4 the original `simpleCudaGraphs.cu` is split into `simpleCudaGraphs_capture.cu` and `simpleCudaGraphs_explicit.cu`, sharing the kernels, callback and `THREADS_PER_BLOCK` via `simpleCudaGraphs.cuh`; this page inlines the shared pieces to stay self-contained. The upstream explicit sample also demonstrates `cudaGraphClone` (omitted here).
- Derived from the official NVIDIA/cuda-samples sample "simpleCudaGraphs_explicit.cu" (`cudaGraphsManual`, cpp/3_CUDA_Features), tag `v13.4`.
