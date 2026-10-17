# Virtual Memory Management

Driver-API-level control over device virtual address space: allocate physical memory separately from reserving/mapping virtual addresses (`cuMemCreate` + `cuMemAddressReserve` + `cuMemMap`), with explicit per-device access control and support for multicast memory objects across GPUs.

## Signature / Usage

```c
int deviceSupportsVmm;
cuDeviceGetAttribute(&deviceSupportsVmm,
    CU_DEVICE_ATTRIBUTE_VIRTUAL_MEMORY_MANAGEMENT_SUPPORTED, device);
if (deviceSupportsVmm != 0) {
    // device supports Virtual Memory Management
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `cuMemCreate` | Allocates physical GPU memory without mapping it to any virtual address. |
| `cuMemAddressReserve` / `cuMemAddressFree` | Reserve/free a range of virtual address space, independent of physical memory. |
| `cuMemMap` / `cuMemUnmap` | Map/unmap a physical allocation (from `cuMemCreate`) onto a reserved virtual address range. |
| `cuMemSetAccess` | Grants or revokes device access permissions on a mapped virtual address range (`CUmemAccessDesc`). |
| `cuMemRelease` | Releases a physical memory allocation created by `cuMemCreate`. |
| `cuMemExportToShareableHandle` / `cuMemImportFromShareableHandle` | Export/import a physical allocation as a shareable handle for IPC (`CU_MEM_HANDLE_TYPE_POSIX_FILE_DESCRIPTOR`, `_WIN32`, `_FABRIC`). |
| `cuMemGetAllocationGranularity` | Queries the minimum/recommended alignment for a given `CUmemAllocationProp`. |
| `cuMemGetAllocationPropertiesFromHandle` | Retrieves the `CUmemAllocationProp` used to create a given allocation handle. |
| `cuMulticastCreate` / `cuMulticastAddDevice` / `cuMulticastBindMem` | Create a multicast memory object, add participating GPUs, and bind physical memory to it for hardware multicast access. |
| `cuMulticastGetGranularity` | Queries alignment requirements for multicast objects. |
| `CUmemGenericAllocationHandle` / `CUmemAllocationProp` / `CUmemAccessDesc` / `CUmemFabricHandle` | Core VMM handle and descriptor types. |

## Notes

- The typical unicast VMM flow is: `cuMemCreate` (physical) → `cuMemAddressReserve` (virtual) → `cuMemMap` (bind) → `cuMemSetAccess` (grant device access) → use `CUdeviceptr` normally → `cuMemUnmap` / `cuMemAddressFree` / `cuMemRelease` in reverse order to tear down.
- Query `CU_DEVICE_ATTRIBUTE_VIRTUAL_MEMORY_MANAGEMENT_SUPPORTED` before using VMM APIs; also check `CU_DEVICE_ATTRIBUTE_HANDLE_TYPE_FABRIC_SUPPORTED` and `CU_DEVICE_ATTRIBUTE_MULTICAST_SUPPORTED` for the specific handle types/features used.
- `CU_MEM_HANDLE_TYPE_FABRIC` is for multi-node fabric-based sharing (e.g. NVLink-connected systems), distinct from the single-host POSIX fd / Win32 handle types.
- Compressible memory (`CU_MEM_ALLOCATION_COMP_GENERIC`) and virtual aliasing are advanced configuration options layered on top of the base VMM flow.
- Note (CPG 13.4, fabric memory): fabric memory is address-centric: a peer's physical memory is mapped into the local virtual address space and accessed with ordinary loads and stores. Compute fabric transport is a complementary resource-centric model over the same NVLink fabric, moving data with asynchronous put, get, and reduction operations against a named logical endpoint rather than a mapped address, with an explicit per-operation completion status; it suits large fabrics where fabric-error recovery is a concern.
- Note (CPG 13.4, multicast): multicast sharing maps a multicast object into each device's virtual address space and operates on it with `multimem` instructions (address-centric). Compute fabric transport offers a resource-centric counterpart, the multicast logical endpoint, serving a multicast team over the NVLink fabric without mapping the object into a local address space.

- **Allocating device memory in a locality domain (CPG 13.4):** Set `CUmemAllocationProp::location.type` to `CU_MEM_LOCATION_TYPE_DEVICE_LOCALITY_DOMAIN`, and set both members of `location.localized`: `deviceId` (the GPU) and `localityDomainId` (a valid locality domain on that GPU). Query the number of valid domains with `cuDeviceGetAttribute` and `CU_DEVICE_ATTRIBUTE_LOCALITY_DOMAIN_COUNT`. The allocation size must be a multiple of the minimum granularity returned by `cuMemGetAllocationGranularity` for the localized allocation properties.

  ```c
  CUmemAllocationProp prop {};
  prop.type = CU_MEM_ALLOCATION_TYPE_PINNED;
  prop.location.type = CU_MEM_LOCATION_TYPE_DEVICE_LOCALITY_DOMAIN;
  prop.location.localized.deviceId = device;
  prop.location.localized.localityDomainId = localityDomainId;
  size_t granularity = 0;
  cuMemGetAllocationGranularity(&granularity, &prop, CU_MEM_ALLOC_GRANULARITY_MINIMUM);
  size_t alignedSize = ((size + granularity - 1) / granularity) * granularity;
  CUmemGenericAllocationHandle allocationHandle {};
  cuMemCreate(&allocationHandle, alignedSize, &prop, 0);
  ```

- The returned handle is used with the same reserve, map, access-control, and release APIs as other VMM allocations. On a device with one locality domain, requesting domain 0 is equivalent to a full-device allocation created with `CU_MEM_LOCATION_TYPE_DEVICE`; the allocation reports its location type as `CU_MEM_LOCATION_TYPE_DEVICE`.

## Related

- [Interprocess Communication](./inter-process-communication.md)
- [Extended GPU Memory](./extended-gpu-memory.md)
- [Programming Systems with Multiple GPUs](../core/multi-gpu-systems.md)
- [Locality Domains](./locality-domains.md)
- [Compute Fabric Transport](./compute-fabric-transport.md)
