# Task Scheduling (TS, experimental)

Navigation page for the experimental Task Scheduling module, which provides infrastructure for defining, validating, and optimizing GPU kernel execution and resource-allocation patterns.

## Signature / Usage

```text
ts_general/
├── ts_introduction.html    → concepts, task/resource model        (ts-introduction.md)
├── ts_resources.html       → resource management                  (ts-resources.md)
├── ts_pipelines.html       → pipeline types                       (ts-pipelines.md)
├── ts_schedules.html       → schedules                            (ts-schedules.md)
├── ts_patterns.html        → scheduling patterns                  (ts-patterns.md)
├── ts_validation.html      → validation                           (ts-validation.md)
├── ts_printout.html        → reading the printed output           (ts-printout.md)
├── ts_allocators.html      → memory allocators                    (ts-allocators.md)
├── ts_pipeline_groups.html → pipeline groups                      (ts-pipeline-groups.md)
└── ts_pdl.html              → Programmatic Dependent Launch (PDL) (ts-pdl.md)
ts_api.html                  → API reference (task_scheduling module)
ts_api/
├── ts.rst              → task_scheduling   (ts-api-task-scheduling.md)
├── resources.rst       → resources         (ts-api-resources.md)
├── task.rst            → task              (ts-api-task.md)
├── task_manager.rst    → task_manager      (ts-api-task-manager.md)
├── schedule_builder.rst→ schedule_builder  (ts-api-schedule-builder.md)
├── memory.rst          → memory            (ts-api-memory.md)
├── pipeline_group.rst  → pipeline_group    (ts-api-pipeline-group.md)
├── pipeline.rst        → pipeline          (ts-api-pipeline.md)
└── enums.rst           → enums             (ts-api-enums.md)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Core modules | `task_scheduling`, `resources`, `task`, `task_manager`, `schedule_builder`, `memory`, `pipeline_group`, `pipeline`, `enums` |

## Notes

- This is a navigation/index page; content lives in the linked `ts_general/*` guides and the `ts_api.html` API reference.
- Marked experimental; requires familiarity with CuTe DSL pipeline fundamentals (see [CuTe DSL API: pipeline](./api-pipeline.md)) as a prerequisite.

- Guides: [Introduction](./ts-introduction.md), [Resources](./ts-resources.md), [Pipeline Types](./ts-pipelines.md), [Schedules](./ts-schedules.md), [Scheduling Patterns](./ts-patterns.md), [Validation](./ts-validation.md), [Reading the Printed Output](./ts-printout.md), [Allocators](./ts-allocators.md), [Pipeline Groups](./ts-pipeline-groups.md), [Programmatic Dependent Launch](./ts-pdl.md).
- API reference: [task_scheduling](./ts-api-task-scheduling.md), [resources](./ts-api-resources.md), [task](./ts-api-task.md), [task_manager](./ts-api-task-manager.md), [schedule_builder](./ts-api-schedule-builder.md), [memory](./ts-api-memory.md), [pipeline_group](./ts-api-pipeline-group.md), [pipeline](./ts-api-pipeline.md), [enums](./ts-api-enums.md).
- CHANGELOG 4.8.0: `TaskManager(iket_enable_profiling=True)` instruments the schedule with IKET ranges; `iket_profiling_stages` makes individual pipeline stages generate separate ranges (see IKET Profiling).

## Related

- [Introduction](./ts-introduction.md)
- [API: task_manager](./ts-api-task-manager.md)
- [IKET Profiling](./iket-profiling.md)
- [CuTe DSL API: pipeline](./api-pipeline.md)
- [Primitives API (experimental)](./primitives-api.md)
