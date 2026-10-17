# Data Movement, Conversion, and Fabric Instructions

Register/memory data movement, address-space conversion, and fabric (multi-GPU NVLink-fabric) instructions (PTX ISA 9.4 §9.7.10–9.7.11).

## Signature / Usage

```ptx
ld.global.f32    d,[a];
st.global.f32    [a],b;
cvta.const.u32   ptr,cvar;   // convert const address to generic address
cvta.to.global.u32  p,gptr;  // convert generic address to global address

// PTX ISA 9.4 additions
applypriority.async.bulk.global.bulk_group.L2::evict_normal [ptr], 128;
spcompress.b8.b2.sp::2:4.x4 {mdata_0}, ...;   // dense -> 2:4 structured sparse (see 9.7.10.30)
createpolicy.range.fabric.L2::evict_last.L2::evict_first.b64 policy, [leid, off], 0x100000, 0x200000;
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Data movement and conversion (9.7.10) | `mov`, `shfl` (deprecated), `shfl.sync`, `prmt`, `ld`, `ld.global.nc`, `ldu`, `st`, `st.async`, `st.bulk`, `multimem.ld_reduce`, `multimem.st`, `multimem.st.async`, `multimem.red`, `prefetch`, `prefetchu`, `applypriority`, `applypriority.async.bulk`, `applypriority.async.bulk.tensor`, `discard`, `createpolicy` (incl. `createpolicy.range.fabric`), `isspacep`, `cvta`, `cvt`, `cvt.pack`, `mapa`, `getctarank`, `cp.async`, `cp.async.bulk`, `cp.reduce.async.bulk`, `tensormap.replace`, `spcompress`, `spdecompress` |
| Fabric instructions (9.7.11) | `fabric.try_get`, `fabric.try_put`, `fabric.try_red`, `fabric.try_pullred`, `fabric.submit`, `fabric.wait`, `fabric.try_get.async.tensor`, `fabric.try_put.async.tensor`, `fabric.try_red.async.tensor`, `fabric.try_atom` |

## Notes

- PTX ISA 9.4 — Chapter 9.7.10–9.7.11 (section numbers shifted by one from 9.3 because 9.4 inserted Alternate Floating-Point as 9.7.6)
- `mov` transfers data between registers or from a constant into a register; `ld`/`st` load and store to/from memory across state spaces and addressing modes.
- `cvta.space` converts a `.const`/`.global`/`.local`/`.shared`/`.param` address into a generic address; `cvta.to.space` performs the reverse conversion (generic → state-space address).
- Fabric instructions (9.7.11): pointer-address-based memory operations treat NVLink failures as fatal to the application; the CUDA Compute Fabric Transport (CFT) model introduces fabric operations that report failures to the application so it can abort, tear down, or retry. A CFT handle is `leId` (32-bit logical endpoint id) plus `off` (64-bit resource offset within the endpoint). All fabric operations are asynchronous, may fail with a reported status, and access handle resources via the fabric-proxy. Lifecycle: issue operations tracked by an `mbarrier.layout::v1`, submit them before the mbarrier phase completes, arrive/expect-tx, wait, then inspect the report predicate (the `mbarrier::report::fabric` mechanism; the opaque report value can be decoded with `cudaFabricOpErrorStatusGet/Count`). Partial completion mechanisms: fabric-read (reuse shared memory read by an operation) and counted (`.counted::bytes`, 8-byte 256B-aligned global counter incremented per byte accessed, system-scope atomic; incompatible with `.cp_mask`).
- Fabric instruction forms (verbatim syntax heads): `fabric.try_get.async.dst.completion_mechanism{.level::cache_hint}.sem.scope.b128 [dst], [srcLeId, srcDataOff], size, [bar] {, cache_policy};` and `fabric.try_put.async{.multimem}.src.completion_mechanism0{.level::cache_hint}.sem.scope.b128 [dstLeId, dstDataOff], [src], size, [bar] {, cache_policy};`. `fabric.try_get` / `try_put` / `try_red` / `try_pullred` / `submit` / `wait` / `try_atom` require `sm_100` or higher; the `.async.tensor` forms require `sm_107f` or higher in the same family. `.level::cache_hint` for `fabric.try_get` / `try_put` / `try_red` is PTX ISA 9.4 (the base instructions are 9.3). `size` must be a multiple of 16 and offsets 16-byte aligned; `fabric.try_get` uses `.mbarrier::complete_tx::bytes` whereas `try_put` / `try_red` use `.mbarrier::complete_tx::16B`.
- `fabric.try_get.async.tensor` / `fabric.try_put.async.tensor` / `fabric.try_red.async.tensor` (9.4) copy tensor data from / to / with reduction into a tensor at a fabric handle; the examples use `.override::global_address`. `fabric.try_atom` (9.4) is an asynchronous atomic operation on a fabric handle (`.redOpBit`, `.redOpExchCas`, `.redOpMinMax`, `.redOpAdd` forms; e.g. `.and.b32`, `.add.bf16x2`, `.xor.b64`).
- `applypriority.async.bulk{.src}.completion_mechanism.level::eviction_priority [a], size;` (9.4): applies the cache eviction priority to the address range `[a..a+size)` (`.level::eviction_priority = { .L2::evict_normal }`, `.src = { .global }`, `.completion_mechanism = { .bulk_group }`); `size` is a multiple of 16 and `a` is 128-byte aligned; weak memory operation. `applypriority.async.bulk.tensor` is the tensor variant (`.dim = { .1d .. .5d }`). Both: PTX ISA 9.4, `sm_107f` or higher in the same family.
- `spcompress.elemsize.idxsize.spfactor.num mdata, cdata, data, spdesc;` (9.4): compresses a dense vector to a 2:4 structured sparse vector (`.elemsize = { .b8, .b16 }`, `.idxsize = { .b2, .b4 }`, `.spfactor = { .sp::2:4 }`, `.num = { .x1 .. .x64 }`); `mdata` holds the indices of the 2 selected elements per group of 4. `spdecompress.elemsize.idxsize.spfactor.num data, mdata, cdata;` is the inverse, with `.spfactor` also allowing `.sp::1:2`, `.sp::1:4`, `.sp::1:8`, `.sp::1:16` (see the official page for the complete list). Both: PTX ISA 9.4, `sm_107a`.
- `createpolicy.range.fabric.level::primary_priority{.level::secondary_priority}.b64 cache_policy, [aLe, aOff], primary-size, total-size;` (9.4, `sm_100` or higher): range-based eviction policy over address ranges within a fabric handle (primary range starting at `aOff`, plus trailing and preceding secondary ranges); maximum `total-size` 4 GB; default secondary priority `.L2::evict_unchanged`.
- Qualifiers added in 9.4 whose only source here is the Release Notes (wording verbatim, no semantics asserted): `cvt` `.pzo`; `cvt` `.rz` rounding mode with `.e4m3x2`, `.e5m2x2`, `.e2m3x2`, `.e3m2x2`, `.e2m1x2` destination types; `cvt` `.ue5m3x2` instruction type; `cvt` `.scaled::n1::ue8m0`; `prefetch` `.valid_addr` and `.L1::32B`; `ld` `.proxy::readonly`; `cp.async.bulk` / `cp.async.bulk.tensor` `.report_mechanism`, `.multicast::cluster::32b`; `cp.async.bulk.prefetch` / `.prefetch.tensor` `.level::eviction_priority`; `cp.async.bulk.tensor`, `cp.reduce.async.bulk.tensor`, `cp.async.bulk.prefetch.tensor` `.override::global_address` and `.override_attribute`; `cp.async.bulk.tensor` / `cp.reduce.async.bulk.tensor` `.im2col_no_offs::w`; `ldmatrix` `.s8.s4` types for the `.m8n16` shape.

## Related

- [instruction-operands](./instruction-operands.md)
- [instructions-sync-communication](./instructions-sync-communication.md)
