# Primitives API (experimental)

Hand-maintained wrappers over raw MLIR NVVM dialect operations, exposed as a unified `nvvm.*` namespace for low-level GPU operations without engaging raw MLIR ceremony.

## Signature / Usage

```python
from cutlass._mlir.dialects import nvvm

if nvvm.elect_sync():
    nvvm.mbarrier_arrive_expect_tx(mbar + s, nbytes)
if nvvm.elect_sync():
    nvvm.cp_async_bulk_tensor_shared_cta_global(
        smem_dst, tma_desc, (k, m), mbar + s)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Synchronization | `bar_warp_sync()`, `barrier_cta_sync()`, `barrier_cta_arrive()`, `barrier_cta_red()`, `barrier_cluster_arrive()`, `barrier_cluster_wait()` |
| Data movement | `cp_async_shared_global()`, `cp_async_bulk_*()` family, `cp_async_bulk_tensor_*()` (TMA, multicast), `mbarrier_arrive_expect_tx()`, `mbarrier_wait_parity()` |
| Type conversion | `convert()`, `cvt_f32x2_to_f8x2()`, `convert_float_to_tf32()` |
| Atomics / utility | `atomicrmw()`, `shfl_sync()`, `elect_sync()`, `cluster_ctarank()` |

## Notes

- Purpose: return-type abstraction (wraps results in typed containers like `Int32`/`Boolean`), Python-to-DSL coercion (plain Python `int`/`bool` accepted), and unified namespace access to NVVM-level GPU primitives (barriers, TMA copies, tensor-core ops, special register reads).
- Sits beneath `cutlass.cute` — a lower-level abstraction enabling Tensor Core programming through SIMT for cases where CuTe abstractions reduce development velocity.
- Argument ordering differs between CTA variants: cluster TMA's `cp_async_bulk_tensor_shared_cluster_global()` places coordinates *before* the mbarrier, opposite of the CTA_1 variant.
- Mbarrier routing in CTA_2 uses bit-24 masking (`& 0xFEFFFFFF`) to redirect 2-SM-group deliveries; cluster sizes > 2 require per-CTA local barriers instead.
- The `.multicast::cluster` PTX modifier is emitted based on mask *presence*, not value — a single-CTA "selfcast" still pays multicast overhead.
- Issue `nvvm.fence_proxy("async_shared")` before TMA loads to guarantee visibility of prior thread writes.
- Marked experimental; may change before final release.

## Related

- [CuTe DSL API: cute.arch](./api-cute-arch.md)
- [CuTe DSL API: cute.nvgpu](./api-cute-nvgpu.md)
- [Task Scheduling (experimental)](./task-scheduling.md)
