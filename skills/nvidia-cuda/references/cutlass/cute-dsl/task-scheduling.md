# Task Scheduling (TS, experimental)

Navigation page for the experimental Task Scheduling module, which provides infrastructure for defining, validating, and optimizing GPU kernel execution and resource-allocation patterns.

## Signature / Usage

```text
ts_general/
├── ts_introduction.html    → concepts, task/resource model
├── ts_resources.html       → resource management
├── ts_pipelines.html       → pipeline types
├── ts_schedules.html       → schedules
├── ts_patterns.html        → scheduling patterns
├── ts_validation.html      → validation
├── ts_printout.html        → reading the printed output
├── ts_allocators.html      → memory allocators
├── ts_pipeline_groups.html → pipeline groups
└── ts_pdl.html              → Programmatic Dependent Launch (PDL)
ts_api.html                  → API reference (task_scheduling module)
```

## Options / Props

| Category | Symbols |
| --- | --- |
| Core modules | `task_scheduling`, `resources`, `task`, `task_manager`, `schedule_builder`, `memory`, `pipeline_group`, `pipeline`, `enums` |

## Notes

- This is a navigation/index page; content lives in the linked `ts_general/*` guides and the `ts_api.html` API reference.
- Marked experimental; requires familiarity with CuTe DSL pipeline fundamentals (see [CuTe DSL API: pipeline](./api-pipeline.md)) as a prerequisite.

## Related

- [CuTe DSL API: pipeline](./api-pipeline.md)
- [Primitives API (experimental)](./primitives-api.md)
