---
source: https://docs.cloud.google.com/logging/docs/analyze/examples
---

# Observability Analytics SQL examples

Sample GoogleSQL queries to run on the Observability Analytics page against log views of upgraded log buckets: filtering by payload, severity, resource and log name; grouping and aggregating; cross-column search; unions and joins. More samples are in the `logging-analytics-samples` and `security-analytics` GitHub repositories.

## Signature / Usage

Replace `PROJECT_ID`, `LOCATION`, `BUCKET_ID`, `LOG_VIEW_ID` in each `FROM` clause. Path elements are separated by periods; wrap each path element in backquotes if one contains a period. For an analytics view use `` `analytics_view.PROJECT_ID.LOCATION.ANALYTICS_VIEW_ID` ``.

### Show entries in the `_Default` bucket

```sql
SELECT
  timestamp, severity, resource.type, log_name, text_payload, proto_payload, json_payload
FROM
  `PROJECT_ID.LOCATION._Default._AllLogs`
-- Limit to 1000 entries
LIMIT 1000
```

### Filter by payload type

```sql
-- Matches log entries that have a text payload.
WHERE text_payload IS NOT NULL
```

```sql
-- Matches log entries that have a JSON payload.
WHERE json_payload IS NOT NULL
```

```sql
-- Matches log entries that have a proto payload.
-- Because proto_payload has a data type of RECORD, this statement tests
-- whether a mandatory subfield exists.
WHERE proto_payload.type IS NOT NULL
```

### Filter by time, resource, severity, log name

```sql
-- Matches log entries whose timestamp is within the most recent hour
WHERE timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)
```

```sql
-- Matches log entries whose resource type is gce_instance
WHERE resource.type = "gce_instance"
```

```sql
-- Matches log entries whose severity is INFO or ERROR
WHERE severity IS NOT NULL AND severity IN ('INFO', 'ERROR')
```

```sql
-- Matches log entries whose severity level is at least NOTICE
WHERE severity_number IS NOT NULL AND severity_number > 200
```

```sql
-- Matches log entries that have the following log ID.
WHERE log_name="projects/cloud-logs-test-project/logs/cloudaudit.googleapis.com%2Factivity"
```

```sql
-- Matches log entries that have the following log id.
WHERE log_id = "cloudaudit.googleapis.com/data_access"
```

### Filter by resource label and JSON field

```sql
SELECT
  timestamp, JSON_VALUE(resource.labels.zone) AS zone, json_payload, resource, labels
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  -- Matches log entries whose resource type is gce_instance and whose zone is
  -- us-central1-f. Because resource has data type JSON, you must use JSON_VALUE
  -- to get the value for subfields, like zone.
  resource.type = "gce_instance" AND
  JSON_VALUE(resource.labels.zone) = "us-central1-f"
ORDER BY timestamp ASC
```

```sql
-- Compare the value of the status field to NULL.
WHERE JSON_VALUE(json_payload.status) IS NOT NULL
```

`WHERE json_payload.status IS NOT NULL` tests whether the field exists and can match entries that `JSON_VALUE(...)` does not.

### Filter by HTTP request

```sql
-- Matches log entries that have a HTTP request_method field.
-- Don't compare http_request to NULL. This field has a data type of RECORD.
WHERE http_request.request_method IS NOT NULL
```

```sql
-- Matches log entries whose HTTP request_method is GET or POST.
WHERE http_request.request_method IN ('GET', 'POST')
```

### Extract by regular expression

```sql
SELECT
  -- Display the timestamp, and the part of the name that begins with test.
  timestamp, REGEXP_EXTRACT(JSON_VALUE(json_payload.jobName), r".*(test.*)$") AS name,
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  -- Get the value of jobName, which is a subfield in a JSON structure.
  JSON_VALUE(json_payload.jobName) IS NOT NULL
ORDER BY timestamp DESC
LIMIT 20
```

### Group and aggregate

```sql
SELECT
  -- Truncate the timestamp by hour.
  TIMESTAMP_TRUNC(timestamp, HOUR) AS hour,
  JSON_VALUE(json_payload.status) AS status,
  -- Count the number log entries in each group.
  COUNT(*) AS count
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  -- Matches log entries that have a status field whose value isn't NULL.
  json_payload IS NOT NULL AND JSON_VALUE(json_payload.status) IS NOT NULL
GROUP BY
  -- Group by hour and status
  hour,status
ORDER BY hour ASC
```

```sql
SELECT
   -- Count the number of log entries for each resource type
   resource.type, COUNT(*) AS count
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
GROUP BY resource.type
LIMIT 100
```

```sql
SELECT
  -- Count the number of log entries for each severity.
  severity, COUNT(*) AS count
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  severity IS NOT NULL
GROUP BY severity
ORDER BY severity
LIMIT 100
```

```sql
SELECT
  -- Count the number of log entries for each log ID.
  log_id, COUNT(*) AS count
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
GROUP BY log_id
ORDER BY count DESC
LIMIT 100
```

