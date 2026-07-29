# Matrix Multiply-Accumulate Instructions

Warp-level, asynchronous warpgroup-level, and TensorCore 5th-generation (Blackwell) matrix-multiply-accumulate instructions (PTX ISA 9.3 §9.7.15–9.7.17).

## Signature / Usage

```ptx
mma.sync.aligned.m16n8k16.row.col.f32.f16.f16.f32
    {d0,d1,d2,d3}, {a0,a1,a2,a3}, {b0,b1}, {c0,c1,c2,c3};

tcgen05.mma.cta_group::1.kind::f16
    [d_tmem], [a_desc], [b_desc], idesc, enable;
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
