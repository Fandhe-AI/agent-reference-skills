# Task Scheduling API: memory

`cutlass.experimental.task_scheduling.memory`: unified SMEM / TMEM allocators with declarative layout and optional phase-based aliasing.

## Signature / Usage

```python
allocator = SmemAllocator()

# Resources expose their allocations
for alloc in resource.get_smem_requirements():
    allocator.add(alloc)

# Optional: alias allocations whose lifetimes don't overlap.
# Each inner list is a "phase" — allocations within a phase coexist
# and get sequential offsets.  Different phases reuse the same
# physical region.
allocator.add_alias_group([
    [smem_ab._alloc_a, smem_ab._alloc_b],   # phase 1: coexist
    [epilogue._alloc_scratch],                # phase 2: reuses
])

allocator.compute_layout()   # pure Python — sets .offset on each alloc
# allocator.allocate() called later at DSL-trace time to emit the
# cutlass.Array(..., space=cutlass.AddressSpace.smem) op.
```

## Options / Props

| Class / member | Signature / description |
| --- | --- |
| `SmemAllocation` | `SmemAllocation(name: str, size_bytes: int = 0, alignment: int = 128, dtype: Any \| None = None, count: int = 1)`. Declares a named SMEM region. `size_bytes` is auto-computed as `count * dtype.width // 8` when 0 and `dtype` is provided; `alignment` default 128 (for TMA); `offset` is the byte offset from SMEM base set by `compute_layout()`. A stored `dtype` lets `SmemAllocator.get()` return a typed array. |
| `TmemAllocation` | `TmemAllocation(name: str, num_columns: int)`. Declares a named TMEM column region; `offset` is the column offset set by `TmemAllocator.compute_layout()`. |
| `ResourceContext` | `ResourceContext(smem_base: Any \| None = None, tmem_ptr_i32: Any \| None = None)`. Read-only context embedded in `StageInfo`. `smem_base`: `cutlass.Array` base pointer for the unified SMEM allocation (`None` without an `SmemAllocator`). `tmem_ptr_i32`: shared-memory `cutlass.Array[Int32, 1]` written by `nvvm.tcgen05_alloc`, used via `tmem_ptr_i32.load()` + offset (`None` when TMEM is not in use). |
| `SmemAllocator()` | SMEM layout allocator with alignment-aware bump allocation; methods `add_resource(resource)`, `add_pipeline_group(group)`, `add_tmem_ptr(alloc) -> SmemAllocation`, `get(alloc)`, `get_as_type(alloc, dtype, count=1)`, `allocate()`, `assign_barrier_ptrs()`; properties `tmem_ptr_alloc`, `barrier_smem_bytes`, `smem_base`, `total_smem_bytes`. |
| `TmemAllocator` | TMEM column layout allocator (no hardware allocation); property `total_tmem_columns`. |

## Notes

- `add_resource(resource)`: registers data allocations and accumulates barrier SMEM; the resource exposes `get_smem_requirements()` and optionally a `pipeline_config`. Members of a `PipelineGroup` have their barrier SMEM managed by the group, so individual barrier accounting is skipped; call `add_pipeline_group()` to register the group's barrier requirements (members' data SMEM is still registered via `add_resource()`).
- `add_tmem_ptr(alloc)`: registers the SMEM slot storing the 32-bit TMEM base pointer; also remembered so `TaskManager.setup_resources_and_tasks` can derive the typed `cutlass.Array` pointer and populate `ResourceContext.tmem_ptr_i32` automatically.
- `barrier_smem_bytes`: counts `num_stages × 2 × 8` for every resource whose `PipelineConfig.barrier_ptr` is `None`.
- `get(alloc)`: derives a typed `cutlass.Array` from the dtype/count stored on `alloc`; call after `allocate()`. `get_as_type(alloc, dtype, count=1)` is the reinterpret-cast variant (also for allocations declared with raw `size_bytes` only). `get_typed_ptr` is deprecated: use `get()` or `get_as_type()` instead.
- `allocate()`: emits a single `cutlass.Array(..., space=cutlass.AddressSpace.smem)` for the unified layout covering both data regions and pipeline barrier storage; must be called at DSL-trace time (inside `@cute.kernel` or `@cute.jit`). `assign_barrier_ptrs()` then replaces each resource's `PipelineConfig` with one that has `barrier_ptr` set (each `PipelineGroup` receives a single pointer spanning `(N + 1) × S` barrier entries); must be called after `allocate()` at DSL-trace time.
- `TmemAllocator` does not emit allocation intrinsics; the kernel calls `nvvm.tcgen05_alloc` manually using `total_tmem_columns`:

  ```python
  tmem_alloc = TmemAllocator()
  tmem_alloc.add_resource(tmem_c_resource)
  tmem_alloc.compute_layout()
  num_cols = tmem_alloc.total_tmem_columns  # pass to tcgen05_alloc
  ```

- `_LayoutAllocator` is the base class with common declaration and layout logic.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [memory](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/memory.html) (source: [ts_api/memory.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/memory.rst))

## Related

- [Task Scheduling: Allocators](./ts-allocators.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
- [Task Scheduling API: task_manager](./ts-api-task-manager.md)
