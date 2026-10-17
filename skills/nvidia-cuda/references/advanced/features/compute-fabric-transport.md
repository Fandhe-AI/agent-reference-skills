# Compute Fabric Transport

Resource-centric GPU-to-GPU communication over the NVLink fabric: an application creates logical endpoints (named by 32-bit logical endpoint ids) and issues asynchronous fabric operations (put, get, red, pull-red, atom) addressed by endpoint id + 64-bit offset, with explicit per-operation completion status instead of faulting on errors. Primarily intended for communication-library authors; most developers should prefer the NCCL Device API and NVSHMEM.

## Signature / Usage

```cpp
// Host (CUDA Driver API): reserve id, create, export/import, bind
CUlogicalEndpointId leId = 0;
cuLogicalEndpointIdReserve(&leId, (uint32_t)numRanks);

CUlogicalEndpointProp endpointProp {};
endpointProp.type = CU_LOGICAL_ENDPOINT_TYPE_UNICAST;
endpointProp.unicast = {.device = cuDevice};
endpointProp.ipcHandleTypes = CU_LOGICAL_ENDPOINT_IPC_HANDLE_TYPE_FABRIC;
endpointProp.flags = useCounted ? CU_LOGICAL_ENDPOINT_FLAG_COUNTED_OPS : CU_LOGICAL_ENDPOINT_FLAG_NONE;

cuuint64_t bindAlignment = 0;
cuuint64_t maxSize = 0;
cuLogicalEndpointGetLimits(&bindAlignment, &maxSize, &endpointProp);
// Set endpointProp.size: a multiple of bindAlignment and no larger than maxSize
// (partition across several endpoints if needed)

cuLogicalEndpointCreate(leId + myRank, &endpointProp);

CUlogicalEndpointFabricHandle localHandle;
cuLogicalEndpointExport(&localHandle, leId + myRank, CU_LOGICAL_ENDPOINT_IPC_HANDLE_TYPE_FABRIC);
// ... transfer handle to peer, then on the peer:
cuLogicalEndpointImport(leId + sendRank, &sendRankHandle, CU_LOGICAL_ENDPOINT_IPC_HANDLE_TYPE_FABRIC);

// Poll cuLogicalEndpointQuery until it returns non-zero for leId + myRank and leId + sendRank
// (non-blocking; using an id before readiness is undefined behavior)

// Bind the whole backing allocation at endpoint offset 0, by allocation handle.
cuLogicalEndpointBindMem(leId + myRank, cuDevice, 0, exportHandle, 0, exportSize, 0);
// No rank may issue an operation until every destination has been bound.
MPI_CHECK(MPI_Barrier(MPI_COMM_WORLD));

// Device: put from shared memory, tracked by an mbarrier (layout_v1)
cuda::ptx::mbarrier_init(cuda::ptx::layout_v1, &putBar, 1);

cuda::ptx::fence_proxy_async(cuda::ptx::space_shared);
cuda::ptx::fabric_try_put(cuda::ptx::space_shared, cuda::ptx::sem_relaxed,
                          cuda::ptx::scope_sys, putLeId, offset, smemBuf,
                          FABRIC_CHUNK_SIZE, &putBar);
cuda::ptx::fabric_submit();
cuda::ptx::mbarrier_arrive_expect_tx(cuda::ptx::sem_relaxed, cuda::ptx::scope_cta,
                                     cuda::ptx::space_shared, &putBar,
                                     (FABRIC_CHUNK_SIZE / FABRIC_TX_GRANULARITY_BYTES));
```

## Options / Props

Device attributes (query with `cuDeviceGetAttribute`; availability depends on GPU architecture, driver, and system configuration; the features are independent):

| Name | Type | Description |
|------|------|-------------|
| `CU_DEVICE_ATTRIBUTE_LOGICAL_ENDPOINT_UNICAST_SUPPORTED` | attribute | Device supports unicast logical endpoints. |
| `CU_DEVICE_ATTRIBUTE_LOGICAL_ENDPOINT_MULTICAST_SUPPORTED` | attribute | Device supports multicast logical endpoints. |
| `CU_DEVICE_ATTRIBUTE_LOGICAL_ENDPOINT_SUPPORTED_HANDLE_TYPES` | bitmask of `CUlogicalEndpointIpcHandleType` | Supported IPC handle types; check `CU_LOGICAL_ENDPOINT_IPC_HANDLE_TYPE_FABRIC`. |
| `CU_DEVICE_ATTRIBUTE_LOGICAL_ENDPOINT_COUNTED_OPS_SUPPORTED` | attribute | Device supports counted operations (query before requesting `CU_LOGICAL_ENDPOINT_FLAG_COUNTED_OPS`). |
| `CU_DEVICE_ATTRIBUTE_LOGICAL_ENDPOINT_UNICAST_ACCESS_ON_OWNER_DEVICE_SUPPORTED` | attribute | Whether the owner device can access its own unicast endpoints via endpoint id; otherwise it can use pointers to the bound memory (currently best performance for the owner). |

