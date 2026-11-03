---
source: https://developers.cloudflare.com/workers/platform/infrastructure-as-code/
---

# Infrastructure as Code (IaC)

Deploy and manage Workers with Terraform, the Cloudflare API SDKs, or the REST API when Wrangler is not the right tool (CI/CD, custom tooling).

## Signature / Usage

Terraform (requires a local `my-script.mjs`; bundling is not done by Terraform):

```tf
variable "account_id" {
  default = "replace_me"
}

resource "cloudflare_worker" "my_worker" {
  account_id = var.account_id
  name = "my-worker"
  observability = {
    enabled = true
  }
}

resource "cloudflare_worker_version" "my_worker_version" {
  account_id = var.account_id
  worker_id = cloudflare_worker.my_worker.id
  compatibility_date = "2025-02-21" # Set this to today's date
  main_module = "my-script.mjs"
  modules = [
    {
      name = "my-script.mjs"
      content_type = "application/javascript+module"
      # Replacement (version creation) is triggered whenever this file changes
      content_file = "my-script.mjs"
    }
  ]
}

resource "cloudflare_workers_deployment" "my_worker_deployment" {
  account_id = var.account_id
  script_name = cloudflare_worker.my_worker.name
  strategy = "percentage"
  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.my_worker_version.id
  }]
}
```

Bundle first, then upload:

```bash
wrangler deploy --dry-run --outdir build
```

REST multipart/form-data upload (implicitly creates a version and deployment):

Adapted (not in the official docs): `today` is defined and the `metadata` part is valid JSON (double-quoted keys and strings); see Notes.

```bash
account_id="replace_me"
api_token="replace_me"
worker_name="my-hello-world-script"
today="$(date -u +%F)"

script_content='export default {
  async fetch(request, env, ctx) {
    return new Response(env.MESSAGE, { status: 200 });
  }
};'

# Upload the Worker
curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/scripts/$worker_name" \
  -X PUT \
  -H "Authorization: Bearer $api_token" \
  -F 'metadata={
    "main_module": "'"$worker_name"'.mjs",
    "bindings": [
      {
        "type": "plain_text",
        "name": "MESSAGE",
        "text": "Hello World!"
      }
    ],
    "compatibility_date": "'"$today"'"
  };type=application/json' \
  -F "$worker_name.mjs=@-;filename=$worker_name.mjs;type=application/javascript+module" <<EOF
$script_content
EOF
```

## Options / Props

Terraform `bindings` entries (single array; each has `type` plus type-specific properties; accessed as `env.<name>`):

| Binding | `type` | Properties |
| --- | --- | --- |
| KV namespace | `kv_namespace` | `name`, `namespace_id` |
| R2 bucket | `r2_bucket` | `name`, `bucket_name` |
| D1 database | `d1` | `name`, `id` |
| Durable Object | `durable_object_namespace` | `name`, `class_name`, optional `script_name` |
| Service | `service` | `name`, `service`, optional `entrypoint` |
| Queue (producer) | `queue` | `name`, `queue_name` |
| Vectorize | `vectorize` | `name`, `index_name` |
| Workers AI | `ai` | `name` |
| Hyperdrive | `hyperdrive` | `name`, `id` |
| VPC Service | `vpc_service` | `name`, `service_id` |
| Analytics Engine | `analytics_engine` | `name`, `dataset` |
| Environment variable | `plain_text` | `name`, `text` |
| Secret | `secret_text` | `name`, `text` (encrypted) |

Example (KV and secret):

```tf
bindings = [{
  type = "kv_namespace"
  name = "MY_KV"
  namespace_id = "your-kv-namespace-id"
}]
```

```tf
bindings = [{
  type = "secret_text"
  name = "API_KEY"
  text = var.api_key
}]
```

Content options for a version module: `content_file` (preferred, local file) or `content_base64` (inline); both tracked via computed `content_sha256`.

## Notes

- Corrected from the official docs: the official multipart `curl` example writes the `metadata` JSON with single-quoted keys and strings (not valid JSON) and references `$today`, which is never defined (so it expands to an empty `compatibility_date`). Here the JSON uses double quotes, the shell variables are spliced in with `'"$var"'`, and `today="$(date -u +%F)"` is defined.
- Needs an account ID and an API token (not the Global API key).
- When bundling with Wrangler but uploading another way, copy all `wrangler.json` config (especially `compatibility_date` and flags) into your Terraform/API request.
- Queue consumers are configured on the queue resource, not via Worker bindings.
- Durable Objects: migrations apply with deployments, so a Version cannot bind a Durable Object before a deployment exists. The first Terraform apply fails; comment out the binding, apply, uncomment it, comment out `migrations`, apply again. Often better to manage only `cloudflare_worker` / `cloudflare_workers_deployment` and use Wrangler for versions.
- Versions are immutable and append-only; changes to `cloudflare_worker_version` force replacement without deleting the previous version. Deleting the parent `cloudflare_worker` deletes all versions.
- Import: `terraform import cloudflare_worker_version.my_worker_version <account_id>/<worker_id>/<version_id>`; state always populates `content_base64`, so with `content_file` in config expect an in-place update (not replacement) if `content_sha256` matches.
- The beta Workers API (`POST .../workers/workers`, `.../versions`, then `.../scripts/<name>/deployments`) and the `cloudflare-typescript` SDK script are described in the source but not reproduced here; the multipart upload API is the stable one. Python Workers need content type `text/x-python` and the `python_workers` compatibility flag.
- Workers for Platforms user Workers upload to `/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME`.
- Source note: the Terraform example hardcodes `compatibility_date = "2025-02-21"` with the comment "Set this to today's date".
- For wrangler-driven deploys, see the cloudflare-wrangler skill.

## Related

- [deploy-buttons.md](./deploy-buttons.md)
- [claim-deployments.md](./claim-deployments.md)
- [../bindings-rpc/README.md](../bindings-rpc/README.md)
