# Task Scheduling API: resources

`cutlass.experimental.task_scheduling.resources`: the data-flow building blocks (`PipelineConfig`, `TileSchedulerConfig`, `StageInfo`, `TaskLocalVariable`, `MemoryResource`, PDL barriers, `WorkQueue`) a warp-specialised kernel assembles into a pipeline.

## Signature / Usage

```python
class cutlass.experimental.task_scheduling.resources.PipelineConfig(
    num_stages: int,
    num_bytes: int,
    producer_group: CooperativeGroup,
    consumer_group: CooperativeGroup,
    pipeline_type: PipelineType,
    barrier_ptr: cute.Pointer | None = None,
    cta_layout_vmnk: cute.Layout | tuple | None = None,
    producer_signaling_threads: SignalingThreads = SignalingThreads.All,
    consumer_signaling_threads: SignalingThreads = SignalingThreads.All,
    consumer_wait_signaling_threads: SignalingThreads | None = None,
    umma_consumer_producer_op: PipelineOp = PipelineOp.AsyncThread,
    advance_on_wait: bool = False,
    advance_on_acquire: bool = False,
    num_bytes_per_warp_per_cta: int | None = None,
    mcast_mode_mn: tuple[int, int] = (1, 1),
    interleave_stride: int | tuple[int, int, int, int] = 1,
    async_producer_op: PipelineOp = PipelineOp.AsyncThread,
)

PipelineConfig.create_tma_async_pipeline_cfg(
    num_stages: int, num_bytes: int,
    producer_group: CooperativeGroup, consumer_group: CooperativeGroup,
    cta_layout_vmnk: cute.Layout | None = None,
    producer_signaling_threads: SignalingThreads = SignalingThreads.All,
    consumer_signaling_threads: SignalingThreads = SignalingThreads.All,
    barrier_ptr: cute.Pointer | None = None,
    advance_on_wait: bool = False,
    interleave_stride: int | tuple[int, int, int, int] = 1,
    num_bytes_per_warp_per_cta: int | None = None,
) -> PipelineConfig
```

## Options / Props

`PipelineConfig` is an immutable descriptor. Do not construct it directly; use a static factory:

| Factory | Pipeline type | Notable parameters beyond `num_stages`, `producer_group`, `consumer_group`, `producer_signaling_threads`, `consumer_signaling_threads`, `barrier_ptr` |
| --- | --- | --- |
| `create_async_async_pipeline_cfg` | `AsyncAsync` | `cta_layout_vmnk` (required), `producer_op=PipelineOp.AsyncThread`, `advance_on_acquire`, `interleave_stride`. `producer_op=AsyncLoad` matches async global-to-shared producers signaling full barriers with `cp.async.mbarrier.arrive`. |
| `create_tma_async_pipeline_cfg` | `TmaAsync` | `num_bytes`, `cta_layout_vmnk=None`, `advance_on_wait`, `interleave_stride`, `num_bytes_per_warp_per_cta`. |
| `create_tma_umma_pipeline_cfg` | `TmaUmma` | `num_bytes`, `cta_layout_vmnk` (required), `advance_on_wait`, `interleave_stride`, `mcast_mode_mn=(1, 1)`, `num_bytes_per_warp_per_cta`. |
| `create_umma_async_pipeline_cfg` | `UmmaAsync` | `cta_layout_vmnk` (required), `interleave_stride`. |
| `create_async_umma_pipeline_cfg` | `AsyncUmma` | `cta_layout_vmnk` (required), `consumer_wait_signaling_threads=None`, `producer_op=PipelineOp.AsyncThread`, `advance_on_wait`, `advance_on_acquire`, `interleave_stride`. |
| `create_umma_umma_pipeline_cfg` | `UmmaUmma` | `cta_layout_vmnk` (required). |
| `create_clc_fetch_async_pipeline_cfg` | `ClcFetchAsync` | `num_bytes` (work-tile fetch transaction bytes), `cta_layout_vmnk` (required); `producer_signaling_threads` defaults to `SignalingThreads.CtaLeader`. |

`PipelineConfig` fields:

