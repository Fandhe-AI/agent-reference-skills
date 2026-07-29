# Code Organization

## Signature / Usage

```text
include/cutlass/       # CUTLASS template library (header-only)
├── arch/              # architecture-specific instruction exposure
├── gemm/              # thread / warp / collective / threadblock / kernel / device levels
├── layout/            # memory layout definitions
├── reduction/         # bandwidth-limited reduction kernels
├── transform/         # layout and type transformation code
└── util/              # miscellaneous utilities

cute/                  # CuTe: layout abstractions, algorithms, architecture wrappers (header-only)
tools/
├── python/cutlass_library/  # procedural kernel-instantiation generation scripts
└── profiler/                # CUTLASS Profiler
examples/               # SDK demonstrations
media/                  # documentation and supporting materials
test/unit/              # unit tests, mirroring the source hierarchy
```

## Options / Props

| Component | Role |
| --- | --- |
| CUTLASS Template Library | Header-only CUDA C++ templates for matrix computation (`include/cutlass/`) |
| CuTe Template Library | Core vocabulary layout types and layout algebra (header-only, `cute/`) |
| CUTLASS Utilities | Supporting templates for testing and applications |
| CUTLASS Instance Library | Template instantiations spanning the kernel design space |
| CUTLASS Profiler | Library + profiler + utility tools (`tools/profiler/`) |
| Examples | SDK demonstration programs |
| Media | Documentation |
| Tests | GTest-based unit tests mirroring the source tree, filtered to run only on applicable architectures |

## Notes

- `tools/python/cutlass_library/` generates kernel instantiations procedurally rather than by hand-written specialization.

## Related

- [Getting Started](./getting-started.md)
- [Functionality](./functionality.md)
