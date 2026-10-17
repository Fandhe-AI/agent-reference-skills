# Task Scheduling: Schedules

A TS schedule is a Python function decorated with `@schedule` that records resource method calls (it does not run them) and returns a `Schedule` passed to `Task(schedule=...)`.

## Signature / Usage

```python
@schedule
def schedule_fn(input_gmem: InputGmemResource,
                output_gmem: OutputGmemResource) -> None:
    threads_per_block = num_warps * 32
    start = bx * threads_per_block + tx
    step = gdimx * threads_per_block
    with domain_loop(start, num_entries, step, unroll=unroll):
        res = input_gmem.get_item()
        output_gmem.set_item(data=res)

task = Task(..., schedule=schedule_fn(input_gmem_res, output_gmem_res))
```

## Options / Props

| Construct | Description |
| --- | --- |
| `domain_loop(start, end, step, *, unroll=1)` | Loop over `range(start, end, step)`; `start` / `step` default to `0` / `1`. The iteration index reaches work methods via `stage_info.loop_offset`. `unroll` defaults to `1` (no unrolling); `None` lets the compiler choose. A bound may be a `Task` method (dynamic domain). |
| `d.first_iter()` / `d.last_iter()` | Context managers running operations only on the first / last iteration of the domain loop. |
| `d.every(period, start=0)` | Periodic guard firing on zero-based iteration counts `start, start + period, ...`. |
| `when_true(condition)` / `when_false(condition)` | General block openers for data-dependent runtime conditions backed by a `TaskLocalVariable` slot. |
| `work_tile_loop(wq, skip_if=...)` | Persistent loop over a `WorkQueue`. |
| `wtwl.skippable()` | Runs operations inside only on tiles not skipped by `skip_if`. |

## Notes

- Structural rules: at most one `domain_loop` and at most one `work_tile_loop` per schedule.
- Data flows between work methods through `TaskLocalVariable` tokens; the loop index is not a token (read `stage_info.loop_offset`).
- When the loop runs a single iteration, that iteration is both first and last, so both blocks execute; a matching periodic guard also runs when count `0` matches its cadence.

  ```python
  @schedule
  def guarded_schedule(smem, page_offsets) -> None:
      with domain_loop(0, num_iters, 1) as d:
          with d.first_iter():
              smem.try_acquire()
          with d.every(4, start=0):
              page_offsets.advance()
          smem.acquire()
          smem.producer_work()
          with d.last_iter():
              smem.commit()
  ```

- General conditions: use domain-loop handle methods for iteration-derived conditions; runtime conditions use work outputs declared with `@consumer_work(returns=...)`. Pass the same `key=` (or reuse the same stored token) when two tasks must branch on one shared runtime value. Integer-like slots are false only when zero. One instruction producing multiple guard values uses `@consumer_work(returns=(...))`.

  ```python
  from cutlass.experimental.task_scheduling import when_true

  @schedule
  def conditional_schedule(page_offsets, smem) -> None:
      with domain_loop(0, num_iters, 1) as d:
          smem.acquire()
          needs_epilogue = smem.needs_epilogue()
          with when_true(needs_epilogue):
              smem.epilogue()
          smem.commit()
  ```

- Persistent scheduling: every participating task must wait, advance, and release the queue at the same logical boundary: `wq.try_wait(); wq.wait(); wq.get_and_advance_work_tile(); wq.release()`. Static persistent lowers queue state to lightweight arithmetic; CLC dynamic persistent uses a `WorkQueue` owning a `ClcFetchAsync` pipeline where a dedicated scheduler task drives the producer (fetch) side.
- Dynamic domain: when a bound must be computed per tile, subclass `Task` with `get_domain_size(self, tile_coord)` (the name can be arbitrary) and pass it as the `end` bound.

  ```python
  class DynamicDomainTask(Task):
      def __init__(self, offsets, **kwargs):
          super().__init__(**kwargs)
          self._offsets = offsets

      @cute.jit
      def get_domain_size(self, tile_coord):
          return self._offsets[tile_coord[0] + 1] - self._offsets[tile_coord[0]]

  @schedule
  def main_schedule(src, dst, wq) -> None:
      with work_tile_loop(wq):
          with domain_loop(
              tx,
              DynamicDomainTask.get_domain_size,
              threads_per_block,
          ):
              val = src.load()
              dst.store(val=val)
          wq.try_wait()
          wq.wait()
          wq.get_and_advance_work_tile()
          wq.release()
  ```

- Skippable tiles: `skip_if` accepts a `WorkQueue` method or a plain function/lambda, taking either `(work_queue, work_tile)` or just `(work_tile)`. Keep queue bookkeeping outside the skippable region.

  ```python
  @schedule
  def copy_schedule(copy_res: MemoryResource, wq: WorkQueue) -> None:
      with work_tile_loop(
          wq, skip_if=OversubscribedCopyWorkQueue.skip_work_tile_if
      ) as wtwl:
          with wtwl.skippable(), domain_loop(0, num_rows, 1):
              copy_res.copy_tile_row()
          wq.try_wait()
          wq.wait()
          wq.get_and_advance_work_tile()
          wq.release()
  ```

- Forwarding contextual information: declare a keyword-only `cutlass.Constexpr[...]` parameter (a default is allowed) on the work method and pass a literal at the call site, e.g. `smem.load(slot_index=1)`; each call records its own entry bound to that value.
- Runtime structure is expressed only with `with` context managers (`domain_loop`, `work_tile_loop`, `wtwl.skippable()`, `d.first_iter()`, `d.last_iter()`). Plain Python `for` / `if` inside a `@schedule` is trace-time metaprogramming: it must be compile-time known and is unrolled into the recorded schedule.
- Three scheduling shapes: non-persistent (no `WorkQueue`; the launch grid maps to logical tiles); static persistent (no dedicated scheduler task; every task ends each work-tile iteration with the queue epilogue); dynamic persistent (a dedicated scheduler task runs `wq.try_acquire(); wq.acquire(); wq.fetch_work_tile(); wq.commit();` and then the same wait / advance / release epilogue). Data-task bodies are identical for static and CLC dynamic queues.
- Document version: CUTLASS v4.8.0 — [Schedules](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_schedules.html) (source: [ts_schedules.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_schedules.rst))

## Related

- [Task Scheduling: Resources](./ts-resources.md)
- [Task Scheduling: Patterns](./ts-patterns.md)
- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling API: task_scheduling](./ts-api-task-scheduling.md)
