# Task Scheduling API: task_scheduling

Public API of `cutlass.experimental.task_scheduling` (experimental): captured-schedule helpers and work decorators re-exported at the package top level.

## Signature / Usage

```python
cutlass.experimental.task_scheduling.consumer_work(method=None, *, work_attrs=<WorkAttr.NONE: 0>, returns=None)
cutlass.experimental.task_scheduling.producer_work(method=None, *, work_attrs=<WorkAttr.NONE: 0>)
cutlass.experimental.task_scheduling.schedule(fn: Callable[[...], None]) -> Callable[[...], Schedule]
cutlass.experimental.task_scheduling.domain_loop(*bounds, unroll: int | None = None) -> Iterator[DomainLoopProxy]
cutlass.experimental.task_scheduling.work_tile_loop(wq, *, skip_if=None) -> Iterator[WorkTileLoopProxy]
cutlass.experimental.task_scheduling.when_true(cond, *, key=None) -> Iterator[None]
cutlass.experimental.task_scheduling.when_false(cond, *, key=None) -> Iterator[None]
cutlass.experimental.task_scheduling.Every(period: int, start: int = 0)
cutlass.experimental.task_scheduling.OpaqueCondition(key, negated=False, resource=None, method_label=None, result_name=None)
```

## Options / Props

| Name | Description |
| --- | --- |
| `schedule` | Decorator that traces a schedule function into a `Schedule`. |
| `domain_loop` | Context manager for the runtime domain (for-) loop over the work tile's iteration space. Bounds mirror `range`: `domain_loop(end)`, `(start, end)`, or `(start, end, step)`; omitted `start` defaults to `0`, `step` to `1`. Any bound may be a callable (a `Task` subclass method accessed on the class, e.g. `MyTask.get_domain`), called as `(self, work_tile_coord)`. `unroll`: loop unroll hint, `None` lets the compiler decide. |
| `work_tile_loop` | Opens the persistent work-tile (while) loop over `wq`. `skip_if` is an optional predicate `(work_queue, work_tile) -> Boolean`; when set, `skippable()` regions are omitted for skipped tiles while WorkQueue bookkeeping still runs. May be a plain callable or a method of `wq`. |
| `consumer_work` | Registers a method as a named consumer work function on a `MemoryResource` (reads data out of the resource). `work_attrs`: verification-visible attributes (`WorkAttr.AUXILIARY` for helper work with no data payload). `returns`: `TaskLocalVariable` output slot(s) updated by this consumer; field references must point at fields declared with `TaskLocalVariable.uninitialized()`. |
| `producer_work` | Registers a method as a named producer work function (writes data into the resource). Captured schedules pass consumer tokens into producer keyword parameters by name. |
| `when_true` / `when_false` | Open a block that runs when `cond` is true / false. `when_false` accepts opaque runtime conditions only; iteration predicates cannot be negated because their complement may not be contiguous in the lowered loop schedule. Iteration predicates are valid only inside `domain_loop()`; opaque conditions are work-call outputs backed by `TaskLocalVariable` slots, usable as sibling blocks or inside `skippable()`, and condition blocks are intentionally not nestable. |
| `Every(period, start=0)` | Periodic guard (subclass of `IterationPredicate`) firing on zero-based counts `start, start + period, start + 2 * period, ...`; method `fires(iter_idx, num_iters) -> bool`. |
| `IterationPredicate` | Loop guard decidable at trace time from the zero-based iteration count (subclass of `BlockGuard`). |
| `OpaqueCondition` | Loop guard backed by a runtime value enumerated under `key`; `negated` is `True` for `when_false()` blocks; runtime execution reads the stored value instead of re-invoking the producing method; integer-like values are false only when zero. |
| `WorkAttr` | `IntFlag` of verification-visible work attributes: `NONE = 0`, `AUXILIARY = 1`; methods `is_valid_combination`, `validate`, `is_auxiliary`. |

## Notes

- Typical declarations from the official page:

  ```python
  item: TaskLocalVariable = TaskLocalVariable.uninitialized()

  @consumer_work(returns=item)
  @cute.jit
  def load(self, stage_info):
      return self.tensor[stage_info.loop_offset]

  @producer_work
  @cute.jit
  def store(self, stage_info, *, item):
      self.tensor[stage_info.loop_offset] = item
  ```

- The decorated `@schedule` function receives `ResourceProxy` wrappers for each `MemoryResource`; method calls on the proxies record schedule entries and routing edges; `with work_tile_loop(wq):` and `with domain_loop(start, end, step):` mark the structural boundaries; plain Python control flow executes at trace time.
- With a raw schedule list and multiple named work methods the label is the final tuple element, e.g. `(smem, ScheduleStage.ConsumerWork, "build_desc_a")`.
- The prose guide (schedules page) states the `domain_loop` `unroll` default as `1`; this API page renders the signature default as `None`.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [task_scheduling](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/ts.html) (source: [ts_api/ts.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/ts.rst))

## Related

- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling API: schedule_builder](./ts-api-schedule-builder.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
- [Task Scheduling API: enums](./ts-api-enums.md)
