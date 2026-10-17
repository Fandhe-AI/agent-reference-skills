# Task Scheduling API: task_manager

`cutlass.experimental.task_scheduling.task_manager.TaskManager` owns the task list and the resource dependency graph; construction prints the schedule table and runs validation.

## Signature / Usage

```python
class cutlass.experimental.task_scheduling.task_manager.TaskManager(
    tasks: List[Task],
    resource_dependency_graph: Dict[MemoryResource, List[MemoryResource]],
    dma_consumer_release_labels: Dict[Tuple[MemoryResource, MemoryResource], Set[str]] | None = None,
    iket_enable_profiling: bool = False,
    iket_profiling_stages: FrozenSet[ScheduleStage] | None = None,
    iket_profiling_resources: FrozenSet[str] | None = None,
    skip_validation: bool = False,
    smem_allocator: SmemAllocator | None = None,
    tmem_allocator: TmemAllocator | None = None,
    tmem_ptr_i32: Any | None = None,
    verbose: bool = True,
    smem_capacity_bytes: int | None = None,
    tmem_capacity_columns: int | None = None,
    exhaustive_deadlock_race_check: bool = True,
    assume_pdl_wait_completed: bool = False,
)
```

## Options / Props

| Name | Description |
| --- | --- |
| `tasks` | All tasks in execution order. |
| `resource_dependency_graph` | Explicit dataflow dependency graph. Each key is a downstream resource whose producer work depends on the consumer work of the upstream resources in the value. The manager verifies every edge is backed by a task whose `src_resources` contain the upstream and whose `dst_resources` contain the downstream resource. |
| `dma_consumer_release_labels` | Edge-specific named consumer-release labels for DMA ordering validation; keys are `(upstream, downstream)` pairs. For one upstream feeding multiple downstream DMA producers through different named consumer work functions. |
| `iket_enable_profiling` | Per-step IKET `range_start/end` instrumentation on head, loop, and tail entries (default `False`). |
| `iket_profiling_stages` | Whitelist of `ScheduleStage` values for IKET; `None` instruments every stage. E.g. `frozenset({ScheduleStage.ProducerWork, ScheduleStage.ConsumerWork})` stays within the 31-event hardware limit. |
| `iket_profiling_resources` | Whitelist of resource names for IKET; `None` instruments all. |
| `skip_validation` | When `True`, checks still run but failures are warnings. Use when domains are runtime values (not Python `int`), since the deadlock simulation falls back to `domain=1` and may report false-positive deadlocks. |
| `smem_allocator` | Unified SMEM allocator with pre-computed layout; `setup_resources_and_tasks()` calls `allocate()` and threads `smem_base` through `ResourceContext` / `StageInfo`. |
| `tmem_allocator` | TMEM column allocator with pre-computed layout; a usage report is printed during `print_and_verify()`. |
| `tmem_ptr_i32` | Shared-memory `Int32` scalar written by `nvvm.tcgen05_alloc`; included in the `ResourceContext` so resources can derive TMEM addresses. |
| `verbose` | When `False`, suppresses informational output (schedule tables, register budgets, aliasing notes); errors and warnings are always emitted. Default `True`. |
| `smem_capacity_bytes` | Maximum SMEM bytes per CTA (data + barriers); default `(228 - 1) x 1024 = 232448 B` (SM100/SM90). |
| `tmem_capacity_columns` | Maximum TMEM columns per SM; default `512` (SM100). |
| `exhaustive_deadlock_race_check` | Runs the exhaustive BFS interleaving checker (`check_all_interleavings`); significantly more expensive than the structural checks; pass `False` for performance-sensitive paths (e.g. FMHA). Default `True`. |
| `assume_pdl_wait_completed` | Treat PDL wait as already executed before the TS schedule; for kernels emitting `griddepcontrol.wait` before a PDL-dependent access outside TS. |

Methods and properties: `tasks`, `resources` (de-duplicated union of every task's `src_resources` and `dst_resources`, first-seen order), `smem_allocator`, `print_and_verify()`, `setup_resources_and_tasks()`, `run()`, `get_marmaid_string_dependency_graph(direction: str = 'TD', include_resource_details: bool = True, collapse_work_queue_edges: bool = True) -> str`.

Also in this module: `DependencyGraphEdge(upstream, downstream, backing_tasks, edge_kind)` (renderable metadata for one graph edge) and `DependencyGraphControlEdge(source, target_node_id, target_label, edge_label)` (collapsed non-dataflow control edge).

## Notes

- Compile-time abstraction: the entire TS framework (TaskManager, Task, MemoryResource, pipeline acquire/release/commit) is traced away during DSL compilation; the resulting PTX is a single monolithic loop identical to hand-coded bare-metal output, with no runtime task dispatch and no framework overhead.
- Example dependency graph for `GmemAb --> SmemAb --> TmemC --> GmemD`:

  ```python
  resource_dependency_graph = {
      smem_ab: [gmem_ab],
      tmem_c:  [smem_ab],
      gmem_d:  [tmem_c],
  }
  ```

- Kernel entry points: `setup_resources_and_tasks()` materialises and initializes pipelines and barriers by calling `resource.create()` on each unique resource (must be called exactly once before `run()`); `run()` executes every task by calling `task.run()` (each call gates on the current warp index) and raises `AssertionError` if `setup_resources_and_tasks()` has not been called. Validation has already run during construction via `print_and_verify()`. Both are plain Python methods, not `@cute.jit`.
- `print_and_verify()` false-positive caveat: when a task `domain` or `domain_start` is a runtime value (not a Python `int`), the deadlock simulation falls back to `domain=1` and `domain_start=0`, which can produce false-positive deadlock reports; use validate-only mode with realistic Python `int` domains for accurate verification.
- `get_marmaid_string_dependency_graph` (spelling as in the official page) returns a Mermaid flowchart string; edge labels identify the realizing task(s) and edge kind: `data`, `ordering`, `ping-pong`, or `work-queue`; with `collapse_work_queue_edges=True` WorkQueue control-token dependencies collapse into one edge to all persistent tasks.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [task_manager](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/task_manager.html) (source: [ts_api/task_manager.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/task_manager.rst))

## Related

- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling: Reading the Printout](./ts-printout.md)
- [Task Scheduling API: task](./ts-api-task.md)
- [Task Scheduling API: memory](./ts-api-memory.md)
