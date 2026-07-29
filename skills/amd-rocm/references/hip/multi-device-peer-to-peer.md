# Multi-Device and Peer-to-Peer Access

Functions to query and enable direct memory access between GPUs, and to copy memory between peer devices without staging through the host.

## Signature / Usage

```cpp
int canAccess;
hipDeviceCanAccessPeer(&canAccess, deviceA, deviceB);
if (canAccess) {
    hipSetDevice(deviceA);
    hipDeviceEnablePeerAccess(deviceB, 0);
    hipMemcpyPeer(dstPtrOnB, deviceB, srcPtrOnA, deviceA, size);
}
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipDeviceCanAccessPeer(int* canAccessPeer, int deviceId, int peerDeviceId)` | Returns whether `deviceId` can directly access `peerDeviceId`'s memory (`0` if `deviceId == peerDeviceId`, since a device is not a peer of itself) |
| `hipDeviceEnablePeerAccess(int peerDeviceId, unsigned int flags)` | Enables direct access from the current device to a peer device; on success, all of the peer's memory allocations map into the current device's address space |
| `hipDeviceDisablePeerAccess(int peerDeviceId)` | Disables previously enabled peer access; errors if access was not enabled |
| `hipMemcpyPeer(void* dst, int dstDevice, const void* src, int srcDevice, size_t sizeBytes)` | Synchronous copy between two peer-accessible devices |
| `hipMemcpyPeerAsync(void* dst, int dstDevice, const void* src, int srcDevice, size_t sizeBytes, hipStream_t stream)` | Asynchronous peer-to-peer copy on a stream |
| `hipExtGetLinkTypeAndHopCount(...)` | Queries the interconnect link type and hop count between two devices (see `device-management.md`) |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.

## Related

- [device-management.md](./device-management.md)
- [cooperative-groups.md](./cooperative-groups.md)
- [virtual-memory.md](./virtual-memory.md)
