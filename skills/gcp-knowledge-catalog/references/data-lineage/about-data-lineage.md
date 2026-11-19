---
source: https://docs.cloud.google.com/knowledge-catalog/docs/about-data-lineage
---

# About data lineage

Data lineage in Knowledge Catalog (formerly Dataplex Universal Catalog) tracks where data originates, how it transforms and where it moves across systems such as BigQuery and Vertex AI. Lineage is recorded automatically by integrated Google Cloud services, manually through the Data Lineage API, or by importing OpenLineage events. It is modeled as processes, runs and events, explored as graphs or lists in the Google Cloud console, and queried through the Data Lineage API.

## Signature / Usage

### A process is a data transformation definition

The following SQL query is one process; each execution of it is a run.

```sql
  CREATE TABLE `dataplex-docs.data_lineage_demo.total_green_trips_22_21`
  AS
  SELECT
      vendor_id,
      COUNT(*) AS number_of_trips
  FROM
      (
          SELECT vendor_id
          FROM `dataplex-docs.data_lineage_demo.nyc_green_trips_2022`
          UNION ALL
          SELECT vendor_id
          FROM `dataplex-docs.data_lineage_demo.nyc_green_trips_2021`
      )
  GROUP BY
      vendor_id;
```

### Resource names

- The REST resource name format for a process is `projects/PROJECT_NUMBER/locations/LOCATION/processes/PROCESS_ID`. For example: `projects/123456789123/locations/us/processes/sh-0548bbf4ff3c8072a6c7372ba1acafb6`.
- The REST resource name format for a run shows that it's a child of a process: `projects/PROJECT_NUMBER/locations/LOCATION/processes/PROCESS_ID/runs/RUN_ID`. For example: `projects/123456789123/locations/us/processes/sh-0548bbf4ff3c8072a6c7372ba1acafb6/runs/83dd03a51cd2ac80f465c9e267a950b1`.

### Custom source process with a `sql` attribute

For a custom data source, a process can carry a `sql` key (case-sensitive) in its attributes. The value is shown as a code highlight in the details panel of the lineage graph, exactly as provided. You are responsible for filtering out sensitive information.

```json
{
  "displayName": "custom-sql-query",
  "attributes": {
    "sql": "SELECT user_id, SUM(amount) FROM `project.dataset.purchases` GROUP BY user_id"
  }
}
```

## Options / Props

### Information model

| Concept | Description |
|---|---|
| Process | A data transformation definition. For BigQuery, a job of a supported job type; all executions of the same SQL query link to a single process. |
| Run | An execution of a process, with a `startTime`, an `endTime` and a final state such as `COMPLETED`, `FAILED` or `ABORTED`. |
| Event | A record of data movement during a run; holds a list of links (source entity to target entity, identified by Fully Qualified Name). A single event can contain multiple links. You can create, read and delete, but not update, events through the Data Lineage API. |

### Which API method to use

| Feature | `SearchLinks` | `SearchLineageStreaming` |
|---|---|---|
| Depth | 1 level (immediate neighbors) | Up to 100 levels |
| Execution | Synchronous | Real-time streaming |
| Use case | Simple lookups of direct sources or targets | Building a complete lineage graph or performing impact analysis |

- Upstream (origins): in `SearchLinks` set `target` to the asset's FQN; in `SearchLineageStreaming` set `direction` to `UPSTREAM`.
- Downstream (destinations): in `SearchLinks` set `source` to the asset's FQN; in `SearchLineageStreaming` set `direction` to `DOWNSTREAM`.

### Automatically recorded BigQuery lineage (when lineage is enabled in the project)

| Recorded for | Jobs or statements |
|---|---|
| New tables | Copy jobs; load jobs that use a Cloud Storage URI; query jobs using `CREATE TABLE`, `CREATE TEMP TABLE`, `CREATE TABLE AS SELECT`, `CREATE TABLE COPY`, `CREATE TABLE CLONE`, `CREATE TABLE FUNCTION`, `CREATE TABLE LIKE`, `CREATE VIEW`, `CREATE MATERIALIZED VIEW` |
| Existing tables | `SELECT` involving BigQuery views, materialized views or external tables; `INSERT SELECT`; `MERGE`; `UPDATE`; `DELETE` |

