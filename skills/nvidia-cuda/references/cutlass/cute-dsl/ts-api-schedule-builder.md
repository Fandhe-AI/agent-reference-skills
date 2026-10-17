# Task Scheduling API: schedule_builder

`cutlass.experimental.task_scheduling.schedule_builder.schedule` is the decorator that traces a schedule function into a `Schedule`.

## Signature / Usage

```python
cutlass.experimental.task_scheduling.schedule_builder.schedule(
    fn: Callable[[...], None]
) -> Callable[[...], Schedule]
```

## Options / Props

| Name | Description |
| --- | --- |
| `fn` | Function whose arguments are `MemoryResource` instances and whose body records resource calls through schedule-builder context managers. |
| Returns | Wrapper that accepts concrete resources and returns the captured `Schedule` (`Callable[..., Schedule]`). |

## Notes

- The decorated function receives `ResourceProxy` wrappers for each `MemoryResource`. Method calls on the proxies record schedule entries and routing edges. `with work_tile_loop(wq):` and `with domain_loop(start, end, step):` mark the structural boundaries. Plain Python control flow inside the function executes at trace time.
- The same decorator is re-exported as `cutlass.experimental.task_scheduling.schedule`.
- Module path is `cutlass.experimental.task_scheduling` (experimental).
- Document version: CUTLASS v4.8.0 — [schedule_builder](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_api/schedule_builder.html) (source: [ts_api/schedule_builder.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_api/schedule_builder.rst))

## Related

- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling API: task_scheduling](./ts-api-task-scheduling.md)
- [Task Scheduling API: task](./ts-api-task.md)
