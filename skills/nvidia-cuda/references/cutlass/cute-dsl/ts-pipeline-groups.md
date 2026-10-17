# Task Scheduling: Pipeline Groups

A `PipelineGroup` lets pipelined resources driven together by a single task on one side share one barrier instead of arriving on one barrier each (an optimization; per-resource barriers are always correct and grouping is never automatic).

## Signature / Usage

```python
smem_a = SmemAResource(..., pipeline_config=cfg_a, name="smem_a")
smem_b = SmemBResource(..., pipeline_config=cfg_b, name="smem_b")

ab_sync = PipelineGroup(
    name="ab_sync",
    members=[smem_a, smem_b],
    mode=PipelineGroupMode.Merge,
)

allocator.add_resource(smem_a)
allocator.add_resource(smem_b)
allocator.add_pipeline_group(ab_sync)
```

## Options / Props

| Mode | Dataflow | Collapsed side | Calls |
| --- | --- | --- | --- |
| `PipelineGroupMode.Merge` | N producers -> 1 consumer | consumer | Members `commit()` individually; the consumer calls `group.release()` once. |
| `PipelineGroupMode.Fork` | 1 producer -> N consumers | producer | Members `release()` individually; the producer calls `group.commit()` once. |
| `PipelineGroupMode.FusedMerge` | N producers -> 1 consumer | both | Each producer `commit()`s individually onto one shared full barrier; the consumer calls `group.wait()` and `group.release()` once. |

Valid heterogeneous combinations:

| Mode | Collapsed kind | Allowed member mixes |
| --- | --- | --- |
| Merge | consumer async | `AsyncAsync` + `TmaAsync` + `UmmaAsync` |
| Merge | consumer umma | `TmaUmma` + `AsyncUmma` + `UmmaUmma` |
| Fork | producer tma | `TmaAsync` + `TmaUmma` |
| Fork | producer async | `AsyncAsync` + `AsyncUmma` |
| Fork | producer umma | `UmmaAsync` + `UmmaUmma` |

## Notes

- Canonical Merge case (GEMM mainloop): `smem_a` is produced in a `LoadA` task and `smem_b` in a `LoadB` task; the `MMA` task consumes both in the same iteration and produces `tmem_c`:

  ```python
  resource_dependency_graph = {
      smem_a: [gmem_ab],
      smem_b: [gmem_ab],
      tmem_c: [smem_a, smem_b],   # one dependent for both A and B
      gmem_d: [tmem_c],
  }
  ```

- Only the collapsed side must be homogeneous: Merge and FusedMerge require the same consumer kind (all `async` or all `umma`); Fork requires the same producer kind (all `tma`, `async` or `umma`). Kinds are `tma`, `async`, `umma`.
- Each member declares its own `PipelineConfig` exactly as if not grouped; do not write a special grouped config. At construction the group validates the same `num_stages` and compatible type on the collapsed side, sums `num_bytes`, requires matching collapsed-side cooperative-group size, and re-initializes the barriers. Incompatible configs raise `ValueError`. An explicit `pipeline_config` passed to the group is validated against the members the same way.
- Barrier layout (`S` = `num_stages`, `N` = members): Merge `[full_0 x S] ... [full_{N-1} x S] [shared_empty x S]`; Fork `[shared_full x S] [empty_0 x S] ... [empty_{N-1} x S]`; both use `(N + 1) * num_stages` mbarriers. FusedMerge uses `2 * num_stages`: `[shared_full x S] [shared_empty x S]`, each producer arriving through a per-member view (`recast_to_new_op_type`).
- The group owns the shared barrier SMEM (not the members); alternatively a `BarrierAllocator` can own it via `add_pipeline_group()`.
- Inside `@schedule`, use `group.member` for per-member operations and the group object only for the collapsed stage. Keep the bare resources in `Task.src_resources` / `Task.dst_resources`.

  ```python
  @schedule
  def store_schedule(output, group):
      with domain_loop(0, num_iters, 1):
          group.smem_a.try_wait()
          group.smem_a.wait()
          group.smem_b.try_wait()
          group.smem_b.wait()
          val_a = group.smem_a.read()
          val_b = group.smem_b.read()
          output.store(val_a=val_a, val_b=val_b)
          group.release()          # one collapsed release for both members

  @schedule
  def load_schedule(group):
      with domain_loop(0, num_k_tiles, 1):
          group.smem_gemm.try_acquire()
          group.smem_gemm.acquire()
          group.smem_act.try_acquire()
          group.smem_act.acquire()
          group.smem_gemm.load()
          group.commit()           # one collapsed commit for both members

  @schedule
  def mma_schedule(smem_a, smem_b, tmem, ab_group):
      with domain_loop(0, num_k_tiles, 1):
          ab_group.try_wait()         # one collapsed wait for all members
          ab_group.wait()
          tmem.mma(...)
          ab_group.release()          # one collapsed release for all members
  ```

- Hard rules: do not call `group.member.release()` on the collapsed Merge/FusedMerge consumer side, `group.member.commit()` on the collapsed Fork producer side, or `group.member.wait()` on the collapsed FusedMerge consumer side; TS rejects those schedules.
- Document version: CUTLASS v4.8.0 — [Pipeline Groups](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_pipeline_groups.html) (source: [ts_pipeline_groups.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_pipeline_groups.rst))

## Related

- [Task Scheduling: Pipelines](./ts-pipelines.md)
- [Task Scheduling: Allocators](./ts-allocators.md)
- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling API: pipeline_group](./ts-api-pipeline-group.md)
