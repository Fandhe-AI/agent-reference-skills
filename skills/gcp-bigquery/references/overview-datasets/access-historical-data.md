---
source: https://docs.cloud.google.com/bigquery/docs/access-historical-data
---

# Access historical data

Query and restore data that was changed or deleted within the time travel window, using `FOR SYSTEM_TIME AS OF` for queries and the `@<time>` decorator for restoring a table.

## Signature / Usage

### Query data at a point in time

`FOR SYSTEM_TIME AS OF` takes a constant timestamp expression and references the version of the table current at that timestamp. The table must be stored in BigQuery (not external). There is no limit on table size.

```sql
SELECT *
FROM `mydataset.mytable`
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);
```

### Restore a table from a point in time

Time decorator syntax:

- `tableid@TIME` where `TIME` is the number of milliseconds since the Unix epoch.
- `tableid@-TIME_OFFSET` where `TIME_OFFSET` is the relative offset from the current time, in milliseconds.
- `tableid@0`: Specifies the oldest available historical data.

Generate a Unix timestamp in milliseconds:

```sh
date -d '2023-08-04 16:00:34.456789Z' +%s000
```

```sh
bq cp mydataset.mytable@1418864998000 mydataset.newtable
```

Relative offset (one hour ago):

```sh
bq cp mydataset.mytable@-3600000 mydataset.newtable
```

(Optional) supply the `--location` flag.

### Restore with Python

```python
import time

from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Choose a table to recover.
# table_id = "your-project.your_dataset.your_table"

# TODO(developer): Choose a new table ID for the recovered table data.
# recovered_table_id = "your-project.your_dataset.your_table_recovered"

# TODO(developer): Choose an appropriate snapshot point as epoch
# milliseconds. For this example, we choose the current time as we're about
# to delete the table immediately afterwards.
snapshot_epoch = int(time.time() * 1000)

# ...

# "Accidentally" delete the table.
client.delete_table(table_id)  # Make an API request.

# Construct the restore-from table ID using a snapshot decorator.
snapshot_table_id = "{}@{}".format(table_id, snapshot_epoch)

# Construct and run a copy job.
job = client.copy_table(
    snapshot_table_id,
    recovered_table_id,
    # Must match the source and destination tables location.
    location="US",
)  # Make an API request.

job.result()  # Wait for the job to complete.

print(
    "Copied data from deleted table {} to {}".format(table_id, recovered_table_id)
)
```

## Options / Props

### Errors

| Error | Cause |
|---|---|
| `Invalid snapshot time 1601168925462 for table myproject:mydataset.table1@1601168925462. Cannot read before 1601573410026.` | `FOR SYSTEM_TIME AS OF` timestamp is before the time travel window or before the table was created |
| `Not found: Table myproject:mydataset.table was not found in location LOCATION` | `FOR SYSTEM_TIME AS OF` on a deleted table; restore the table from a point in time instead |
| `Invalid time travel timestamp` (`bq cp`) | Recovering from before the time travel window or before the table was created |

### Permissions

This page lists no IAM permissions of its own. The related restore page names BigQuery User (`roles/bigquery.user`) on the project as the role that provides the permissions to restore a deleted table.

### Limitations

| Limitation |
|---|
| `FOR SYSTEM_TIME AS OF` is GoogleSQL only; in legacy SQL, time decorators provide equivalent functionality. |
| External tables can't be queried with `FOR SYSTEM_TIME AS OF`. |
| A deleted table's history can't be queried directly with `FOR SYSTEM_TIME AS OF`; restore it first. |
| Tags and partitioning information aren't copied to the restored table; recreate partitioning from the initial table creation request in Cloud Logging. |
| Only an entire table can be restored, not individual partitions (`bq cp mydataset.mytable$20260712@1418864998000 mydataset.mytable_restored` isn't supported). |
| A logical view can't be restored directly. The console can't undelete a table. |

## Notes

- After `CREATE OR REPLACE TABLE`, `FOR SYSTEM_TIME AS OF` can query the previous version of the table.
- If you delete a table and create a new one with the same name, you can restore the original with point-in-time recovery; the timestamp must be a time when the original table existed.
- To restore later than the time travel window allows, create a table snapshot beforehand.
- Languages omitted from the official page: Go, Java and Node.js samples (Node.js is on the restore-deleted-tables page).
- Source: https://docs.cloud.google.com/bigquery/docs/access-historical-data (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [time-travel.md](./time-travel.md)
- [restore-deleted-tables.md](./restore-deleted-tables.md)
- [table-snapshots-intro.md](./table-snapshots-intro.md)
