# Prometheus Metrics Export

Scraping Inngest function run metrics via a Prometheus-compatible endpoint, compatible with Prometheus, Grafana, and New Relic.

## Signature / Usage

Setup: open the Prometheus integration page in the Inngest dashboard's "Integrations" section and select the Inngest environment to export metrics from. The scrape config is generated automatically, including the Inngest API key required to authenticate with the scrape endpoint. Use that generated configuration in your Prometheus instance or any tool that can scrape from a URL.

Example output:

```yaml
# HELP inngest_function_run_ended_total The total number of function runs ended
# TYPE inngest_function_run_ended_total counter
inngest_function_run_ended_total{date="2025-02-12",fn="my-app-my-function",status="Completed"} 480
inngest_function_run_ended_total{date="2025-02-12",fn="my-app-my-function",status="Failed"} 20
# HELP inngest_steps_running The number of steps currently running
# TYPE inngest_steps_running gauge
inngest_steps_running{fn="my-app-my-function"} 7
```

## Options / Props

| Metric (exported) | Type | Tags |
|--------|------|------|
| `inngest_function_run_scheduled_total` | counter | `fn`, `date` |
| `inngest_function_run_started_total` | counter | `fn`, `date` |
| `inngest_function_run_ended_total` | counter | `fn`, `date`, `status` |
| `inngest_sdk_req_scheduled_total` | counter | `fn`, `date` |
| `inngest_sdk_req_started_total` | counter | `fn`, `date` |
| `inngest_sdk_req_ended_total` | counter | `fn`, `date`, `status` |
| `inngest_step_output_bytes_total` | counter | `fn`, `date` |
| `inngest_steps_scheduled` | gauge | `fn` |
| `inngest_steps_running` | gauge | `fn` |

## Notes

- Available to all paid plans. Granularity and delay by plan:
  - Basic: 15-minute granularity, 15-minute delay
  - Pro: 5-minute granularity, 5-minute delay
  - Enterprise: 1-minute granularity, immediate
- Rate limit: 30 requests per minute (all plans)
- Self-hosted Inngest is separate: it exposes `GET /metrics` on the server port (e.g. `http://localhost:8288/metrics`), which by default emits a single gauge `inngest_queue_depth`; per-function lifecycle counters (`inngest_function_run_*_total`, `inngest_sdk_req_*_total`) require starting the server with `INNGEST_EXPERIMENTAL_PROM_METRICS=1`. No authentication is configured by default (source: the self-hosting guide, not the Prometheus integration page).

## Related

- [Observability & Metrics](./observability-metrics.md)
- [Self-Hosting](./self-hosting.md)
