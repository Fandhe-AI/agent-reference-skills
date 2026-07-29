# Graph Management

HIP graphs let a sequence of kernel/memory/host operations be recorded once as a DAG of nodes, instantiated, and replayed repeatedly with lower launch overhead.

## Signature / Usage

```cpp
hipGraph_t graph;
hipStreamBeginCapture(stream, hipStreamCaptureModeGlobal);
kernel<<<grid, block, 0, stream>>>();
hipStreamEndCapture(stream, &graph);
hipGraphExec_t exec;
hipGraphInstantiate(&exec, graph, nullptr, nullptr, 0);
hipGraphLaunch(exec, stream);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipGraphCreate(hipGraph_t* graph, unsigned int flags)` | Initializes a new, empty graph |
| `hipGraphDestroy(hipGraph_t graph)` | Destroys a graph |
| `hipStreamBeginCapture(hipStream_t stream, hipStreamCaptureMode mode)` | Begins recording subsequent stream operations into a graph |
| `hipStreamEndCapture(hipStream_t stream, hipGraph_t* graph)` | Finalizes capture and returns the constructed graph |
| `hipStreamGetCaptureInfo(...)` / `hipStreamIsCapturing(...)` | Queries whether/how a stream is currently capturing |
| `hipGraphAddKernelNode(...)` | Adds a kernel-launch node |
| `hipGraphAddMemcpyNode(...)` / `hipGraphAddMemsetNode(...)` | Adds a memory-copy or memory-set node |
| `hipGraphAddHostNode(...)` | Adds a node that runs a host (CPU) callback |
| `hipGraphAddEventRecordNode(...)` / `hipGraphAddEventWaitNode(...)` | Adds event-record/event-wait nodes for cross-graph synchronization |
| `hipGraphKernelNodeSetParams(...)` / `hipGraphMemcpyNodeSetParams(...)` | Updates parameters of an existing node without rebuilding the graph |
| `hipGraphInstantiate(hipGraphExec_t* pGraphExec, hipGraph_t graph, ...)` | Converts a graph definition into an executable form optimized for repeated launches |
| `hipGraphLaunch(hipGraphExec_t graphExec, hipStream_t stream)` | Submits an instantiated graph to a stream |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- The `dependencyData` parameter of `hipStreamBeginCaptureToGraph` currently must be `nullptr`.
- Documented against HIP 7.14.x (ROCm 7.x), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-07.

## Related

- [stream-management.md](./stream-management.md)
- [event-management.md](./event-management.md)
- [module-context-management.md](./module-context-management.md)
