---
source: https://docs.cloud.google.com/dataform/docs/dependencies
---

# Dataform dependencies

Declare dependency relationships between workflow actions so Dataform runs the dependency before the dependent. Dependencies are declared with the `ref` function in a `SELECT` or in a `dependencies` list in the `config` block.

## Signature / Usage

### Declare a dependency with `ref`

```sql
// filename is incremental_table.sqlx

config { type: "incremental" }

SELECT * FROM ${ref("source_data")}
```

```sql
// filename is custom_assertion.sqlx

config { type: "assertion" }

SELECT
  *
FROM
  ${ref("some_table")}
WHERE
  a is null
  or b is null
  or c is null
```

### Declare dependencies in the `config` block

```sql
config { dependencies: [ "some_table", "some_assertion" ] }
```

### Assertions as dependencies

Failure of assertions of action A does not block action B from running; set the assertions as dependencies of B to block it.

```sql
config {
  type: "table",
  assertions: {
    uniqueKey: ["user_id"],
    nonNull: ["user_id", "customer_id"],
  }
}
```

```sql
config {
  type: "table",
  dependencies: [ "dataform_A_assertions_uniqueKey_0",  "dataform_A_assertions_nonNull"]
}
```

Assertion name formats (replace `ACTION_TYPE` with `table`, `view`, or `operations`):

```sql
config {
  type: "ACTION_TYPE",
  dependencies: [ "ACTION_DATASET_NAME_ACTION_NAME_assertions_nonNull"]
}
```

```sql
config {
  type: "ACTION_TYPE",
  dependencies: [ "ACTION_DATASET_NAME_ACTION_NAME_assertions_rowConditions"]
}
```

```sql
config {
  type: "ACTION_TYPE",
  dependencies: [ "ACTION_DATASET_NAME_ACTION_NAME_assertions_uniqueKey_INDEX"]
}
```

```sql
config {
  type: "ACTION_TYPE",
  dependencies: [ "ACTION_DATASET_NAME_ACTION_NAME_assertions_uniqueKeys_INDEX"]
}
```

Manual assertion (a `type: "assertion"` file):

```sql
config {
  type: "view",
  dependencies: [ "manualAssertion"]
}
```

### Assertions of one dependency action

```sql
// filename is tableC.sqlx

config {
type: "table",
dependencies: ["viewA", {name: "tableB", includeDependentAssertions: true}]
}

SELECT * FROM ...
```

Equivalent inline form in the `SELECT`:

```sql
  config { type: "ACTION_TYPE" }

  SELECT * FROM ${ref({name: "DEPENDENCY_ACTION_NAME", includeDependentAssertions: true})}
```

### Assertions of all dependency actions

```sql
config {
type: "ACTION_TYPE",
dependOnDependencyAssertions: true,
dependencies: [ "dependency1", "dependency2" ]
}
```

Combined with a per-dependency override:

```sql
// filename is tableName.sqlx

config {
type: "table",
dependOnDependencyAssertions: true,
dependencies: [ "actionA", {name: "actionB", includeDependentAssertions: false} ]
}

SELECT * FROM ${ref("actionC")}
```

### Reference a table with an overridden name

```sql
  SELECT * FROM ${ref("overridden_name")}
```

## Options / Props

### Action types in dependency relationships

| Action | As dependency | As dependent |
|--------|---------------|--------------|
| Data source declaration | Yes | No |
| Table (table, incremental, view, materialized view) | Yes | Yes |
| Custom SQL operation (`type: operations`) | Yes; requires `hasOutput: true` to be used in `ref` | Yes |
| Assertion (`type: assertion`) | Yes | Yes |

### Assertion-dependency parameters

| Name | Default | Description |
|------|---------|-------------|
| `includeDependentAssertions` | `false` | Adds all direct assertions of the selected dependency action as dependencies at each compilation. Supported on `table`, `view`, `operations` |
| `dependOnDependencyAssertions` | `false` | Adds all direct assertions of all dependency actions as dependencies. Supported on `table`, `view`, `operations` |

### Assertion dependency name placeholders

| Placeholder | Description |
|-------------|-------------|
| `ACTION_DATASET_NAME` | Dataset in which the action is defined; the default dataset is set in the workflow settings file |
| `ACTION_NAME` | Action in which the assertion is defined |
| `INDEX` | Index of the key array in the `uniqueKey` / `uniqueKeys` assertion (`0` if only one array) |
| `MANUAL_ASSERTION_NAME` | Name of the manual assertion |

### Required role

| Role | Scope |
|------|-------|
| `roles/dataform.editor` (Dataform Editor) | Workspaces |

## Notes

- If both parameters are set in one file, `includeDependentAssertions` takes priority for the dependency it is set on. In the `tableName.sqlx` example, Dataform adds all direct assertions of `actionA` and `actionC` (not `actionB`).
- Selected assertions can be set as dependencies for all action types except data source declarations.
- The source also shows a `dependOnDependencyAssertions` example (`sometableE`) whose body has two consecutive `SELECT` statements; it is left out because it is not a valid single query. Console click-paths are omitted.
- Source: https://docs.cloud.google.com/dataform/docs/dependencies (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-tables.md](./create-tables.md)
- [sql-workflows.md](./sql-workflows.md)
- [overview.md](./overview.md)
