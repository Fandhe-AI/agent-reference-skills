# Gateway Monitoring

Service health monitoring plus structured operational diagnostics for the Hermes gateway daemon, exported over OTLP/HTTP to an operator-configured endpoint (OpenTelemetry Collector, DataDog, or any OTLP receiver). Content-free by construction.

## Signature / Usage

```yaml
# config.yaml
monitoring:
  gateway_health_export:
    enabled: true
  export:
    otlp:
      enabled: true
      endpoint: http://collector-host:4318/v1/traces   # metrics/logs derive
      headers_env: {}   # header name -> ENV VAR NAME (values never stored)
```

```bash
hermes monitoring status
```

Collector forwarding to DataDog:

```yaml
# otel-collector config
receivers:
  otlp:
    protocols:
      http:
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
service:
  pipelines:
    metrics:   {receivers: [otlp], exporters: [datadog]}
    traces:    {receivers: [otlp], exporters: [datadog]}
    logs:      {receivers: [otlp], exporters: [datadog]}
```

## Options / Props

Exported signals:

| Signal | OTLP route | Content |
| --- | --- | --- |
| Gateway gauges | `/v1/metrics` | `hermes.gateway.up/state/busy/drainable/active_agents/background_work/background_delegations/restart_requested`, `hermes.platform.up/degraded` with bounded `error_code` attributes |
| Health/lifecycle events | `/v1/traces` | `gateway.lifecycle` transitions (`starting -> running -> draining -> stopped`, `startup_failed`, exit), `gateway.health_snapshot`, platform state changes |
| Diagnostics | `/v1/logs` | Warning/error gateway events with constant body and bounded subsystem / severity / error class / error code attributes |
| Cron scheduler gauges | `/v1/metrics` | Ticker heartbeat, last-success age, catch-up count, enabled/running job counts, overdue count |
| Cron execution lifecycle | `/v1/traces` | `claimed/running/completed/failed/unknown`, bounded source and error class, opaque hashed job key, duration, delivery outcome |

Example alert expressions (PromQL-style):

```promql
hermes_gateway_up == 0
absent_over_time(hermes_gateway_up[5m])
hermes_platform_up == 0
hermes_cron_scheduler_heartbeat_age_seconds > 180
hermes_cron_scheduler_last_success_age_seconds > 300
hermes_cron_jobs_overdue > 0
increase(hermes_cron_scheduler_catch_up_occurrences[15m]) > 0
```

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-monitoring (pinned to v0.22.2)
- Never exported: prompts, messages, tool arguments/results, job names, destinations, schedules, raw errors, session history, usage analytics, audit logs, detailed traces. Trajectory capture is a separate plane (NeMo Relay SDK integration).
- `active_agents` counts foreground turns + in-flight cron + API runs; `background_work` counts detached work (task-granular); `background_delegations` counts async delegation units (alert against `delegation.max_concurrent_children`).
- The OpenTelemetry SDK belongs to the `otlp` extra and installs on first use when policy permits. If the SDK or endpoint is missing the gateway runs unaffected; terminal cron events make one bounded fail-open flush of up to one second.
- Group fleet views by the opaque `service.instance.id`; use both explicit-state and missing-series detection.
- Cron span attributes: `hermes.status = failed|unknown`, `hermes.delivery_outcome = failed|not_configured`, `hermes.error_class = auth_failed|rate_limited|timeout|network_error|dispatch_failed|interrupted|empty_response|invalid_config|unknown`; job key is the opaque `hermes.job_key`.
- Extending the plane: the vocabulary is fixed and enumerated. A new gauge must be emitted in the snapshot builder (`agent/monitoring/gateway_health.py`, `cron_health.py`), registered in `gateway_health_export.py::_start_metric_provider` `metric_names`, documented, and added to any collector metric allowlist. New span attributes go in `agent/monitoring/otlp_exporter.py::_span_attrs` `keep_by_kind`. Hash identifiers (`sha256(...)[:24]`), pass strings through `redaction.redact_for_export`.
- Release validation scenarios: cron success, cron failure, cron interruption, bridge outage, killed gateway.
- Local smoke test (no Docker):

```bash
# terminal 1: capture collector on :4318
python scripts/observability/otel_capture_collector.py \
  --host 127.0.0.1 --port 4318 --log ~/.hermes/cache/scratch/hermes_otel_capture.jsonl

# terminal 2: drive the real exporter through lifecycle transitions
python scripts/observability/gateway_health_export_probe.py \
  --endpoint http://127.0.0.1:4318/v1/traces \
  --log ~/.hermes/cache/scratch/hermes_otel_capture.jsonl --wait 8
```

- The `hermes monitoring` CLI exposes `status` only. Team Gateway shared connector state, product analytics, audit and detailed traces are out of scope.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Cron Internals](./cron-internals.md)
