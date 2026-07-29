# Initialization and Version

Functions for explicit HIP runtime initialization and querying driver/runtime version and per-device identity information.

## Signature / Usage

```cpp
hipInit(0);
int driverVersion;
hipDriverGetVersion(&driverVersion);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipInit(unsigned int flags)` | Explicitly initializes the HIP runtime, giving control over initialization timing |
| `hipDriverGetVersion(int* driverVersion)` | Returns the approximate HIP driver version as `MAJOR*10000000 + MINOR*100000 + PATCH` |
| `hipRuntimeGetVersion(int* runtimeVersion)` | Returns the approximate HIP runtime version |
| `hipDeviceGet(hipDevice_t* device, int ordinal)` | Obtains a handle to a compute device by ordinal |
| `hipDeviceComputeCapability(int* major, int* minor, hipDevice_t device)` | Retrieves the compute capability major/minor version |
| `hipDeviceGetName(char* name, int len, hipDevice_t device)` | Returns an identifier string for the device |
| `hipDeviceGetUuid(hipUUID* uuid, hipDevice_t device)` | Retrieves the device UUID (Beta) |
| `hipDeviceGetP2PAttribute(int* value, hipDeviceP2PAttr attr, int srcDevice, int dstDevice)` | Queries a peer-to-peer link attribute between two devices |
| `hipDeviceGetPCIBusId(char* pciBusId, int len, int device)` | Obtains the PCI Bus ID string for a device |
| `hipDeviceGetByPCIBusId(int* device, const char* pciBusId)` | Gets a device handle from its PCI Bus ID string |
| `hipDeviceTotalMem(size_t* bytes, hipDevice_t device)` | Returns the total memory available on the device |

## Notes

- All functions return `hipError_t`; check return codes rather than assuming success.

## Related

- [device-management.md](./device-management.md)
- [error-handling.md](./error-handling.md)
