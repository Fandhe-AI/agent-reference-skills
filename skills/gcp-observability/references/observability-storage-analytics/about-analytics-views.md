---
source: https://docs.cloud.google.com/logging/docs/analyze/about-analytics-views
---

# Analytics views in Observability Analytics

Analytics views (Preview) are named SQL queries with a custom schema over log views that you can reference in the `FROM` clause of other queries. They are not materialized views and don't cache results, so querying one is equivalent to querying the views in its query. This page covers types, location, examples and limits.

## Signature / Usage

### Define an analytics view over VPC Flow Logs

Saved as an analytics view named `network_details`. Set `PROJECT_ID`, `LOCATION` (location of the log view), `BUCKET_ID` and `LOG_VIEW_ID` (at most 100 characters; letters, digits, underscores, hyphens).

```sql
SELECT
  -- Create a column for each network field.
  JSON_VALUE(resource.labels.subnetwork_name) subnetwork_name,
  JSON_VALUE(json_payload.src_instance.vm_name) vm_name,
  JSON_VALUE(json_payload.connection.src_ip) as src_ip,
  JSON_VALUE(json_payload.connection.src_port) as src_port,
  JSON_VALUE(json_payload.connection.dest_ip) as dest_ip,
  JSON_VALUE(json_payload.connection.dest_port) as dest_port,
  CAST(JSON_VALUE(json_payload.bytes_sent) as INT64) as bytes_sent,
  CAST(JSON_VALUE(json_payload.packets_sent) as INT64) as packets_sent
FROM
  -- Query one log view.
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  -- Only query the VPC Flow Logs log.
  log_id = "compute.googleapis.com/vpc_flows"
  AND SEARCH(json_payload.reporter, "SRC")
```

### Query the analytics view

```sql
SELECT vm_name, bytes_sent, packets_sent,
FROM `analytics_view.my_project.global.network_details`
ORDER BY bytes_sent DESC
LIMIT 100
```

### Base query for weekly API latency

```sql
SELECT week, MIN(took_ms) as min, MAX(took_ms) AS max, AVG(took_ms) AS avg
FROM (
  SELECT TIMESTAMP_TRUNC(timestamp, WEEK) AS week,
  CAST( JSON_VALUE(json_payload, '$."http.resp.took_ms"') AS INT64) as took_ms
  FROM
    -- Query one log view.
    `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
  WHERE json_payload IS NOT NULL
    AND SEARCH(labels,"frontend")
    AND JSON_VALUE(json_payload.message) = "request complete"
  ORDER BY took_ms DESC, timestamp ASC
)
GROUP BY week ORDER BY week
```

## Options / Props

### Types

| Type | Created by | Allowed |
|---|---|---|
| User-defined | You | Query, edit, delete |
| System-defined | Google Cloud services | Query only; can't edit or delete |

### Limitations

| Limit |
|---|
| An analytics view can only query log views. |
| The parent resource must be a Google Cloud project. |
| Query only on the Observability Analytics page with the Observability Analytics (default) query engine. |
| All views an analytics view queries must be in the same location. |
| Create and manage only in the Google Cloud console. |
| At most 100 analytics views per Google Cloud project. |
| At most 50 analytics views per region. |
| Per project, at most 10 regions can contain an analytics view. |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms; available "as is" with possibly limited support.
- Location: the analytics view's location is set by the resources it queries (a view over a `global` log view must be `global`); the console sets it automatically.
- Analytics views are more powerful than saved queries: a saved query can be rerun, but its results can't be queried.
- VPC Flow Logs configuration belongs to the `gcp-networking` skill.
- Source: https://docs.cloud.google.com/logging/docs/analyze/about-analytics-views (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-and-view.md](./query-and-view.md)
- [log-analytics.md](./log-analytics.md)
