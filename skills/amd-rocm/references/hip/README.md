# hip

| Name | Description | Path |
| --- | --- | --- |
| programming-model | HIP programming model: threads, warps, blocks, grids, memory hierarchy | [programming-model.md](./programming-model.md) |
| hardware-implementation | How the execution model maps onto CDNA/RDNA compute units | [hardware-implementation.md](./hardware-implementation.md) |
| compilers-clr | amdclang++/hipcc compilation and the AMD CLR runtime | [compilers-clr.md](./compilers-clr.md) |
| performance-guidelines | Occupancy, coalescing, divergence, and stream overlap tuning | [performance-guidelines.md](./performance-guidelines.md) |
| cpp-language-extensions | Built-in variables, qualifiers, vector types, warp intrinsics, atomics | [cpp-language-extensions.md](./cpp-language-extensions.md) |
| kernel-language-cpp-support | C++ standard feature support/restrictions in device code | [kernel-language-cpp-support.md](./kernel-language-cpp-support.md) |
| hiprtc | HIPRTC runtime compilation API | [hiprtc.md](./hiprtc.md) |
| debugging-logging | ROCgdb, tracing, and debug environment variables | [debugging-logging.md](./debugging-logging.md) |
| runtime-api-overview | Overview of HIP runtime API module groups | [runtime-api-overview.md](./runtime-api-overview.md) |
| initialization-version | Runtime init and driver/runtime/device version queries | [initialization-version.md](./initialization-version.md) |
| device-management | Device selection, properties, attributes, limits, reset | [device-management.md](./device-management.md) |
| error-handling | Error retrieval and translation functions | [error-handling.md](./error-handling.md) |
| stream-management | Asynchronous command queue (stream) API | [stream-management.md](./stream-management.md) |
| event-management | Event creation, recording, sync, and elapsed-time timing | [event-management.md](./event-management.md) |
| asynchronous-execution | Default vs non-blocking streams, compute/transfer overlap | [asynchronous-execution.md](./asynchronous-execution.md) |
| execution-control-launch | Kernel launch functions and per-function attributes | [execution-control-launch.md](./execution-control-launch.md) |
| occupancy | Occupancy calculation functions for launch tuning | [occupancy.md](./occupancy.md) |
| module-context-management | Loading code objects/libraries and runtime linking | [module-context-management.md](./module-context-management.md) |
| memory-management | Overview of HIP's memory models | [memory-management.md](./memory-management.md) |
| host-memory | Pinned/page-locked host memory allocation | [host-memory.md](./host-memory.md) |
| device-memory | Linear/pitched/3D device memory allocation and copy | [device-memory.md](./device-memory.md) |
| unified-memory | Managed memory shared between host and device | [unified-memory.md](./unified-memory.md) |
| virtual-memory | Low-level virtual address reservation and mapping | [virtual-memory.md](./virtual-memory.md) |
| stream-ordered-allocator | hipMallocAsync/hipFreeAsync and memory pools | [stream-ordered-allocator.md](./stream-ordered-allocator.md) |
| texture-surface | Texture and surface object APIs, mipmapped arrays | [texture-surface.md](./texture-surface.md) |
| graph-management | Graph capture, node types, instantiation, and launch | [graph-management.md](./graph-management.md) |
| cooperative-groups | Explicit thread-group types and grid/multi-grid cooperation | [cooperative-groups.md](./cooperative-groups.md) |
| multi-device-peer-to-peer | Peer device access queries and peer memory copy | [multi-device-peer-to-peer.md](./multi-device-peer-to-peer.md) |
| interop | Graphics/external resource registration and mapping | [interop.md](./interop.md) |
| porting-cuda-to-hip | Guide for migrating a CUDA codebase to HIP | [porting-cuda-to-hip.md](./porting-cuda-to-hip.md) |
| cuda-to-hip-api-comparison | CUDA↔HIP function name mapping table | [cuda-to-hip-api-comparison.md](./cuda-to-hip-api-comparison.md) |
| hipify | hipify-clang/hipify-perl automated CUDA→HIP conversion tools | [hipify.md](./hipify.md) |
| math-api | Standard, fast-intrinsic, and integer math functions | [math-api.md](./math-api.md) |
| env-variables | Runtime-tunable environment variables | [env-variables.md](./env-variables.md) |
| deprecated-apis | Deprecated HIP APIs and their replacements | [deprecated-apis.md](./deprecated-apis.md) |
| hardware-features | Hardware feature support by GPU architecture family | [hardware-features.md](./hardware-features.md) |
