---
source: https://docs.cloud.google.com/knowledge-catalog/docs/track-lineage-quickstart
---

# Track data lineage for a BigQuery table (quickstart)

In this quickstart you copy two public `new_york_taxi_trips` tables into a dataset named `data_lineage_demo`, combine their ride counts into a new BigQuery table, and view the lineage graph on the Lineage tab in Knowledge Catalog. The source steps use the Google Cloud console; the SQL below is the part you run.

## Signature / Usage

Replace `PROJECT_ID` with your project ID. Create the dataset `data_lineage_demo` first (Console steps omitted).

### Copy the first table

```sql
CREATE TABLE `PROJECT_ID.data_lineage_demo.nyc_green_trips_2021`
COPY `bigquery-public-data.new_york_taxi_trips.tlc_green_trips_2021`
```

### Copy the second table

```sql
CREATE TABLE `PROJECT_ID.data_lineage_demo.nyc_green_trips_2022`
COPY `bigquery-public-data.new_york_taxi_trips.tlc_green_trips_2022`
```

### Aggregate into a new table

```sql
CREATE TABLE `PROJECT_ID.data_lineage_demo.total_green_trips_22_21`
AS SELECT vendor_id, COUNT(*) AS number_of_trips
FROM (
     SELECT vendor_id FROM `PROJECT_ID.data_lineage_demo.nyc_green_trips_2022`
     UNION ALL
     SELECT vendor_id FROM `PROJECT_ID.data_lineage_demo.nyc_green_trips_2021`
)
GROUP BY vendor_id
```

## Options / Props

### Required roles to view lineage graphs

| Role | ID | Granted on |
|---|---|---|
| Dataplex Catalog Viewer | `roles/dataplex.catalogViewer` | The Knowledge Catalog (formerly Dataplex Universal Catalog) resource project |
| Data Lineage Viewer | `roles/datalineage.viewer` | The project where you use BigQuery |
| BigQuery Data Viewer | `roles/bigquery.dataViewer` | The project where you use BigQuery |

## Notes

- Data lineage is enabled per project, not per service. After you enable the Data Lineage API, lineage is reported automatically for multiple Google Cloud services in the project, depending on their product-level lineage control.
- After running the queries, search for `total_green_trips_22_21` on the Knowledge Catalog Search page, open the table and click the Lineage tab. Automatic lineage can take several minutes to appear. In the graph each rectangular node is a table; expand or collapse with `+` / `-`, click a node for its Details pane, or click the process icon for the job that transformed a source table into a target table.
- Clean up by deleting the `data_lineage_demo` dataset. The source also offers deleting the whole project, which deletes everything in it; try this on a disposable project or dataset first.
- The queries read public tables in `bigquery-public-data`; the tables themselves are in `gcp-bigquery`.
- The source also shows Console click-paths (add public dataset `NYC TLC Trips`, create dataset, run queries) and points to the client libraries for programmatic access; they are omitted.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/track-lineage-quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-data-lineage.md](./about-data-lineage.md)
- [use-lineage.md](./use-lineage.md)
- [lineage-views.md](./lineage-views.md)