Host-side APIs:

| Name | Type | Description |
|------|------|-------------|
| `cuDeviceGetCliqueCount` / `cuDeviceGetCliqueInfo` | function | Query cliques a device belongs to (`CUcliqueInfo` has `type` and `id`). Types: `CU_CLIQUE_TYPE_UNICAST_LOGICAL_ENDPOINT`, `CU_CLIQUE_TYPE_MULTICAST_LOGICAL_ENDPOINT`. |
| `cuLogicalEndpointIdReserve` / `cuLogicalEndpointIdRelease` | function | Reserve / release a process-local range of `count` ids; the base id (`baseLeId`) is an output. |
| `cuLogicalEndpointGetLimits` | function | Returns `bindAlignment` and `maxSize` for a `CUlogicalEndpointProp`. |
| `cuLogicalEndpointCreate` | function | Associates a reserved id with a newly created endpoint (non-blocking). |
| `cuLogicalEndpointExport` / `cuLogicalEndpointImport` | function | Export to a `CUlogicalEndpointFabricHandle`; a peer imports it at one of its own reserved ids (non-blocking). |
| `cuLogicalEndpointAddDevice` | function | Multicast only: each participating device joins the group after holding the endpoint locally. |
| `cuLogicalEndpointQuery` | function | Non-blocking readiness check; returns 0 if any id in the range is not ready, non-zero once all are. |
| `cuLogicalEndpointBindMem` / `cuLogicalEndpointBindAddr` | function | Bind memory by allocation handle (`cuMemCreate`, with `memOffset`) or by mapped virtual address. |
| `cuLogicalEndpointUnbind` | function | Unbind a range. |
| `cuLogicalEndpointDestroy` | function | Removes the id association (and unbinds memory bound through that id). |
| `CUlogicalEndpointProp` | struct | Fields mentioned: `type` (`CU_LOGICAL_ENDPOINT_TYPE_UNICAST` / `CU_LOGICAL_ENDPOINT_TYPE_MULTICAST`), `unicast.device`, `multicast.numDevices`, `size`, `ipcHandleTypes`, `flags`. |

Device fabric instructions (`cuda::ptx`):

| Name | Type | Description |
|------|------|-------------|
| `fabric_try_put` | function | Write to a compute fabric transport handle (`fabric_try_put_counted` is the `.counted::bytes` variant taking a second offset for the counter; `fabric_try_put_multimem` broadcasts to a multicast endpoint). |
| `fabric_try_get` | function | Read from a handle. |
| `fabric_try_red` | function | Reduction into a handle. |
| `fabric_try_pullred` | function | Pull-reduction from a multicast endpoint (fabric counterpart of `multimem.ld_reduce`); warp-collective. |
| `fabric_try_atom` | function | Atomic read-modify-write (`add`, `min`, `max`, `and`, `or`, `xor`, exchange, compare-and-swap); returns the original value. |
| `fabric_submit` | function | Submits issued operations; each must be submitted before the tracking barrier phase advances. |

## Notes

