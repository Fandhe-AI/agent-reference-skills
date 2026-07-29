# HIP Graph Explicit Nodes

Build a `hipGraph_t` node-by-node with `hipGraphAddKernelNode`, `hipGraphAddMemcpyNode1D`, and friends, wiring explicit dependency arrays between nodes instead of relying on stream capture.

```cpp
#include <hip/hip_runtime.h>
#include <cstddef>
#include <vector>

__global__ void kernelA(double* arrayA, std::size_t size)
{
    const std::size_t x = threadIdx.x + blockDim.x * blockIdx.x;
    if (x < size) arrayA[x] *= 2.0;
}

int main()
{
    constexpr int numOfBlocks     = 1024;
    constexpr int threadsPerBlock = 1024;
    std::size_t arraySize = 1U << 20;
    std::vector<double> h_array(arraySize, 2.0);

    hipGraph_t graph;
    hipGraphCreate(&graph, 0);

    // A mem-alloc node reserves device memory as part of the graph itself;
    // its resulting pointer is read back from allocParams.dptr after adding.
    hipMemAllocNodeParams allocArrayAParams{};
    allocArrayAParams.poolProps.allocType         = hipMemAllocationTypePinned;
    allocArrayAParams.poolProps.location.type     = hipMemLocationTypeDevice;
    allocArrayAParams.poolProps.location.id       = 0;
    allocArrayAParams.bytesize                    = arraySize * sizeof(double);

    hipGraphNode_t allocNodeA;
    hipGraphAddMemAllocNode(&allocNodeA, graph, nullptr, 0, &allocArrayAParams);

    // The copy node explicitly depends on the allocation node: it cannot
    // run until allocNodeA has produced a valid device pointer.
    hipGraphNode_t cpyNodeDependencies[] = {allocNodeA};
    hipGraphNode_t cpyToDevNode;
    hipGraphAddMemcpyNode1D(&cpyToDevNode, graph, cpyNodeDependencies, 1,
                             allocArrayAParams.dptr, h_array.data(),
                             arraySize * sizeof(double), hipMemcpyHostToDevice);

    hipKernelNodeParams kernelAParams{};
    void* kernelAArgs[] = {&allocArrayAParams.dptr, static_cast<void*>(&arraySize)};
    kernelAParams.func          = reinterpret_cast<void*>(kernelA);
    kernelAParams.gridDim       = numOfBlocks;
    kernelAParams.blockDim      = threadsPerBlock;
    kernelAParams.sharedMemBytes = 0;
    kernelAParams.kernelParams  = kernelAArgs;
    kernelAParams.extra         = nullptr;

    // The kernel node depends on the copy node: it needs the host values
    // to have already reached device memory.
    hipGraphNode_t kernelANode;
    hipGraphAddKernelNode(&kernelANode, graph, &cpyToDevNode, 1, &kernelAParams);

    hipGraphNode_t cpyBackDependencies[] = {kernelANode};
    hipGraphNode_t cpyToHostNode;
    hipGraphAddMemcpyNode1D(&cpyToHostNode, graph, cpyBackDependencies, 1,
                             h_array.data(), allocArrayAParams.dptr,
                             arraySize * sizeof(double), hipMemcpyDeviceToHost);

    // The free node depends on the copy-back: the allocation must not be
    // released until its contents have been read back to the host.
    hipGraphNode_t freeNodeDependencies[] = {cpyToHostNode};
    hipGraphNode_t freeNodeA;
    hipGraphAddMemFreeNode(&freeNodeA, graph, freeNodeDependencies, 1, allocArrayAParams.dptr);

    hipGraphExec_t graphExec;
    hipGraphInstantiate(&graphExec, graph, nullptr, nullptr, 0);
    hipGraphDestroy(graph);

    hipStream_t stream;
    hipStreamCreate(&stream);
    hipGraphLaunch(graphExec, stream);
    hipStreamSynchronize(stream);

    hipGraphExecDestroy(graphExec);
    hipStreamDestroy(stream);
    return 0;
}
```

## Notes

- Each `hipGraphAdd*Node` call takes an explicit array of predecessor nodes as its dependency list; the graph's execution order is entirely determined by these arrays, not by call order.
- A `hipGraphAddMemAllocNode` node's resulting device pointer is available in the node-params struct's `dptr` field immediately after the add call, and can be referenced by dependent nodes (copy, kernel) added afterward.
- Explicit node construction gives finer control than stream capture (e.g. non-linear dependency graphs, conditional structure) at the cost of more verbose setup code.
- This is the HIP API (`hipGraphAddKernelNode`, `hipGraphAddMemcpyNode1D`, `hipGraphNode_t`) for AMD GPUs, not the CUDA API of the same shape; the CUDA equivalent is covered by the separate nvidia-cuda skill's `cuda-graph-explicit-nodes.md`.
- Derived from the official ROCm/rocm-examples sample "HIP-Doc/.../HIP-Graphs/graph_creation" (MIT License), tag `therock-7.14`.
