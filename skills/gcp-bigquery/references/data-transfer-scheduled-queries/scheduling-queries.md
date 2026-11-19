---
source: https://docs.cloud.google.com/bigquery/docs/scheduling-queries
---

# Scheduling queries

BigQuery scheduled queries automate recurring GoogleSQL workloads, including DDL and DML statements. Query string and destination table can be parameterized by run date and time. When you create or update a schedule, BigQuery converts the scheduled time from your local time to UTC, which isn't affected by daylight saving time. Scheduled queries use BigQuery Data Transfer Service features (data source `scheduled_query`) but are not transfers.

## Signature / Usage

### Query string with `@run_time`

```sql
SELECT @run_time AS time,
  title,
  author,
  text
FROM `bigquery-public-data.hacker_news.stories`
LIMIT
  1000
```

### Create with `bq query`

```bash
bq query \
--display_name=name \
--destination_table=table \
--schedule=interval
```

Example (`--replace=true` erases existing data in the destination table after every run):

```bash
    bq query \
    --use_legacy_sql=false \
    --destination_table=mydataset.mytable \
    --display_name='My Scheduled Query' \
    --schedule='every 24 hours' \
    --replace=true \
    'SELECT
      1
    FROM
      mydataset.test'
```

### Create with `bq mk`

```bash
bq mk \
--transfer_config \
--target_dataset=dataset \
--display_name=name \
--params='parameters' \
--data_source=data_source
```

Example (authenticates as a service account; destination table is truncated on every run):

```bash
bq mk \
--transfer_config \
--target_dataset=mydataset \
--display_name='My Scheduled Query' \
--params='{"query":"SELECT 1 from mydataset.test","destination_table_name_template":"mytable","write_disposition":"WRITE_TRUNCATE"}' \
--data_source=scheduled_query \
--service_account_name=abcdef-test-sa@abcdef-test.iam.gserviceaccount.com
```

### Create with the Python client library

```python
from google.cloud import bigquery_datatransfer

transfer_client = bigquery_datatransfer.DataTransferServiceClient()

# The project where the query job runs is the same as the project
# containing the destination dataset.
project_id = "your-project-id"
dataset_id = "your_dataset_id"

# This service account will be used to execute the scheduled queries. Omit
# this request parameter to run the query as the user with the credentials
# associated with this client.
service_account_name = "abcdef-test-sa@abcdef-test.iam.gserviceaccount.com"

# Use standard SQL syntax for the query.
query_string = """
SELECT
  CURRENT_TIMESTAMP() as current_time,
  @run_time as intended_run_time,
  @run_date as intended_run_date,
  17 as some_integer
"""

parent = transfer_client.common_project_path(project_id)

transfer_config = bigquery_datatransfer.TransferConfig(
    destination_dataset_id=dataset_id,
    display_name="Your Scheduled Query Name",
    data_source_id="scheduled_query",
    params={
        "query": query_string,
        "destination_table_name_template": "your_table_{run_date}",
        "write_disposition": "WRITE_TRUNCATE",
        "partitioning_field": "",
    },
    schedule="every 24 hours",
)

transfer_config = transfer_client.create_transfer_config(
    bigquery_datatransfer.CreateTransferConfigRequest(
        parent=parent,
        transfer_config=transfer_config,
        service_account_name=service_account_name,
    )
)

print("Created scheduled query '{}'".format(transfer_config.name))
```

### List and show

```bash
bq ls \
--transfer_config \
--transfer_location=us
```

```bash
bq show \
--transfer_config \
projects/862514376110/locations/us/transferConfigs/5dd12f26-0000-262f-bc38-089e0820fe38
```

### Update

