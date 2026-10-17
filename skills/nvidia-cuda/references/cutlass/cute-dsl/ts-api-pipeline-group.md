# Task Scheduling API: pipeline_group

`cutlass.experimental.task_scheduling.pipeline_group.PipelineGroup`: a `MemoryResource` subclass (`is_barrier=True`) that groups multiple data resources (members) under shared pipeline barriers for fork / merge dataflow.

## Signature / Usage

```python
class cutlass.experimental.task_scheduling.pipeline_group.PipelineGroup(
    *,
    name = '',
    is_barrier = False,
    pipeline_config = None,
    consumer_vars = <factory>,
    producer_vars = <factory>,
    pipeline = None,
    consumer_wait_signaling_threads = None,
    members: List[MemoryResource] = <factory>,
    mode = PipelineGroupMode.Merge,
)
```

## Options / Props

| Name | Description |
| --- | --- |
| `members` | Data resources (`List[MemoryResource]`) whose pipelines are merged into this group. |
| `mode` | `PipelineGroupMode`: `Merge` (N producers, 1 consumer; collapse the consumer side), `Fork` (1 producer, N consumers; collapse the producer side), `FusedMerge` (N producers, 1 consumer; collapse both sides). |
| `pipeline_config` | Optional explicit config; validated against the members with the same mode-specific compatibility rules. When `None`, derived automatically. |
| `group_pipeline` (property) | The first member's pipeline, read on demand for group-level barrier operations (avoids aliasing `self.pipeline`, which breaks under `inject_leaves`). |
| `is_heterogeneous` (property) | `True` when members have different pipeline types; heterogeneous groups keep per-member full barriers and a shared empty barrier, homogeneous groups share a single merged pipeline across all members. |
| `num_barriers_per_stage` (property) | Number of distinct mbarriers the group's layout uses per stage. |
| `create()` | Creates pipeline(s) for the group and assigns them to members (a per-member pipeline object of the correct type is assigned to `m.pipeline`). |

Allowed pipeline types per official table:

| PipelineType | Producer | Consumer | Pipeline class |
| --- | --- | --- | --- |
| AsyncAsync | async | async | `PipelineAsync` |
| TmaAsync | tma | async | `PipelineTmaAsync` |
| TmaUmma | tma | umma | `PipelineTmaUmma` |
| UmmaAsync | umma | async | `PipelineUmmaAsync` |
| AsyncUmma | async | umma | `TSPipelineAsyncUmma` |
| UmmaUmma | umma | umma | `TSPipelineUmmaUmma` |

## Notes

- The page states "All six public `PipelineType` values are supported"; the `enums` page lists seven including `ClcFetchAsync`.
- Behavior: Merge collapses the consumer side (members commit individually; the shared consumer calls `group.release()` once). Fork collapses the producer side (members release individually; the shared producer calls `group.commit()` once). FusedMerge collapses both sides (members commit individually; the shared consumer calls `group.wait()` and `group.release()` once).
- `PipelineGroup` validates compatibility (same `num_stages` and compatible `pipeline_type` on the collapsed side), derives a merged config (the collapsed side's cooperative-group size must match across members; the many side keeps per-member barriers), creates one shared pipeline with `(N + 1) * num_stages` barriers, and re-points each member at the shared allocation. Raises `ValueError` if member configs are not mergeable.
- Barrier layout, Merge (N producers, 1 consumer), `S` stages, total `(N + 1) × S`:

  ```text
  [full_0 × S] [full_1 × S] … [full_{N-1} × S] [shared_empty × S]
  ```

  Fork (1 producer, N consumers), total `(N + 1) × S`:

  ```text
  [shared_full × S] [empty_0 × S] [empty_1 × S] … [empty_{N-1} × S]
  ```

  FusedMerge (shared full AND shared empty), total `2 × S`:

  ```text
  [shared_full × S] [shared_empty × S]
  ```

- Valid heterogeneous merge pairs (consumer side homogeneous): consumer `async`: AsyncAsync + TmaAsync, AsyncAsync + UmmaAsync, TmaAsync + UmmaAsync; consumer `umma`: TmaUmma + AsyncUmma, TmaUmma + UmmaUmma, AsyncUmma + UmmaUmma. Valid heterogeneous fork pairs (producer side homogeneous): producer `tma`: TmaAsync + TmaUmma; `async`: AsyncAsync + AsyncUmma; `umma`: UmmaAsync + UmmaUmma.
- Topology auto-derivation from the kind decomposition: producer kinds differ -> Merge; consumer kinds differ -> Fork; both homogeneous -> explicit `mode` parameter; both differ -> Error.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [pipeline_group](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/pipeline_group.html) (source: [ts_api/pipeline_group.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/pipeline_group.rst))

## Related

- [Task Scheduling: Pipeline Groups](./ts-pipeline-groups.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
- [Task Scheduling API: enums](./ts-api-enums.md)
