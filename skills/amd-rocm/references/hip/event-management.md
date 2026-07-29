# Event Management

Events mark points in a stream's execution timeline, used for cross-stream synchronization and GPU-side timing measurement.

## Signature / Usage

```cpp
hipEvent_t start, stop;
hipEventCreate(&start);
hipEventCreate(&stop);
hipEventRecord(start, stream);
myKernel<<<grid, block, 0, stream>>>();
hipEventRecord(stop, stream);
hipEventSynchronize(stop);
float ms;
hipEventElapsedTime(&ms, start, stop);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipEventCreate(hipEvent_t* event)` | Creates a basic event object |
| `hipEventCreateWithFlags(hipEvent_t* event, unsigned int flags)` | Creates an event with flags (blocking sync, disable timing, interprocess) |
| `hipEventDestroy(hipEvent_t event)` | Releases the event; resources are freed even if its recording is incomplete |
| `hipEventRecord(hipEvent_t event, hipStream_t stream)` | Records the event at the current point in the given stream |
| `hipEventRecordWithFlags(hipEvent_t event, hipStream_t stream, unsigned int flags)` | Records an event with additional flags for stream-capture scenarios |
| `hipEventSynchronize(hipEvent_t event)` | Blocks the host until the event completes (waits for all prior work in the recording stream) |
| `hipEventQuery(hipEvent_t event)` | Non-blocking check; returns `hipSuccess` if complete, `hipErrorNotReady` if pending |
| `hipEventElapsedTime(float* ms, hipEvent_t start, hipEvent_t stop)` | Computes elapsed time between two events in milliseconds, ~1 microsecond resolution |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.

## Related

- [stream-management.md](./stream-management.md)
- [asynchronous-execution.md](./asynchronous-execution.md)
