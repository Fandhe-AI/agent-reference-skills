# Task Scheduling: Pipelines

A `PipelineConfig` attached to a resource (`pipeline_config=`) selects which barrier protocol TS emits for the producer `acquire` / `commit` and consumer `wait` / `release` brackets.

## Signature / Usage

```python
pipeline_config = PipelineConfig.create_tma_umma_pipeline_cfg(
    num_stages=num_ab_stages,
    num_bytes=tile_bytes,
    producer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
    consumer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
    cta_layout_vmnk=cta_layout_vmnk,
)

smem_a = SmemAResource(..., pipeline_config=pipeline_config, name="smem_a")
```

## Options / Props

Supported pipeline types (names follow `<Producer><Consumer>`):

| Type | Producer -> Consumer | Typical use | Factory |
| --- | --- | --- | --- |
| `AsyncAsync` | async threads -> async threads | SMEM filled from registers / cpasync and read by async threads (no TMA, no MMA). | `create_async_async_pipeline_cfg` |
| `TmaAsync` | TMA -> async threads | SMEM tile loaded by TMA and consumed by async threads (copy, epilogue staging). | `create_tma_async_pipeline_cfg` |
| `TmaUmma` | TMA -> UMMA | A/B operand SMEM loaded by TMA and consumed by a `tcgen05` MMA (the GEMM mainloop). | `create_tma_umma_pipeline_cfg` |
| `UmmaAsync` | UMMA -> async threads | TMEM accumulator produced by MMA and consumed by the async threads (TMEM-to-register). | `create_umma_async_pipeline_cfg` |
| `AsyncUmma` | async threads -> UMMA | SMEM filled by an async / `cp.async` producer and consumed by a `tcgen05` MMA. | `create_async_umma_pipeline_cfg` |
| `UmmaUmma` | UMMA / UTCCP -> UMMA | A TMEM copy producer feeding an MMA consumer. | `create_umma_umma_pipeline_cfg` |
| `ClcFetchAsync` | CLC fetch -> async threads | The dynamic fetch queue of a dynamic-persistent scheduler. | `create_clc_fetch_async_pipeline_cfg` |

Common configuration fields:

| Field | Description |
| --- | --- |
| `num_stages` | Pipeline depth (number of buffering stages). |
| `num_bytes` | Expected transaction byte count per stage; used by TMA / CLC producers, `0` otherwise. |
| `producer_group` / `consumer_group` | `CooperativeGroup` objects defining how many threads act on each side. |
| `cta_layout_vmnk` | Cluster decomposition; required for UMMA and CLC pipelines and any clustered (multi-CTA) pipeline. |
| `num_bytes_per_warp_per_cta` | Per-producer-warp, per-CTA byte count for leader-routed clustered TMA completion. |
| `producer_signaling_threads` / `consumer_signaling_threads` | Which threads in the cooperative group execute the barrier instructions: `All` (default), `CtaLeader`, `TaskWarpLeader`, or `CtaLeader \| TaskWarpLeader`. |
| `consumer_wait_signaling_threads` | Overrides only the wait side (split-consumer pattern). |
| `interleave_stride` | Single `int` (same stride for every role) or 4-tuple `(producer_acquire, producer_commit, consumer_wait, consumer_release)`; each entry must divide `num_stages`. |
| `advance_on_wait` / `advance_on_acquire` | Advance the stage at the start of the bracket, with a second lagging counter for the close. |
| `async_producer_op` (`AsyncAsync`) / `umma_consumer_producer_op` (`AsyncUmma`) | `AsyncThread` (default; `mbarrier` arrive after writes) or `AsyncLoad` (`cp.async.mbarrier.arrive` by the copy itself). |

## Notes

- The kernel developer must pick the pipeline type that matches the actual hardware operation on each side. TS takes the declaration at face value to emit the barrier sequence, size and place barrier storage for `num_stages`, check that `num_bytes` covers every producer warp across the cluster, and check arrival counts against cooperative-group sizes and `cta_layout_vmnk`. A wrong type hangs or races on hardware.
- `All` signaling is exclusive and cannot be combined with the others. `CtaLeader` means only CTA 0 of the cluster signals (e.g. a 2-CTA MMA producer); `TaskWarpLeader` means only the first warp of the task arms the producer-side transaction barrier.
- Interleaving lets several warps share one set of `num_stages` barriers (e.g. `num_stages=4`, `interleave_stride=2`: warp 0 visits stages 0, 2, ...; warp 1 visits 1, 3, ...). Different acquire/commit strides require `advance_on_acquire=True` and separate tasks; different wait/release strides require `advance_on_wait=True` and separate tasks. Supported by `AsyncAsync`, `TmaAsync` (single-CTA only), `TmaUmma`, `UmmaAsync` (consumer side only), `AsyncUmma` (producer side only). `UmmaUmma` and `ClcFetchAsync` do not support interleaving.
- Do not build `PipelineConfig` directly; call a factory. TS allocates barrier storage and patches `barrier_ptr` during setup, so it is normally left unset.
- Names such as `TmaAsync` / `TmaUmma` here are TS `PipelineType` values; they correspond to, but are distinct from, the `cutlass.pipeline` classes (`PipelineTmaAsync`, `PipelineTmaUmma`, ...) documented in the CuTe DSL pipeline API page. The TS pipeline module subclasses those.
- Document version: CUTLASS v4.8.0 — [Pipeline Types](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_pipelines.html) (source: [ts_pipelines.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_pipelines.rst))

## Related

- [Task Scheduling: Resources](./ts-resources.md)
- [Task Scheduling: Patterns](./ts-patterns.md)
- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling: Pipeline Groups](./ts-pipeline-groups.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
- [CuTe DSL API: pipeline](./api-pipeline.md)
