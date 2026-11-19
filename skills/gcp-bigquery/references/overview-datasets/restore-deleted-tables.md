---
source: https://docs.cloud.google.com/bigquery/docs/restore-deleted-tables
---

# Restore deleted tables

Restore (undelete) a deleted or expired table within the dataset's time travel window by copying it with the `@<time>` time decorator into a new table. After the window, deleted data is retained for a 7-day fail-safe period; once that passes, a table can't be restored by any method, including a support ticket.

## Signature / Usage

### Time decorator syntax

- `tableid@TIME` where `TIME` is the number of milliseconds since the Unix epoch.
- `tableid@-TIME_OFFSET` where `TIME_OFFSET` is the relative offset from the current time, in milliseconds.
- `tableid@0`: Specifies the oldest available historical data.

### Restore with bq

Determine a UNIX timestamp (milliseconds) of when the table existed:

```sh
date -d '2023-08-04 16:00:34.456789Z' +%s000
```

Copy the table at that time into a new table:

```sh
bq cp mydataset.mytable@1418864998000 mydataset.newtable
```

Relative offset (the table as it was one hour ago):

```sh
bq cp mydataset.mytable@-3600000 mydataset.newtable
```

(Optional) supply the `--location` flag with your location.

### Restore with Node.js

Adapted (not in the official docs): the sample no longer deletes the table before copying; the snapshot time is set to a time before the table was deleted.

```js
// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function undeleteTable() {
  // Undeletes "my_table_to_undelete" from "my_dataset".

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = "my_dataset";
  // const tableId = "my_table_to_undelete";
  // const recoveredTableId = "my_recovered_table";

  /**
   * TODO(developer): Choose a snapshot point as epoch milliseconds, before the
   * table was deleted and within the time travel window (for example, one hour ago).
   */
  const snapshotEpoch = Date.now() - 60 * 60 * 1000;

  // Construct the restore-from table ID using a snapshot decorator.
  const snapshotTableId = `${tableId}@${snapshotEpoch}`;

  // Construct and run a copy job.
  await bigquery
    .dataset(datasetId)
    .table(snapshotTableId)
    .copy(bigquery.dataset(datasetId).table(recoveredTableId));

  console.log(
    `Copied data from deleted table ${tableId} to ${recoveredTableId}`
  );
}
```

### Restore with Python

Adapted (not in the official docs): the sample no longer deletes the table before copying; the snapshot time is set to a time before the table was deleted.

```python
import time

from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Choose a table to recover.
# table_id = "your-project.your_dataset.your_table"

# TODO(developer): Choose a new table ID for the recovered table data.
# recovered_table_id = "your-project.your_dataset.your_table_recovered"

# TODO(developer): Choose a snapshot point as epoch milliseconds, before the
# table was deleted and within the time travel window (for example, one hour ago).
snapshot_epoch = int(time.time() * 1000) - 60 * 60 * 1000

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

### Identify when a table was deleted

Logs Explorer filter for the audit entry of a table's expiration or deletion (replace `PROJECT_ID`, `DATASET_ID`, `TABLE_ID`):

```text
resource.type="bigquery_resource"
protoPayload.resourceName="projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID"
(protoPayload.methodName="google.cloud.bigquery.v2.TableService.DeleteTable" OR protoPayload.methodName="tableservice.delete" OR protoPayload.serviceData.jobCompletedEvent.job.jobConfiguration.query.statementType="DROP_TABLE" OR protoPayload.methodName="InternalTableExpired")
```

Filter for the expiration or deletion of the dataset that contained the table (replace `PROJECT_ID`, `DATASET_ID`):

```text
resource.type="bigquery_dataset"
protoPayload.resourceName="projects/PROJECT_ID/datasets/DATASET_ID"
(protoPayload.methodName="google.cloud.bigquery.v2.DatasetService.DeleteDataset" OR protoPayload.methodName="datasetservice.delete")
```

### Identify the cause of table deletion

`INFORMATION_SCHEMA.TABLE_STORAGE` contains current tables and tables deleted within the time travel window. `table_deletion_time` holds the deletion timestamp and `table_deletion_reason` the method. Replace `PROJECT_ID`, `REGION`, `DATASET_ID`, `TABLE_ID`:

```sql
SELECT
  table_name,
  deleted,
  table_deletion_time,
  table_deletion_reason
