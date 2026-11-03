---
source: https://developers.cloudflare.com/workers/observability/
---

# Observability overview

Cloudflare Workers provides observability tools (logs, traces, metrics, issues, query builder, OpenTelemetry export, debugging) to understand how Worker projects perform. This page also covers the Logs landing page.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/observability/traces/#how-to-enable-tracing.

```jsonc
{
	"observability": {
		"traces": {
			"enabled": true,
			// optional sampling rate (recommended for high-traffic workloads)
			"head_sampling_rate": 0.05
		}
	}
}
```

```toml
[observability.traces]
enabled = true
head_sampling_rate = 0.05
```

## Notes

- Logs: Workers Logs (automatic collect/store/filter/analyze in dashboard), Real-time logs (near real-time, development and deployments), Tail Workers (custom filtering, sampling, transformation; Beta), Workers Logpush (send Workers Trace Event Logs to R2, S3 or logging providers).
- Traces: end-to-end request visibility with automatic instrumentation for fetch calls, binding operations (KV, R2, Durable Objects) and handler invocations; no code changes required.
- Issues: detects and groups recurring Worker failures; routes issues to coding agents, webhooks, chat services, or incident-management tools.
- Metrics and analytics: request counts, error rates, CPU time, wall time and execution duration, per Worker or aggregated on a zone.
- Query Builder: structured queries over telemetry data.
- Exporting data: OpenTelemetry export for Workers logs and traces to any supported OpenTelemetry destination (https://developers.cloudflare.com/observability/export/opentelemetry/).
- Debugging: errors and exceptions, source maps and stack traces, DevTools (breakpoints, CPU profiling, memory debugging), profiling in production, and local observability (https://developers.cloudflare.com/workers/local-development/local-explorer/).
- Additional resources: Cloudflare API MCP server to query Workers observability data, and third-party integrations (https://developers.cloudflare.com/workers/observability/third-party-integrations/; not covered by this skill).
- The `observability` key in the Wrangler configuration file is specified in [../configuration/observability.md](../configuration/observability.md); `wrangler tail` flags are in [../commands/workers.md](../commands/workers.md). The `tail()` handler API itself belongs to the cloudflare-workers skill.

## Related

- [workers-logs.md](./workers-logs.md)
- [real-time-logs.md](./real-time-logs.md)
- [tail-workers.md](./tail-workers.md)
- [logpush.md](./logpush.md)
- [traces.md](./traces.md)
- [issues.md](./issues.md)
- [metrics-and-analytics.md](./metrics-and-analytics.md)
- [query-builder.md](./query-builder.md)
- [opentelemetry-export.md](./opentelemetry-export.md)
- [errors.md](./errors.md)
- [source-maps.md](./source-maps.md)
- [devtools.md](./devtools.md)
- [profiling-in-production.md](./profiling-in-production.md)
- [../configuration/observability.md](../configuration/observability.md)
