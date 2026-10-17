# Release Notes

PTX ISA is versioned independently from — but shipped alongside — each CUDA Toolkit release. Each new PTX ISA version adds instructions, directives, and qualifiers, generally introduced together with a new `sm_xx` target architecture.

## Signature / Usage

```ptx
.version  major.minor    // major, minor are integers; current doc title reports 9.4
```

## Options / Props

| PTX ISA version | Notable additions (as of this distillation) |
| --- | --- |
| 9.4 (this reference) | `sm_107` target with `sm_107f` (family-specific) and `sm_107a` (architecture-specific); `spcompress` / `spdecompress` instructions and `.spcompress` for `tcgen05.ld{.red}`; `applypriority.async.bulk` and `applypriority.async.bulk.tensor`; fabric instructions `fabric.try_get.async.tensor` / `fabric.try_put.async.tensor` / `fabric.try_red.async.tensor`, `fabric.try_atom`, `createpolicy.range.fabric`, and `.level::cache_hint` for `fabric.try_get` / `fabric.try_put` / `fabric.try_red`; `.minperctamemory` directive with `%perctamemoryoffset` / `%perctamemorysize` special registers; `.loc_intermediate` directive and `.nv_intermediate_source_section` construct; `add` / `sub` / `mul` / `fma` with `.f16x2` / `.bf16x2` / `.f32x2` and FP8/FP6/FP4 x4 packed types; `set` instruction types `.u8x4` / `.s8x4` / `.u16x2` / `.s16x2`; `tcgen05`: `.kind::ti16` for `mma` / `mma.sp` / `mma.ws` / `mma.ws.sp`, UE5M3 scale type, `.decompress::lut::b`, `.collector::b::*`, `.exclusive` for `alloc` / `dealloc`, `.sync_restrict::shared::read::mma::a` for `commit`; `.multicast::cluster::32b` for `mbarrier.expect_tx` / `complete_tx` / `arrive` / `arrive_drop`, `cp.async.bulk`, `cp.async.bulk.tensor`, `tcgen05.commit`; `.sync_restrict::shared::cluster::read` for `fence.proxy.async::generic`; `.acquire` / `.release` with `.alias` for `fence.proxy`; `.noftz` with `.f32` for `atom` / `red` / `cp.reduce.async.bulk` / `multimem.cp.reduce.async.bulk`; `cvt`: `.pzo`, `.rz` (with `.e4m3x2` / `.e5m2x2` / `.e2m3x2` / `.e3m2x2` / `.e2m1x2` destinations), `.ue5m3x2`, `.scaled::n1::ue8m0`; `prefetch` `.valid_addr` / `.L1::32B`; `ld` `.proxy::readonly`; `cp.async.bulk` / `.tensor` `.report_mechanism`; `cp.async.bulk(.tensor)` / `cp.reduce.async.bulk.tensor` `.override::global_address` / `.override_attribute` and `.im2col_no_offs::w`; `cp.async.bulk.prefetch(.tensor)` `.level::eviction_priority`; `ldmatrix` `.s8.s4` types for `.m8n16`. Semantic changes: none |
| 9.3 (previous) | `clmad` instruction; `mma_throughput` pragma; `.phase_type::*` qualifier and `reportPredicate`/`reportValue` operands for `mbarrier` wait instructions; `.layout` qualifier and `mbarrier.check_layout`; `multimem.st.async` / `multimem.red.async`; `.sem`/`.scope` qualifiers for async bulk-copy instructions; fabric instructions (`fabric.try_get`, `fabric.try_put`, `fabric.try_red`, `fabric.try_pullred`, `fabric.wait`, `fabric.submit`); `.language` directive |
| 9.2 / 9.1 / 9.0 / 8.x | Prior releases; see the official Release Notes chapter for the full per-version changelog |

## Notes

- PTX ISA 9.4 — Chapter 13
- The 9.4 row follows the "Changes in PTX ISA Version 9.4" list and Target ISA notes of the official Release Notes chapter verbatim; the 9.3 row is kept from the previous distillation. 9.3 already introduced `fabric.try_get` / `try_put` / `try_red` / `try_pullred` / `wait` / `submit`; 9.4 adds the `.async.tensor` forms and `fabric.try_atom`.
- The version-to-CUDA-Toolkit / `sm_xx` architecture correspondence is documented in full in the official Release Notes chapter; this page distills only the two most recent (9.4, 9.3) entries, since the base URL always serves the latest version and older entries were not re-verified here.
- When updating this skill, re-check the `.version` string printed at the top of the official page and refresh this table before trusting version-specific instruction availability.

## Related

- [pragma-strings](./pragma-strings.md)
- [directives](./directives.md)
