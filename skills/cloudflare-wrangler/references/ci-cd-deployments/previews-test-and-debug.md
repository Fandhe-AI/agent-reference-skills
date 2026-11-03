---
source: https://developers.cloudflare.com/workers/previews/test-and-debug/
---

# Test and Debug Previews

Previews support the same Workers Observability features as production (logs, traces, metrics, Tail Workers), configured independently.

## Signature / Usage

Logs and traces in the `previews` block:

```jsonc
{
  "observability": {
    "enabled": true,
    "logs": { "enabled": true, "invocation_logs": true }
  },
  "previews": {
    "observability": {
      "enabled": true,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "persist": true
      },
      "traces": {
        "enabled": true,
        "head_sampling_rate": 1,
        "persist": true
      }
    }
  }
}
```

```toml
[observability]
enabled = true

  [observability.logs]
  enabled = true
  invocation_logs = true

[previews.observability]
enabled = true

  [previews.observability.logs]
  enabled = true
  invocation_logs = true
  persist = true

  [previews.observability.traces]
  enabled = true
  head_sampling_rate = 1
  persist = true
```

Tail Workers:

```jsonc
{
  "tail_consumers": [
    { "service": "my-tail-sink" }
  ],
  "previews": {
    "tail_consumers": [
      { "service": "my-tail-sink" }
    ]
  }
}
```

```toml
[[tail_consumers]]
service = "my-tail-sink"

[[previews.tail_consumers]]
service = "my-tail-sink"
```

Metrics via GraphQL Analytics API (`workersInvocationsAdaptive` with `isPreview: 1`):

```graphql
query PreviewMetrics($accountTag: String!, $since: Time!) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			workersInvocationsAdaptive(
				limit: 100
				filter: { datetime_geq: $since, isPreview: 1 }
			) {
				dimensions {
					datetime
					scriptName
					previewSlug
					status
				}
				sum {
					requests
					errors
				}
			}
		}
	}
}
```

Browser evidence:

```sh
# Deploy the Preview
npx wrangler preview --name my-feature

# Capture a screenshot of the Preview URL
curl "https://YOUR_BROWSER_RUN_WORKER.workers.dev/screenshot?url=https://my-feature-my-worker.subdomain.workers.dev&debugId=review-123"
```

## Notes

- Preview logs and traces appear under the Preview's **Observability** tab; settings can also be set per Preview in **Settings > Observability**. Per-Preview metrics are on the **Metrics** tab. Useful fields: `scriptName`, `previewSlug`, `status`.
- `wrangler preview --json` output confirms whether Tail Worker destinations are attached.
- `wrangler tail` does not support Previews; use a Tail Worker or Logpush instead.
- Include a debug ID in the URL or request headers to correlate browser traffic with logs/traces. Browser Run is optional (curl, Playwright, integration tests also work).
- Export Preview telemetry with OpenTelemetry-compliant exports or Workers Logpush; configure in the `previews` block to keep exports separate from production.

## Related

- [previews-configuration.md](./previews-configuration.md)
- [previews-examples.md](./previews-examples.md)
- [observability.md](../configuration/observability.md)