| Name | Type | Description |
| --- | --- | --- |
| `num_stages` | int | Number of buffering stages (pipeline depth). |
| `num_bytes` | int | Expected transaction byte count per stage (0 when not applicable). |
| `producer_group`, `consumer_group` | `pipeline.CooperativeGroup` | Cooperative groups defining the producer / consumer agents. |
| `pipeline_type` | `PipelineType` | Selects the concrete pipeline implementation. |
| `barrier_ptr` | `cute.Pointer`, optional | Pre-allocated SMEM barrier storage (Int64, `2 * num_stages`); when `None`, `MemoryResource.create_pipeline()` allocates it. |
| `cta_layout_vmnk` | `cute.Layout`, optional | Cluster decomposition layout; required for UMMA / CLC pipelines. |
| `producer_signaling_threads` | `SignalingThreads` | Which threads execute producer-side barrier operations (acquire, commit); `CtaLeader` restricts signalling to CTA 0. |
| `consumer_signaling_threads` | `SignalingThreads` | Which threads execute consumer-side barrier operations (wait, release); also used for ConsumerWait when `consumer_wait_signaling_threads` is `None`. |
| `consumer_wait_signaling_threads` | `SignalingThreads` or None | Override for ConsumerTryWait / ConsumerWait; for split-consumer patterns. |
| `async_producer_op` | `pipeline.PipelineOp` | Producer-side barrier operation for `AsyncAsync`; default `AsyncThread`; `AsyncLoad` selects cp.async-style producer commits. |
| `umma_consumer_producer_op` | `pipeline.PipelineOp` | Producer-side barrier operation for `AsyncUmma`; default `AsyncThread`. |
| `num_bytes_per_warp_per_cta` | int, optional | Per-producer-warp, per-CTA transaction byte count; validation checks `num_bytes` covers every producer warp across the cluster. |
| `mcast_mode_mn` | tuple[int, int] | Multicast mode passed to CUTLASS TMA pipeline creation for cluster arrival masks. |
| `advance_on_wait` | bool | When `False` (default) the stage advances on `release`; when `True`, on `wait`, with a separate pipeline state used to release. "Disabled by default pending performance measurements." |
| `advance_on_acquire` | bool | Producer-side analogue: `ProducerAcquire` advances `producer_state` immediately; `ProducerCommit` always uses `producer_commit_state`. |
| `interleave_stride` | int or tuple[int, int, int, int] | Stride for interleaved advancement; must evenly divide `num_stages`; 4-tuple is `(producer_acquire, producer_commit, consumer_wait, consumer_release)`. Splitting acquire/commit requires `advance_on_acquire`; splitting wait/release requires `advance_on_wait`. |

Derived properties: `interleave_strides`, `producer_acquire_interleave_stride`, `producer_commit_interleave_stride`, `consumer_wait_interleave_stride`, `consumer_release_interleave_stride`, `max_interleave_stride`, `has_interleaved_stride`.

Other classes:

| Class | Description |
| --- | --- |
| `WorkTileInfo(tile_idx: Coord, is_valid_tile: Boolean)` | TS-local 3D work tile with scalarized loop-carried fields (subclass of `cutlass.utils.WorkTileInfo`); `update_from(other)`. Any scheduling request after all tasks completed returns an invalid tile. |
| `TileSchedulerConfig(tile_scheduler_type, tile_scheduler_params, response_ptr=None)` | Immutable descriptor pairing a `TileSchedulerType` with scheduler params; `response_ptr` (SMEM response buffer pointer) required only for CLC dynamic mode. Static factories `create_static_persistent_tile_scheduler_params(tile_scheduler_params)` and `create_clc_dynamic_persistent_tile_scheduler_params(tile_scheduler_params, response_ptr)`. |
| `StageInfo(loop_offset, loop_start, loop_end, loop_step, stage_idx, label, barrier, work_tile, num_active_stages=0, context=None, task_cache=None)` | Read-only context passed to `producer_work` / `consumer_work`. `loop_offset`: current K-tile loop iteration; `loop_start` / `loop_end` / `loop_step`: loop bounds; `stage_idx`: pipeline stage index (`None` without a pipeline); `label`: user-defined compile-time work label; `barrier`: mbarrier pointer for the current stage (`cutlass.Array` or `None`); `work_tile`: `WorkTileInfo` or `None`; `num_active_stages`: producer stages in flight for delayed-commit schedules (0 for the default immediate-commit schedule); `context`: `ResourceContext` or `None`; `task_cache`: payload from `Task.make_task_cache()`. |
| `TaskLocalVariable(dtype, default, default_factory=None, docs=None, runtime_slot_name=None)` | Metadata for one resource-owned variable; materializes as task-local register state. `default` is the sink-safe initial value; `default_factory` is mutually exclusive with `default`. `TaskLocalVariable.uninitialized()` returns a `dataclasses.Field` placeholder to be assigned a concrete `TaskLocalVariable` in `__init__` / `__post_init__` (forgetting raises `ValueError`). Properties `owner`, `field_name`, `slot_name`. |
| `MemoryResource` | Base class for every resource (GMEM, SMEM, TMEM) with an optional pipeline. Fields: `name: str`, `is_barrier` (True for pure signaling resources; relaxed dependency-backing rules), `pipeline_config` (`PipelineConfig` or `None`), `pipeline` (materialised pipeline set by `create()`), `consumer_vars` / `producer_vars` (dicts), `consumer_state` / `producer_state` / `producer_commit_state` / `consumer_release_state`, `consumer_status` / `producer_status`, `consumer_wait_signaling_threads`, `pipeline_group`, `dummy`. Hooks: `get_smem_requirements()`, `get_tmem_requirements()` (default `[]`), `create_consumer_variables()`, `create_producer_variables()`, `consumer_aux_work(stage_info)`, `consumer_work(stage_info)`, `producer_aux_work(stage_info)`, `producer_work(stage_info)`. |
| `PdlWaitBarrier` | Barrier-only resource (`is_barrier=True`); `wait_griddep(stage_info)` emits `griddepcontrol.wait`, blocking until the direct predecessor grid dependency has completed and made its global-memory results visible. |
| `PdlLaunchBarrier` | Barrier-only resource; `launch_griddep(stage_info)` emits `griddepcontrol.launch_dependents`, notifying the successor grid it may begin launching CTAs. |
| `PDL_BARRIER_TYPES` | Tuple `(PdlWaitBarrier, PdlLaunchBarrier)` for `isinstance` checks. |
| `WorkQueue(tile_scheduler_config, **kwargs)` | Resource wrapping a persistent tile scheduler. Attributes `tile_scheduler`, `tile_scheduler_config`, `work_tile`, `skip_work_tile`; methods `create_tile_scheduler()`, `create()`, `initial_work_tile_info()`, `skip_work_tile_if(work_tile)`, `init_work_tile(stage_info)`, `get_and_advance_work_tile(stage_info)`, `fetch_work_tile(stage_info)`, `producer_tail()`. |

