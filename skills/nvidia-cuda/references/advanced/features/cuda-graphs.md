# CUDA Graphs

Represents a sequence of CUDA operations (kernel launches, memcpy, memset, host callbacks) and their dependencies as a graph object, so the whole sequence can be defined once and launched repeatedly with lower CPU launch overhead than issuing each operation individually.

## Signature / Usage

```c
cudaGraph_t graph;
cudaStreamBeginCapture(stream, cudaStreamCaptureModeGlobal);
kernel_A<<<grid, block, 0, stream>>>(...);
kernel_B<<<grid, block, 0, stream>>>(...);
kernel_C<<<grid, block, 0, stream>>>(...);
cudaStreamEndCapture(stream, &graph);

cudaGraphExec_t graphExec;
cudaGraphInstantiate(&graphExec, graph, NULL, NULL, 0);
cudaGraphLaunch(graphExec, stream);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaGraphCreate` / `cudaGraphAddKernelNode` / `cudaGraphAddMemcpyNode` / `cudaGraphAddMemsetNode` / `cudaGraphAddHostNode` | Explicit graph construction API: builds a `cudaGraph_t` by adding typed nodes directly. |
| `cudaStreamBeginCapture` / `cudaStreamEndCapture` / `cudaStreamIsCapturing` | Stream capture API: records operations issued to a stream into a `cudaGraph_t` instead of executing them immediately. |
| `cudaStreamBeginCaptureToGraph` / `cudaStreamGetCaptureInfo` / `cudaStreamUpdateCaptureDependencies` | Advanced capture control for building a graph incrementally across multiple captured regions. |
| `cudaGraphInstantiate` / `cudaGraphInstantiateWithParams` | Converts a `cudaGraph_t` into an executable `cudaGraphExec_t`. Flags include `cudaGraphInstantiateFlagAutoFreeOnLaunch`, `cudaGraphInstantiateFlagDeviceLaunch`, `cudaGraphInstantiateFlagUpload`. |
| `cudaGraphLaunch` | Launches an instantiated `cudaGraphExec_t` onto a stream. |
| `cudaGraphUpload` | Uploads a `cudaGraphExec_t`'s data to the device ahead of the first launch, hiding upload latency. |
| `cudaGraphExecUpdate` | Updates a whole instantiated graph in place from a new `cudaGraph_t`, avoiding re-instantiation. |
| `cudaGraphExecKernelNodeSetParams` (and `Memcpy`/`Memset`/`Host`/`ChildGraph`/`EventRecord`/`EventWait`/`ExternalSemaphoresSignal`/`ExternalSemaphoresWait` variants) | Updates parameters of one node in an already-instantiated graph without rebuilding it. |
| `cudaGraphNodeSetEnabled` / `cudaGraphNodeGetEnabled` | Enables/disables an individual node in an instantiated graph without removing it. |
| `cudaGraphConditionalHandleCreate` + `cudaGraphCondTypeIf` / `_While` / `_Switch` | Conditional graph nodes: a node's subgraph executes only if a device-set condition handle matches the condition type. |
| `cudaGraphNodeTypeMemAlloc` / `_MemFree` | Graph memory nodes: allocate/free device memory as part of the graph itself, with lifetime tied to graph execution. |
| `cudaDeviceGraphMemTrim` / `cudaDeviceGetGraphMemAttribute` (`cudaGraphMemAttrReservedMemCurrent` / `_UsedMemCurrent`) | Query and trim the physical memory footprint retained by graph memory nodes. |
| `cudaStreamGraphFireAndForget` / `cudaStreamGraphTailLaunch` / `cudaStreamGraphFireAndForgetAsSibling` | Named device-side streams used to launch further graphs from within a device graph (device graph launch). |

## Notes

- Stream capture is the common way to build a graph from existing code: operations issued to a stream between `cudaStreamBeginCapture` and `cudaStreamEndCapture` are recorded, not executed, and become graph nodes.
- A `cudaGraph_t` is not thread-safe, and a `cudaGraphExec_t` instance cannot run concurrently with itself — launch it onto a stream and let normal stream ordering serialize repeat launches.
- Prefer `cudaGraphExecUpdate` or per-node `cudaGraphExecKernelNodeSetParams`-style calls over re-instantiating when only parameters change between launches — instantiation has non-trivial CPU cost.
- Device graph launch (`cudaGraphInstantiateFlagDeviceLaunch`) lets a kernel itself launch a child graph via `cudaGraphLaunch`'s device-side overload, using `cudaGetCurrentGraphExec()` to identify the currently running graph.
- CUDA User Objects provide reference-counted lifetime management for resources (e.g., host-allocated buffers) referenced by asynchronous graph nodes so they survive as long as needed by the graph.

## Related

- [Programmatic Dependent Launch and Synchronization](./programmatic-dependent-launch.md)
- [Stream-Ordered Memory Allocator](./stream-ordered-memory-allocation.md)
- [Advanced CUDA APIs and Features](../core/advanced-host-programming.md)
