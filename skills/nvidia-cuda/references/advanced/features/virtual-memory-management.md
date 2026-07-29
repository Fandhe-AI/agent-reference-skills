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

## Related

- [Interprocess Communication](./inter-process-communication.md)
- [Extended GPU Memory](./extended-gpu-memory.md)
- [Programming Systems with Multiple GPUs](../core/multi-gpu-systems.md)