The module also exports `consumer_work` and `producer_work` decorators (same signatures as in the package top level).

## Notes

- Compile-time abstraction: pipeline operations (acquire, release, commit, wait) are traced by the DSL at compile time and produce the same mbarrier PTX as hand-coded kernels; the framework is a code generator, not a runtime scheduler.
- Typical lifecycle driven by `TaskManager`: `resource.create()` allocates SMEM barriers and materialises the pipeline (once per resource, from `TaskManager.setup_resources_and_tasks()`); `resource.initialize_runtime_state_internal()` initialises pipeline states, status flags and task-local storage defaults once per kernel invocation, outside dynamic control flow; `create_consumer_variables_internal()` / `create_producer_variables_internal()` populate the variable dicts; `consumer_work` / `producer_work` run per-stage logic; `copy_consumer_vars_to(dst_resource)` propagates matching consumer variables into a downstream producer's variables (automatic, called by `Task`).
- Named work functions: `@consumer_work` / `@producer_work` methods register multiple named work methods; when two or more are registered, each `ConsumerWork` entry must carry a label (typos raise `ValueError` with a did-you-mean suggestion; missing labels with 2+ named methods raise `ValueError`; a single named method auto-dispatches; no named methods calls the monolithic `consumer_work()`).

  ```python
  @consumer_work
  @cute.jit
  def k_desc(self, stage_info):
      ...

  @consumer_work
  @cute.jit
  def v_desc(self, stage_info):
      ...

  (smem_kv, ScheduleStage.ConsumerWork, "k_desc")
  ```

- `MemoryResource.state_src`: the object owning the resource's consumer pipeline state; returns `self` by default, the group itself for members of a Merge or FusedMerge `PipelineGroup`. Producer state is not redirected: use `resource.producer_state` directly. `create_pipeline(pipeline_config)` allocates SMEM barrier storage (if `barrier_ptr` is not pre-supplied), dispatches by `pipeline_type`, and creates all pipelines with `defer_sync=True` so initialisation fencing is left to `TaskManager` / the kernel.
- With `advance_on_wait=True` there are two independent states: `consumer_state` (advances on `ConsumerWait`, points to the next buffer to wait on) and `consumer_release_state` (advances on `ConsumerRelease`, points to the oldest un-released buffer), so the consumer can wait on buffer N+1 while holding buffer N.
- PDL wiring: a resource whose data is sourced from the predecessor grid lists the `PdlWaitBarrier` as an upstream in `TaskManager.resource_dependency_graph` (ordering-only edge); `PdlLaunchBarrier` carries no data dependency and is not expected as a destination in the graph. The exhaustive interleaving checker requires every executable launch interleaving to have already executed at least one `wait_griddep`; no global "at least one launch" rule is enforced. The encouraged pattern is inline wait: every task producing a PDL-dependent resource issues its own `wait_griddep()`.
- `WorkQueue`: static persistent mode launches exactly enough CTAs to fill one wave of SMs, needs no dedicated scheduler warp, and `get_and_advance_work_tile` calls `advance_to_next_work` directly; CLC dynamic persistent mode uses a dedicated scheduler warp as the producer issuing fetch requests in `fetch_work_tile`, and consumer tasks wait on the pipeline. The consumer-side variable `work_tile` carries tile coordinates and validity.
- `TaskLocalVariable` slot names still lower through string-named `consumer_vars` / `producer_vars` internally; schedule code should carry `TaskLocalVariable` identities rather than naming those dictionaries.
- The official page renders several dataclass fields with `_MockObject` types (a documentation-build artifact); types above are taken from attribute docstrings where available.
- The prose guide describes `TmaAsync` and other TS `PipelineType` values; these correspond to (and are implemented via) the `cutlass.pipeline` classes in the CuTe DSL pipeline API.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [resources](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/resources.html) (source: [ts_api/resources.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/resources.rst))

## Related

- [Task Scheduling: Resources](./ts-resources.md)
- [Task Scheduling: Pipelines](./ts-pipelines.md)
- [Task Scheduling: PDL](./ts-pdl.md)
- [Task Scheduling API: enums](./ts-api-enums.md)
- [Task Scheduling API: memory](./ts-api-memory.md)
- [CuTe DSL API: pipeline](./api-pipeline.md)
