# Stream Management

Streams are FIFO command queues that hold asynchronous kernel launches, memory operations, and callbacks; independent streams may execute concurrently.

## Signature / Usage

```cpp
hipStream_t stream;
hipStreamCreateWithFlags(&stream, hipStreamNonBlocking);
myKernel<<<grid, block, 0, stream>>>(args...);
hipStreamSynchronize(stream);
hipStreamDestroy(stream);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipStreamCreate(hipStream_t* stream)` | Creates an asynchronous stream on the current device |
| `hipStreamCreateWithFlags(hipStream_t* stream, unsigned int flags)` | Creates a stream with `hipStreamDefault` or `hipStreamNonBlocking` |
| `hipStreamCreateWithPriority(hipStream_t* stream, unsigned int flags, int priority)` | Creates a stream with a priority; lower numeric value = higher priority |
| `hipExtStreamCreateWithCUMask(hipStream_t* stream, uint32_t cuMaskSize, const uint32_t* cuMask)` | Creates a stream restricted to a compute-unit mask |
| `hipStreamDestroy(hipStream_t stream)` | Destroys the specified stream |
| `hipStreamQuery(hipStream_t stream)` | Returns `hipSuccess` if all enqueued operations completed, `hipErrorNotReady` otherwise |
| `hipStreamSynchronize(hipStream_t stream)` | Blocks the host until all commands in the stream complete |
| `hipStreamWaitEvent(hipStream_t stream, hipEvent_t event, unsigned int flags)` | Makes future work in the stream wait until the event completes |
| `hipDeviceGetStreamPriorityRange(int* leastPriority, int* greatestPriority)` | Returns the numeric priority range supported by the device |
| `hipStreamGetFlags(hipStream_t stream, unsigned int* flags)` | Retrieves the flags a stream was created with |
| `hipStreamGetId(hipStream_t stream, unsigned long long* streamId)` | Queries the stream's unique ID |
| `hipStreamGetPriority(hipStream_t stream, int* priority)` | Queries the stream's priority value |
| `hipStreamGetDevice(hipStream_t stream, hipDevice_t* device)` | Gets the device associated with the stream |
| `hipExtStreamGetCUMask(hipStream_t stream, uint32_t cuMaskSize, uint32_t* cuMask)` | Retrieves the CU mask configured on a stream |
| `hipStreamAddCallback(hipStream_t stream, hipStreamCallback_t callback, void* userData, unsigned int flags)` | Runs a host callback after all currently enqueued stream items complete |
| `hipStreamSetAttribute` / `hipStreamGetAttribute` / `hipStreamCopyAttributes` | Set/query/copy stream attribute values (e.g. synchronization policy) |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- The default stream (stream `0`/`nullptr`) is legacy-synchronizing with other streams unless `hipStreamNonBlocking` is used.
- `hipStreamAddCallback` callbacks must not call HIP runtime APIs themselves.

## Related

- [event-management.md](./event-management.md)
- [asynchronous-execution.md](./asynchronous-execution.md)
- [execution-control-launch.md](./execution-control-launch.md)
- [device-management.md](./device-management.md)
