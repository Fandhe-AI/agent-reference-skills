# Task Scheduling: Validation

`TaskManager.__init__()` prints each captured task schedule and runs the validation checks on the captured `ScheduleResult` before code generation proceeds.

## Signature / Usage

```python
@schedule
def load_schedule(gmem_a: GmemAResource,
                  smem_a: SmemAResource) -> None:
    with domain_loop(0, num_k_tiles, 1):
        coord_k, coord_m, coord_n = gmem_a.compute_coords()
        smem_a.acquire()
        smem_a.tma_load_a(coord_k=coord_k, coord_m=coord_m)
        smem_a.commit()

load_task = Task(
    name="load_a",
    src_resources=[gmem_a],
    dst_resources=[smem_a],
    warp_idx=0,
    num_warps=1,
    schedule=load_schedule(gmem_a, smem_a),
)

task_manager = TaskManager(
    tasks=[load_task],
    resource_dependency_graph={smem_a: [gmem_a]},
)
```

## Options / Props

Complete check list:

| Check | Rule |
| --- | --- |
| Captured domain validity | A schedule needs a valid domain source; static domains need a non-zero step; dynamic domains need a `get_domain` provider. |
| Resource stage roles | A `src_resources` resource may only be read (consumer stages); a `dst_resources` resource may only be written (producer stages). |
| Dependency graph is realizable | Every resource named must be used by tasks; each edge needs a task reading the upstream and a task writing the downstream resource. |
| Every resource is in the graph | Every resource a task reads or writes must appear in the dependency graph. |
| Schedule resource coverage | Every resource declared on a task must be used by entries in its captured schedule. |
| Work bracketing | Consumer work in `wait` / `release`; producer work in `acquire` / `commit`; `try_` operations precede their blocking operations. |
| WorkQueue placement | In a persistent kernel all tasks are persistent or none; the queue epilogue (`wait` / `get_and_advance_work_tile` / `release`) only in the tail of the schedule. |
| DMA ordering | An upstream buffer cannot be released before downstream DMA producer work has consumed it. |
| Exhaustive interleaving | Simulates every legal ordering to catch deadlocks, physical SMEM/TMEM aliasing races, and PDL launches that can run before a PDL wait. |
| Pipeline thread counts and bytes | TS recomputes expected arrival counts and TMA transaction bytes from pipeline type, task warp counts, cluster layout and signaling mode; mismatch errors state the expected value. |
| Leader-routed producer completions | Declared `num_bytes` must cover all producers; checked with `num_bytes_per_warp_per_cta`. |
| Interleaved pipelines | `num_stages` divisible by each stride; asymmetric strides need the advance flag and separate tasks; `UmmaUmma` and `ClcFetchAsync` do not support interleaving. |
| CTA layout consistency | All pipelined resources in a kernel must declare the same `cta_layout_vmnk`. |
| Head/loop producer overlap | A pipelined producer in both head and main loop is flagged (warning). |
| Named work dispatch | The method called must resolve to a decorated `@consumer_work` / `@producer_work` method. |
| SMEM / TMEM capacity | Allocated requirements must fit the allocator capacity. |
| Value routing | A `TaskLocalVariable` token must be written before read and flow from a consumer read into a producer write. |
| Ping-pong resources | Self-edge needs a pipeline configuration and a task on both producer and consumer sides. |
| Split-consumer signaling | `consumer_wait_signaling_threads` only when the pattern is actually present. |
| Persistent skip predicate | `skip_if` must be a valid `WorkQueue` method. |
| Warp-group register consistency / Register budget | Tasks in one warp-group partition must agree on register count; budgets must fit hardware. |
| PipelineGroup consistency | Members must use compatible pipeline configurations and be wired consistently through tasks. |

## Notes

- Rejected: resource missing from the graph (`... does not appear in resource_dependency_graph`); fix by declaring the edge (`{smem_a: [gmem_a]}`). Rejected: an edge with no backing task; fix by including a task with `gmem_a` in `src_resources` and `smem_a` in `dst_resources`.
- A task that declares `smem_a` in `src_resources` but uses producer-side operations (`acquire` / `commit`) on it is rejected.
- Work before `acquire` is rejected even if the bracket is balanced; move the producer work between `acquire` and `commit`.
- DMA ordering: a consumer must not `release` a TMA-filled buffer before the downstream producer work that reads it (e.g. `tmem_c.mma(desc_a=desc_a)`) has run; release after the MMA read. Downstream pipeline types treated as DMA producers: `TmaAsync`, `TmaUmma`, `UmmaAsync`, `UmmaUmma`, `ClcFetchAsync`. For a plain downstream (e.g. non-pipelined GMEM store) an early release is accepted.
- Persistent WorkQueue bookkeeping inside the `domain_loop` or inside `skippable()` is wrong (advances per row / never advances on skipped tiles, causing an infinite loop); place it in the work-tile tail:

  ```python
  @schedule
  def copy_schedule(copy_res: CopyResource,
                    wq: WorkQueue) -> None:
      with work_tile_loop(wq, skip_if=CopyWorkQueue.skip_work_tile_if) as wtwl:
          with wtwl.skippable(), domain_loop(0, num_rows, 1):
              copy_res.copy_row()
          wq.try_wait()                     # tail: runs once per work tile
          wq.wait()
          wq.get_and_advance_work_tile()
          wq.release()
  ```

- `d.first_iter()` / `d.last_iter()` placed outside the `domain_loop` body is rejected.
- PDL ordering: declare the wait as an upstream dependency of the data resource (`{gmem_ab: [pdl_wait_resource]}`); a launch path that can execute before any PDL wait is not allowed, and skipped-tile paths are also evaluated.
- Pipeline configuration checks: e.g. a `TmemC` accumulator produced by one MMA warp and drained by a 4-warp epilogue needs `consumer_group` sized `num_epilogue_warps * 32` threads with `create_umma_async_pipeline_cfg`; using `create_tma_umma_pipeline_cfg` would declare an MMA consumer and is rejected.

  ```python
  cfg = PipelineConfig.create_umma_async_pipeline_cfg(
      num_stages=acc_stages,
      producer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
      consumer_group=pipeline.CooperativeGroup(
          pipeline.Agent.Thread, size=num_epilogue_warps * 32),   # the 4 store warps release
      cta_layout_vmnk=(1, 1, 1, 1),
  )
  ```

- These checks compare arrival counts, not actual hardware operations; a wrong pipeline type implying the same counts can pass by coincidence yet emit the wrong barrier protocol (undefined behavior: hang or race).
- Exhaustive interleaving follows the dependency graph transitively, but still flags a race if overlapping aliased write and read stages can run concurrently in any interleaving.
- Verification gaps (cannot be checked statically; author's responsibility): inter-CTA communication inside work bodies (e.g. split-K peer-SMEM exchanges), hand-written or named barriers, and the TMA transaction byte count (TS does not verify that issued TMA instructions sum to the declared `num_bytes`; it only checks internal consistency across the cluster).
- `TaskManager(skip_validation=True)` still runs the checks but reports failures as warnings; use only when deliberately compiling a schedule known to violate a conservative check.
- Document version: CUTLASS v4.8.0 — [Validation](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_validation.html) (source: [ts_validation.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_validation.rst))

## Related

- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling: Patterns](./ts-patterns.md)
- [Task Scheduling: Reading the Printout](./ts-printout.md)
- [Task Scheduling: Allocators](./ts-allocators.md)
- [Task Scheduling: Programmatic Dependent Launch](./ts-pdl.md)
- [Task Scheduling API: task_manager](./ts-api-task-manager.md)
