---
source: https://docs.cloud.google.com/bigquery/docs/information-schema-intro
---

# Introduction to INFORMATION_SCHEMA

`INFORMATION_SCHEMA` views are read-only, system-defined views that return metadata about BigQuery objects such as datasets, jobs, and access control. You query them with GoogleSQL by specifying a scope (dataset, region, or project) and a view.

## Signature / Usage

### Dataset qualifier

```sql
-- Returns metadata for tables in a single dataset.
SELECT * FROM myDataset.INFORMATION_SCHEMA.TABLES;
```

### Region qualifier

```sql
-- Returns metadata for all datasets in the US multi-region.
SELECT * FROM region-us.INFORMATION_SCHEMA.SCHEMATA;
```

### Project qualifier

```sql
-- Returns metadata for the specified project and region.
SELECT * FROM myProject.`region-us`.INFORMATION_SCHEMA.TABLES;

-- Returns metadata for the specified project and dataset.
SELECT * FROM myProject.myDataset.INFORMATION_SCHEMA.TABLES;
```

### Error when the location does not match

```text
Table myproject: region-us.INFORMATION_SCHEMA.[VIEW] not found in location US
```

## Options / Props

### Available views

| Resource type | Views |
|---|---|
| Access control | `OBJECT_PRIVILEGES`, `ROW_ACCESS_POLICIES` |
| BI Engine | `BI_CAPACITIES`, `BI_CAPACITY_CHANGES` |
| Configurations | `EFFECTIVE_PROJECT_OPTIONS`, `ORGANIZATION_OPTIONS`, `ORGANIZATION_OPTIONS_CHANGES`, `PROJECT_OPTIONS`, `PROJECT_OPTIONS_CHANGES` |
| Datasets | `SCHEMATA`, `SCHEMATA_LINKS`, `SCHEMATA_OPTIONS`, `SHARED_DATASET_USAGE`, `SCHEMATA_REPLICAS`, `SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION` |
| Graphs | `PROPERTY_GRAPHS` |
| Jobs | `JOBS_BY_PROJECT`†, `JOBS_BY_USER`, `JOBS_BY_FOLDER`, `JOBS_BY_ORGANIZATION` |
| Jobs by timeslice | `JOBS_TIMELINE_BY_PROJECT`†, `JOBS_TIMELINE_BY_USER`, `JOBS_TIMELINE_BY_FOLDER`, `JOBS_TIMELINE_BY_ORGANIZATION` |
| Recommendations and insights | `INSIGHTS`, `RECOMMENDATIONS`, `RECOMMENDATIONS_BY_ORGANIZATION` |
| Reservations | `ASSIGNMENTS_BY_PROJECT`†, `ASSIGNMENT_CHANGES_BY_PROJECT`†, `CAPACITY_COMMITMENTS_BY_PROJECT`†, `CAPACITY_COMMITMENT_CHANGES_BY_PROJECT`†, `FAILOVER_HISTORY_BY_PROJECT`†, `RESERVATIONS_BY_PROJECT`†, `RESERVATION_CHANGES_BY_PROJECT`†, `RESERVATIONS_TIMELINE_BY_PROJECT`† |
| Routines | `PARAMETERS`, `ROUTINES`, `ROUTINE_OPTIONS` |
| Search indexes | `SEARCH_INDEXES`, `SEARCH_INDEX_COLUMNS`, `SEARCH_INDEX_COLUMN_OPTIONS`, `SEARCH_INDEX_OPTIONS`, `SEARCH_INDEXES_BY_ORGANIZATION` |
| Sessions | `SESSIONS_BY_PROJECT`†, `SESSIONS_BY_USER` |
| Streaming | `STREAMING_TIMELINE_BY_PROJECT`†, `STREAMING_TIMELINE_BY_FOLDER`, `STREAMING_TIMELINE_BY_ORGANIZATION` |
| Tables | `COLUMNS`, `COLUMN_FIELD_PATHS`, `CONSTRAINT_COLUMN_USAGE`, `KEY_COLUMN_USAGE`, `PARTITIONS`, `TABLES`, `TABLE_OPTIONS`, `TABLE_CONSTRAINTS`, `TABLE_SNAPSHOTS`, `TABLE_STORAGE_BY_PROJECT`†, `TABLE_STORAGE_BY_FOLDER`, `TABLE_STORAGE_BY_ORGANIZATION`, `TABLE_STORAGE_USAGE_TIMELINE`, `TABLE_STORAGE_USAGE_TIMELINE_BY_FOLDER`, `TABLE_STORAGE_USAGE_TIMELINE_BY_ORGANIZATION` |
| Vector indexes | `VECTOR_INDEXES`, `VECTOR_INDEX_COLUMNS`, `VECTOR_INDEX_OPTIONS` |
| Views | `VIEWS`, `MATERIALIZED_VIEWS` |
| Write API | `WRITE_API_TIMELINE_BY_PROJECT`†, `WRITE_API_TIMELINE_BY_FOLDER`, `WRITE_API_TIMELINE_BY_ORGANIZATION` |

† For `*BY_PROJECT` views the `BY_PROJECT` suffix is optional (`INFORMATION_SCHEMA.JOBS_BY_PROJECT` and `INFORMATION_SCHEMA.JOBS` return the same results).

### Views that support dataset qualifiers

| View |
|---|
| `COLUMNS`, `COLUMN_FIELD_PATHS`, `MATERIALIZED_VIEWS`, `PARAMETERS`, `PARTITIONS`, `ROUTINES`, `ROUTINE_OPTIONS`, `ROW_ACCESS_POLICIES`, `TABLES`, `TABLE_OPTIONS`, `VIEWS` |

### Views that don't support region qualifiers

| View |
|---|
| `INFORMATION_SCHEMA.PARTITIONS`, `INFORMATION_SCHEMA.SEARCH_INDEXES`, `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS`, `INFORMATION_SCHEMA.SEARCH_INDEX_OPTIONS` |

### Pricing conditions

| Pricing model | Behavior |
|---|---|
| On-demand | Minimum 10 MB of data processing charge per query, even if fewer bytes are processed |
| Capacity-based | Queries consume purchased slots |
| Both | Results are not cached, so each run is charged; no storage fees for the views |

### Limitations

| Limitation |
|---|
| GoogleSQL only; legacy SQL is not supported. |
| Results are not cached. |
| Views cannot be used in DDL statements. |
| No information about hidden datasets. |
| Region-qualified queries may include metadata from deleted datasets that are within the time travel window. |
| Permissions are checked at the parent level, not per row, so a deny policy that conditionally targets a row using tags is ignored. |

## Notes

- You must specify a location. A query fails if the location of query execution doesn't match the dataset or regional qualifier.
- Region qualifiers use `region-REGION` with any dataset location name (for example `region-us`, `region-asia-east2`, `region-europe-north1`). They aren't hierarchical: the `US` multi-region doesn't include `us-*` regions and `EU` doesn't include `europe-*`.
- With no region or dataset qualifier you receive an error. A region-qualified query runs in that region, so you can't join views across regions in one query; combine results locally or copy tables to a common region.
- Project qualifiers are supported by all views; default is the project running the query. A project qualifier on organization-level views has no effect.
- Not all views are supported for BigQuery Omni system tables; Amazon S3 and Azure Storage resource metadata can be viewed with `INFORMATION_SCHEMA`.
- Source: https://docs.cloud.google.com/bigquery/docs/information-schema-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The per-view column references are in the machine-generated INFORMATION_SCHEMA references of this skill.

## Related

- [datasets.md](./datasets.md)
- [storage-overview.md](./storage-overview.md)
- [time-travel.md](./time-travel.md)
