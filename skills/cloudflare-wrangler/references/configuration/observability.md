---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#observability
---

# Observability

The observability setting automatically ingests, stores, filters, and analyzes logging data emitted from a Worker directly from the dashboard.

## Signature / Usage

```jsonc
{
	"observability": {
		"enabled": true,
		"head_sampling_rate": 0.1, // 10% of requests are logged
	},
}
```

```toml
[observability]
enabled = true
head_sampling_rate = 0.1
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `boolean` optional | Shorthand for `logs.enabled`. When set to `true` on a Worker, logs for the Worker are persisted. Defaults to `true` for all new Workers. |
| `logs.enabled` | `boolean` optional | Whether logs for the Worker are persisted. |
| `head_sampling_rate` | `number` optional | A number between 0 and 1, where 0 indicates zero out of one hundred requests are logged, and 1 indicates every request is logged. Defaults to 1 (100%). |
| `issues.enabled` | `boolean` optional | Requires Wrangler 4.134.0 or later. Set to `true` to detect and group production failures for a Worker. Set it to `false` and deploy the Worker to stop detecting new failures. |

### Issues

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "observability": {
    "issues": {
      "enabled": true
    }
  }
}
```

```toml
[observability.issues]
enabled = true
```

## Notes

- Workers Logs, head-based sampling and Workers Issues signals/retention are documented by the cloudflare-workers skill.
- A Container application can override this setting with its own `observability` key; see [containers.md](./containers.md).

## Related

- [top-level-keys.md](./top-level-keys.md)
- [containers.md](./containers.md)