### Other integrated services

Cloud Data Fusion (lineage tracking can't be restricted to only Data Fusion once the API is enabled), Dataflow, Dataform (table-level lineage), Lakehouse for Iceberg REST catalog tables (table and column level), Looker (Google Cloud core) (lineage must be enabled at the Looker resource level and at the data lineage service level), Managed Service for Apache Airflow (environment-level control), Managed Service for Apache Spark (Hive, Spark and serverless), Vertex AI Feature Store, Vertex AI Pipelines.

### Limits and limitations

| Item | Value |
|---|---|
| Retention | All lineage information is retained for only 30 days; it persists up to 30 days after the data source is deleted |
| BigQuery lineage latency | Appears within 24 hours after the BigQuery job completes |
| Routines | No direct lineage for BigQuery routines; lineage is recorded between the tables the routine reads and the tables the query writes |
| CMEK | Not supported for harvested lineage metadata |
| VPC Service Controls | Supported |
| Column-level lineage | Not collected for BigQuery load jobs or routines (including multi-statement scripts and Dataform incremental tables), queries whose sources are all in temporary datasets, or upstream of external tables; skipped when a job creates more than 1,500 column-level links (table-level only); lost on `ALTER TABLE RENAME`; top-level columns only (no `STRUCT` / `JSON` nested fields); `_PARTITIONDATE` and `_PARTITIONTIME` not recognized; custom OpenLineage events don't support it |
| Console graph | Traversal limited to 20 levels and 10,000 links in each direction |
| Node details panel | Empty when the resource is in another organization or the user isn't a member of the hosting organization |

### Pricing model

| SKU | Billed for |
|---|---|
| Premium processing | Automatic parsing of lineage events, in Data Compute Unit (DCU) hours |
| Metadata storage | Lineage metadata (processes, runs, events, links) retained in the 30-day window, in GiB per month |

## Notes

- Data lineage is enabled per project, not per service. After the Data Lineage API is enabled, supported services in the project report lineage according to their product-level controls. Disabling lineage ingestion stops new processing charges; previously ingested metadata keeps incurring storage charges until the 30-day window expires or you delete it.
- Data lineage is not recorded automatically for recurring load jobs from the BigQuery Data Transfer Service. Lineage is recorded only for BigQuery tables and views.
- Each BigQuery process holds the BigQuery `job_id` of the most recent job in its attributes list.
- Calling the API with the `Origin` `sourceType` set to a value other than `CUSTOM` incurs premium processing (DCU) charges; `CUSTOM` doesn't, but stored metadata is still billed under metadata storage. Billing lines carry the label `goog-dataplex-workload-type` = `LINEAGE`. Lineage DCU consumption doesn't emit time-series metrics under `dataplex.googleapis.com/*`. For multi-region datasets such as `US`, lineage runs where the job executed (for example `us-east1`) and appears as regional Lineage DCU SKU entries. Prices are on the Knowledge Catalog pricing page.
- Disabling the Dataplex API doesn't disable the Data Lineage API or stop its charges.
- For historical reasons the client libraries and API packages use the `datacatalog` name in identifiers (for example `google-cloud-datacatalog-lineage` in Python), but data lineage is independent of the Data Catalog service.
- Custom sources: lineage graphs are created only if the `fullyQualifiedName` matches existing Knowledge Catalog entries, so create a custom entry first.
- The BigQuery tables themselves are in `gcp-bigquery`; Knowledge Catalog records their lineage.
- The source also shows Console-only steps and links to per-service integration guides, which are omitted.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/about-data-lineage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [track-lineage-quickstart.md](./track-lineage-quickstart.md)
- [use-lineage.md](./use-lineage.md)
- [lineage-views.md](./lineage-views.md)
- [open-lineage.md](./open-lineage.md)
- [control-lineage-ingestion.md](./control-lineage-ingestion.md)
- [troubleshooting-lineage.md](./troubleshooting-lineage.md)