FROM
  `PROJECT_ID`.`region-REGION`.INFORMATION_SCHEMA.TABLE_STORAGE
WHERE
  table_schema = "DATASET_ID"
  AND table_name = "TABLE_ID"
```

## Options / Props

### Required roles

| Role | Granted on | Purpose |
|---|---|---|
| BigQuery User (`roles/bigquery.user`) | Project | Permissions needed to restore a deleted table (custom or other predefined roles may also provide them) |

### `table_deletion_reason` values

| Value | Meaning |
|---|---|
| `TABLE_EXPIRATION` | The table was deleted after the set expiration time |
| `DATASET_DELETION` | The dataset the table belonged to was deleted by a user |
| `USER_DELETED` | The table was deleted by a user |

### Limitations

| Limitation |
|---|
| Restore only within the time travel window (2 to 7 days), then the 7-day fail-safe period applies; afterwards no method can restore the table. |
| You can't undelete a table in the Google Cloud console. |
| You can't query a deleted table, even with a time decorator or `FOR SYSTEM_TIME AS OF`; restore it first. |
| Tags from the source table aren't copied to the destination table. |
| Table partitioning information isn't copied; recreate the scheme from the initial table creation request in Cloud Logging. |
| Only an entire table can be restored, not individual partitions (for example `bq cp mydataset.mytable$20260712@1418864998000 mydataset.mytable_restored` isn't supported). |
| A logical view can't be restored directly. |
| A deleted materialized view can't be restored; recreate it. If its base table was deleted and restored, recreate any materialized views that use it. |
| A deleted external table can't be restored; recreate it using its schema, source URI(s) and format (from Cloud Logging, or `INFORMATION_SCHEMA.TABLE_OPTIONS` if just deleted). Deleting an external table doesn't delete the underlying data. |

### Troubleshooting

| Error | Cause and fix |
|---|---|
| `Not found: Table myproject:mydataset.table was not found in location LOCATION` | Querying a deleted table with a timestamp decorator or `FOR SYSTEM_TIME AS OF`. Copy the table as above instead. |
| `BigQuery error in cp operation: VPC Service Controls: Request is prohibited by organization's policy` | Cloud Shell from the console isn't supported with VPC Service Controls (treated as outside the perimeter). Connect to Cloud Shell locally with the Google Cloud CLI. |
| `Latest categories are incompatible with schema at TIMESTAMP` | Destination schema differs from the original (extra columns are allowed if they have no column-level policy tags), or column-level policy tags differ. Make the schema identical (no original column missing, same order) and remove policy tags not in the original schema. |
| `BigQuery error in cp operation: Invalid time travel timestamp 1744343690000 for table PROJECT_ID:DATASET_ID.TABLE_ID@1744343690000. Cannot read before 1744843691075` | Restoring from before the time travel window or before the table was created. The message holds the earliest usable timestamp; use it in `bq copy`. Also caused by a negative timestamp such as `TABLE@-1744963620000`; use a time offset with the `-` sign. |

## Notes

- If you restore a table from a deleted dataset, recreate the dataset in the same region where it was originally stored; a different region makes time travel table restoration fail.
- If you delete a table and create a new one with the same name, you can restore the original with point-in-time recovery; the timestamp must be a time when the original table existed.
- Restoring later than the window allows requires a table snapshot taken beforehand.
- Languages omitted from the official page: Go and Java samples (the console has no undelete).
- Adapted from the official docs: the Node.js and Python restore samples delete the table themselves (`.delete()` / `client.delete_table`) right before restoring it, to demonstrate the flow; run against a real table that deletes it, and against an already-deleted table the delete fails before the copy. The delete step is removed and the snapshot time is set to one hour ago as an example.
- Source: https://docs.cloud.google.com/bigquery/docs/restore-deleted-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [time-travel.md](./time-travel.md)
- [access-historical-data.md](./access-historical-data.md)
- [table-snapshots-intro.md](./table-snapshots-intro.md)
- [datasets-intro.md](./datasets-intro.md)
