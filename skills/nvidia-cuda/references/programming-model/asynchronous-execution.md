# Asynchronous Execution

Covers asynchronous concurrent execution, CUDA streams and events, stream callbacks, stream ordering, and default-stream behavior.

## Signature / Usage

```cuda
cudaStream_t stream;        // Stream handle
cudaStreamCreate(&stream);  // Create a new stream

// stream based operations ...

cudaStreamDestroy(stream);  // Destroy the stream
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `cudaStream_t` | type | A work-queue abstraction enabling sequential ordering of operations |
| `cudaStreamCreate(&stream)` / `cudaStreamDestroy(stream)` | function | Creates / destroys a stream |
| `cudaMemcpyAsync()` | function | Issues an asynchronous memory transfer on a stream |
| `cudaStreamSynchronize()` / `cudaStreamQuery()` | function | Blocks until a stream's work completes / checks completion without blocking |
| `cudaEventRecord()` | function | Inserts an event marker into a stream for dependency tracking or timing |
| `cudaEventSynchronize()` / `cudaEventQuery()` | function | Blocks until an event completes / checks completion without blocking |
| `cudaMallocHost()` | function | Allocates pinned, page-locked host memory, required for asynchronous host↔device memory copies |
| `--default-stream per-thread` | compiler option | Selects the per-thread default stream, removing the legacy default stream's implicit synchronization with all blocking streams |

## Notes

- Streams provide in-order (stream-ordered) execution semantics: an operation in a stream cannot leap-frog other operations already queued in that same stream.
- For memory copies involving CPU memory to be carried out asynchronously, the host buffers must be pinned and page-locked (allocated via `cudaMallocHost()`).
- The legacy default stream is a blocking stream that synchronizes with all other blocking streams; compiling with `--default-stream per-thread` gives each host thread its own default stream instead, removing this cross-stream synchronization.
- Explicit synchronization is achieved via `cudaStreamSynchronize()` / `cudaEventSynchronize()` / `cudaDeviceSynchronize()`; implicit synchronization can also occur as a side effect of certain other CUDA API calls.

## Related

- [Programming Model](./programming-model.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Unified and System Memory](./understanding-memory.md)
