# Programmatic Dependent Launch and Synchronization

Lets a dependent ("secondary") kernel begin executing before the primary kernel it depends on has fully completed, by having the primary kernel programmatically signal completion of its GPU-side effects (`cudaTriggerProgrammaticLaunchCompletion`) while the secondary kernel selectively blocks (`cudaGridDependencySynchronize`) only until it actually needs the primary's results.

## Signature / Usage

```cuda
__global__ void secondary_kernel() {
   // Independent work — runs concurrently with the tail of the primary kernel
   cudaGridDependencySynchronize();
   // Dependent work — safe to read primary kernel's output past this point
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaLaunchAttributeProgrammaticStreamSerialization` | Launch attribute (set via `cudaLaunchAttribute` + `cudaLaunchKernelEx`) enabling PDL between consecutive kernels on a stream. |
| `cudaTriggerProgrammaticLaunchCompletion()` | Called in the primary kernel to signal that its programmatically-visible effects are complete, allowing the secondary kernel to begin. |
| `cudaGridDependencySynchronize()` | Called in the secondary kernel to block until the primary kernel's signaled completion, before touching the primary's output. |
| `cudaLaunchAttributeProgrammaticEvent` | Launch attribute variant using an event-based trigger instead of stream serialization; `triggerAtBlockStart` controls whether the dependency fires at block start or launch completion. |
| `cudaGraphDependencyType` / `cudaGraphDependencyTypeProgrammatic` | CUDA Graphs edge type representing a PDL dependency between two kernel nodes. |
| `cudaGraphKernelNodePortProgrammatic` / `cudaGraphKernelNodePortLaunchCompletion` | Graph node "ports" a PDL edge can attach to, corresponding to `cudaTriggerProgrammaticLaunchCompletion` vs. ordinary launch completion. |
| `cudaGraphEdgeData` | Struct describing an edge's type and ports when adding PDL dependencies to a `cudaGraph_t`. |

## Notes

- PDL overlaps the "tail" of the primary kernel (after its GPU-visible effects are done but before all its threads have exited) with the "head" of the secondary kernel's independent work, improving latency versus a hard kernel boundary.
- If the primary kernel never calls `cudaTriggerProgrammaticLaunchCompletion()`, the secondary kernel's `cudaGridDependencySynchronize()` waits for ordinary launch completion instead — PDL degrades gracefully.
- In CUDA Graphs, PDL is expressed by attaching `cudaGraphDependencyTypeProgrammatic` edges with the corresponding port, rather than by relying on stream capture attributes.

## Related

- [Advanced CUDA APIs and Features](../core/advanced-host-programming.md)
- [CUDA Graphs](./cuda-graphs.md)
