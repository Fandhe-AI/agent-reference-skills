# Task Scheduling: Programmatic Dependent Launch

TS models Programmatic Dependent Launch (PDL) through synchronization-only resources `PdlWaitBarrier` and `PdlLaunchBarrier`.

## Signature / Usage

```python
resource_dependency_graph = {
    gmem_ab: [pdl_wait_resource],
}

@schedule
def load_a_schedule(
    gmem_ab: GmemAbResource,
    smem_a: SmemAbResource,
    wq: WorkQueue,
    pdl_wait_resource: PdlWaitBarrier,
    pdl_launch_resource: PdlLaunchBarrier,
) -> None:
    pdl_wait_resource.wait_griddep()
    with work_tile_loop(wq):
        with domain_loop(0, num_k_tiles, 1):
            coord_k, coord_m, coord_n = gmem_ab.compute_coords()
            smem_a.try_acquire()
            smem_a.acquire()
            smem_a.tma_load_a(coord_k=coord_k, coord_m=coord_m)
            smem_a.commit()
        wq.try_wait()
        wq.wait()
        wq.get_and_advance_work_tile()
        wq.release()
    pdl_launch_resource.launch_griddep()
```

## Options / Props

| Resource / method | Description |
| --- | --- |
| `PdlWaitBarrier.wait_griddep()` | Emits the PDL wait. |
| `PdlLaunchBarrier.launch_griddep()` | Emits the dependent-grid launch. |
| `TaskManager(assume_pdl_wait_completed=True)` | Use only when the PDL wait is emitted outside TS before the first PDL-dependent memory access. |

## Notes

- The barriers carry no payload variables but still participate in task resource lists and dependency graph ordering.
- PDL lets a successor grid start before the predecessor grid has fully completed, so the wait is a correctness boundary: any successor-grid work that reads predecessor-grid results must execute `wait_griddep` before the first dependent memory access.
- TS cannot infer that dependency from address expressions or resource names. Declare the data resource as depending on the wait resource in the dependency graph; TS then treats `PdlWaitBarrier` as an ordering-only upstream resource and checks the wait precedes the dependent work. Without the edge, the two resources are independent to the validator.
- Launch barriers are schedule-only notification resources. The checker rejects an enabled `launch_griddep` path when no `wait_griddep` has executed in any task schedule, including skipped-tile execution.
- Document version: CUTLASS v4.8.0 — [Programmatic Dependent Launch](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_pdl.html) (source: [ts_pdl.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_pdl.rst))

## Related

- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling API: resources](./ts-api-resources.md)
