---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-property-graphs
---

# PROPERTY_GRAPHS view

## Signature / Usage

The `INFORMATION_SCHEMA.PROPERTY_GRAPHS` view contains one row for each
[graph](https://docs.cloud.google.com/bigquery/docs/graph-overview) in the dataset or region that
you specify.

### Required permissions

To get the permissions that
you need to query the `INFORMATION_SCHEMA.PROPERTY_GRAPHS` view,

ask your administrator to grant you the
following IAM roles on the project:

- [BigQuery Metadata Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.metadataViewer) (`roles/bigquery.metadataViewer`)
- [BigQuery Data Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataViewer) (`roles/bigquery.dataViewer`)
- [BigQuery Data Editor](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.dataEditor) (`roles/bigquery.dataEditor`)
- [BigQuery Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/bigquery#bigquery.admin) (`roles/bigquery.admin`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

These predefined roles contain

the permissions required to query the `INFORMATION_SCHEMA.PROPERTY_GRAPHS` view. To see the exact permissions that are
required, expand the **Required permissions** section:

##### Required permissions

The following permissions are required to query the `INFORMATION_SCHEMA.PROPERTY_GRAPHS` view:

- `bigquery.propertyGraphs.get`
- `bigquery.propertyGraphs.list`

You might also be able to get
these permissions
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

For more information about BigQuery permissions, see
[Access control with IAM](https://docs.cloud.google.com/bigquery/docs/access-control).

### Schema

When you query the `INFORMATION_SCHEMA.PROPERTY_GRAPHS` view, the query results
contain one row for each graph in the resource scope that you
specify.

The `INFORMATION_SCHEMA.PROPERTY_GRAPHS` view has the following schema:

| Column name | Data type | Value |
|---|---|---|
| `property_graph_catalog` | `STRING` | The name of the project that contains the dataset where the graph is defined. |
| `property_graph_schema` | `STRING` | The name of the dataset that contains the graph. |
| `property_graph_name` | `STRING` | The name of the graph. |
| `property_graph_metadata_json` | `STRING` | The JSON representation of the graph definition. This representation contains information about the graph, such as its nodes, edges, labels, properties, creation timestamp, and modification timestamps. |
| `ddl` | `STRING` | A DDL statement that can be used to create the graph. |

### Scope and syntax

Queries against this view must include a dataset or a region qualifier. For
queries with a dataset qualifier, you must have permissions for the dataset.
For queries with a region qualifier, you must have permissions for the project.
For more
information see [Syntax](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#syntax).
The following table explains the region and resource scopes for this view:

| View name | Resource scope | Region scope |
|---|---|---|
| ``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.PROPERTY_GRAPHS`` | Project level | `REGION` |
| `[PROJECT_ID.]DATASET_ID.INFORMATION_SCHEMA.PROPERTY_GRAPHS` | Dataset level | Dataset location |

Replace the following:

- Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
- `REGION`: any [dataset region name](https://docs.cloud.google.com/bigquery/docs/locations). For example, `` `region-us` ``.
- `DATASET_ID`: the ID of your dataset. For more information, see [Dataset qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#dataset_qualifier).

  <br />

  <br />

  > [!NOTE]
  > **Note:** You must use [a region qualifier](https://docs.cloud.google.com/bigquery/docs/information-schema-intro#region_qualifier) to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.

<br />

### Example

The following example retrieves the `property_graph_name`,
`property_graph_metadata_json`, and `ddl` columns from the
`INFORMATION_SCHEMA.PROPERTY_GRAPHS` view:

```googlesql
SELECT
  property_graph_name, property_graph_metadata_json, ddl
FROM
  `region-REGION`.INFORMATION_SCHEMA.PROPERTY_GRAPHS;
```

> [!NOTE]
> **Note:** `INFORMATION_SCHEMA` view names are case-sensitive.

The result is similar to the following:

```text
+---------------------+------------------------------------------------+------------------------------------------------------+
| property_graph_name | property_graph_metadata_json                   | ddl                                                  |
+---------------------+------------------------------------------------+------------------------------------------------------+
| FinGraph            | {"creationTime":"2026-01-05T22:22:22.365394Z", | CREATE PROPERTY GRAPH `my_project.graph_db.FinGraph` |
|                     | "edgeTables":[{"dataSourceTable":{"datasetId": | NODE TABLES (`my_project.graph_db.Account` AS        |
|                     | "graph_db","projectId":"my_project","tableId   | Account KEY (id)                                     |
|                     | ...                                            | ...                                                  |
+---------------------+------------------------------------------------+------------------------------------------------------+
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-property-graphs (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
