---
source: https://docs.cloud.google.com/bigquery/docs/export-to-pubsub
---

# Export data to Pub/Sub (reverse ETL)

Reverse ETL from BigQuery to Pub/Sub serves data to downstream applications in an event-driven manner. You use the `EXPORT DATA` statement inside a continuous query to publish rows to a Pub/Sub topic. A service account is required to run a continuous query that exports to Pub/Sub, and you also need a Pub/Sub topic and a subscription for the target application.

## Signature / Usage

### Run from the query editor

In **Edit** > **Query settings**, select **Use continuous query mode** and the service account, then run:

```sql
EXPORT DATA
OPTIONS (
format = 'CLOUD_PUBSUB',
uri = 'https://pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID'
) AS
(
QUERY
);
```

`QUERY` must contain only supported continuous query operations and must use the `APPENDS` function in the `FROM` clause to set the point in time at which to start processing data (the continuous queries introduction also allows `CHANGES` when exporting to Pub/Sub; see Notes).

### Run with bq

```bash
bq query --project_id=PROJECT_ID --use_legacy_sql=false \
--continuous=true --connection_property=service_account=SERVICE_ACCOUNT_EMAIL \
'EXPORT DATA OPTIONS (format = "CLOUD_PUBSUB", uri = "https://pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID") AS (QUERY);'
```

### Run with the API

Call `jobs.insert` with `continuous` set to `true` and a `connectionProperties` entry for the service account.

Adapted (not in the official docs): the source command has parentheses instead of braces/brackets in the JSON, a missing `\` after the URL, an unclosed `Authorization` header quote that also prevents `$(...)` expansion, and unescaped single quotes inside the single-quoted body. The version below is valid JSON with `useLegacySql`, `continuous` and `connectionProperties` as in the Discovery document.

```bash
curl --request POST \
  'https://bigquery.googleapis.com/bigquery/v2/projects/PROJECT_ID/jobs' \
  --header "Authorization: Bearer $(gcloud auth print-access-token)" \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{"configuration":{"query":{"query":"EXPORT DATA OPTIONS (format = \"CLOUD_PUBSUB\", uri = \"https://pubsub.googleapis.com/projects/PROJECT_ID/topics/TOPIC_ID\") AS (QUERY);","useLegacySql":false,"continuous":true,"connectionProperties":[{"key":"service_account","value":"SERVICE_ACCOUNT_EMAIL"}]}}}' \
  --compressed
```

### Export multiple columns

Wrap the columns in a struct and convert it with `TO_JSON_STRING`:

```sql
EXPORT DATA
  OPTIONS (
    format = 'CLOUD_PUBSUB',
    uri = 'https://pubsub.googleapis.com/projects/myproject/topics/taxi-real-time-rides')
AS (
  SELECT
    TO_JSON_STRING(
      STRUCT(
        ride_id,
        timestamp,
        latitude,
        longitude)) AS message
  FROM
    APPENDS(TABLE `myproject.real_time_taxi_streaming.taxi_rides`,
      -- Configure the APPENDS TVF start_timestamp to specify when you want to
      -- start processing data using your continuous query.
      -- This example starts processing at 10 minutes before the current time.
      CURRENT_TIMESTAMP() - INTERVAL 10 MINUTE)
  WHERE ride_status = 'enroute'
);
```

## Options / Props

### Placeholders

| Name | Description |
|---|---|
| `PROJECT_ID` | Your project ID |
| `TOPIC_ID` | Pub/Sub topic ID (from the Topics page of the console) |
| `SERVICE_ACCOUNT_EMAIL` | Service account email (from the Service accounts page) |
| `QUERY` | SQL that selects the data; only supported operations; `APPENDS` (or `CHANGES`) in `FROM` |

### Roles and permissions

| Principal | Need | Roles |
|---|---|---|
| User account | `bigquery.jobs.create` | `roles/bigquery.user`, `roles/bigquery.jobUser`, `roles/bigquery.admin` |
| User account | Submit a job that runs as a service account | `roles/iam.serviceAccountUser` (and `roles/iam.serviceAccountAdmin` if the same account creates the service account) |
| User account | Enable APIs | `roles/serviceusage.serviceUsageAdmin` (permission `serviceusage.services.enable`) |
| Service account | `bigquery.tables.export` | `roles/bigquery.dataViewer`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.admin` |
| Service account | Access Pub/Sub (both required) | `roles/pubsub.viewer`, `roles/pubsub.publisher` |

### Limitations

| Limitation |
|---|
| Exported data must be a single `STRING` or `BYTES` column (any column name) |
| A continuous query is required to export to Pub/Sub |
| You can't pass a schema to a Pub/Sub topic in the continuous query, and can't export to a topic that uses a schema |
| JSON records with some `NULL` values can be exported, but records with only `NULL` values can't; add `WHERE message IS NOT NULL` |
| For a topic with a locational endpoint, the endpoint must be in the same Google Cloud regional boundary as the BigQuery dataset containing the queried table |
| Exported data must not exceed Pub/Sub quotas |

## Notes

- This page says the query must use `APPENDS`, while the continuous queries introduction (https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction) lists `CHANGES` as usable only when exporting to Pub/Sub, and not with stateful operations or Iceberg managed tables; both are kept, see `continuous-queries-introduction.md` in this category.
- Source: https://docs.cloud.google.com/bigquery/docs/export-to-pubsub (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the `curl` example was rewritten; the original used `--data '("configuration":("query":"EXPORT DATA OPTIONS (format = 'CLOUD_PUBSUB', ...` with parentheses, no `\` after the URL and an unterminated `"Authorization: Bearer $(gcloud auth print-access-token)` header. The nested `query` object follows the `JobConfiguration.query` field of the `jobs.insert` request.
- Pricing: billed with BigQuery capacity compute pricing; requires a reservation using the Enterprise or Enterprise Plus edition and a reservation assignment with the `CONTINUOUS` job type. Pub/Sub usage is billed separately.
- Performance: if the job is limited by available compute, increase the size of the `CONTINUOUS` slot reservation assignment.
- The `curl` call uses an access token in a header from `gcloud auth print-access-token`; keep it out of shell history and logs. Run continuous queries with a dedicated service account that has only the roles in the table above.
- The source also shows Console steps for enabling APIs and Cloud Shell activation; omitted.
- Pub/Sub topics, subscriptions and quotas are in `gcp-messaging-workflows`; service accounts are in `gcp-foundation`.

## Related

- [continuous-queries-introduction.md](./continuous-queries-introduction.md)
- [export-intro.md](./export-intro.md)
