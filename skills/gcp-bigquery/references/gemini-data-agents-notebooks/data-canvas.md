---
source: https://docs.cloud.google.com/bigquery/docs/data-canvas
---

# Analyze with BigQuery data canvas

BigQuery data canvas is a Gemini in BigQuery feature for finding, transforming, querying and visualizing data with natural language prompts and a graphical directed acyclic graph (DAG) of nodes. It uses Knowledge Catalog metadata to find tables.

## Signature / Usage

### Generated SQL examples (prompt and result)

```text
Get me the 100 longest trips
```

```sql
SELECT
  taxi_id,
  trip_start_timestamp,
  trip_end_timestamp,
  trip_miles
FROM
  `bigquery-public-data.chicago_taxi_trips.taxi_trips`
ORDER BY
  trip_miles DESC
LIMIT
  100;
```

```text
Join on address
```

```sql
SELECT
  *
FROM
  `bigquery-public-data.new_york_trees.tree_census_2015` AS t2015
JOIN
  `bigquery-public-data.new_york_trees.tree_census_1995` AS t1995
ON
  t2015.address = t1995.address;
```

```text
Get me the top 10 most popular names in 1980
```

```sql
SELECT
  name,
  SUM(number) AS total_count
FROM
  `bigquery-public-data`.usa_names.usa_1910_current
WHERE
  year = 1980
GROUP BY
  name
ORDER BY
  total_count DESC
LIMIT
  10;
```

### Gemini assistant (Preview): instructions example

```text
Tasks:
  - Visualize findings with charts
  - Show many charts per question
  - Make sure to cover each part via a separate line of reasoning
```

### Workflow

1. In the query editor, next to **SQL query** click **Create new**, select **AI and knowledge**, then **Data canvas**.
2. Enter a natural language prompt (for example `Find me tables related to trees`) and add a table node.
3. Query with a SQL node, visualize with a visualization node, or generate insights with an insights node.
4. Optionally click **Export as notebook** to save the query as a notebook.

## Options / Props

### Required roles (on the project)

| Role | ID |
|---|---|
| BigQuery Studio User | `roles/bigquery.studioUser` |
| Gemini for Google Cloud User | `roles/cloudaicompanion.user` |

To manage data canvas metadata in Knowledge Catalog you also need the Knowledge Catalog roles and the `dataform.repositories.get` permission; the Dataplex API must be enabled.

### Node types

| Node | Purpose |
|---|---|
| Text | Markdown notes |
| Search | Find assets by natural language or keywords using Knowledge Catalog metadata |
| Table | A table in the analysis, with schema, details and preview |
| SQL | Run custom or generated SQL; can be exported as a scheduled query |
| Destination | Child of a SQL node; persists results to a new or existing table |
| Visualization | Bar chart, heat map, line graph, pie chart, scatter chart; **Auto-Chart** picks the type; export as PNG |
| Insights | Insights and summaries over canvas data |

### Canvas settings

| Setting | Detail |
|---|---|
| Location | Automatic location selection, or a manual **Region** / **Multi-region**; optional **Reservation** |
| Query parameters | Primitive types only in the console; use the `bq` tool or API for `ARRAY`, `STRUCT`, `JSON` |
| Resource management | Job priority (Interactive or Batch), cache preference, job timeout in milliseconds |
| Canvas management | **Omit node output when saving this canvas** (deselect to cache results with the canvas) |
| Advanced options | Google-managed keys or Cloud KMS key (CMEK); maximum bytes billed (query fails without charge above the limit; defaults to the project default) |

### Knowledge Catalog representation

| Item | Value |
|---|---|
| System entry group | `@dataform` |
| System entry type | `dataform-code-asset` |
| System aspect type | `dataform-code-asset` |
| Type | `DATA_CANVAS` |
| Filter query | `aspect:dataplex-types.global.dataform-code-asset.type=DATA_CANVAS` |

## Notes

- Limitations: natural language may not work well with BigQuery ML, Apache Spark, object tables, BigLake, `INFORMATION_SCHEMA` views, JSON, nested and repeated fields, and complex types such as `DATETIME` and `TIMEZONE`. Visualizations don't work with geomap charts. Data canvas isn't intended for direct use by business users. Basic SQL support covers `FROM` clauses, math functions, arrays, structs and `JOIN` of two tables.
- The Gemini assistant in data canvas is in Preview; the Comments toolbar feature and canvases inside repositories are Preview.
- Data canvases are powered by Dataform. Creating one grants you `roles/dataform.admin` on it, and all users with Dataform Admin on the project have owner access to all canvases in the project. Users with `dataform.repositories.list` (included in BigQuery Job User, Studio User and User) can see all code assets in **Explorer**; use custom roles without that permission to restrict. Secrets shared with the Dataform service agent can be accessed by users who can edit assets.
- The source's examples query public datasets; queries are billed by bytes processed.
- The SQL blocks are the source's example generated queries ("similar to the following"). The join example's prompts select `tree_census_1995` and `tree_census_2005` but the generated SQL joins `tree_census_2015` and `tree_census_1995`; kept as written. The source's "payment type is cash" example (placeholder `PROJECT_ID.chicago_taxi_trips_123123.taxi_trips`) is omitted.
- Gemini in BigQuery here is the Gemini for Google Cloud assistant; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.
- Available in all BigQuery locations. Knowledge Catalog (formerly Dataplex Universal Catalog) manages canvas metadata in all BigQuery locations, subject to its quotas and pricing.
- The source also shows many Console click-paths (versions, compare and restore, view all canvases, feedback).
- Source: https://docs.cloud.google.com/bigquery/docs/data-canvas (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gemini-overview.md](./gemini-overview.md)
- [gemini-set-up.md](./gemini-set-up.md)
- [conversational-analytics.md](./conversational-analytics.md)