Adapted (not in the official docs): the missing `\` after the `--params` line added.

```bash
bq update \
--target_dataset=dataset \
--display_name=name \
--params='parameters' \
--transfer_config \
RESOURCE_NAME
```

Adapted (not in the official docs): the missing `\` after the `--params` line added.

```bash
bq update \
--target_dataset=mydataset \
--display_name='My Scheduled Query' \
--params='{"query":"SELECT 1 from mydataset.test","destination_table_name_template":"mytable","write_disposition":"WRITE_TRUNCATE"}' \
--transfer_config \
projects/myproject/locations/us/transferConfigs/1234a123-1234-1a23-1be9-12ab3c456de7
```

### Update credentials

```bash
bq update \
--update_credentials \
--service_account_name=abcdef-test-sa@abcdef-test.iam.gserviceaccount.com \
--transfer_config \
projects/myproject/locations/us/transferConfigs/1234a123-1234-1a23-1be9-12ab3c456de7
```

### Backfill a historical date range

```bash
bq mk \
--transfer_run \
--start_time='start_time' \
--end_time='end_time' \
resource_name
```

```bash
  bq mk \
  --transfer_run \
  --start_time 2017-05-25T00:00:00Z \
  --end_time 2017-05-25T00:00:00Z \
  projects/myproject/locations/us/transferConfigs/1234a123-1234-1a23-1be9-12ab3c456de7
