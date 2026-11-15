---
source: https://docs.cloud.google.com/run/docs/monitoring
---

# Monitor Cloud Run (Cloud Monitoring)

Cloud Run is integrated with Cloud Monitoring automatically, with no setup: metrics are captured while resources run. Cloud Monitoring provides metrics, uptime checks, and alerts. Google Cloud Observability pricing applies, and there is no charge for metrics on the fully managed version of Cloud Run. Cloud Run incidents are published to Personalized Service Health.

## Signature / Usage

View metrics in the console: open the resource page (Services, Jobs, Worker pools) and click the **Metrics** tab (not applicable to instances). In Cloud Monitoring, open Metrics explorer, pick the resource type and a metric. Custom metrics: deploy an OpenTelemetry or Prometheus sidecar, or use log-based metrics.

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --project PROJECT-ID --limit 10
```

Snippet taken from https://docs.cloud.google.com/run/docs/logging (the source page itself has no code).

## Options / Props

### Key metrics

| Metric | Services | Jobs | Worker pools | Instances |
|--------|----------|------|--------------|-----------|
| Billable container instance time | yes | yes | yes | yes |
| Container CPU allocation | yes | yes | yes | yes |
| Container CPU utilization | yes | yes | yes | no |
| Container memory allocation | yes | yes | yes | yes |
| Container memory utilization | yes | yes | yes | no |
| Container startup latency | yes | yes | yes | yes |
| Container GPU memory usage / utilization | yes | yes | yes | no |
| Container GPU utilization | yes | yes | no | no |
| Container instance count | yes | no | yes | yes |
| Request count / latencies / maximum concurrent requests | yes | no | no | yes |
| Received bytes / Sent bytes | yes | yes | yes | yes |
| Completed executions / completed task attempts / running executions / running task attempts | no | yes | no | no |

Metric reference: `https://docs.cloud.google.com/monitoring/api/metrics_gcp_p_z#gcp-run`.

### Monitoring resource types

| Resource | Type |
|----------|------|
| Service revision | `cloud_run_revision` |
| Job | `cloud_run_job` |
| Worker pool | `cloud_run_worker_pool` |
| Instance | `cloud_run_instance` |

## Notes

- Uptime checks (`https://docs.cloud.google.com/monitoring/uptime-checks`) and alerting policies (`https://docs.cloud.google.com/monitoring/alerts`) are created in Cloud Monitoring. Consider alerts on Personalized Service Health events.
- Source inconsistency: the logging page names the worker pool logging resource `cloud_run_workerpool`, while this page names the monitoring resource `cloud_run_worker_pool`.
- Metrics charts for services and worker pools display deployment events.
- Source: https://docs.cloud.google.com/run/docs/monitoring (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitoring-overview.md](./monitoring-overview.md)
- [logging.md](./logging.md)
- [troubleshooting.md](./troubleshooting.md)
