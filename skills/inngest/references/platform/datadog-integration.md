# Datadog Integration

Native integration that publishes Inngest environment metrics to Datadog, enabling monitoring and alerting without any Datadog agent configuration.

## Signature / Usage

```
Datadog → Integrations → Inngest → Install integration → Connect Accounts
  (authorizes Inngest to access your Datadog account)
Inngest → Settings → Integrations → Datadog → connect environment(s)
```

## Options / Props

| Plan | Granularity | Delay |
|------|-------------|-------|
| Basic | 15 minutes | 15 minutes |
| Pro | 5 minutes | 5 minutes |
| Enterprise | 1 minute | Immediate |

## Notes

- Available to all paid plans; comes with a default dashboard using `inngest.*` metrics, and supports custom dashboards
- Key published metrics: `inngest.function_run.scheduled.total`, `inngest.function_run.started.total`, `inngest.function_run.ended.total`, `inngest.function_run.rate_limited.total`, `inngest.step.output_bytes.total`, `inngest.sdk.req_scheduled.total`, `inngest.sdk.req_started.total`, `inngest.sdk.req_ended.total`, `inngest.steps.scheduled`, `inngest.steps.running`, `inngest.steps.sleeping`, `inngest.metric_export_integration_healthy`
- Multiple Inngest environments can be connected to Datadog, and multiple Datadog accounts can receive metrics
- Setup completion may take up to 60 seconds after connecting accounts

## Related

- [Observability & Metrics](./observability-metrics.md)
- [Prometheus Metrics Export](./prometheus-metrics.md)
