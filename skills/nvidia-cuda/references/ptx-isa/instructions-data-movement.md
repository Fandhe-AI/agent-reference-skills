# Data Movement, Conversion, and Fabric Instructions

Register/memory data movement, address-space conversion, and fabric (multi-GPU NVLink-fabric) instructions (PTX ISA 9.3 §9.7.9–9.7.10).

## Signature / Usage

```ptx
ld.global.f32    d,[a];
st.global.f32    [a],b;
cvta.const.u32   ptr,cvar;   // convert const address to generic address
cvta.to.global.u32  p,gptr;  // convert generic address to global address
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Data movement and conversion (9.7.9) | `mov`, `shfl` (deprecated), `shfl.sync`, `prmt`, `ld`, `ld.global.nc`, `ldu`, `st`, `st.async`, `st.bulk`, `multimem.ld_reduce`, `multimem.st`, `multimem.st.async`, `multimem.red`, `prefetch`, `prefetchu`, `applypriority`, `discard`, `createpolicy`, `isspacep`, `cvta`, `cvt`, `cvt.pack`, `mapa`, `getctarank`, `cp.async`, `cp.async.bulk`, `cp.reduce.async.bulk`, `tensormap.replace` |
| Fabric instructions (9.7.10) | `fabric.try_get`, `fabric.try_put`, `fabric.try_red`, `fabric.try_pullred`, `fabric.submit`, `fabric.wait` |

## Notes

- PTX ISA 9.3 — Chapter 9.7.9–9.7.10
- `mov` transfers data between registers or from a constant into a register; `ld`/`st` load and store to/from memory across state spaces and addressing modes.
- `cvta.space` converts a `.const`/`.global`/`.local`/`.shared`/`.param` address into a generic address; `cvta.to.space` performs the reverse conversion (generic → state-space address).
- Fabric instructions (9.7.10) target the NVLink fabric address space for cross-GPU/multimem access.

## Related

- [instruction-operands](./instruction-operands.md)
- [instructions-sync-communication](./instructions-sync-communication.md)
