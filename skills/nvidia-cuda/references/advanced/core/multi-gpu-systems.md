# Programming Systems with Multiple GPUs

Device enumeration, device selection, and peer-to-peer (P2P) memory transfer/access APIs for applications spanning multiple GPUs in one host process. Higher-level multi-GPU communication is typically done via NCCL, NVSHMEM, or MPI rather than these low-level APIs directly.

## Signature / Usage

```c
cudaSetDevice(0);
float* p0;
cudaMalloc(&p0, size);

cudaSetDevice(1);
cudaDeviceEnablePeerAccess(0, 0);
MyKernel<<<1000, 128>>>(p0);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaGetDeviceCount` | Returns the number of CUDA-capable devices visible to the process. |
| `cudaGetDeviceProperties` | Retrieves a `cudaDeviceProp` struct describing a device. |
| `cudaSetDevice` | Sets the current device for the calling host thread; subsequent `cudaMalloc`/kernel launches target this device. |
| `cudaStreamCreate`, `cudaEventRecord`, `cudaEventElapsedTime`, `cudaEventSynchronize`, `cudaEventQuery`, `cudaStreamWaitEvent` | Per-device stream/event objects; each is implicitly associated with the device current when it was created. |
| `cudaMemcpy` (with `cudaMemcpyDeviceToDevice` / `cudaMemcpyDefault`), `cudaMemcpyPeer`, `cudaMemcpyPeerAsync`, `cudaMemcpy3DPeer`, `cudaMemcpy3DPeerAsync` | Copy memory directly between two devices' memory spaces. |
| `cudaDeviceCanAccessPeer` | Queries whether one device can directly address another's memory. |
| `cudaDeviceEnablePeerAccess` | Enables the current device to directly access another device's memory (required before peer pointer dereference in a kernel, as opposed to `cudaMemcpyPeer`). |

## Notes

- Streams, events, and device memory allocations are each bound to the device that was current when they were created; a kernel launched on a stream created under device 0 executes on device 0 regardless of the current device at launch time.
- `cudaDeviceEnablePeerAccess` is required only for direct pointer dereference across devices in a kernel; `cudaMemcpyPeer`/`cudaMemcpyPeerAsync` work without it.
- Multi-device managed memory and peer-to-peer memory consistency follow `cuda::thread_scope_system` semantics for atomics across devices.
- Host IOMMU hardware and PCI Access Control Services can restrict P2P transfers, particularly inside VMs; behavior differs between Linux bare-metal and Windows/virtualized environments.
- For hardware topology specific to NVLink-connected multi-GPU systems (e.g. NVLink-C2C), see the dgx-spark skill's hardware category.

## Related

- [The CUDA Driver API](./driver-api.md)
- [Virtual Memory Management](../features/virtual-memory-management.md)
- [Interprocess Communication](../features/inter-process-communication.md)
