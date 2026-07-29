# Parallel Synchronization and Communication Instructions

Barrier, memory fence, atomic/reduction, warp-vote, and asynchronous mbarrier instructions for cross-thread synchronization and communication (PTX ISA 9.3 §9.7.14).

## Signature / Usage

```ptx
bar.cta.sync  1;    // arrive, wait for others to arrive
membar.gl;
atom.global.add.s32  d,[a],1;
vote.sync.all.pred    p,q,0xffffffff;
mbarrier.init{.layout}{.shared{::cta}}.b64 [addr], count;
```

## Options / Props

| Group | Mnemonics |
| --- | --- |
| Barrier / cluster barrier | `bar`, `barrier`, `bar.warp.sync`, `barrier.cluster` |
| Fence | `membar`, `fence` |
| Atomic / reduction | `atom`, `red`, `red.async`, `multimem.red.async` |
| Warp vote / match | `vote` (deprecated), `vote.sync`, `match.sync`, `activemask`, `redux.sync` |
| Grid/cluster control | `griddepcontrol`, `elect.sync`, `clusterlaunchcontrol.try_cancel`, `clusterlaunchcontrol.query_cancel` |
| mbarrier family | `mbarrier.init`, `mbarrier.inval`, `mbarrier.expect_tx`, `mbarrier.complete_tx`, `mbarrier.arrive`, `mbarrier.arrive_drop`, `cp.async.mbarrier.arrive`, `mbarrier.test_wait`, `mbarrier.try_wait`, `mbarrier.pending_count`, `mbarrier.check_layout` |
| Tensor-map fence | `tensormap.cp_fenceproxy` |

## Notes

- PTX ISA 9.3 — Chapter 9.7.14
- `bar.sync` synchronizes all threads of a CTA at a barrier; `barrier.cluster` extends this to cluster scope (sm_90+).
- `mbarrier` provides an asynchronous barrier object (initialized in shared memory) used to track completion of async-copy and other asynchronous operations without a blocking `bar.sync`.
- See memory-consistency-model for the scope (`.cta`/`.cluster`/`.gpu`/`.sys`) and ordering semantics that these instructions rely on.

## Related

- [memory-consistency-model](./memory-consistency-model.md)
- [instructions-matrix-multiply](./instructions-matrix-multiply.md)
