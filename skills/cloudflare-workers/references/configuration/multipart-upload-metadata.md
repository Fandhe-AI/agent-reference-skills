---
source: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/
---

# Multipart upload metadata

When using the Workers Script Upload API or Version Upload API directly, `multipart/form-data` uploads require a `metadata` part: JSON describing the Worker's configuration (analogous to the Wrangler configuration file). A newer upload API exists (see the Infrastructure as Code docs: https://developers.cloudflare.com/workers/platform/infrastructure-as-code#cloudflare-rest-api).

## Signature / Usage

```json
{
	"main_module": "main.js",
	"bindings": [
		{
			"type": "plain_text",
			"name": "MESSAGE",
			"text": "Hello, world!"
		}
	],
	"compatibility_date": "2021-09-14"
}
```

## Options / Props

Top-level attributes (at minimum `main_module` is required to upload a Worker):

| Name | Type | Description |
| --- | --- | --- |
| `main_module` (required) | string | Part name containing the module entry point of the Worker, for example `main.js`. |
| `assets` | object | Static assets configuration. `config` (object): `base_path` (URL path prefix for assets), `html_handling` (redirects and rewrites for HTML requests), `not_found_handling` (response when no asset matches). `jwt` provides a token authorizing assets to be attached to a Worker. |
| `keep_assets` | boolean | Retain assets from a previously uploaded Worker version; used instead of a completion token. |
| `bindings` | array of object | Bindings to expose in the Worker. |
| `placement` | object | Smart placement object; `mode` only supports `smart`. |
| `compatibility_date` | string | Targeted runtime support date. Highly recommended; otherwise defaults on API upload to `2021-11-02`. |
| `compatibility_flags` | array of string | Enable or disable runtime features outside a compatibility date. |

Additional attributes for the Workers Script Upload API (immediately deployed uploads). Except for `annotations`, these are not available for version uploads:

| Name | Type | Description |
| --- | --- | --- |
| `migrations` | array of object | Durable Objects migrations to apply. |
| `logpush` | boolean | Whether Logpush is turned on for the Worker. |
| `tail_consumers` | array of object | Tail Workers that consume logs from this Worker. |
| `tags` | array of string | Tags for the Worker. |
| `annotations` | object | Annotations for the version: `workers/message` (custom message), `workers/tag` (custom identifier). |

Additional attributes for the Version Upload API:

| Name | Type | Description |
| --- | --- | --- |
| `annotations` | object | `workers/message` (custom message), `workers/tag` (custom identifier), `workers/alias` (custom alias for this version). |

## Notes

- Binding types listed in the source example (each with `name` plus type-specific fields): `ai`, `analytics_engine` (`dataset`), `assets`, `browser_rendering`, `d1` (`id`), `durable_object_namespace` (`class_name`), `hyperdrive` (`id`), `kv_namespace` (`namespace_id`), `mtls_certificate` (`certificate_id`), `plain_text` (`text`), `queue` (`queue_name`), `r2_bucket` (`bucket_name`), `secret_text` (`text`), `service` (`service`, `environment`), `vectorize` (`index_name`), `version_metadata`.

```json
{
	"bindings": [
		{
			"type": "kv_namespace",
			"name": "<VARIABLE_NAME>",
			"namespace_id": "<KV_ID>"
		},
		{
			"type": "service",
			"name": "<VARIABLE_NAME>",
			"service": "<SERVICE_NAME>",
			"environment": "production"
		},
		{
			"type": "secret_text",
			"name": "<VARIABLE_NAME>",
			"text": "<SECRET_VALUE>"
		}
	]
}
```

- For the Wrangler configuration equivalents see the cloudflare-wrangler skill.

## Related

- [Compatibility dates](./compatibility-dates.md)
- [Compatibility flags](./compatibility-flags.md)
- [Placement](./placement.md)
- [Bindings and RPC](../bindings-rpc/README.md)
