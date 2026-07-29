# CuTe DSL API: cute.arch

## Signature / Usage

```python
import cutlass.cute.arch as arch

tid = arch.thread_idx()
arch.sync_threads()
arch.mbarrier_init(mbar_ptr, arrival_count)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Thread & block info | `thread_idx()`, `block_dim()`, `block_idx()`, `grid_dim()`, `lane_idx()`, `warp_idx()`, `physical_warp_id()` |
| Cluster operations | `cluster_idx()`, `cluster_dim()`, `cluster_size()`, `block_in_cluster_idx()`, `block_idx_in_cluster()` |
| Memory barriers | `mbarrier_init()`, `mbarrier_arrive()`, `mbarrier_expect_tx()`, `mbarrier_arrive_and_expect_tx()`, `mbarrier_wait()`, `mbarrier_try_wait()` |
| Synchronization | `sync_threads()`, `sync_warp()`, `barrier()`, `barrier_arrive()`, `elect_one()` |
| Atomics | `atomic_add()`, `atomic_max()`, `atomic_min()`, `atomic_and()`, `atomic_or()`, `atomic_xor()`, `atomic_exch()`, `atomic_cas()`, `atomic_fmax()`, `atomic_fmin()` |
| Memory ops | `load()`, `store()`, `red()` |
| Warp ops | `vote_ballot_sync()`, `vote_all_sync()`, `vote_any_sync()`, `warp_redux_sync()`, `match_sync()` |
| Bit ops | `popc()`, `clz()`, `bfind()`, `brev()`, `bfe()`, `bfi()`, `lop3()`, `shf()` |
| Integer arithmetic | `mul_hi()`, `mul_wide()`, `mul24()`, `mad24()`, `add_cc()`, `addc()`, `sub_cc()`, `subc()`, `mad_cc()`, `madc()` |
| Floating-point ops | `fmax()`, `fmin()`, `rcp_approx()`, `exp2()` |
| Type conversions | `cvt_i8x4_to_f32x4()`, `cvt_f32_tf32()`, `cvt_i8x2_to_bf16x2()` |
| Special registers | `smid()`, `nsmid()`, `gridid()`, `clock()`, `clock64()`, `globaltimer()`, `globaltimer_lo()`, `total_smem_size()`, `aggr_smem_size()`, `warpsize()`, `nwarpid()` |
| Fence/cache | `fence_acq_rel_cta()`, `fence_acq_rel_cluster()`, `fence_acq_rel_gpu()`, `fence_acq_rel_sys()`, `fence_proxy()`, `cp_async_commit_group()`, `cp_async_wait_group()` |
| Lane masks | `activemask()`, `lanemask_lt()`, `lanemask_le()`, `lanemask_eq()`, `lanemask_ge()`, `lanemask_gt()` |
| Register allocation | `warpgroup_reg_alloc()` / `warpgroup_reg_dealloc()` (soft-deprecated), `setmaxregister_increase()` / `setmaxregister_decrease()` |

## Notes

- Wraps NVVM operations implementing CUDA built-in device functions — a thin, DSL-callable layer over CUDA's intrinsic instruction set.
- `warpgroup_reg_alloc()`/`warpgroup_reg_dealloc()` are soft-deprecated in favor of `setmaxregister_increase()`/`setmaxregister_decrease()` — see [Deprecation Policy](./deprecation-policy.md).

## Related

- [CuTe DSL API: cute](./api-cute.md)
- [Deprecation Policy](./deprecation-policy.md)
