---
source: https://docs.cloud.google.com/bigquery/docs/query-overview
---

# Overview of BigQuery analytics

How BigQuery processes queries (execution tree, shuffle tier, query plan, dynamic planning, cached results), the query job types, data sources that can be queried, pricing models, and the analytics features around queries (BigQuery Studio, BigQuery ML, BI and third-party tools).

## Signature / Usage

### Query a public dataset (GoogleSQL)

```sql
SELECT
  name, gender,
  SUM(number) AS total
FROM
  `bigquery-public-data.usa_names.usa_1910_2013`
GROUP BY
  name, gender
ORDER BY
  total DESC
LIMIT
  10;
```

## Options / Props

### Analytic workflows

| Workflow | Feature |
|----------|---------|
| Ad hoc analysis | GoogleSQL in the Google Cloud console or third-party tools |
| Geospatial analysis | Geography data types and GoogleSQL geography functions |
| Graph analysis | BigQuery Graph with Graph Query Language (GQL) |
| Search for data | Search indexes and searches on unstructured text or semi-structured JSON |
| Search for Google Cloud resources | Natural language search (Preview) |
| Machine learning | BigQuery ML (create and run models with GoogleSQL) |
| Business intelligence | BigQuery BI Engine (in-memory analysis service) |
| AI assistance | Gemini in BigQuery |

### Data exploration features

| Feature | Purpose |
|---------|---------|
| Knowledge Catalog | Find Google Cloud resources (datasets, tables) from within BigQuery |
| Reference panel | Preview schema details of tables, snapshots, views, materialized views; construct or edit queries |
| Data insights | Generate natural language questions about your data with the SQL queries that answer them |
| Data profile scan | Statistical characteristics (average, unique, maximum, minimum values) |
| Data canvas | Query with natural language, visualize results with charts, ask follow-up questions |

### Data sources

| Source | Notes |
|--------|-------|
| Data stored in BigQuery | Load data, use DML, write query results to a table, query historical data within the time travel window. Single-region or multi-region locations |
| Data in more than one location | Treated as a global query (Preview). Queries that reference data in multiple locations are always global queries, even if one region is a single-region location and the other is a multi-region location that contains it |
| External data | Cloud Storage, Spanner, Cloud SQL and others |
| Multi-cloud data | Amazon S3 or Azure Blob Storage through BigQuery Omni |
| Public datasets | The public dataset marketplace |
| BigQuery sharing (formerly Analytics Hub) | Publish and subscribe to BigQuery datasets and Pub/Sub topics |

### Query job types

| Type | Behavior |
|------|----------|
| Interactive | Default. Intended to start executing as quickly as possible |
| Batch | Lower priority. When a project or reservation is using all of its available compute resources, batch queries are more likely to be queued and remain in the queue. After it starts, it runs the same as an interactive query |
| Continuous | The query runs continuously; results go to a BigQuery table or are exported to Bigtable or Pub/Sub |

### Query processing

| Concept | Description |
|---------|-------------|
| Execution tree | Breaks the query into stages whose steps can run in parallel |
| Shuffle tier | Fast, distributed tier that stores intermediate data between stages |
| Query plan | Viewable in the Google Cloud console, through `INFORMATION_SCHEMA.JOBS*` views, or the `jobs.get` REST method |
| Query execution graph | Graphical plan with performance insights for running or completed queries |
| Query monitoring and dynamic planning | Additional workers monitor progress; the plan can change dynamically |
| Query results | Written to persistent storage, which lets BigQuery serve cached results next time |

### Pricing models

| Model | Basis |
|-------|-------|
| On-demand | Data scanned by queries (bytes processed); fixed query-processing capacity per project |
| Capacity-based | Purchase dedicated query-processing capacity (reservations) |

### BigQuery Studio required APIs

Enabled by default in projects and automated scripts created after March 24, 2024: Compute Engine API, Analytics Hub API, Dataform API, Vertex AI API, BigQuery Connection API, BigQuery Data Policy API, BigQuery Reservation API, Dataplex API.

## Notes

- Ways to run query jobs: Google Cloud console, `bq query`, REST `jobs.query` / `jobs.insert`, and the client libraries.
- Saved queries can be private, shared at project level (specific principals), or public (anyone can view it).
- BigQuery redistributes resources fairly between new and running queries as they start and finish; queries can be queued when resources are unavailable.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/running-queries (the source overview page has no code block).
- The source contains no code samples; third-party integrations (Looker, Data Studio, Connected Sheets, Tableau, ODBC / JDBC drivers, `pandas-gbq`) are linked, not detailed.
- Source: https://docs.cloud.google.com/bigquery/docs/query-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [running-queries.md](./running-queries.md)
- [cached-results.md](./cached-results.md)
- [parameterized-queries.md](./parameterized-queries.md)
