# Device Management

Functions to select the current device per thread, query device properties/attributes/limits, reset device state, and configure device memory pools.

## Signature / Usage

```cpp
int count;
hipGetDeviceCount(&count);
hipSetDevice(0);
hipDeviceProp_t prop;
hipGetDeviceProperties(&prop, 0);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipGetDeviceCount(int* count)` | Returns the number of compute-capable devices |
| `hipSetDevice(int deviceId)` | Sets the default device for subsequent HIP API calls from this thread; `deviceId` must be in `[0, hipGetDeviceCount()-1]` |
| `hipGetDevice(int* deviceId)` | Returns the current default device for this thread |
| `hipDeviceSynchronize()` | Blocks the host thread until all commands on the current device complete |
| `hipDeviceReset()` | Discards device state, deleting all associated streams, memory allocations, and events |
| `hipGetDeviceProperties(hipDeviceProp_t* prop, int deviceId)` | Populates a struct with device properties (note: HIP-Clang always returns 0 for `maxThreadsPerMultiProcessor` and related fields — query them via `hipDeviceGetAttribute` with `hipDeviceAttributeMaxThreadsPerMultiProcessor` etc. instead) |
| `hipDeviceGetAttribute(int* value, hipDeviceAttribute_t attr, int deviceId)` | Queries a single device attribute |
| `hipChooseDevice(int* device, const hipDeviceProp_t* prop)` | Selects a device matching the given property criteria |
| `hipDeviceGetDefaultMemPool` / `hipDeviceSetMemPool` | Get/set the device's default memory pool (Beta); used with `hipMallocAsync` |
| `hipDeviceSetCacheConfig` / `hipDeviceGetCacheConfig` | Cache configuration hints (not supported on AMD hardware) |
| `hipDeviceGetLimit` / `hipDeviceSetLimit` | Query/set resource limits such as stack size and heap allocation |
| `hipExtGetLinkTypeAndHopCount` | Queries link type and hop count between two devices |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- IPC functions for sharing memory handles/events across processes are also part of this module; see `interop.md`.

## Related

- [initialization-version.md](./initialization-version.md)
- [multi-device-peer-to-peer.md](./multi-device-peer-to-peer.md)
- [stream-ordered-allocator.md](./stream-ordered-allocator.md)
