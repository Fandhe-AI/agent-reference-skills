# Asynchronous Execution

HIP operations enqueue asynchronously onto streams by default, enabling overlap between kernel execution and host/device data transfer.

## Signature / Usage

```cpp
hipStream_t s1, s2;
hipStreamCreateWithFlags(&s1, hipStreamNonBlocking);
hipStreamCreateWithFlags(&s2, hipStreamNonBlocking);
hipMemcpyAsync(dDst, hSrcPinned, size, hipMemcpyHostToDevice, s1);
kernel<<<grid, block, 0, s2>>>(); // may overlap with the copy on s1
```

## Options / Props

| Concept | Description |
| --- | --- |
| Default stream (`hipStreamDefault`) | Blocking; serializes task execution within the stream |
| Non-blocking stream (`hipStreamNonBlocking`) | Allows concurrent execution of operations without waiting on legacy default-stream ordering |
| `hipMemcpyAsync()` | Enqueues an asynchronous copy, allowing data movement to proceed while a kernel runs, when no data dependency exists |
| Pinned (page-locked) host memory | Required for optimal async transfer bandwidth; devices report support via `asyncEngineCount > 0` |
| `hipStreamWaitEvent()` | Establishes ordering across streams; a stream's future work waits for an event recorded on another stream, without blocking currently running work |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Overlap requires no data dependency between the concurrent operations; use `hipStreamWaitEvent` to encode any dependency explicitly rather than relying on stream order.

## Related

- [stream-management.md](./stream-management.md)
- [event-management.md](./event-management.md)
- [host-memory.md](./host-memory.md)
