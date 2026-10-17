# Task Scheduling: Resources

A TS resource abstracts a physical GPU resource (GMEM tensor, SMEM tile, TMEM accumulator, persistent tile queue) as a `@dataclass(kw_only=True)` subclass of `MemoryResource`.

## Signature / Usage

```python
@dataclass(kw_only=True)
class InputGmemResource(MemoryResource):
    source_tensor: cute.Tensor
    num_entries: cutlass.Int32
    num_warps: int
    item: cutlass.Constexpr[TaskLocalVariable] = TaskLocalVariable.uninitialized()

    def __post_init__(self) -> None:
        self.item = TaskLocalVariable(
            dtype=cutlass.Int16,
            default=cutlass.Int16(0),
            docs="Input element loaded for the current grid-stride iteration.",
        )

    @consumer_work(returns=item)
    @cute.jit
    def get_item(self, stage_info: StageInfo) -> cutlass.Int16:
        gid = stage_info.loop_offset
        val = cutlass.Int16(0)
        if gid < self.num_entries:
            val = self.source_tensor[gid]
        return val


@dataclass(kw_only=True)
class OutputGmemResource(MemoryResource):
    destination_tensor: cute.Tensor
    num_entries: cutlass.Int32
    num_warps: int

    @producer_work
    @cute.jit
    def set_item(self, stage_info: StageInfo, data: cutlass.Int16) -> None:
        gid = stage_info.loop_offset
        if gid < self.num_entries:
            self.destination_tensor[gid] = data

@schedule
def schedule_fn(input_gmem: InputGmemResource,
                output_gmem: OutputGmemResource) -> None:
    with domain_loop(start, num_entries, step, unroll=unroll):
        res = input_gmem.get_item()
        output_gmem.set_item(data=res)
```

## Options / Props

| Name | Description |
| --- | --- |
| `@producer_work` | Method that writes data into the resource (from the resource's point of view). |
| `@consumer_work` | Method that reads data out of the resource. |
| `pipeline_config=` | Optional; attaches a pipeline that guards storage. A non-pipelined resource (e.g. coordinate-only GMEM input) has no barriers. |
| `get_smem_requirements()` / `get_tmem_requirements()` | Return the `SmemAllocation` / `TmemAllocation` objects the resource allocates. |
| `TaskLocalVariable` | Token carrying a value from a consumer work method to a producer work method through the schedule. |
| `WorkAttr.AUXILIARY` | Marks helper work that does not touch the data payload; the verifier ignores it for ordering and pipeline checks. |
| `StageInfo.loop_offset` | Current `domain_loop` iteration. |
| `StageInfo.stage_idx` | Active pipeline stage, or `None` for unpipelined work. |
| `StageInfo.barrier` | Active mbarrier pointer, if the resource is pipelined. |
| `StageInfo.work_tile` | Current persistent scheduler tile. |

## Notes

- Declaring memory: create the allocation once in the constructor and return it from `get_smem_requirements()` (or `get_tmem_requirements()`); work methods read the resolved pointer through `stage_info.context`.

  ```python
  self._alloc_smem = SmemAllocation(
      "smem_data", dtype=cutlass.Float16, count=num_stages * tile_size, alignment=128
  )

  def get_smem_requirements(self):
      return [self._alloc_smem]
  ```

- Task-local variable declaration has five parts: a class attribute initialized with `TaskLocalVariable.uninitialized()`; binding it in `__post_init__` or `__init__` with a dtype, default, and docs; marking the consumer with `@consumer_work(returns=item)` and returning the value; passing the returned token through the schedule body; giving the producer a matching parameter (such as `data` above).
- Auxiliary work is still captured and emitted as part of the schedule, but may appear anywhere: it does not need to sit inside the `acquire` / `commit` or `wait` / `release` brackets.
- Per-work-tile state is an ordinary resource field reset by a method called inside `work_tile_loop`:

  ```python
  scale_d: cutlass.Boolean = field(init=False, default=None)

  @producer_work(work_attrs=WorkAttr.AUXILIARY)
  @cute.jit
  def init_work_tile_state(self, stage_info: StageInfo) -> None:
      del stage_info
      self.scale_d = False

  @schedule
  def mma_schedule(smem_a, smem_b, tmem_c, wq) -> None:
      with work_tile_loop(wq):
          tmem_c.init_work_tile_state()
          with domain_loop(0, num_k_tiles, 1):
              desc_a_base = smem_a.build_desc_a()
              desc_b_base = smem_b.build_desc_b()
              tmem_c.mma(desc_a_base=desc_a_base,
                         desc_b_base=desc_b_base)
  ```

- Use `stage_info.loop_offset` as the current `domain_loop` iteration (e.g. a grid-stride element index) and `stage_info.work_tile.tile_idx` in persistent schedules to select the active output tile.
- Compile-time work arguments: a schedule can pass compile-time constants as keyword arguments, declared on the work method as keyword-only `cutlass.Constexpr`. Unlike task-local variables (runtime SSA values), these are Python values fixed at schedule-capture time. Each distinct call occupies its own schedule slot (the call-idx column in the printout numbers them).

  ```python
  @consumer_work(returns=t2r_rmem)
  @cute.jit
  def load_subtile(self, stage_info: StageInfo, *,
                   subtile_idx: cutlass.Constexpr[int]):
      col_offset = subtile_idx * self.t2r_inst_repx
      ...

  @schedule
  def store_schedule(tmem_c, gmem_d) -> None:
      tmem_c.wait()
      for subtile_idx in cutlass.range_constexpr(subtile_cnt):
          t2r_rmem = tmem_c.load_subtile(subtile_idx=subtile_idx)
          gmem_d.store(t2r_rmem=t2r_rmem, subtile_idx=subtile_idx)
      tmem_c.release()
  ```
- Document version: CUTLASS v4.8.0 — [Resources](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_resources.html) (source: [ts_resources.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_resources.rst))

## Related

- [Task Scheduling: Pipelines](./ts-pipelines.md)
- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling: Allocators](./ts-allocators.md)
- [Task Scheduling: Reading the Printout](./ts-printout.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
