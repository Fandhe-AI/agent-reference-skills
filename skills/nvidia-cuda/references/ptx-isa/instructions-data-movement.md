# Data Movement, Conversion, and Fabric Instructions

Register/memory data movement, address-space conversion, and fabric (multi-GPU NVLink-fabric) instructions (PTX ISA 9.3 §9.7.9–9.7.10).

## Signature / Usage

```ptx
mov.u32 %r0, %ctaid.x;
ld.global.f32 %f0, [ptr];
st.global.f32 [ptr], %f0;
cvta.global.u64 %rd0, generic_ptr;
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Data movement and conversion (9.7.9) | `mov`, `shfl` (deprecated), `shfl.sync`, `prmt`, `ld`, `ld.global.nc`, `ldu`, `st`, `st.async`, `st.bulk`, `multimem.ld_reduce`, `multimem.st`, `multimem.st.async`, `multimem.red`, `prefetch`, `prefetchu`, `applypriority`, `discard`, `createpolicy`, `isspacep`, `cvta`, `cvt`, `cvt.pack`, `mapa`, `getctarank`, `cp.async`, `cp.async.bulk`, `cp.reduce.async.bulk`, `tensormap.replace` |
| Fabric instructions (9.7.10) | `fabric.try_get`, `fabric.try_put`, `fabric.try_red`, `fabric.try_pullred`, `fabric.submit`, `fabric.wait` |

## Notes

- PTX ISA 9.3 — Chapter 9.7.9–9.7.10
- `mov` transfers data between registers or from a constant into a register; `ld`/`st` load and store to/from memory across state spaces and addressing modes.
- `cvta` converts a state-space-specific address into a generic address (or the reverse), enabling generic addressing across `.global`/`.shared`/`.local`.
- Fabric instructions (9.7.10) target the NVLink fabric address space for cross-GPU/multimem access.

## Related

- [instruction-operands](./instruction-operands.md)
- [instructions-sync-communication](./instructions-sync-communication.md)