```sql
SELECT
  -- Compute the average latency for each group. Because the labels field has a
  -- data type of JSON, use JSON_VALUE to get the value of checker_location.
  JSON_VALUE(labels.checker_location) AS location,
  AVG(http_request.latency.seconds) AS secs, http_request.request_url
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  -- Matches log entries when the request_method field is GET.
  http_request IS NOT NULL AND http_request.request_method IN ('GET')
GROUP BY
  -- Group by request URL and location
  http_request.request_url, location
ORDER BY location
LIMIT 100
```

```sql
SELECT
  -- Extract the value that begins with test.
  -- Count the number of log entries for each name.
  REGEXP_EXTRACT(JSON_VALUE(json_payload.jobName), r".*(test.*)$") AS name,
  COUNT(*) AS count
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  json_payload.jobName IS NOT NULL
GROUP BY name
ORDER BY count
LIMIT 20
```

### Cross-column search

Token-based search with `SEARCH`; backticks prevent tokenization of the IP address.

```sql
SELECT
  timestamp, log_id, proto_payload, severity, resource.type, resource, labels
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID` AS t
WHERE
  -- Search data access audit logs for the IP address that matches 35.193.12.15.
  -- The use of backticks prevents the string from being tokenized.
  proto_payload IS NOT NULL AND
  log_id = "cloudaudit.googleapis.com/data_access" AND
  SEARCH(t,"`35.193.12.15`")
ORDER BY timestamp ASC
LIMIT 20
```

```sql
   SEARCH((text_payload, json_payload) ,"`35.222.132.245`")
```

Substring search (case-insensitive) with `CONTAINS_SUBSTR`:

```sql
SELECT
  timestamp, log_id, proto_payload, severity, resource.type, resource, labels
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID` AS t
WHERE
  -- Search data access audit logs for the IP address that matches 35.193.12.15.
  -- CONTAINS_SUBSTR performs a contains-test.
  proto_payload IS NOT NULL AND
  log_id = "cloudaudit.googleapis.com/data_access" AND
  CONTAINS_SUBSTR(t,"35.193.12.15")
ORDER BY timestamp ASC
LIMIT 20
```

### Join and union views

```sql
SELECT
  -- Do an inner join on two tables by using the span ID and trace ID.
  -- Don't join only by span ID, as this field isn't globally unique.
  -- From the first view, show the timestamp, severity, and JSON payload.
  -- From the second view, show the JSON payload.
  a.timestamp, a.severity, a.json_payload, b.json_payload, a.span_id, a.trace
FROM  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_1` a
JOIN  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_2` b
ON
  a.span_id = b.span_id AND
  a.trace = b.trace
LIMIT 100
```

```sql
SELECT
  timestamp, log_name, severity, json_payload, resource, labels
-- Create a union of two log views
FROM(
  SELECT * FROM `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_1`
  UNION ALL
  SELECT * FROM `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_2`
)
-- Sort the union by timestamp.
ORDER BY timestamp ASC
LIMIT 100
```

## Options / Props

### SQL language support

| Item | Support |
|---|---|
| GoogleSQL functions | Supported with exceptions below. |
| DDL and DML commands | Not supported on the Observability Analytics page. |
| JavaScript UDFs, BigQuery ML functions, SQL variables | Not supported on the page; supported only on a linked BigQuery dataset via BigQuery Studio, Looker Studio, or the `bq` tool. |

### Join restrictions

| Condition | Requirement |
|---|---|
| Location | All views in the same location, or all in `global` or `us`. |
| CMEK | Same Cloud KMS key, or a common ancestor with a default Cloud KMS key in the resources' location. Temporary join data is encrypted with that key. |

## Notes

- Prerequisites: upgrade each log bucket to Observability Analytics (Logs Storage page, "Observability Analytics available" column shows Open). Roles on the project: Logs Viewer (`roles/logging.viewer`) for `_Required` and `_Default`; Logs View Accessor (`roles/logging.viewAccessor`) for all log views; Observability Analytics User (`roles/observability.analyticsUser`) for analytics views.
- A `timestamp` condition in `WHERE` overrides the time-range selector; prefer the selector.
- Duplicates aren't removed before a query runs; deduplicate by row-level validation only if needed because it is slower.
- For BigQuery Studio or `bq`, change the `FROM` clause to the linked dataset path, for example `myproject.mydataset._AllLogs`.
- Queries over data access audit logs and IP addresses expose personal data; restrict who can run them.
- The source also shows Console click-paths and sample JSON shapes of `resource` and `json_payload` (not reproduced), plus examples that were trimmed: the HTTP status filter, the subnetwork bytes-sent average, and `UNION` / `JOIN` descriptions beyond the two shown.
- Source: https://docs.cloud.google.com/logging/docs/analyze/examples (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-and-view.md](./query-and-view.md)
- [log-analytics.md](./log-analytics.md)
- [about-analytics-views.md](./about-analytics-views.md)
