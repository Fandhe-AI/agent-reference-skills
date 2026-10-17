# Task Scheduling API: enums

`cutlass.experimental.task_scheduling.enums`: enumerations and loop-guard types for pipeline types, tile schedulers, pipeline groups, signaling threads, work attributes, and schedule stages.

## Signature / Usage

```python
class cutlass.experimental.task_scheduling.enums.PipelineType(value)           # Enum
class cutlass.experimental.task_scheduling.enums.TileSchedulerType(value)      # Enum
class cutlass.experimental.task_scheduling.enums.PipelineGroupMode(value)      # Enum
class cutlass.experimental.task_scheduling.enums.SignalingThreads(value)       # IntFlag
class cutlass.experimental.task_scheduling.enums.WorkAttr(value)               # IntFlag
class cutlass.experimental.task_scheduling.enums.ScheduleStage(value)          # Enum
class cutlass.experimental.task_scheduling.enums.Every(period: int, start: int = 0)
class cutlass.experimental.task_scheduling.enums.OpaqueCondition(
    key: Hashable, negated: bool = False, resource: object | None = None,
    method_label: str | None = None, result_name: str | None = None,
)
cutlass.experimental.task_scheduling.enums.guard_fires(
    guard: object, iter_idx: int, num_iters: int, *,
    opaque_assignment: dict[Hashable, bool] | None = None,
) -> bool
```

## Options / Props

| Enum | Members |
| --- | --- |
| `PipelineType` | `AsyncAsync` (generic async thread-based producer + async-thread consumer), `TmaAsync` (TMA producer + async-thread consumer, cp.async.bulk), `TmaUmma` (TMA producer + UMMA consumer), `UmmaAsync` (UMMA producer + AsyncThread consumer; matches the CUTLASS pipeline name), `AsyncUmma` (AsyncThread producer + UMMA consumer; matches the CUTLASS pipeline name), `UmmaUmma` (UMMA producer + UMMA consumer), `ClcFetchAsync` (CLC tile-fetch producer + async-thread consumer). Names follow `<Producer><Consumer>`. |
| `TileSchedulerType` | `StaticPersistent` (CTAs launched to fill one SM wave; work-tile indices assigned statically per CTA), `ClcDynamicPersistent` (a dedicated scheduler warp fetches work tiles dynamically at runtime). |
| `PipelineGroupMode` | `Merge` (N-to-1; each member has a separate producer task, all share one consumer task; consumer side collapsed, compatible consumer kinds and matching `consumer_group.size`), `Fork` (1-to-N; producer side collapsed, compatible producer kinds and matching `producer_group.size`), `FusedMerge` (N-to-1 like `Merge` but a single shared full barrier). |
| `SignalingThreads` (`IntFlag`) | `All = 1` (every thread in the cooperative group), `CtaLeader = 2` (only CTA 0 in the cluster signals), `TaskWarpLeader = 4` (only the first warp assigned to the task arms the producer-side transaction barrier). Methods: `is_valid_combination`, `validate`, `has_cta_leader`, `has_task_warp_leader`. |
| `WorkAttr` (`IntFlag`) | `NONE = 0`, `AUXILIARY = 1`; methods `is_valid_combination`, `validate`, `is_auxiliary`. |
| `ScheduleStage` | Consumer side (src in the Task): `ConsumerAuxWork`, `ConsumerTryWait`, `ConsumerWait`, `ConsumerWork`, `ConsumerRelease`. Producer side (dst in the Task): `ProducerAuxWork`, `ProducerTryAcquire`, `ProducerAcquire`, `ProducerWork`, `ProducerCommit`. |

Guard helpers: `BlockGuard` (marker base for conditional block guards; subclasses `IterationPredicate`, `OpaqueCondition`, and the `SKIPPABLE` singleton), `IterationPredicate` (trace-time guard from the zero-based iteration count; `fires(iter_idx, num_iters) -> bool`), `Every`, `OpaqueCondition`, and functions `is_skippable_guard(guard)`, `is_iteration_predicate(guard)`, `is_loop_guard(guard)`, `guard_fires(...)`.

## Notes

- `CtaLeader` and `TaskWarpLeader` are composable. `All` is exclusive: combining it with another flag is invalid because it contradicts a narrower signaling predicate. `TaskWarpLeader` is orthogonal to CTA ownership.
- `WorkAttr.AUXILIARY` marks callbacks that do not model memory access and should not participate in normal resource ordering checks; the `IntFlag` type allows future verifier attributes to be composed without changing the decorator API.
- Each `ScheduleStage` member maps to a method on `Task` that delegates to the corresponding pipeline / resource call; the `__str__` method returns compact labels used in schedule printouts. (`ScheduleStage` and `LoopGuard` are excluded from the autodoc member listing via `:exclude-members:`, but `ScheduleStage` is rendered on this page.)
- `PipelineGroupMode.Merge` / `FusedMerge` combine `num_bytes` across members as required by the group mode, while the collapsed side's cooperative-group size must match across members.
- `OpaqueCondition.negated` is `True` for `when_false()` blocks.
- The `PipelineType` list here has seven members; the `pipeline_group` page says "All six public `PipelineType` values".
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [enums](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/enums.html) (source: [ts_api/enums.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/enums.rst))

## Related

- [Task Scheduling: Pipelines](./ts-pipelines.md)
- [Task Scheduling: Pipeline Groups](./ts-pipeline-groups.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
- [Task Scheduling API: pipeline_group](./ts-api-pipeline-group.md)
