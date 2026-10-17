# Task Scheduling: Introduction

Task Scheduling (TS) makes the warp-specialized schedule of a kernel explicit and statically checks it for deadlocks, races and barrier initialization before lowering to GPU code.

## Signature / Usage

```python
# 1. Resource classes declare the schedule-facing operations.
class GmemAResource(MemoryResource):
    @consumer_work
    def compute_coords(self, stage_info):
        ...

class SmemAResource(MemoryResource):
    @producer_work
    def tma_load_a(self, stage_info, coord_k, coord_m):
        ...

# 2. The kernel instantiates resources, optionally with pipeline configs.
gmem_a = GmemAResource(name="gmem_a")
smem_a = SmemAResource(
    name="smem_a",
    pipeline_config=smem_a_pipeline_config,
)

# 3. The dependency graph states the intended resource ordering.
resource_dependency_graph = {
    smem_a: [gmem_a],
}

# 4. The captured schedule records the task ordering.
@schedule
def load_a_schedule(gmem_a: GmemAResource,
                    smem_a: SmemAResource) -> None:
    with domain_loop(0, num_k_tiles, 1):
        coord_k, coord_m, coord_n = gmem_a.compute_coords()
        smem_a.acquire()
        smem_a.tma_load_a(coord_k=coord_k, coord_m=coord_m)
        smem_a.commit()

# 5. The task binds resources, schedule, and warp assignment.
load_a_task = Task(
    name="load_a",
    src_resources=[gmem_a],
    dst_resources=[smem_a],
    warp_idx=0,
    num_warps=1,
    schedule=load_a_schedule(gmem_a, smem_a),
)

# 6. The manager validates the schedule before lowering.
task_manager = TaskManager(
    tasks=[load_a_task],
    resource_dependency_graph=resource_dependency_graph,
)
task_manager.print_and_verify()

# 7. Fill the @consumer_work / @producer_work bodies, then run
#    the kernel correctness check against the expected result.
```

## Options / Props

| Term | Definition |
| --- | --- |
| Resource | A `MemoryResource` or subclass wrapping a physical resource such as global memory, shared memory, tensor memory, a persistent tile queue, or a PDL barrier. May carry a pipeline (`PipelineConfig`) guarding storage with `acquire` / `commit` on the producer side and `wait` / `release` on the consumer side. |
| Task | A contiguous warp range (`warp_idx`, `num_warps`) bound to one explicit execution schedule. Lists the resources it reads in `src_resources` and writes in `dst_resources`; may declare a `num_registers` budget for warp-group register validation. |
| Schedule | A function decorated with `@schedule`. Calling it records resource method calls without executing the work, and returns a `ScheduleResult` passed to `Task(schedule=...)`. |
| TaskManager | Ties tasks, the dependency graph, and optional SMEM/TMEM allocators together. Validates the schedule and then runs each task on its assigned warps. |
| Dependency graph | A `dict` mapping each resource to the list of resources it depends on; used to verify the order of pipeline operations in the schedule. |

## Notes

- TS targets asynchronous warp-specialized programs (TMA, tcgen05 MMA, CLC fetch, copy to Tensor Memory) where tasks communicate through shared memory or tensor memory and synchronize with mbarriers and named barriers.
- In bare-metal code the schedule is implicit (warp specialization, barrier arrivals and phase advancement are scattered across warp branches), so there is no deadlock or race checker. TS keeps the developer-written low-level work methods and adds a checked structure around them.
- Authoring lifecycle: declare resource classes and work methods; instantiate resources; declare the dependency graph; write and capture schedules; create tasks; create a `TaskManager` and call `print_and_verify()`; fill the work bodies and run the kernel-level correctness check.
- `@consumer_work` reads a value out of the resource; `@producer_work` writes a value into the resource. A task that calls `consumer_work` on a resource lists it in `src_resources`; a task that calls `producer_work` lists it in `dst_resources`.
- `TaskManager.print_and_verify()` validates captured schedules as compile-time metadata and does not need to launch a GPU kernel.
- The module is `cutlass.experimental.task_scheduling` (experimental).
- The overview snippet is abbreviated: a `@consumer_work` method whose result is unpacked in a schedule (here `coord_k, coord_m, coord_n = gmem_a.compute_coords()`) must declare one `TaskLocalVariable` slot per returned value (class attribute `TaskLocalVariable.uninitialized()`, bound in `__post_init__` / `__init__`) and be decorated `@consumer_work(returns=...)`; the schedule never executes the method body, so a bare `return` cannot supply the output contract. See [Resources](./ts-resources.md) for the full task-local variable pattern.
- Document version: CUTLASS v4.8.0 — [Introduction](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_introduction.html) (source: [ts_introduction.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_introduction.rst))

## Related

- [Task Scheduling (TS, experimental)](./task-scheduling.md)
- [Task Scheduling: Resources](./ts-resources.md)
- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling: Validation](./ts-validation.md)
