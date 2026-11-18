---
source: https://docs.cloud.google.com/monitoring/docs/collect-metrics-overview
---

# Collect metrics overview

Cloud Monitoring collects performance metrics from Google Cloud services, VM agents, third-party integrations, custom application instrumentation and logs. You can chart them, build dashboards, or create alerting policies that fire when metrics cross thresholds.

## Signature / Usage

User-defined metric types use a prefix that marks them as user-defined (see custom-metrics.md). Examples from the source twin for that page:

```text
    custom.googleapis.com/cpu_utilization
    custom.googleapis.com/instance/cpu/utilization
```

## Options / Props

### Metric sources

| Source | How it is collected |
|---|---|
| Google Cloud services | Automatically collected and stored; for example Compute Engine reports over 25 unique metrics per VM instance. List: Google Cloud metrics. |
| Agent in your VM | Install an agent for more system metrics from Compute Engine VMs; Ops Agent metrics include CPU, disk, memory and swap, on Linux and Windows VMs. |
| Third-party applications (Apache Web Server, MySQL, Redis, ...) | On Compute Engine the Ops Agent collects the telemetry; on GKE Google Cloud Managed Service for Prometheus collects it. |
| Metrics you define | Instrument the application with a client library or the Cloud Monitoring API. OpenTelemetry (open source, vendor-neutral) is recommended over vendor- and product-specific APIs or client libraries. |
| Metrics derived from logs | Log-based metrics record numeric information about log entries; some, such as the total number of log entries received by the project, are derived automatically; you can define others (for example a count of `404 Not Found` errors for an App Engine app). |

## Notes

- To chart or monitor data stored in multiple projects, add those projects to the project's metrics scope.
- Agentic applications: some frameworks can collect prompts and responses or pass context that allows tracing of some remote Google Cloud MCP server calls.
- The source page has no code; the snippet above is taken from https://docs.cloud.google.com/monitoring/custom-metrics.
- Pricing is on the Google Cloud Observability pricing page: https://cloud.google.com/products/observability/pricing
- Source: https://docs.cloud.google.com/monitoring/docs/collect-metrics-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/monitoring/custom-metrics

## Related

- [monitoring-overview.md](./monitoring-overview.md)
- [custom-metrics.md](./custom-metrics.md)
- [settings.md](./settings.md)
