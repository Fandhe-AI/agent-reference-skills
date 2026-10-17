# Task Scheduling API: pipeline

`cutlass.experimental.task_scheduling.pipeline`: TS pipeline overloads (`TSPipelineTmaAsync`, `TSPipelineUmmaUmma`, `TSPipelineAsyncUmma`) subclassing the `cutlass.pipeline` classes.

## Signature / Usage

```python
class cutlass.experimental.task_scheduling.pipeline.TSPipelineTmaAsync(
    sync_object_full: SyncObject,
    sync_object_empty: SyncObject,
    num_stages: int,
    producer_mask,
    consumer_mask,
    is_signaling_thread,
    is_task_warp_leader,
)

TSPipelineTmaAsync.create(
    *,
    num_stages: int,
    producer_group: CooperativeGroup,
    consumer_group: CooperativeGroup,
    tx_count: int,
    barrier_storage: cute.Pointer,
    is_task_warp_leader,
    cta_layout_vmnk: cute.Layout | None = None,
    mcast_mode_mn: tuple[int, int] = (1, 1),
    defer_sync: bool = False,
) -> TSPipelineTmaAsync

class cutlass.experimental.task_scheduling.pipeline.TSPipelineUmmaUmma(
    sync_object_full, sync_object_empty, num_stages: int,
    producer_mask, consumer_mask, cta_group: CtaGroup,
)

TSPipelineUmmaUmma.create(
    *,
    num_stages: int,
    producer_group: CooperativeGroup,
    consumer_group: CooperativeGroup,
    barrier_storage: cute.Pointer,
    cta_layout_vmnk: cute.Layout | None = None,
    defer_sync: bool = False,
) -> TSPipelineUmmaUmma

class cutlass.experimental.task_scheduling.pipeline.TSPipelineAsyncUmma(
    sync_object_full, sync_object_empty, num_stages: int,
    producer_mask, consumer_mask, cta_group: CtaGroup,
    producer_op: PipelineOp = PipelineOp.AsyncThread,
)

TSPipelineAsyncUmma.create(
    *,
    num_stages: int,
    producer_group: CooperativeGroup,
    consumer_group: CooperativeGroup,
    barrier_storage: cute.Pointer,
    cta_layout_vmnk: cute.Layout | None = None,
    producer_op: PipelineOp = PipelineOp.AsyncThread,
    defer_sync: bool = False,
) -> TSPipelineAsyncUmma
```

## Options / Props

| Class | Base | Description |
| --- | --- | --- |
| `TSPipelineTmaAsync` | `PipelineTmaAsync` | TMA async pipeline with TS task-warp-leader barrier arming. Attribute `is_task_warp_leader` (Boolean): predicate selecting the first warp assigned to the task; only this warp arms the transaction barrier under task-warp-leader signaling. `producer_acquire(state, try_acquire_token=None)` waits for empty on all producer warps and arms full only on the task leader. |
| `TSPipelineUmmaUmma` | `PipelineAsync` | Pipeline for a UMMA producer feeding a UMMA consumer (TCGen05 arrivals on both sides). Attribute `cta_group` (`cute.nvgpu.tcgen05.CtaGroup`) used by producer commit and consumer release. Methods `producer_commit(state)` (UMMA producer commit of the full barrier) and `consumer_release(state)` (UMMA consumer release of the empty barrier). |
| `TSPipelineAsyncUmma` | `PipelineAsyncUmma` | TS async-producer pipeline feeding a UMMA consumer. `producer_op` is `AsyncThread` or `AsyncLoad`. `producer_commit(state)` publishes the full barrier using CUTLASS 2SM UMMA-consumer semantics. |

`create` parameters: `tx_count` is the transaction byte count expected by the full barrier; `barrier_storage` is SMEM mbarrier storage; `is_task_warp_leader` is the predicate controlling task-warp-leader transaction arming; `cta_layout_vmnk` is the cluster layout (for `TSPipelineUmmaUmma`, used to select CTA group and peer masks); `mcast_mode_mn` is the TMA multicast mode; `defer_sync` defers pipeline initialization synchronization.

## Notes

- CuTeDSL TMA pipelines arm transaction barriers from every warp that calls `producer_acquire` because `MbarrierArray.arrive_and_expect_tx` is guarded only by per-warp `elect_one`. TS sometimes maps several TMA producer warps in one task to the same full barrier and wants one software arrival carrying the aggregate transaction byte count. `TaskWarpLeader` therefore keeps every producer warp in the empty-barrier acquire path but guards the full-barrier transaction arrive to the first warp assigned to the task.
- CUTLASS `PipelineUmmaConsumerAsync` does not use the generic async-thread destination-rank arrive for 2SM producer commits; `TSPipelineAsyncUmma` clears SM100's peer bit on the full-barrier address and emits one cluster-shared mbarrier arrive per producer thread, targeting SM0 of the collaborating pair.
- These classes subclass the `cutlass.pipeline` classes documented in the CuTe DSL pipeline API page and are distinct implementations used by the TS framework; the `PipelineType` names (`TmaAsync`, `TmaUmma`, ...) in TS configs correspond to them.
- The module also exposes `dsl_user_op(fn=None, *args, **kwargs)` (no docstring on the official page).
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [pipeline](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/pipeline.html) (source: [ts_api/pipeline.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/pipeline.rst))

## Related

- [Task Scheduling: Pipelines](./ts-pipelines.md)
- [Task Scheduling API: enums](./ts-api-enums.md)
- [Task Scheduling API: pipeline_group](./ts-api-pipeline-group.md)
- [CuTe DSL API: pipeline](./api-pipeline.md)
