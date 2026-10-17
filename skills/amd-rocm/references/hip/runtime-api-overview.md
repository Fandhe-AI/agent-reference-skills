# Runtime API Overview

The HIP runtime API groups functionality into modules covering initialization, device/context/module management, memory, streams, events, execution control, and interop, exposed through the `hip*` C API.

## Signature / Usage

```cpp
#include <hip/hip_runtime.h>

int count;
hipGetDeviceCount(&count);
hipSetDevice(0);
```

## Options / Props

| Module group | Covers |
| --- | --- |
| Initialization and version | `hipInit`, driver/runtime version queries |
| Device management | Device selection, properties, attributes, limits |
| Error handling | Error codes and string conversion |
| Stream management | Asynchronous command queues |
| Event management | Timing and cross-stream synchronization markers |
| Execution control | Kernel launch, occupancy, launch bounds |
| Memory management | Host/device/unified/virtual memory, stream-ordered allocator |
| Module and context management | Loading compiled code objects, context stack |
| Execution context management | Green contexts (`hipGreenCtx*`); new reference module in the 10.1.0 docs (see `execution-context.md`) |
| Graph management | Recording and replaying operation DAGs |
| Peer-to-peer / multi-device | Cross-GPU memory access |
| Interop | External resource, OpenGL, graphics interoperability |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Documented against HIP 7.16.0 (ROCm Core SDK 10.1.0), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-10.

## Related

- [initialization-version.md](./initialization-version.md)
- [device-management.md](./device-management.md)
- [error-handling.md](./error-handling.md)
