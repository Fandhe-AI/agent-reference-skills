# hip

| Name | Description | Path |
| --- | --- | --- |
| Asynchronous Execution | Operations enqueue asynchronously onto streams, overlapping kernels and transfers | [asynchronous-execution.md](./asynchronous-execution.md) |
| Compilers and AMD CLR | amdclang++/hipcc compile for a GFX target, executed via the AMD CLR runtime layer | [compilers-clr.md](./compilers-clr.md) |
| Complex Math API | Built-in complex number types and functions for float and double | [complex-math-api.md](./complex-math-api.md) |
| Cooperative Groups | Explicit thread-group types from sub-warp tiles up to grid-wide groups | [cooperative-groups.md](./cooperative-groups.md) |
| C++ Language Extensions | GPU built-in variables, qualifiers, vector types, warp intrinsics, and atomics | [cpp-language-extensions.md](./cpp-language-extensions.md) |
| CUDA to HIP API Function Comparison | Name mapping from CUDA runtime API symbols to HIP equivalents | [cuda-to-hip-api-comparison.md](./cuda-to-hip-api-comparison.md) |
| Debugging and Logging | Tools and environment variables for diagnosing HIP faults and tracing runtime | [debugging-logging.md](./debugging-logging.md) |
| Deprecated APIs | HIP APIs flagged for deprecation, with recommended replacements | [deprecated-apis.md](./deprecated-apis.md) |
| Device Management | Select the current device per thread; query properties, reset, memory pools | [device-management.md](./device-management.md) |
| Device Memory | Allocate linear, pitched, and 3D device memory; copy host and device data | [device-memory.md](./device-memory.md) |
| Device Properties and Topology on CDNA | Reading device properties on chiplet-based CDNA GPUs such as MI300 | [device-properties-cdna.md](./device-properties-cdna.md) |
| Environment Variables | Runtime environment variables for device visibility, logging, and heap sizing | [env-variables.md](./env-variables.md) |
| Error Handling | Retrieve, peek at, and translate HIP runtime error codes to strings | [error-handling.md](./error-handling.md) |
| Event Management | Stream timeline markers for cross-stream sync and GPU-side timing | [event-management.md](./event-management.md) |
| Execution Contexts (hipGreenCtx) | Scheduling domains; resource-partitioned contexts confine streams to CUs | [execution-context.md](./execution-context.md) |
| Execution Control and Kernel Launch | Kernel launch functions beyond `<<<>>>` and per-function launch attributes | [execution-control-launch.md](./execution-control-launch.md) |
| Graph Management | Record an operation DAG once, instantiate it, and replay with lower overhead | [graph-management.md](./graph-management.md) |
| Hardware Features by Architecture | HIP-visible hardware features per RDNA and CDNA architecture family | [hardware-features.md](./hardware-features.md) |
| Hardware Implementation | Maps the HIP thread/warp/block/grid model onto CDNA and RDNA compute units | [hardware-implementation.md](./hardware-implementation.md) |
| HIPIFY (hipify-clang / hipify-perl) | Tool family translating CUDA source code into HIP C++ | [hipify.md](./hipify.md) |
| HIPRTC (Runtime Compilation) | Compile HIP kernel source strings at runtime | [hiprtc.md](./hiprtc.md) |
| Host Memory | Pinned (page-locked) host allocations and registration for faster transfers | [host-memory.md](./host-memory.md) |
| Initialization and Version | Explicit runtime initialization; query driver/runtime version and device identity | [initialization-version.md](./initialization-version.md) |
| Interop (Graphics and External Resources) | Register and map OpenGL and other external graphics resources | [interop.md](./interop.md) |
| Kernel Language C++ Support | Which C++ standard features work inside device code and which are restricted | [kernel-language-cpp-support.md](./kernel-language-cpp-support.md) |
| Low Precision Floating Point Types | FP4, FP6, FP8, float16, bfloat16 types and gfx950 microscaling extensions | [low-precision-types.md](./low-precision-types.md) |
| Math API | Device math functions: standard, fast intrinsics, and integer bit intrinsics | [math-api.md](./math-api.md) |
| Memory Management Overview | Overview of explicit, pinned, unified, virtual, and stream-ordered memory models | [memory-management.md](./memory-management.md) |
| Module and Context Management | Load code objects at runtime, extract kernels and globals, link dynamically | [module-context-management.md](./module-context-management.md) |
| Multi-Device and Peer-to-Peer Access | Enable direct memory access between GPUs and peer-to-peer copies | [multi-device-peer-to-peer.md](./multi-device-peer-to-peer.md) |
| Occupancy | Compute the grid/block configuration that maximizes active warps per compute unit | [occupancy.md](./occupancy.md) |
| Performance Guidelines | Tuning for occupancy, memory coalescing, divergence, and stream overlap | [performance-guidelines.md](./performance-guidelines.md) |
| Porting CUDA to HIP | Migrate an existing CUDA C/C++ codebase to HIP for AMD GPUs | [porting-cuda-to-hip.md](./porting-cuda-to-hip.md) |
| HIP Programming Model | Maps data-parallel C/C++ onto SIMD/SIMT GPUs with a host/device execution split | [programming-model.md](./programming-model.md) |
| Runtime API Overview | HIP runtime API modules: init, device, memory, streams, events, interop | [runtime-api-overview.md](./runtime-api-overview.md) |
| Stream Management | FIFO command queues for async kernel launches, memory ops, and callbacks | [stream-management.md](./stream-management.md) |
| Stream-Ordered Memory Allocator | Async allocation and free ordered within a stream, backed by memory pools | [stream-ordered-allocator.md](./stream-ordered-allocator.md) |
| Texture and Surface Objects | Cached read-only texture and read-write surface access over HIP arrays | [texture-surface.md](./texture-surface.md) |
| Unified Memory | Managed memory allowing one pointer to be shared by host and device | [unified-memory.md](./unified-memory.md) |
| Virtual Memory Management | Reserve address ranges; create, map, unmap, and share physical handles | [virtual-memory.md](./virtual-memory.md) |
