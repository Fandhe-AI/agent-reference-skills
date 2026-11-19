---
source: https://docs.cloud.google.com/bigquery/docs/time-travel
---

# Data retention with time travel and fail-safe

Time travel lets you query changed or deleted data, restore deleted tables and datasets, and revert updates within a window of 2 to 7 days (default 7). After the window, deleted data enters an unconfigurable 7-day fail-safe period for emergency recovery through Cloud Customer Care.

## Signature / Usage

### Set the dataset-level time travel window

Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (the `max_time_travel_hours` option sets the window).

Adapted (not in the official docs): `storage_billing_model = 'BILLING_MODEL'` is quoted, because the option is a `STRING` and an unquoted `PHYSICAL` / `LOGICAL` is parsed as an identifier.

```sql
CREATE SCHEMA PROJECT_ID.DATASET_ID
  OPTIONS (
    default_kms_key_name = 'KMS_KEY_NAME',
    default_partition_expiration_days = PARTITION_EXPIRATION,
    default_table_expiration_days = TABLE_EXPIRATION,
    description = 'DESCRIPTION',
    labels = [('KEY_1','VALUE_1'),('KEY_2','VALUE_2')],
    location = 'LOCATION',
    max_time_travel_hours = HOURS,
    storage_billing_model = 'BILLING_MODEL');
```

### Error outside the window

```text
Table ID was created at time which is
before its allowed time travel interval timestamp. Creation
time: timestamp
```

## Options / Props

### Retention stages

| Stage | Duration | Configurable |
|---|---|---|
| Time travel | 2 to 7 days, default 7 (not less than 2 days) | Yes, at dataset or project level |
| Fail-safe | 7 days after the time travel window | No, can't be extended |

### Billing by storage model

| Billing model | What you pay for |
|---|---|
| Physical (compressed) | Active bytes, long-term storage, time travel storage, fail-safe storage (time travel and fail-safe at the active physical storage rate) |
| Logical (uncompressed, default) | Active storage and long-term storage; no separate charge for time travel or fail-safe |

### Limitations

| Limitation |
|---|
| History is available only within the time travel window; use table snapshots for longer non-emergency retention. |
| If a table has or had row-level access policies, only table administrators can use time travel. |
| Time travel does not restore table metadata. |
| Not supported: external tables (for Apache Iceberg external tables use `FOR SYSTEM_TIME AS OF` on snapshots retained in Iceberg metadata), temporary cached query result tables, temporary session tables, temporary multi-statement tables, tables in external datasets. |

## Notes

- The project-level window is set with DDL statements (see Manage configuration settings in the BigQuery docs). Updating an existing dataset's window is covered in Update time travel windows.
- A deleted table or dataset uses the window in effect at deletion time. Changing the window later does not change the recoverability of already-deleted tables. You can't change the window of a deleted dataset until it is undeleted.
- If you shortened the window, deleted a table, and need longer recoverability, create a snapshot of the table from a point in time before deletion while it is still recoverable.
- Row-level access: viewing historical data of a table that has or had row-level access policies requires `bigquery.rowAccessPolicies.overrideTimeTravelRestrictions`, included in BigQuery Admin (`roles/bigquery.admin`) on the table. The legacy Owner role (`roles/owner`) does not include all permissions of `roles/bigquery.admin`.
- Fail-safe covers table deletion or replacement (including `WRITE_TRUNCATE` loads and `CREATE OR REPLACE TABLE`) and partition deletion or expiration. You can't restore an individual partition; restore the whole table from a timestamp before the partition was deleted. The partition expiration setting is copied to the restored table; update it to query older restored partitions.
- Fail-safe data can't be queried or copied until Cloud Customer Care grants temporary fail-safe recovery access on the dataset. Then run a table copy job (for example `bq cp`) with a `@TIME` decorator. Large or heavily partitioned tables can take much longer or time out; progress is saved incrementally, so retry with the exact same source table and `@TIME` decorator. Contact Customer Care early in the 7-day period. After the fail-safe period passes, Customer Care can't recover deleted data.
- Time travel and fail-safe bytes appear in `TIME_TRAVEL_PHYSICAL_BYTES` and `FAIL_SAFE_PHYSICAL_BYTES` of the `TABLE_STORAGE` and `TABLE_STORAGE_BY_ORGANIZATION` views. Billing applies only when storage fees don't apply elsewhere: no cost at table creation, charges apply to changed or deleted data, and temporary tables aren't billed for fail-safe.
- Example from the source: 200 GiB active, 50 GiB deleted with a 7-day window; time travel storage holds the 50 GiB on days 1 to 7, fail-safe holds it on days 8 to 14, and it is gone on day 15.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the `CREATE SCHEMA` example writes `storage_billing_model = BILLING_MODEL` unquoted; the option is a `STRING` (GoogleSQL DDL reference), so the value is written `'PHYSICAL'` or `'LOGICAL'` in SQL, while the `bq --storage_billing_model` flag takes it without quotes.
- Source: https://docs.cloud.google.com/bigquery/docs/time-travel (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [datasets-intro.md](./datasets-intro.md)
- [table-snapshots-intro.md](./table-snapshots-intro.md)
- [restore-deleted-tables.md](./restore-deleted-tables.md)
- [access-historical-data.md](./access-historical-data.md)
- [storage-overview.md](./storage-overview.md)
- [default-configuration.md](./default-configuration.md)
