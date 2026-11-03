---
source: https://developers.cloudflare.com/workers/observability/opentelemetry-export/
---

# OpenTelemetry export

Workers can export OpenTelemetry-compliant logs and traces to external destinations. First create a destination and configure your provider (https://developers.cloudflare.com/observability/export/opentelemetry/).

## Signature / Usage

Add destination names to your Wrangler configuration; each name must match a destination configured in the dashboard.

```jsonc
{
	"observability": {
		"traces": {
			"enabled": true,
			"destinations": ["tracing-destination-name"],

			// traces sample rate of 5%
			"head_sampling_rate": 0.05,

			// optional: export without storing traces in Cloudflare
			"persist": false
		},
		"logs": {
			"enabled": true,
			"destinations": ["logs-destination-name"],

			// logs sample rate of 60%
			"head_sampling_rate": 0.6,

			// optional: export without storing logs in Cloudflare
			"persist": false
		}
	}
}
```

```toml
[observability.traces]
enabled = true
destinations = [ "tracing-destination-name" ]
head_sampling_rate = 0.05
persist = false

[observability.logs]
enabled = true
destinations = [ "logs-destination-name" ]
head_sampling_rate = 0.6
persist = false
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `traces.destinations` / `logs.destinations` | string[] | Names of destinations configured in the dashboard. |
| `head_sampling_rate` | number | Sample rate for that signal. |
| `persist` | boolean | Defaults to `true`: exported data is also stored in Cloudflare. `false` exports only to the destination. |

## Notes

- Supported telemetry: traces (request flows) and logs (application and system logs, including `console.log()`).
- Redeploy after updating the Wrangler configuration. Events may take several minutes to reach the destination.
- Beginning December 1, 2026, persisted data contributes to Cloudflare Observability ingestion and storage usage (https://developers.cloudflare.com/observability/pricing/). Set `persist` to `false` if you only need data in your external destination.
- Known limitation: Workers infrastructure metrics and custom metrics cannot be exported through OpenTelemetry.

## Related

- [traces.md](./traces.md)
- [workers-logs.md](./workers-logs.md)
- [tail-workers.md](./tail-workers.md)
- [logpush.md](./logpush.md)
- [../configuration/observability.md](../configuration/observability.md)
