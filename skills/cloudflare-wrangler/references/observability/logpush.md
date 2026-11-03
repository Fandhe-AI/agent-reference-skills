---
source: https://developers.cloudflare.com/workers/observability/logs/logpush/
---

# Workers Logpush

Cloudflare Logpush sends Workers Trace Event Logs (request/response metadata, unstructured `console.log()` messages and uncaught exceptions) to a supported destination. Available on the Workers Paid plan.

## Signature / Usage

Create a Logpush job via cURL (sends Workers logs to R2):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
--header 'X-Auth-Key: <API_KEY>' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'Content-Type: application/json' \
--data '{
  "name": "workers-logpush",
  "output_options": {
    "field_names": ["Event", "EventTimestampMs", "Outcome", "Exceptions", "Logs", "ScriptName"],
  },
  "destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",
  "dataset": "workers_trace_events",
  "enabled": true
}' | jq .
```

To only receive logs for requests that did not result in an exception, add this `filter` property below `output_options`:

`"filter":"{\"where\": {\"key\":\"Outcome\",\"operator\":\"!eq\",\"value\":\"exception\"}}"`

Enable logging on the Worker with `logpush = true` (top level or under an environment):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	// Top-level configuration
	"name": "my-worker",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"workers_dev": false,
	"logpush": true,
	"route": {
		"pattern": "example.org/*",
		"zone_name": "example.org"
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"
main = "src/index.js"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-11-03"
workers_dev = false
logpush = true

[route]
pattern = "example.org/*"
zone_name = "example.org"
```

Via the multipart script upload API:

```bash
curl --request PUT \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/{script_name}" \
--header "Authorization: Bearer <API_TOKEN>" \
--form 'metadata={"main_module": "my-worker.js", "logpush": true}' \
--form '"my-worker.js"=@./my-worker.js;type=application/javascript+module'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `logpush` | `boolean` | Wrangler key enabling Logpush logging for the Worker; new Workers with this property are picked up by the Logpush job automatically. |

## Notes

- Prefer OpenTelemetry export for new integrations: it supports traces and logs, can be set `persist: false`, and works with any OTLP-compatible destination.
- Not available for zones on the Cloudflare China Network. Minimum required Wrangler version: 2.2.0.
- Verify Logpush access: roles with Logpush configuration access differ from Workers permissions (Super Administrators, Administrators, and Log Share roles have full access), or create an Account-level API token with Logs Edit permissions.
- Dashboard job creation: **Logpush** page > **Create a Logpush job** > choose destination > dataset **Workers trace events** > customize fields > verify ownership. Enable on the Worker via **Settings** > **Observability** > **Logpush** > **Enable** (requires an existing Logpush job).
- Limits: `logs` and `exceptions` fields have a combined limit of 16,384 characters. Characters are counted in order: all `exception.name`s, then `exception.message`s, then `log.message`s. Past the limit, fields are truncated with `"<<<Logpush: *field* truncated>>>"` for one message before logs or exceptions are dropped.
- Truncation example (illustrative limit of 50 characters): exception names `"SampleError"` and `"AuthError"` count 20, `"something went wrong"` counts 20 leaving 10; `"unable to process request authentication from client"` becomes `"unable to <<<Logpush: exception messages truncated>>>"`; `"Hello "` becomes `"<<<Logpush: messages truncated>>>"` and `"World!"` is dropped.

## Related

- [opentelemetry-export.md](./opentelemetry-export.md)
- [workers-logs.md](./workers-logs.md)
- [real-time-logs.md](./real-time-logs.md)
- [tail-workers.md](./tail-workers.md)
- [../configuration/top-level-keys.md](../configuration/top-level-keys.md)
