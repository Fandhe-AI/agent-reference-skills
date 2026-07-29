# CuTe DSL API: cute.nvgpu.cpasync

## Signature / Usage

```python
import cutlass.cute.nvgpu.cpasync as cpasync

tma_atom, tma_tensor = cpasync.make_tiled_tma_atom(gmem_tensor, smem_layout)
mask = cpasync.create_tma_multicast_mask(cta_layout, coord)
cpasync.prefetch_descriptor(tma_atom)
```

## Options / Props

| Symbol | Description |
| --- | --- |
| `LoadCacheMode` (enum) | Cache mode for non-bulk `cp.async` |
| `CopyG2SOp` | Non-bulk async global-to-shared copy, configurable cache mode |
| `CopyBulkTensorTileG2SOp` | Bulk tensor async global-to-shared TMA copy (tile mode); single-thread issuance via implicit `elect_one()` |
| `CopyBulkTensorTileG2SMulticastOp` | Multicast variant of the above |
| `CopyBulkTensorTileS2GOp` | Bulk tensor async shared-to-global TMA copy (tile mode) |
| `CopyReduceBulkTensorTileS2GOp` | Bulk tensor async shared-to-global TMA reduction, configurable reduction kind |
| `CopyDsmemStoreOp` | Async store to DSMEM with explicit synchronization |
| `CopyBulkG2SOp` / `CopyBulkG2SMulticastOp` | Bulk async global-to-shared copy (plain / multicast) |
| `CopyBulkS2GOp` | Bulk async shared-to-global copy |
| `CopyBulkS2GByteMaskOp` | Bulk shared-to-global copy with 16-bit per-chunk byte mask |
| `CopyBulkS2SOp` | Bulk async shared-to-shared copy within a cluster |
| `TmaCopyOp` | Base class for all TMA copy operations |
| `TmaInfo` | Bundles a TMA Copy Atom + SMEM layout + TMA tensor; tuple-unpackable |
| `make_tiled_tma_atom()` | Creates a TMA Copy Atom tiling GMEM<->SMEM with a given layout; returns the atom + TMA tensor |
| `tma_partition()` | Tiles GMEM/SMEM tensors for a TMA Copy Atom; supports standard and gather4 modes |
| `create_tma_multicast_mask()` | Computes the multicast mask for a TMA load from a CTA layout + coordinate |
| `prefetch_descriptor()` | Prefetches the TMA descriptor for a TMA Atom |
| `copy_tensormap()` | Copies a TMA Copy Atom's tensormap to a given memory location |
| `update_tma_descriptor()` | Updates TMA descriptor fields (base address, shape, stride) |
| `fence_tma_desc_acquire()` / `fence_tma_desc_release()` | Memory fences for TMA descriptor acquire/release |
| `cp_fence_tma_desc_release()` | Tensormap-copy fence proxy for descriptor release |
| `group_bulk_copy_modes()` | Groups mode 0 to acquire the whole tensor for bulk copy |

## Related

- [CuTe: TMA Tensors (C++)](../cpp/cute-tma-tensors.md)
- [CuTe DSL API: cute_nvgpu](./api-cute-nvgpu.md)
