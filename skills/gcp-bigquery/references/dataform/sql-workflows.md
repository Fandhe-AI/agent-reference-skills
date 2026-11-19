---
source: https://docs.cloud.google.com/dataform/docs/sql-workflows
---

# Dataform SQL workflows

Architecture and execution of Dataform workflows. Workflows power BigQuery pipelines, data preparations, notebooks, and saved queries, and are written with Dataform core (SQLX plus optional JavaScript) or exclusively with JavaScript.

## Signature / Usage

### Execution tags and default execution settings

Add Dataform execution tags to files, then run only the files with a selected tag when triggering a run manually. By default, Dataform runs with the execution settings in `workflow_settings.yaml`.

```yaml
defaultProject: my-gcp-project-id
defaultDataset: my_dataform_dataset
defaultLocation: US
defaultAssertionDataset: my_dataform_assertions
dataformCoreVersion: 3.0.62
```

## Options / Props

### Workflow objects

| Object | Description |
|--------|-------------|
| Data source declarations | Declare BigQuery data sources so tables and operations can reference them |
| Tables | Types: table, incremental table, view, materialized view |
| Assertions | Data quality test queries, run on every update; alert on failure |
| Custom SQL operations | SQL statements run in BigQuery without modification |
| Includes | JavaScript files with variables and functions reused across the workflow |

### Execution configuration

| Mechanism | Description |
|-----------|-------------|
| Manual run | Whole workflow, selected actions, or selected tags, from a development workspace |
| Release configuration | Compilation overrides for the whole repository and the frequency of creating compilation results |
| Workflow configuration | Select a release configuration, the actions to run, and the schedule |
| Workspace compilation overrides | Run output in an isolated BigQuery location per workspace |
| Dataform API | Create and run a single compilation result with compilation overrides |

## Notes

- A custom service account must be associated with a Dataform repository for workflow execution; all other repository operations use the default Dataform service agent.
- The compiled graph (DAG) is shown by clicking **Compiled graph** in the workspace; with compilation errors, an error message is shown instead.
- The Data Engineering Agent generates workflow code and configuration from natural language prompts and fills table configurations with Knowledge Catalog metadata (field descriptions, table overviews, generic aspects).
- The `workflow_settings.yaml` block above is borrowed from the Dataform table page of this skill's source set (Snippet taken from https://docs.cloud.google.com/dataform/docs/create-tables); this twin has no code of its own.
- The source shows no code for execution tags; the only block on this page is the `workflow_settings.yaml` that holds the default execution settings.
- Source: https://docs.cloud.google.com/dataform/docs/sql-workflows (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [create-tables.md](./create-tables.md)
- [dependencies.md](./dependencies.md)
