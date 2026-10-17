# Task Scheduling API: task

`cutlass.experimental.task_scheduling.task.Task`: a unit of warp-specialised work mapping a contiguous warp range to source/destination resource lists and a captured schedule.

## Signature / Usage

```python
class cutlass.experimental.task_scheduling.task.Task(
    src_resources: List[MemoryResource],
    dst_resources: List[MemoryResource],
    warp_idx: int,
    num_warps: int,
    *,
    schedule: ScheduleResult,
    num_registers: int | None = None,
    name: str = '',
    debug_print: bool = False,
    iket_enable_profiling: bool = False,
    iket_profiling_stages: FrozenSet[ScheduleStage] | None = None,
    iket_profiling_resources: FrozenSet[str] | None = None,
    run_only_on_cta_id: int | None = None,
)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `src_resources` | List[MemoryResource] | Resources from which the task reads (consumer side). |
| `dst_resources` | List[MemoryResource] | Resources to which the task writes (producer side). |
| `warp_idx` | int (`cutlass.Int32` attribute) | Index of the first warp assigned to the task. |
| `num_warps` | int | Number of consecutive warps assigned to the task. |
| `schedule` | ScheduleResult | Captured output of `@schedule`; sole source of schedule metadata (schedule list, loop bounds, loop step, unroll hint, routing table, persistent-work-tile metadata). Must be provided; legacy constructor schedule metadata is not accepted. |
| `num_registers` | int \| None | Per-task register budget; must be in `[8, 256]` and divisible by 8. `setmaxregister_increase/decrease` is emitted accordingly. |
| `name` | str | Human-readable label for debug prints, diagnostics and PTX comments. |
| `debug_print` | bool | Emit per-step debug prints (default `False`). |
| `iket_enable_profiling` | bool | Per-step IKET `range_start` / `range_end` markers around each selected `(resource, ScheduleStage)` entry; each unique pair consumes 1 of 31 IKET marker slots (default `False`). |
| `iket_profiling_stages` | FrozenSet[ScheduleStage] \| None | Restrict markers to these stages; `None` profiles all. |
| `iket_profiling_resources` | FrozenSet[str] \| None | Restrict markers to resources whose `name` is in the set; `None` profiles all. |
| `run_only_on_cta_id` | int \| None | Hoists CTA selection for the whole task body to one CTA rank. Requires every pipelined resource touched by the task to set the matching signaling side to `SignalingThreads.CtaLeader`; otherwise a `ValueError` is raised at trace time. |

Other members: `domain_getter` (explicit `Task` subclass method captured from the callable `end` bound), `is_persistent` (`True` when `src_resources` contains a `WorkQueue`), `head_schedule_list` / `loop_schedule_list` / `tail_schedule_list` (lists of `(MemoryResource, ScheduleStage, call_id)`), property `resources`, and methods `get_domain(tile_coord)`, `is_selected()`, `init_variables(context=None)`, `make_task_cache()`, `run_body()`, `run()`.

## Notes

- Compile-time abstraction: `Task.run()` is traced by the DSL into a monolithic loop. The captured schedule list, loop guards, and domain computation resolve at trace time; a task whose resolved domain has zero iterations emits no loop-body work. The generated PTX is identical to a hand-coded bare-metal kernel with the same schedule.
- `TaskManager` executes every task: each warp enters `task.run()`, but only warps in `[warp_idx, warp_idx + num_warps)` execute that task's schedule body.
- The captured schedule list is normalized into three phases (head / loop / tail) at construction.
- `get_domain(tile_coord)`: override in subclasses for tile-dependent domain logic (default returns `self.domain`); `tile_coord` is `work_tile.tile_idx`, a 3-tuple `(bx, by, bz)`; returns the number of loop iterations (int or `cutlass.Int32`).
- `init_variables` creates resource variables outside dynamic control flow (called by `TaskManager.run()` for every task before the dispatch chain). `make_task_cache()` returns an optional task-defined payload captured into `StageInfo`.
- `run()`: initialises function-level and role-level variables on every resource, gates on `is_selected()`, sets the register budget via `_set_max_register`, then dispatches to the persistent or non-persistent body.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [task](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/task.html) (source: [ts_api/task.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/task.rst))

## Related

- [Task Scheduling: Introduction](./ts-introduction.md)
- [Task Scheduling API: task_manager](./ts-api-task-manager.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
- [Task Scheduling API: enums](./ts-api-enums.md)
