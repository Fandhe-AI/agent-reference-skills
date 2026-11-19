---
source: https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro
---

# Introduction to table snapshots

A table snapshot preserves the contents of a base table at a point in time: the current table, or the table as it was at any time in the past seven days (within the dataset's time travel window, which can be set to 2 to 7 days). Snapshots are read-only and queryable like standard tables, can have an expiration, and can be restored into a standard table.

## Signature / Usage

### Create a table snapshot

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (`CREATE SNAPSHOT TABLE`).

```sql
CREATE SNAPSHOT TABLE `myproject.mydataset.mytablesnapshot`
CLONE `myproject.mydataset.mytable`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR),
  friendly_name="my_table_snapshot",
  description="A table snapshot that expires in 2 days",
  labels=[("org_unit", "development")]
)
```

## Options / Props

### Limitations

| Limitation |
|---|
| A snapshot must be in the same region and under the same organization as its base table. Selecting a dataset in a different region makes BigQuery create a copy of the table in that region. |
| Snapshots are read-only; only metadata (description, expiration date, access policy) can be updated. To change data, create a standard table from the snapshot. |
| You can only snapshot a table as it was seven days ago or more recently (time travel limit; with a shorter time travel window configured on the dataset, only within that window). |
| You can't snapshot a view, a materialized view, or an external table. |
| You can't overwrite an existing table or table snapshot when you create a snapshot. |
| Data in write-optimized storage (streaming buffer) is not included. |
| Data in time travel is not included. |
| Partition expiration of a partitioned base table isn't retained; the snapshot uses the destination dataset's default partition expiration. To keep it, copy the table instead. |

### Storage cost rules

| Situation | Charge |
|---|---|
| Snapshot just created | No initial storage cost |
| New data added to base table afterwards | Not charged to the snapshot |
| Storage type | Same as the source data (active or long-term) |
| Base table data changed or deleted that exists in the snapshot | Snapshot is charged for that changed or deleted data; with several snapshots, only the oldest is charged |
| Base table on physical billing | Time travel and fail-safe are not charged to the base table; when the snapshot is deleted, you are charged for time travel and fail-safe |
| Copying a snapshot or clone (same region or across regions or multi-regions) | A full copy of the table is created and incurs additional storage cost |

## Notes

- Benefits: keep a record longer than the time travel window (up to seven days), and lower storage cost because only bytes that differ from the base table are stored. For mutable lightweight copies use table clones.
- Access control for snapshots is similar to tables (IAM). Queries run the same way as for other tables.
- BigQuery storage is column-based: small changes to the base table can greatly increase snapshot storage cost. Modifying a clustered base table can trigger automatic re-clustering that rewrites storage blocks, so the oldest snapshot may be charged up to the full storage amount of the modified partition. Partitions help reduce cost because only modified data within a partition is generally copied.
- Quotas: see Table snapshots quotas and limits in the BigQuery quotas page.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source states the snapshot limit as seven days, the default and maximum time travel window; the window can be set to 2 to 7 days per dataset (see `time-travel.md`), so a snapshot of a past state is only possible within the configured window.
- Source: https://docs.cloud.google.com/bigquery/docs/table-snapshots-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [table-clones-intro.md](./table-clones-intro.md)
- [time-travel.md](./time-travel.md)
- [restore-deleted-tables.md](./restore-deleted-tables.md)
- [access-historical-data.md](./access-historical-data.md)
- [storage-overview.md](./storage-overview.md)
