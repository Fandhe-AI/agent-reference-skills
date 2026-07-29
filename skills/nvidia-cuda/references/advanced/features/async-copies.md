# Asynchronous Data Copies

Moves data between global memory and shared memory without staging through registers, via two hardware mechanisms: LDGSTS (`cuda::memcpy_async`, compute capability 8.0+, global→shared::cta) and the Tensor Memory Accelerator (TMA, `cp_async_bulk`/`cp_async_bulk_tensor`, compute capability 9.0+, broader source/destination combinations including multi-dimensional tensors).

## Signature / Usage

```cuda
if (tid < 8) {
    cuda::memcpy_async(buffer + tid, left + tid,
        cuda::aligned_size_t<4>(sizeof(float)), barrier);
} else if (tid >= 32 - 8) {
    cuda::memcpy_async(buffer + tid + 16, right + tid,
        cuda::aligned_size_t<4>(sizeof(float)), barrier);
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `cuda::memcpy_async` (with `cuda::barrier`) | Issues an asynchronous copy whose completion is tracked by a barrier; backed by LDGSTS on CC 8.0+. |
| `cuda::aligned_size_t<N>` | Wraps a size with a compile-time alignment guarantee, required by `cuda::memcpy_async` for hardware-accelerated paths. |
| `cooperative_groups::memcpy_async` / `__pipeline_memcpy_async` + `__pipeline_commit` / `__pipeline_wait_prior` | Alternative group- and pipeline-based APIs for the same LDGSTS-backed async copy. |
| `cuda::device::memcpy_async_tx` / `cuda::ptx::cp_async_bulk` | TMA bulk-async copy of a 1D array between global memory and shared memory. |
| `cuda::device::barrier_expect_tx` | Registers the expected byte count of a TMA transaction with a barrier so `bar.wait()` accounts for it. |
| `cuda::ptx::cp_async_bulk_tensor` | TMA copy of a multi-dimensional tensor tile, driven by a `CUtensorMap` descriptor. |
| `cuTensorMapEncodeTiled` (Driver API) | Host-side creation of a `CUtensorMap` describing a tensor's layout for TMA. |
| `cuda::ptx::tensormap_replace_*` / `tensormap_cp_fenceproxy` / `fence_proxy_tensormap_generic` | Device-side modification of an existing tensor map and the fence required before using the modified copy. |
| `cuda::ptx::st_async` | STAS (CC 9.0+): asynchronous store from registers directly to cluster shared memory. |

## Notes

- LDGSTS (CC 8.0+) covers global→shared::cta only; TMA (CC 9.0+) additionally supports shared::cluster→shared::cta and bulk global↔global transfers, and is the only mechanism for multi-dimensional tensor tiles.
- TMA tensor map swizzle patterns (`CU_TENSOR_MAP_SWIZZLE_128B` / `_64B` / `_32B`) trade shared-memory bank-conflict avoidance against alignment constraints — both shared and global memory alignment must satisfy the pattern's requirement (128 bytes for all three listed patterns).
- A `CUtensorMap` can be created once on the host via `cuTensorMapEncodeTiled` or built/modified on the device via `tensormap_replace_*`, but any device-side modification must be followed by `tensormap_cp_fenceproxy`/`fence_proxy_tensormap_generic` before the modified map is used for a copy.

## Related

- [Asynchronous Barriers](./async-barriers.md)
- [Pipelines](./pipelines.md)
- [Cooperative Groups](./cooperative-groups.md)
