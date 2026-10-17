# Primitives API (experimental)

Hand-maintained wrappers over raw MLIR NVVM dialect operations, exposed as a flat `cutlass.experimental.primitives` package (conventionally imported as `prims`) for low-level GPU operations without engaging raw MLIR ceremony.

## Signature / Usage

```python
# v4.8.0 import surface: the automodule is cutlass.experimental.primitives
# (previously documented under cutlass.experimental.primitives.nvvm_wrapper)
from cutlass.experimental import primitives as prims

prims.tcgen05_mma(...)          # a wrapped op
prims.CTAGroup.CTA_1            # an enum
prims.dialect.<raw_op>(...)     # raw NVVM dialect escape hatch

# Typed hardware MMA descriptors are exported directly
from cutlass.experimental.primitives import Tcgen05SmemDesc, Tcgen05SmemSwizzle
desc = Tcgen05SmemDesc.build(...)

# Earlier form (4.7.x docs; see Notes)
from cutlass._mlir.dialects import nvvm
if nvvm.elect_sync():
    nvvm.mbarrier_arrive_expect_tx(mbar + s, nbytes)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Synchronization | `bar_warp_sync()`, `barrier_cta_sync()`, `barrier_cta_arrive()`, `barrier_cta_red()`, `barrier_cluster_arrive()`, `barrier_cluster_wait()` |
| Data movement | `cp_async_shared_global()`, `cp_async_bulk_*()` family, `cp_async_bulk_tensor_*()` (TMA, multicast), `mbarrier_arrive_expect_tx()`, `mbarrier_wait_parity()` |
| Type conversion | `convert()`, `cvt_f32x2_to_f8x2()`, `convert_float_to_tf32()` |
| Atomics / utility | `atomicrmw()`, `shfl_sync()`, `elect_sync(*, membermask=0xFFFFFFFF) -> Boolean`, `cluster_ctarank()` |
| Typed MMA descriptors (v4.8.0, exported directly) | `WgmmaSmemDesc` (+ `WgmmaSwizzle`), `Tcgen05SmemDesc` (`.build(...)`), `Tcgen05SmemSwizzle`, `Tcgen05InstrDesc`, `Tcgen05MxInstrDesc`, `Tcgen05MxOmmaInstrDesc`, `TmemAddr`, `Tcgen05InputFormat`, `Tcgen05OutputFormat`, `MxScaleFormat` |
| MMA / tcgen05 | `wgmma_mma_async`, `wgmma_fence_aligned`, `wgmma_commit_group_sync_aligned`, `wgmma_wait_group_sync_aligned`, `mma_sync`, `mma_sp_sync`, `mma_block_scale`, `wmma_load` / `wmma_mma` / `wmma_store`, `ldmatrix`, `stmatrix`, `tcgen05_alloc` / `tcgen05_dealloc` / `tcgen05_relinquish_alloc_permit`, `tcgen05_ld` / `tcgen05_ld_red` / `tcgen05_st` / `tcgen05_cp` / `tcgen05_shift`, `tcgen05_mma` / `tcgen05_mma_sp` / `tcgen05_mma_ws` / `tcgen05_mma_ws_sp` / `tcgen05_mma_block_scale` / `tcgen05_mma_sp_block_scale`, `tcgen05_commit`, `tcgen05_fence`, `tcgen05_wait` |
| Packed arithmetic / misc | `add_packed_*`, `sub_packed_*`, `mul_packed_*`, `fma_packed_*`, `fence_*`, `mbarrier_*`, `clusterlaunchcontrol_*`, `griddepcontrol`, `tensormap_replace`, `inline_ptx`, `inline_ptx_hl`, `ptx_add_comment`, `trace_mark`, `nanosleep`, `setmaxregister` |
| Enums | `CTAGroup`, `MemScope`, `MemOrder`, `Proxy`, `CacheLevel`, `EvictPriority`, `FPRoundingMode`, `SaturationMode`, `TMALoadMode`, `TMAStoreMode`, `Tcgen05CpShape`, ... (see the rendered page for the full set) |

## Notes

- Purpose: return-type abstraction (wraps results in typed containers like `Int32`/`Boolean`), Python-to-DSL coercion (plain Python `int`/`bool` accepted), and unified namespace access to NVVM-level GPU primitives (barriers, TMA copies, tensor-core ops, special register reads).
- Sits beneath `cutlass.cute` — a lower-level abstraction enabling Tensor Core programming through SIMT for cases where CuTe abstractions reduce development velocity.
- Argument ordering differs between CTA variants: cluster TMA's `cp_async_bulk_tensor_shared_cluster_global()` places coordinates *before* the mbarrier, opposite of the CTA_1 variant.
- Mbarrier routing in CTA_2 uses bit-24 masking (`& 0xFEFFFFFF`) to redirect 2-SM-group deliveries; cluster sizes > 2 require per-CTA local barriers instead.
- The `.multicast::cluster` PTX modifier is emitted based on mask *presence*, not value — a single-CTA "selfcast" still pays multicast overhead.
- Issue `nvvm.fence_proxy("async_shared")` before TMA loads to guarantee visibility of prior thread writes.
- Marked experimental; may change before final release.
- Import surface (v4.8.0): the `.. automodule::` target changed from `cutlass.experimental.primitives.nvvm_wrapper` (4.7.0) to `cutlass.experimental.primitives`. Typed MMA descriptors (SM90 `wgmma` / SM100 `tcgen05`) and the low-level NVVM wrappers are flattened into this package, so callers import them directly (`from cutlass.experimental import primitives as prims`; `prims.<op>`, `prims.CTAGroup.CTA_1`, and `prims.dialect.<raw_op>` for the raw NVVM dialect). The `cutlass._mlir.dialects.nvvm` form in the older Signature example is the 4.7.x wording.
- Example `mbarrier_arrive_expect_tx(addr, txcount, *, scope=None, relaxed=None)`: with `mbarrier_init(bar, count=1)` it serves as the single software arrive and registers `txcount` bytes that TMA `complete_tx` must deliver, so no separate `mbarrier_arrive` is needed.
- v4.8.0 CHANGELOG: Rubin (SM107) primitives add higher-throughput FP8 (MMA_K=64) and FP4 (MMA_K=128) Tensor Core MMA, B collector reuse, TMEM extended from 512 to 576 columns, 328KB shared memory, and 2:4 sparsity for FP4. Compiler warnings/errors for Primitives (introduced in 4.7.0) can be controlled; see the `CuTeDSL/experimental/compiler_diagnostic/` examples and the Debugging page.

## Related

- [CuTe DSL API: cute.arch](./api-cute-arch.md)
- [CuTe DSL API: cute.nvgpu](./api-cute-nvgpu.md)
- [Task Scheduling (experimental)](./task-scheduling.md)
