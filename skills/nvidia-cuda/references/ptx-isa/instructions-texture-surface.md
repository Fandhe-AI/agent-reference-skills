# Texture and Surface Instructions

Texture-fetch and surface load/store/reduce instructions operating on the `.tex` and surface state spaces (PTX ISA 9.3 §9.7.11–9.7.12).

## Signature / Usage

```ptx
tex.1d.v4.f32.s32 {r0,r1,r2,r3}, [texref, {x}];
suld.b.2d.v4.b32.zero {r0,r1,r2,r3}, [surfref, {x,y}];
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Texture instructions (9.7.11) | `tex`, `tld4`, `txq`, `istypep` |
| Surface instructions (9.7.12) | `suld`, `sust`, `sured`, `suq` |

## Notes

- PTX ISA 9.3 — Chapter 9.7.11–9.7.12
- `tex` performs a filtered texture fetch with addressing modes and filtering options configured on the texture reference; `tld4` fetches four texels for a single filtering component.
- `suld`/`sust`/`sured` load, store, and atomically reduce surface memory using coordinates; `suq` queries surface properties (e.g. width/height/depth).
- These instruction families provide specialized memory access patterns (caching, addressing, filtering) beyond standard global-memory load/store.

## Related

- [instructions-data-movement](./instructions-data-movement.md)
- [state-spaces-types-variables](./state-spaces-types-variables.md)
