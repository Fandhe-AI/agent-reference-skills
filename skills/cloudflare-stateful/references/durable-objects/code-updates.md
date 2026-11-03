---
source: https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/
---

# Durable Objects code updates

A code update strategy controls when each already-active Durable Object adopts a newly deployed Worker version. By default updates are `deferred` for up to 300 seconds; use `immediate` to apply right away.

## Signature / Usage

Wrangler configuration:

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"name": "CHAT_ROOM",
				"class_name": "ChatRoom",
			},
		],
		"code_update_strategy": {
			"mode": "deferred",
			"max_delay": 60,
		},
	},
}
```

```toml
[[durable_objects.bindings]]
name = "CHAT_ROOM"
class_name = "ChatRoom"

[durable_objects.code_update_strategy]
mode = "deferred"
max_delay = 60
```

Single-deployment override:

```sh
npx wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode immediate
npx wrangler versions deploy <VERSION_ID>@100% --durable-objects-code-update-mode deferred 30s
```

REST:

Adapted (not in the official docs): the bearer token is sent through a stdin header file so it does not appear in the process argument list.

```bash
printf 'Authorization: Bearer %s\n' "$CLOUDFLARE_API_TOKEN" | \
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments" \
  --request POST \
  --header @- \
  --header "Content-Type: application/json" \
  --data '{
    "strategy": "percentage",
    "versions": [
      {
        "version_id": "f3b5b2d2-75d6-4c3f-ae3d-4df2f9cfeb7a",
        "percentage": 100
      }
    ],
    "code_update_strategy": {
      "mode": "deferred",
      "max_delay": 60
    }
  }'
```

## Options / Props

### Modes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `deferred` | mode | `max_delay` 300 s (5 min) | Active object keeps running current code until it hibernates; if still active at `max_delay` (max 86400 s) it resets and adopts the new code. |
| `immediate` | mode | — | Active object resets and adopts new code immediately. `max_delay` not applicable. |

### `code_update_strategy` values

| Name | Type | Default | Description |
|------|------|---------|-------------|
| (omitted) | — | — | `deferred` with 300 s `max_delay`. |
| `{ "mode": "deferred" }` | object | — | Default `max_delay` of 300 s. |
| `{ "mode": "deferred", "max_delay": 0 }` | object | — | Applies the update immediately. |
| `{ "mode": "deferred", "max_delay": 120 }` | object | — | Deferred up to 120 s. |
| `{ "mode": "immediate" }` | object | — | Adopt immediately without waiting to hibernate. |
| `{ "mode": "immediate", "max_delay": 60 }` | object | — | REST API returns an error; Wrangler silently drops `max_delay`. |
| `max_delay` | `number` (seconds) | 300 | Only with `deferred`; `0` to `86400`, millisecond precision (e.g. `45.678`). |

## Notes

- Wrangler selects the whole strategy in order: the `--durable-objects-code-update-mode` flag (including its duration when `deferred`; flag values do not inherit `max_delay` from config), then `durable_objects.code_update_strategy` in config, then the default `{ "mode": "deferred", "max_delay": 300 }`. The strategy does not carry over: a later deployment that omits it uses the default.
- An explicit `code_update_strategy` (config, CLI flag or REST API) always overrides the default. The flag is accepted by `wrangler deploy`, `wrangler versions deploy` and `wrangler rollback`; with `deferred` a duration is required. Wrangler flags are detailed in the cloudflare-wrangler skill.
- Strategy applies to every Durable Object class the Worker exports (including classes exported via `ctx.exports` without an explicit `bindings` entry); a binding with `script_name` follows the other Worker's strategy.
- How it works: new version deployed to 100%; an inactive object starts on the new version at the next request; an active `deferred` object keeps its version until it hibernates or `max_delay` expires. Each deployment starts a separate timer; when the first expires the object adopts the latest deployed version, not necessarily the one that started that timer (example: A with `max_delay: 30`, B 10 s later with `max_delay: 60`, A's timer expires first and the object adopts B). An `immediate` deploy forces the update even while earlier timers run and may skip intermediate versions.
- `code_update_strategy` is write-only: create, get and list deployment responses do not include it. In the REST API it belongs to the deployment, not the version.
- Gradual deployments: each object is assigned to one version; raising a version's percentage only starts waits for newly assigned objects. Keep code forward and backward compatible while any version might still run.
- Use `immediate` for correctness/security fixes or objects that rarely hibernate.
- Limitations: `deferred` is best effort (no guarantee operations finish or the object keeps its code for the whole `max_delay`); it does not delay restarts unrelated to code updates, e.g. Workers runtime updates.
- Diagrams in the source (mermaid flowcharts) are omitted.
- Adapted from the official docs: the bearer token is sent through a stdin header file so it does not appear in the process argument list.

## Related

- [Durable Object lifecycle](./durable-object-lifecycle.md)
- [Known issues](./known-issues.md)
- [Troubleshooting](./troubleshooting.md)
- [Access storage](./access-storage.md)
