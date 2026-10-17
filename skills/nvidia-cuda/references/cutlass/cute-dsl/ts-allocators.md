# Task Scheduling: Allocators

TS SMEM, TMEM and barrier allocators declare the physical memory layout once and expose offsets to resources through `StageInfo.context`.

## Signature / Usage

```python
allocator = SmemAllocator()
allocator.add_resource(smem_resource)
allocator.compute_layout()

task_manager = TaskManager(
    tasks=[...],
    resource_dependency_graph={...},
    smem_allocator=allocator,
)
task_manager.setup_resources_and_tasks()
```

## Options / Props

| Allocator / call | Description |
| --- | --- |
| `SmemAllocation` / `get_smem_requirements()` | Declare SMEM, e.g. `SmemAllocation("smem_data", dtype=cutlass.Float16, count=num_stages * tile_size, alignment=128)`. |
| `TmemAllocation` / `get_tmem_requirements()` | Declare TMEM columns, e.g. `TmemAllocation("tmem_acc", mma_tiler_mnk[1] * acc_stages)`. |
| `SmemAllocator` | `add_resource`, `compute_layout`, `add_alias_group(phases)`, `add_tmem_ptr`, `add_pipeline_group`. |
| `TmemAllocator` | Column-based, no alignment; computes column offsets only, emits no allocation intrinsics. |
| `BarrierAllocator` | Coalesces every pipeline's `full` / `empty` mbarriers into one array and initializes it in one vectorized pass. (Appears only in the Allocators / Pipeline Groups guides; not listed in the rendered API reference.) |

## Notes

- Purposes: TS reorders memory regions to minimize padding waste and fragmentation, and uses the declared regions to verify the absence of race conditions when regions are aliased. The barrier allocator provides efficient coalesced initialization in the kernel prologue.
- Allocation objects are cached on the resource so every requirement query returns the same object and the same assigned offset.
- SMEM lifecycle: `compute_layout()` assigns offsets and is idempotent-guarded (a second call raises). During setup, `allocate()` emits one unified SMEM block and `assign_barrier_ptrs()` patches pipeline barrier pointers. Work methods read the base pointer through `stage_info.context.smem_base`.
- TMEM lifecycle: the kernel reserves a small SMEM slot for the TMEM base pointer through `SmemAllocator.add_tmem_ptr(...)` and brackets `task_manager.run()` with `nvvm.tcgen05_alloc` and `nvvm.tcgen05_dealloc`.

  ```python
  tmem_ptr_alloc = allocator.add_tmem_ptr(
      SmemAllocation("tmem_ptr", dtype=cutlass.Int32, count=1, alignment=4)
  )

  task_manager.setup_resources_and_tasks()
  tmem_ptr_i32 = allocator.get(tmem_ptr_alloc)
  nvvm.tcgen05_alloc(tmem_ptr_i32, num_tmem_cols)
  ...
  task_manager.run()
  ...
  nvvm.tcgen05_dealloc(tmem_ptr, num_tmem_cols)
  ```

- Barrier lifecycle: by default each pipelined resource self-allocates and initializes its `full` / `empty` mbarriers. With a `BarrierAllocator`, `compute_layout()` buckets similar barriers; during setup TS allocates the array, patches each resource/group's `barrier_ptr` and runs the vectorized `initialize()`.

  ```python
  barrier_allocator = BarrierAllocator()
  barrier_allocator.add_resource(smem_res)
  barrier_allocator.add_pipeline_group("ab_sync", ab_sync)
  barrier_allocator.compute_layout()
  barrier_allocator.set_backing(smem_allocator)

  task_manager = TaskManager(
      tasks=[...],
      resource_dependency_graph={...},
      smem_allocator=smem_allocator,
      barrier_allocator=barrier_allocator,
  )
  task_manager.setup_resources_and_tasks()
  ```

- Aliasing: `add_alias_group(phases)` lets resources that never use shared memory at the same time share one region. Each phase is a list of allocations that coexist (back-to-back offsets); every phase reuses the same base offset; the region is sized to the largest phase (`max(4 KB + 4 KB, 8 KB) = 8 KB` in the example). The exhaustive aliasing check must prove the phases never touch the region at the same time.

  ```python
  # A and B tiles are dead once the mainloop finishes, so the epilogue
  # staging buffer reuses their shared memory.
  allocator.add_alias_group([
      [smem_ab_resource._alloc_a, smem_ab_resource._alloc_b],  # phase 0
      [gmem_d_resource._alloc_staging],                        # phase 1
  ])
  allocator.compute_layout()
  ```

- `BarrierAllocator` and the `TaskManager(barrier_allocator=...)` keyword appear only in the Allocators guide (and Pipeline Groups guide); they are absent from the rendered API reference (docs.nvidia.com/cutlass/latest, fetched 2026-10) — the `TaskManager.__init__` signature in [task_manager](./ts-api-task-manager.md) lists only `smem_allocator` / `tmem_allocator`, and [memory](./ts-api-memory.md) documents no `BarrierAllocator`. Without a `BarrierAllocator`, `SmemAllocator` accounts for pipeline barrier storage itself (`barrier_smem_bytes`) and patches it with `assign_barrier_ptrs()`. Verify the keyword against the installed `cutlass.experimental.task_scheduling` before relying on it.
- Default SMEM alignment is 128 bytes. Pipeline mbarrier storage is accounted separately as 16 bytes per stage and patched by `assign_barrier_ptrs()`.
- Checker coupling: if two aliased resources are accessed at the same time by different tasks and one writes, the checker reports an `aliasing race` (e.g. a writer re-acquires and overwrites `tmem_sp` after the reader released it while the reader still reads the aliased `tmem_vec`).
- Document version: CUTLASS v4.8.0 — [Allocators](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_allocators.html) (source: [ts_allocators.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_allocators.rst))

## Related

- [Task Scheduling: Resources](./ts-resources.md)
- [Task Scheduling: Reading the Printout](./ts-printout.md)
- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling API: memory](./ts-api-memory.md)
