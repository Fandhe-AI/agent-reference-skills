---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#bindings
---

# Other Bindings (vars, Browser Run, Email, Flagship, Images, AI, AI Search, Analytics, mTLS)

Configuration keys for the remaining binding types.

## Signature / Usage

```jsonc
{
	"vars": {
		"API_HOST": "example.com",
		"SERVICE_X_DATA": { "URL": "service-x-api.dev.example", "MY_ID": 123 }
	},
	"browser": { "binding": "<BINDING_NAME>" },
	"send_email": [
		{ "name": "<NAME_FOR_BINDING1>" },
		{ "name": "<NAME_FOR_BINDING2>", "destination_address": "<YOUR_EMAIL>@example.com" },
		{ "name": "<NAME_FOR_BINDING3>", "allowed_destination_addresses": ["<YOUR_EMAIL>@example.com", "<YOUR_EMAIL2>@example.com"] }
	],
	"flagship": [{ "binding": "FLAGS", "app_id": "<APP_ID>" }],
	"images": { "binding": "IMAGES" },
	"ai": { "binding": "AI" },
	"ai_search_namespaces": [{ "binding": "<BINDING_NAME>", "namespace": "default" }],
	"ai_search": [{ "binding": "<BINDING_NAME>", "instance_name": "<INSTANCE_NAME>" }],
	"analytics_engine_datasets": [{ "binding": "<BINDING_NAME>", "dataset": "<DATASET_NAME>" }],
	"analytics": { "binding": "ANALYTICS_SQL" },
	"mtls_certificates": [{ "binding": "<BINDING_NAME1>", "certificate_id": "<CERTIFICATE_ID1>" }],
}
```

```toml
[vars]
API_HOST = "example.com"

[browser]
binding = "<BINDING_NAME>"

[[send_email]]
name = "<NAME_FOR_BINDING2>"
destination_address = "<YOUR_EMAIL>@example.com"

[[flagship]]
binding = "FLAGS"
app_id = "<APP_ID>"

[images]
binding = "IMAGES"

[ai]
binding = "AI"

[[ai_search_namespaces]]
binding = "<BINDING_NAME>"
namespace = "default"

[[ai_search]]
binding = "<BINDING_NAME>"
instance_name = "<INSTANCE_NAME>"

[[analytics_engine_datasets]]
binding = "<BINDING_NAME>"
dataset = "<DATASET_NAME>"

[analytics]
binding = "ANALYTICS_SQL"

[[mtls_certificates]]
binding = "<BINDING_NAME1>"
certificate_id = "<CERTIFICATE_ID1>"
```

## Options / Props

| Key | Field | Type | Description |
|-----|-------|------|-------------|
| `vars` | (any) | text or JSON | Environment variables attached to the Worker as a binding; JSON values allowed. |
| `browser` | `binding` | `string` required | Binding name for the Browser Run (headless Chromium) binding; a valid JavaScript variable name. |
| `send_email` | `name` | `string` required | The binding name. |
| `send_email` | `destination_address` | `string` optional | The chosen email address you send emails to. |
| `send_email` | `allowed_destination_addresses` | `string[]` optional | Allowlist of email addresses you send emails to. |
| `flagship` | `binding` | `string` required | Binding name for the Flagship app; a valid JavaScript variable name. |
| `flagship` | `app_id` | `string` optional | The ID of the Flagship app. |
| `flagship` | `remote` | `boolean` optional | Local development uses a local flag store by default; `true` evaluates against the remote app. |
| `images` | `binding` | `string` required | Name of the binding used to refer to the Images API (e.g. `env.IMAGES`). |
| `ai` | `binding` | `string` required | The binding name (e.g. `env.AI`). Limited to one AI binding per Worker project. |
| `ai_search_namespaces` | `binding` | `string` required | Binding name for the AI Search namespace. The binding grants full access to all instances within the namespace. |
| `ai_search_namespaces` | `namespace` | `string` required | Name of the namespace. A `default` namespace is created automatically for every account. If it does not exist, Wrangler creates it on deploy. |
| `ai_search` | `binding` | `string` required | Binding name for the AI Search instance. |
| `ai_search` | `instance_name` | `string` required | Name of the instance; must exist in the default namespace at deploy time. Does not support namespace-level operations like `list()`, `create()`, `delete()`. |
| `analytics_engine_datasets` | `binding` | `string` required | Binding name used to refer to the dataset. |
| `analytics_engine_datasets` | `dataset` | `string` optional | Dataset to write to. Defaults to the binding name. |
| `analytics_engine_datasets` | `remote` | `boolean` optional | Whether the binding writes to the remote dataset during local development. Data points are discarded locally by default. |
| `analytics` | `binding` | `string` required | Binding name used to query Analytics SQL. Requires Wrangler 4.145.0 or later. |
| `analytics` | `remote` | `boolean` optional | `true` acknowledges local development connects to the remote service and suppresses the remote resource warning. Analytics SQL has no local implementation. |
| `mtls_certificates` | `binding` | `string` required | Binding name used to refer to the certificate. |
| `mtls_certificates` | `certificate_id` | `string` required | The certificate ID; shown by `mtls-certificate upload` and `mtls-certificate list`. |

## Notes

- Email binding: before binding an address, enable Email Routing and have at least one verified email address. Each attribute must be on its own line (the docs example uses separate objects per binding type).
- Workers AI always accesses your Cloudflare account to run models and incurs usage charges even in local development.
- Do not use `vars` to store sensitive information; use secrets (see [secrets.md](./secrets.md)).
- Runtime APIs of each binding are covered by the respective product docs / cloudflare-workers; this page documents only config keys.
- Flagship, AI Search, Agent Memory resources can be auto-provisioned; see [automatic-provisioning.md](./automatic-provisioning.md).

## Related

- [secrets.md](./secrets.md)
- [bindings-storage.md](./bindings-storage.md)
- [top-level-keys.md](./top-level-keys.md)
