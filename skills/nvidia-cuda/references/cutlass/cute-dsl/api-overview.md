# CuTe DSL API (Index)

## Signature / Usage

Navigation page for the `cutlass.cute` Python API reference.

```text
cute_dsl_api/
├── cute.html                      → core layout/tensor/atom API
├── cute_arch.html                 → cutlass.cute.arch (NVVM device-function wrappers)
├── cute_runtime.html              → cutlass.cute.runtime (Pointer/Tensor/FakeTensor, DLPack)
├── cute_nvgpu.html                → cutlass.cute.nvgpu (common)
├── cute_nvgpu_common.html
├── cute_nvgpu_warp.html            → warp-level MMA API
├── cute_nvgpu_warpgroup.html       → Hopper warpgroup MMA API
├── cute_nvgpu_cpasync.html         → cp.async API
├── cute_nvgpu_tcgen05.html         → Blackwell tcgen05 MMA API
├── pipeline.html                   → pipeline utilities
├── utils.html                      → general utilities
├── utils_sm90.html                 → SM90-specific utilities
└── utils_sm100.html                → SM100-specific utilities
```

## Notes

- This is a navigation/index page; content lives in the linked module pages. Follows the tcgen05 MMA Programming Guide and precedes the CuTe DSL API changelog (not covered by this skill; see the reference-updater workflow for tracking upstream changes).

## Related

- [CuTe DSL API: cute](./api-cute.md)
- [CuTe DSL API: cute_arch](./api-cute-arch.md)
