---
source: https://developers.cloudflare.com/workers/observability/traces/
---

# Traces

Workers tracing gives end-to-end visibility into a request as it travels through your Workers application and connected services, with automatic instrumentation and no code changes or SDK. Includes the known limitations of the open beta.

## Signature / Usage

Enable tracing with `observability.traces.enabled = true`:

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

Separate sampling rates for traces and logs:

```jsonc
{
	"observability": {
		"traces": {
			"enabled": true,
			// set tracing sampling rate to 5%
			"head_sampling_rate": 0.05
		},
		"logs": {
			"enabled": true,
			// set logging sampling rate to 60%
			"head_sampling_rate": 0.6
		}
	}
}
```

```toml
[observability.traces]
enabled = true
head_sampling_rate = 0.05

[observability.logs]
enabled = true
head_sampling_rate = 0.6
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `observability.traces.enabled` | boolean | Enables tracing for the Worker. |
| `observability.traces.head_sampling_rate` | number (0 to 1) | Fraction of requests traced. Defaults to `1` (100%); `0.05` traces five out of one hundred requests. |
| `observability.traces.persist` | boolean | Default `true`; `false` exports traces to a destination without persisting them in Cloudflare. |

## Notes

- Automatic instrumentation captures: fetch calls (outbound HTTP, timing, status codes), binding calls (KV reads/writes, R2 operations, Durable Object invocations), RPC calls (caller-side session spans and method-call spans between Workers and Durable Objects), and handler calls (fetch, scheduled, queue handlers lifecycle).
- Planned: `observability.enabled = true` will in the future also enable automatic tracing, requiring an updated `compatibility_date`. While in early beta it enables logs only.
- Sampling is head-based, so non-traced requests incur no tracing overhead.
- Traces follow OpenTelemetry standards and can be exported (e.g. Honeycomb, Grafana Cloud, Axiom) with `persist: false` to use a third party as sole destination.
- Limits: seven-day retention. Beginning December 1, 2026, stored traces count toward account-level ingestion and storage usage under Cloudflare Observability pricing (https://developers.cloudflare.com/observability/pricing/). Sampling reduces billable usage.
- Known limitations (open beta; feedback: https://github.com/cloudflare/workers-sdk/discussions/11062):
  - Non-I/O operations may report 0 ms: the runtime only updates time on I/O events (Spectre mitigation).
  - Trace IDs are not propagated to services outside Cloudflare, so traces do not link with non-Cloudflare services; W3C Trace Context propagation is planned.
  - Span attributes are incomplete and span/attribute names are subject to change during beta.
  - Some attributes (e.g. `service.name`, `faas.name`) only apply to some spans; when filtering or grouping by Worker name across traces and logs, use `$metadata.service`.
  - While a trace is in progress the root span shows `Trace in Progress`; wait a few moments for the full trace.

### Data location

Cloudflare-stored Workers traces follow your account's Customer Metadata Boundary setting when one is configured. If no boundary is configured, they may be stored in Cloudflare's core data centers globally. Viewing availability is subject to the Customer Metadata Boundary limitations in Data Localization compatibility.
- Source: https://developers.cloudflare.com/workers/observability/traces/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [custom-spans.md](./custom-spans.md)
- [spans-and-attributes.md](./spans-and-attributes.md)
- [opentelemetry-export.md](./opentelemetry-export.md)
- [../configuration/observability.md](../configuration/observability.md)
