---
source: https://docs.cloud.google.com/stackdriver/docs/otlp/overview
---

# Telemetry (OTLP) API overview

The Telemetry (OTLP) API (`telemetry.googleapis.com`) implements the OpenTelemetry Protocol so you can ingest OTLP logs, metrics and traces from OpenTelemetry SDKs and collectors without custom Google Cloud exporters. Logs become Cloud Logging log entries, metrics become Prometheus time series in Cloud Monitoring, and traces are stored in a format generally consistent with OTLP. On GKE you can use Managed OpenTelemetry for GKE instead of running your own collector.

## Signature / Usage

### Incoming OTLP log request structure

```text
    "resourceLogs": [
        {
          "resource": {
            "attributes": [...]
          },
          "scopeLogs": [
            {
              "scope": { ...}
              "logRecords": [...]
            }
          ]
        }
    ]
```

Each `logRecords` item becomes one `LogEntry`. Example OTLP payload:

```text
{
  "resourceLogs": [
    {
      "resource": {
        "attributes": [
          {
            "key": "gcp.project_id",
            "value": { "stringValue": "PROJECT_ID" }
          },
          {
            "key": "gcp.resource_type",
            "value": { "stringValue": "global" }
          }
        ]
      },
      "scopeLogs": [
        {
          "scope": {
            "name": "my.library",
            "version": "1.0.0",
            "attributes": [
              {
                "key": "my.scope.attribute",
                "value": { "stringValue": "some scope attribute" }
              }
            ]
          },
          "logRecords": [ ... ]
         }
       ]
     }
   ]
}
```

Resulting `resource` and `otel` fields of each log entry:

```text
  {
    ...
    "resource": {
      "labels": {
        "project_id": "PROJECT_ID"
      },
      "type": "global"
    },
    ...
}
```

```text
  {
    ...
    "otel": {
      "resource": {
        "attributes": {
          "gcp.project_id": "PROJECT_ID",
          "gcp.resource_type": "global"
        }
      },
      "scope": {
        "attributes": {
          "my.scope.attribute": "some scope attribute"
        },
        "name": "my.library",
        "version": "1.0.0"
      }
    },
   ...
  }
```

### Metric name structure and trace payload

```text
    prometheus.googleapis.com/{metric_name}/{suffix}
```

```text
    {
      "resourceSpans": [
        {
          "resource": {
            "attributes": [...]
          },
          "scopeSpans": [
            {
              "scope": { ...},
              "spans": [...]
            }
          ]
        }
      ]
    }
```

### Query metric names with special characters (Metrics Explorer)

```text
{"my.metric.name"}
{"my.metric.name", "label.key.KEY"="value"}
```

## Options / Props

### Protocols and endpoint

| Item | Value |
|---|---|
| Endpoint | `telemetry.googleapis.com` (logs: `https://telemetry.googleapis.com/v1/logs`) |
| Supported transports / serializations | `http/protobuf`, `http/json`, `grpc` |
| Recommendation for direct SDK export | gRPC OTLP exporter (most SDK exporters lack dynamic token refreshing for HTTP) |

### Required setup and IAM

| Requirement | Detail |
|---|---|
| Quota project | Configure a quota project. |
| `roles/serviceusage.serviceUsageConsumer` | Service Usage Consumer, on the quota project. |
| `roles/telemetry.writer` | Cloud Telemetry Writer, on the project; writes logs, metrics and traces. |

### Metric ingestion rules

| Rule | Detail |
|---|---|
| Collector version | OTLP for Prometheus metrics works only with OpenTelemetry Collector 0.140.0 or newer. |
| Metric name domain | No domain, or `prometheus.googleapis.com`. |
| Metric name regex | `[a-zA-Z][a-zA-Z0-9_:./-]*` (allowed specials `_:./-`); other names are rejected. |
| Label key regex | `[a-zA-Z_][a-zA-Z0-9_.]*` (allowed specials `_.`); data points with other keys are rejected. Label values allow all special characters. |
| `target_info` | Added per unique OpenTelemetry resource; holds all resource attributes except `service.name`, `service.instance.id`, `service.namespace`. |

### Limits and quotas

| Signal | Limit |
|---|---|
| All signals | Telemetry API limits apply (see the quotas page). |
| Logs | Cloud Logging API quotas and limits apply. |
| Metrics | Cloud Monitoring API quotas and limits apply; metrics can't have more than 200 labels. Default quota for metrics ingested by the Telemetry API: 60,000 requests per minute; at a maximum batch size of 200 points per request, an effective default of 200,000 samples per second. You can request an increase. |
| Traces | No additional quotas or limits. |

## Notes

- Authentication: collectors typically use the `googleclientauth` extension; direct export uses Application Default Credentials plus a language-specific Google Auth Library. The `otel` field of `LogEntry` preserves the OTLP resource, scope and entity metadata, copied into every log entry.
- Log billing: resource and scope metadata copied onto each entry can increase stored log volume, especially with high-cardinality or many resource attributes. To minimize storage, drop unnecessary resource or scope attributes with a collector processor such as `transform`, or use the legacy mapping option `gcp.use_legacy_mapping`, which prevents the `otel` field from being populated. To estimate `LogEntry` volume from `resourceLogs`, send one `logRecord` per `resourceLogs`.
- Metric billing falls under the "Prometheus Samples Ingested" SKU; trace billing does not depend on which API sends the data. The Telemetry API provides higher trace ingestion quotas than the Cloud Trace API (recommended).
- Value-type collisions can occur if you previously sent `INT64` `target_info` metrics; the long-term fix is to delete that metric descriptor (the source links a Golang script). That deletes a metric descriptor in your metric scope; try it on a disposable project first.
- Rejected names can be rewritten with the `replace_pattern` OTTL function. Retaining the `le` label for exponential histograms can return unexpected results (`histogram_quantile(.99, sum by (le) (metric))` is expected to work); delta metrics may not query properly in some cases such as very sparse deltas.
- Observability Analytics can analyze log and trace data with SQL.
- Fragments above use the `text` tag because the source shows them with `...` elisions.
- Google Cloud Managed Service for Prometheus semantics follow upstream Prometheus; OpenTelemetry tracing in Google Cloud is not the tracing of `openai-agents` or the telemetry of `vercel-ai-sdk`.
- Source: https://docs.cloud.google.com/stackdriver/docs/otlp/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [migrate-collector-to-otlp-exporters.md](./migrate-collector-to-otlp-exporters.md)
- [write-logs-to-api.md](./write-logs-to-api.md)
- [google-built-otel.md](./google-built-otel.md)
