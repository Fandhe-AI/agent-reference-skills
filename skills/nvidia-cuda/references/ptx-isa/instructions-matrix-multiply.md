# Matrix Multiply-Accumulate Instructions

Warp-level, asynchronous warpgroup-level, and TensorCore 5th-generation (Blackwell) matrix-multiply-accumulate instructions (PTX ISA 9.3 §9.7.15–9.7.17).

## Signature / Usage

```ptx
mma.sync.aligned.m8n8k4.alayout.blayout.dtype.f16.f16.ctype  d, a, b, c;

tcgen05.mma.cta_group::1.kind::tf32      [taddr0],  adesc,  bdesc, idesc, {m0, m1, m2, m3}, p;
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Warp level MMA (9.7.15) | `wmma.load`, `wmma.store`, `wmma.mma`, `mma`, `mma.sp`, `ldmatrix`, `stmatrix`, `movmatrix` |
| Async warpgroup level MMA (9.7.16) | `wgmma.mma_async`, `wgmma.mma_async.sp`, `wgmma.fence`, `wgmma.commit_group`, `wgmma.wait_group` |
| TensorCore 5th Generation Family (9.7.17) | `tcgen05.alloc`, `tcgen05.dealloc`, `tcgen05.relinquish_alloc_permit`, `tcgen05.ld`, `tcgen05.st`, `tcgen05.wait`, `tcgen05.cp`, `tcgen05.shift`, `tcgen05.mma`, `tcgen05.mma.sp`, `tcgen05.mma.ws`, `tcgen05.mma.ws.sp`, `tcgen05.fence`, `tcgen05.commit` |

## Notes

- PTX ISA 9.3 — Chapter 9.7.15–9.7.17
- `wmma.*` and `mma` operate per-warp on matrix fragments held in registers; `ldmatrix`/`stmatrix`/`movmatrix` load, store, and transpose matrix fragments between shared memory and registers.
- `wgmma.*` (Hopper, sm_90) issues an asynchronous matrix multiply across an entire warpgroup, with `wgmma.fence`/`wgmma.commit_group`/`wgmma.wait_group` managing the async pipeline.
- `tcgen05.*` (Blackwell, sm_100+) targets 5th-generation Tensor Cores and dedicated tensor memory (`tmem`), allocated/deallocated via `tcgen05.alloc`/`tcgen05.dealloc` and synchronized via `tcgen05.commit`/`tcgen05.wait`.

## Related

- [instructions-sync-communication](./instructions-sync-communication.md)
- [instructions-arithmetic](./instructions-arithmetic.md)