```

## Options / Props

### Query parameters (query string)

| Parameter | GoogleSQL type | Value |
|---|---|---|
| `@run_time` | `TIMESTAMP` | In UTC. For regular schedules it is the intended execution time (every 24 hours means exactly 24 hours between consecutive `run_time` values, even if actual execution varies) |
| `@run_date` | `DATE` | A logical calendar date |

### Template parameters (destination table name)

| Parameter | Value |
|---|---|
| `run_time` | Formatted timestamp, in UTC per the schedule |
| `run_date` | Date string `%Y-%m-%d` (for example `2018-01-01`), compatible with ingestion-time partitioned tables. Templating output is `YYYYMMDD` |

Syntax: `{run_date}` and `{run_time[+\-offset]|"time_format"}`. `offset`: hours (h), minutes (m), seconds (s) in that order; days (d) not supported; decimals allowed (`1.5h`). For partitioned tables `YYYYMMDD` (`%Y%m%d`) is the required suffix.

| run_time (UTC) | Templated parameter | Output destination table name |
|---|---|---|
| 2018-02-15 00:01:00 | `mytable` | `mytable` |
| 2018-02-15 00:01:00 | `mytable_{run_time\|"%Y%m%d"}` | `mytable_20180215` |
| 2018-02-15 00:01:00 | `mytable_{run_time+25h\|"%Y%m%d"}` | `mytable_20180216` |
| 2018-02-15 00:01:00 | `mytable_{run_time-1h\|"%Y%m%d"}` | `mytable_20180214` |
| 2018-02-15 00:01:00 | `mytable_{run_time+1.5h\|"%Y%m%d%H"}` or `mytable_{run_time+90m\|"%Y%m%d%H"}` | `mytable_2018021501` |
| 2018-02-15 00:01:00 | `{run_time+97s\|"%Y%m%d"}_mytable_{run_time+97s\|"%H%M%S"}` | `20180215_mytable_000237` |

### Write preference

| Value | Behavior |
|---|---|
| `WRITE_TRUNCATE` | If the table exists, overwrites the table data |
| `WRITE_APPEND` | If the table exists, appends the data (field additions, reordering and missing optional fields are accommodated) |

### `bq` flags

| Command | Flag | Meaning |
|---|---|---|
| `bq query` | `--destination_table` or `--target_dataset` | Destination table; `--target_dataset` is for DDL / DML only; use one, not both |
| `bq query` | `--schedule`, `--display_name` | Required; for example `'every 24 hours'`, `'every 3 hours'`, `'every monday 09:00'`, `'1st sunday of sep,oct,nov 00:00'` |
| `bq query` | `--replace` / `--append_table` | Overwrite (erases data and, for non-partitioned tables, the schema) or append; if neither is set, no write preference is set |
| `bq mk` | `--transfer_config`, `--data_source=scheduled_query`, `--display_name`, `--params`; `--target_dataset` (optional for DDL / DML) | Required |
| `bq mk` | `--schedule` | Default is `every 24 hours` based on creation time |
| `bq mk` / `bq update` | `--service_account_name`, `--destination_kms_key`, `--project_id`, `--location` (DDL / DML; nearest location if unset) | Optional |
| `bq mk --transfer_run` | `--start_time`, `--end_time` | Timestamps ending in Z or with a valid offset |
| `bq ls --transfer_config` | `--transfer_location` | Required |
| `bq update --transfer_config` | `--update_credentials` | Required for credential updates; `--service_account_name` only takes effect with it |

### `--params` keys for `scheduled_query`

| Key | Notes |
|---|---|
| `query` | Required |
| `destination_table_name_template` | Optional for DDL / DML, required otherwise |
| `write_disposition` | `WRITE_TRUNCATE` or `WRITE_APPEND`; optional for DDL / DML, required otherwise |
| `partitioning_field` | Time-unit column partitioning field |

### Permissions

| Task | Permissions |
|---|---|
| Create the transfer | `bigquery.transfers.update` and `bigquery.datasets.get`; or `bigquery.jobs.create`, `bigquery.transfers.get` and `bigquery.datasets.get` (see the console / `bq` note below the table) |
| Run | `bigquery.datasets.get` on the target dataset; `bigquery.jobs.create` on the project |
| Modify or delete | `bigquery.transfers.update` on the project; or ownership (user credentials) plus `bigquery.jobs.create` |
| Create or update a scheduled query run by a service account (any tool) | Access to that service account: the Service Account User role (`roles/iam.serviceAccountUser`) granted to the user on that service account |
| Select a service account in the console UI | `iam.serviceAccounts.list` (to list your service accounts), `iam.serviceAccountUser` (to assign a service account to a scheduled query) |

Note: If you are using the Google Cloud console or the bq command-line tool to schedule a query, you must have the `bigquery.transfers.get` permission. So with `bq`, the first set (`bigquery.transfers.update` and `bigquery.datasets.get`) also needs `bigquery.transfers.get`.

To create or update scheduled queries run by a service account, you must have access to that service account (see Service Account user role in the IAM docs). With the `bq` tool, use the `--service_account_name` flag instead of authenticating as a service account.

The Service Account User role (`roles/iam.serviceAccountUser`) lets a principal attach a service account to a resource; it is granted to a user on that service account (that is, on the service account resource, also when the service account is in another project).

### Backfill date range examples (console)

The date ranges you provide are in UTC, but the query's schedule is displayed in your local time zone. The chosen runtimes are all within the selected range, including the first date and excluding the last date.

Example 1: the scheduled query is set to run `every day 09:00` Pacific Time, and data from January 1, January 2, and January 3 is missing. Choose `Start Time = 1/1/19` and `End Time = 1/4/19`. The query runs using `run_date` and `run_time` parameters that correspond to:

- 1/1/19 09:00 Pacific Time
- 1/2/19 09:00 Pacific Time
- 1/3/19 09:00 Pacific Time

Example 2: the scheduled query is set to run `every day 23:00` Pacific Time (later dates are chosen because UTC has a different date at 23:00 Pacific Time). Choose `Start Time = 1/2/19` and `End Time = 1/5/19`. The query runs using `run_date` and `run_time` parameters that correspond to:

- 1/2/19 06:00 UTC, or 1/1/2019 23:00 Pacific Time
- 1/3/19 06:00 UTC, or 1/2/2019 23:00 Pacific Time
- 1/4/19 06:00 UTC, or 1/3/2019 23:00 Pacific Time

### Supported locations

| Group | Locations |
|---|---|
| Americas | `us-east5`, `us-south1`, `us-central1`, `us-west2`, `us-west4`, `northamerica-south1`, `northamerica-northeast1`, `us-east4`, `us-central2`, `us-west1`, `us-west3`, `southamerica-east1`, `southamerica-west1`, `us-east1`, `northamerica-northeast2` |
| Asia Pacific | `asia-southeast3`, `asia-south2`, `asia-east2`, `asia-southeast2`, `australia-southeast2`, `asia-south1`, `asia-northeast2`, `asia-northeast3`, `asia-southeast1`, `australia-southeast1`, `asia-east1`, `asia-northeast1` |
| Europe | `europe-west1`, `europe-west10`, `europe-north1`, `europe-west3`, `europe-west2`, `europe-southwest1`, `europe-west8`, `europe-west4`, `europe-west9`, `europe-north2`, `europe-west12`, `europe-central2`, `europe-west6` |
| Middle East | `me-central2`, `me-central1`, `me-west1` |
| Africa | `africa-south1` |
| Multi-regions | `EU` (stored only in `europe-west1` or `europe-west4`), `US` (stored only in `us-central1`, `us-west1` or `us-central2`) |

## Notes

- Limitation: queries scheduled exactly on the hour (for example 09:00) might trigger multiple times, causing duplicates such as repeated `INSERT` results. Use an off-the-hour schedule (for example 08:58 or 09:03).
- Minimum duration between scheduled runs is 5 minutes. If the start time is later than the schedule time, the first run happens in the next cycle iteration.
- Destination: if it doesn't exist, BigQuery tries to create it. The destination dataset and table must be in the same project as the scheduled query. DDL / DML queries can't use a write preference (leave the **Destination table partitioning field** blank for them; processing location is required for DDL / DML that create the table). Cross-region queries are not supported: the destination table and the selected location must be in the same region as the queried data. Creation, truncation and append happen as one atomic update on job completion. If the schema changes too much between runs, the query fails.
- Clustering only on new tables created with DDL `CREATE TABLE AS SELECT`. Partitioning: integer range (leave the partitioning field blank), time-unit column (name the column), ingestion time (leave blank and use a name such as `mytable${run_date}`).
- Tables whose names end in a date (`YYYYMMDD`) are grouped as wildcard tables; the console may show them as `mytable_(1)`. A scheduled query fails if `destination_table_name_template` is an ingestion-time partitioned table and `partitioning_field` is also set.
- Service account: required when signed in with a federated identity, optional with a Google Account. With `bq`, use `--service_account_name`. If run as a service account, the service account owns the query but cannot manage its configuration; managing or deleting needs `bigquery.transfers.update` on the project (`iam.serviceAccountUser` only lets a user run jobs as the service account).
- CMEK: the key is applied to intermediate on-disk caches. You cannot add a CMEK to a transfer created without one, nor change CMEK to another encryption type; you can update the CMEK of a transfer created with a CMEK (propagated at the next run). Project default keys apply to new transfer configs. Grant the service account encrypt / decrypt permission beforehand.
- Updating: you can't update the location; create a new scheduled query if you move datasets. Owner-restricted parameters are the query text, destination dataset and destination table name template; otherwise the error `Cannot modify restricted parameters without taking ownership of the transfer configuration.` appears.
- Caution: updating credentials runs the query with your identity and permissions; verify the query was not modified by others to access resources only you can view. Console credential refresh takes 10 to 20 minutes; changing to a service account is not supported in the console. You can't configure notifications with the command-line tool.
- Backfill: date ranges are UTC and include the first date and exclude the last; the schedule is displayed in local time (for a 23:00 Pacific schedule choose later dates). `bq mk --transfer_run` or `projects.locations.transferConfigs.scheduleRuns`.
- Quotas: scheduled queries run as batch query jobs under normal BigQuery query quotas, not the load job quota. With creator credentials the job is billed to the creator's project and subject to that user's and project's quotas; with a service account it is billed to the project containing the scheduled query but subject to the service account's quotas. Pricing equals manual queries.
- Destructive: `--replace=true` / `WRITE_TRUNCATE` and deleting a scheduled query discard data or schedules; try on a disposable dataset first. Disabling a schedule (Console) pauses it without deleting.
- Console, API (`projects.locations.transferConfigs.create`, `list`, `projects.transferConfigs.patch`), Java, and further Python samples (list, update, update credentials, backfill, delete) are in the source and omitted. Alerts: see "Set up alerts with scheduled queries".
- Source: https://docs.cloud.google.com/bigquery/docs/scheduling-queries (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/service-account-permissions (retrieved 2026-11-15) — the Service Account User role and where it is granted; the scheduling-queries page only links to the IAM docs for this.
- Adapted from the official docs: both `bq update` blocks lacked the `\` after `--params=...` ("--params='parameters'" followed by "--transfer_config"); it was added. The templates keep the source's lowercase placeholders.
- Pub/Sub topics for notifications are in `gcp-messaging-workflows`.

## Related

- [dts-introduction.md](./dts-introduction.md)
- [enable-transfer-service.md](./enable-transfer-service.md)
