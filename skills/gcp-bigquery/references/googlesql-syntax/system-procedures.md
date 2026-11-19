---
source: https://docs.cloud.google.com/bigquery/docs/reference/system-procedures
---

# System procedures reference

## Signature / Usage

BigQuery supports the following system procedures, which can be
used similarly to user-created [stored procedures](https://docs.cloud.google.com/bigquery/docs/procedures).

### BQ.ABORT_SESSION

**Syntax**

```sql
CALL BQ.ABORT_SESSION([session_id]);
```

**Description**

Terminates your current session.

You can optionally specify the [session ID](https://docs.cloud.google.com/bigquery/docs/sessions#get-id),
which lets you terminate a session if the system procedure isn't called from
that session.

For more information, see
[Terminating sessions](https://docs.cloud.google.com/bigquery/docs/sessions#terminate-session).

### BQ.JOBS.CANCEL

**Syntax**

```sql
CALL BQ.JOBS.CANCEL(job);
```

**Description**

Cancels a running job.

Specify the job as a string with the format `'[project_id.]job_id'`. If you run
this system procedure from a different project than the job, then you must
include the project ID. You must run the procedure in the same location as the
job.

For more information, see
[Canceling a job](https://docs.cloud.google.com/bigquery/docs/managing-jobs#cancel_jobs).

### BQ.CANCEL_INDEX_ALTERATION

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

**Syntax**

```sql
CALL BQ.CANCEL_INDEX_ALTERATION(table_name, index_name);
```

**Description**

Cancels a user-initiated [alteration of a search index](data-definition-language-3.md#alter-search-index-statement) or
[rebuild of a vector index](data-definition-language-3.md#alter-vector-index-rebuild-statement).

Specify the name of the table as a string with the format
`'[project_id.]dataset.table'` and the index name as a string.
If you run this system procedure from a
different project than the table, then you must include the project ID.

You must run this procedure in the same location as the indexed table. To set
the location of your query, see
[Specify locations](https://docs.cloud.google.com/bigquery/docs/locations#specify_locations).

**Example**

```sql
CALL BQ.CANCEL_INDEX_ALTERATION('my_project.my_dataset.indexed_table', 'my_index');
```

### BQ.REFRESH_EXTERNAL_METADATA_CACHE

**Syntax**

```sql
CALL BQ.REFRESH_EXTERNAL_METADATA_CACHE(table_name [, [subdirectory_uri, …]]);
```

**Description**

Refreshes the metadata cache of a BigLake table or an object table.
This procedure fails if you run it against a table that has the metadata
caching mode set to `AUTOMATIC`.

To run this system procedure, you need the `bigquery.tables.update` and
`bigquery.tables.updateData` permissions.

Specify the name of the table as a string with the format
`'[project_id.]dataset.table'`. If you run this system procedure from a
different project than the table, then you must include the project ID.

For BigLake tables, you can optionally specify one or more
subdirectories of the table data directory in
Cloud Storage in the format `'gs://table_data_directory/subdirectory/.../'`.
For a selective refresh to work correctly, the Cloud Storage path
parameters must include either a specific path or a wildcard. For more
information, see [Wildcard support for Cloud Storage URIs](https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage#wildcard-support).
This lets you refresh only the table metadata from those subdirectories and
thereby avoid unnecessary metadata processing.

**Examples**

To refresh all of the metadata for a table:

```sql
CALL BQ.REFRESH_EXTERNAL_METADATA_CACHE('myproject.test_db.test_table')
```

To selectively refresh the metadata for a BigLake table:

```sql
CALL BQ.REFRESH_EXTERNAL_METADATA_CACHE('myproject.test_db.test_table', ['gs://source/uri/sub/path/d1/*', 'gs://source/uri/sub/path/d2/*'])
```

**Limitation**

- Metadata cache refresh is not supported for tables referenced by linked datasets over external datasets.
- Metadata cache refresh shouldn't be used in a [Multi-statement transaction](https://docs.cloud.google.com/bigquery/docs/transactions).

### BQ.REFRESH_MATERIALIZED_VIEW

**Syntax**

```sql
CALL BQ.REFRESH_MATERIALIZED_VIEW(view_name);
```

**Description**

Refreshes a materialized view.

Specify the name of the materialized view as a string with the format
`'[project_id.]dataset.table'`. If you run this system procedure from a
different project than the materialized view, then you must include the project
ID.

For more information, see
[Manual refresh](https://docs.cloud.google.com/bigquery/docs/materialized-views#manual_refresh).

### BQ.SHOW_GRAPH_EXPAND_SCHEMA

**Syntax**

```sql
CALL BQ.SHOW_GRAPH_EXPAND_SCHEMA(
  graph_name
  [, start_node [, flatten_results] ]
  , output_schema);
```

**Description**

Populates the `output_schema` variable that you provide with the schema of the
table returned by calling the
[`GRAPH_EXPAND` TVF](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-queries#graph_expand)
on `graph_name`.

Each column returned by the `GRAPH_EXPAND`
TVF represents as property in the graph. The output includes the name,
type, and mode for each column. If the property
has a description or synonyms defined on it, then those appear in a
`description` field for the column. If the property defines a
[measure](https://docs.cloud.google.com/bigquery/docs/graph-measures), then
the output includes `"is_measure":true` for that field.

- `graph_name`: A `STRING` containing the name of the [graph](https://docs.cloud.google.com/bigquery/docs/graph-overview) in the form `'[project_id.]dataset.graph'`.
- `start_node`: An optional `STRING` specifying the name of the starting node for traversal. This argument is required if the graph has multiple root node tables.
- `flatten_results`: An optional `BOOL` value that indicates how to structure the output schema:
  - `TRUE`: Flattens all node and edge properties into top-level columns of the form `<element>_<property>`. `TRUE` is the default value.
  - `FALSE`: Returns the root node properties as un-prefixed top-level columns and joined neighbor tables as `STRUCT` columns.

**Examples**

```sql
DECLARE schema STRING;
CALL BQ.SHOW_GRAPH_EXPAND_SCHEMA('my_project.my_dataset.my_graph', schema);
SELECT schema;
```

The output looks similar to the following:

```text
{
  "fields":[
    {
      "name":"Department_dept_name",
      "type":"STRING",
      "mode":"NULLABLE",
      "description":
        "{\"description\":\"The name of the academic department\",
          \"synonyms\":[\"division\"]}"
    },
    {
      "name":"Department_budget",
      "type":"FLOAT",
      "mode":"NULLABLE"
    },
    {
      "name":"Department_total_budget",
      "type":"FLOAT",
      "mode":"NULLABLE",
      "is_measure":true
    }
  ]
}
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/system-procedures (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
