---
source: https://docs.cloud.google.com/bigquery/docs/table-clones-intro
---

# Introduction to table clones

A table clone is a lightweight, writable copy of a base table. You are charged only for data in the clone that differs from the base table, so there is initially no storage cost. After creation the clone is independent of the base table; changes to either are not reflected in the other.

## Signature / Usage

### Create a clone

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (`CREATE TABLE ... CLONE`; no error if the destination exists).

```sql
CREATE TABLE IF NOT EXISTS `myproject.mydataset.mytableclone`
CLONE `myproject.mydataset.mytable`
OPTIONS(
  expiration_timestamp=TIMESTAMP_ADD(CURRENT_TIMESTAMP(), INTERVAL 365 DAY),
  friendly_name="my_table",
  description="A table that expires in 1 year",
  labels=[("org_unit", "development")]
)
```

## Options / Props

### Limitations

| Limitation |
|---|
| The destination dataset must be in the same region and under the same organization as the base table (for example no EU-to-US clone). Cloning across datasets and projects is allowed. |
| You can't clone data from further back than the time travel window of the table's dataset. |
| You can't clone a view, a materialized view, or an external table. |
| Data in write-optimized storage (streaming buffer) and data in time travel is not included. |
| Clones look like standard tables in the Explorer pane; table details show a Base Table Info section. |
| A clone operation can't append to an existing table: `--append_table=true` and `--clone=true` can't be combined in one `bq cp` command. Use a copy operation to append. |
| The clone name follows the table naming rules. |
| Clone creation is subject to copy job limits; creation time can vary significantly between runs. |

### Storage cost rules

| Situation | Charge |
|---|---|
| Clone just created | No initial storage cost |
| Data added or changed in the clone | Charged for the added or updated data |
| Data deleted in the clone | No charge for the deleted data |
| Storage type | Same as the source data (active or long-term) |
| Base table data changed or deleted that exists in the clone | Clone is charged for it; with several clones, only the oldest is charged |
| Data added to the base table after cloning | Charged to the base table, not the clone |

### Clone metadata

| Metadata | Description |
|---|---|
| Base table | Project, dataset, and name of the base table |
| Clone time | Time of the clone operation (the time travel timestamp when time travel was used) |

## Notes

- Use cases: copies of production tables for development and testing, and per-user sandboxes where only changed data is billed. For read-only lightweight copies use table snapshots.
- Clones support the same operations as standard tables (querying, access control, metadata, partitioning and clustering, schemas, deleting) but are created differently. Metadata is visible in `INFORMATION_SCHEMA.TABLES`.
- Small base-table changes can greatly increase clone storage cost because storage is column-based; modifying a clustered base table can trigger re-clustering so the oldest clone may be charged the full storage amount of the modified partition. Partitions reduce cost.
- Table clones are subject to the standard table quotas and limits plus table clone limits on the BigQuery quotas page.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/bigquery/docs/table-clones-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [table-snapshots-intro.md](./table-snapshots-intro.md)
- [time-travel.md](./time-travel.md)
- [storage-overview.md](./storage-overview.md)