- Requirements: CUDA Driver API; GPUs reachable over an NVLink fabric; for cross-process sharing, the NVIDIA IMEX daemon running and IMEX channels configured. Endpoints can be shared with processes on the same node or on other nodes within the same NVLink fabric.
- Model: unlike VMM unicast/multicast mappings (address-centric, no error channel), fabric operations report an explicit completion status so the application can retry, reroute, or recover instead of faulting. Memory is currently the only resource kind logical endpoints expose.
- An imported endpoint stays valid when the owner rebinds the backing memory (unbind then bind through the same id); owner and peers must synchronize across the rebind. An operation landing outside the currently bound range is undefined behavior.
- Lifecycle: verify clique membership (all participating devices must have the same clique id for the clique type) -> reserve ids -> describe -> `cuLogicalEndpointGetLimits` -> create -> export/import -> (multicast) add devices -> `cuLogicalEndpointQuery` until ready -> allocate backing memory (VMM `cuMemCreate` or `cudaMallocAsync`; request `CU_MEM_HANDLE_TYPE_FABRIC` when sharing) -> bind -> synchronize processes -> issue fabric operations -> clean up.
- Id states: not reserved -> reserved -> associated (`cuLogicalEndpointCreate` / `cuLogicalEndpointImport`); `cuLogicalEndpointDestroy` returns an id to reserved; releasing an id still associated is undefined behavior. Ids are process-local and one endpoint may have several alias ids. CUDA does not detect inconsistent peer-to-id mappings across processes.
- Endpoint size and every bind offset/size (and `memOffset`) must be multiples of `bindAlignment`; if `maxSize` is smaller than the requested size, shrink the request or partition across several endpoints. Several non-contiguous bindings may back one endpoint. Memory cannot be bound to an imported unicast endpoint but can be bound to an imported multicast endpoint. Not every CUDA-accessible allocation can be bound.
- Before bind, unbind, or any `cuda::ptx::fabric_try_*` operation, wait until `cuLogicalEndpointQuery` reports readiness (using an endpoint before that is undefined behavior). Export, Destroy, and IdRelease do not require readiness. Multicast endpoints are not ready until all devices are added; multicast membership is permanent.
- Fabric operations are asynchronous; the `try_` prefix means they may fail, so check the completion mechanism after waiting. All operations except `fabric_try_atom` move data in 16-byte units, so the source pointer and destination offset must be multiples of 16 bytes. `fabric.try_pullred` is warp-collective (all 32 lanes); `fabric.try_get`, `.try_put`, `.try_red` (and `.tensor` forms of get/put) are per-thread.
- Completion: initialize the tracking mbarrier with `cuda::ptx::layout_v1` (default `layout_v0` cannot carry fabric status). A put decrements the transaction count by 1 per 16 bytes; `fabric_try_get` / `fabric_try_pullred` by 1 per byte. `mbarrier_arrive_expect_tx` after submit supplies the expected count. Wait with `mbarrier_try_wait_parity` (`mbarrier_phase_primary`), which also yields a report predicate and report value; if the report predicate is true, inspect with `cudaFabricOpErrorStatusCount` and `cudaFabricOpErrorStatusGet` (source `cudaFabricOpStatusSourceMbarrierV1`). All operations must be waited on before grid exit (otherwise undefined behavior).
- `layout_v1` mbarrier arrival count is a 9-bit field (max 511); prefer one arrival per warp/block rather than per thread when many operations share a barrier. A put does not set the expected transaction count.
- Memory ordering: fabric puts span the fabric-proxy, async-proxy (shared-memory source; use `cuda::ptx::fence_proxy_async(cuda::ptx::space_shared)` first), and generic-proxy (mbarrier). Completion does not order fabric-proxy accesses to the generic-proxy: before reading a destination through a pointer, issue `cuda::ptx::fence_proxy_generic_fabric_alias` with `sem_release` then `sem_acquire` (publisher: release fence before the flag put; consumer: acquire fence after observing the flag).
- Counted operations: need `CU_LOGICAL_ENDPOINT_FLAG_COUNTED_OPS` at endpoint creation and device support; the counter increments by bytes written as data arrives, must be 256-byte aligned in endpoint memory, and the receiver waits for the expected byte count.
- Cleanup: make sure no peer can still issue operations before unbinding/destroying (any inter-process synchronization is sufficient, e.g. barrier after stream sync). Destroy imported ids (local alias only), unbind (optional but recommended) and destroy the owner id, `cuLogicalEndpointIdRelease`, then free backing memory in VMM order (`cuMemUnmap`, `cuMemRelease`, `cuMemAddressFree`). Never free an allocation while bound. The endpoint's resources are released when every alias is destroyed.
- The full instruction qualifiers (access sizes, memory-ordering modes, scopes) are specified in the PTX ISA "Fabric Instructions" section.
- The source's `cuLogicalEndpointGetLimits` example names the property variable `prop`; the example above uses `endpointProp`. The source shows no code assigning `size`, so the comment states only the documented constraints.
- Document version: CUDA Programming Guide v13.4.2 ([Compute Fabric Transport](https://docs.nvidia.com/cuda/cuda-programming-guide/04-special-topics/compute-fabric-transport.html); archived copy [13.4.2](https://docs.nvidia.com/cuda/archive/13.4.2/cuda-programming-guide/04-special-topics/compute-fabric-transport.html)). Instruction qualifiers: PTX ISA 9.4 [Fabric Instructions](https://docs.nvidia.com/cuda/parallel-thread-execution/index.html#fabric-instructions).

## Related

- [Virtual Memory Management](./virtual-memory-management.md)
- [Inter-Process Communication](./inter-process-communication.md)
- [Asynchronous Data Copies](./async-copies.md)
- [Asynchronous Barriers](./async-barriers.md)
- [Extended GPU Memory](./extended-gpu-memory.md)
