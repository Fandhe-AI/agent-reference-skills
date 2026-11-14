---
source: https://developers.cloudflare.com/ai-search/api/instances/terraform/
---

# Instances with Terraform

Create, update, import, and read AI Search instances as code with the Cloudflare Terraform provider (namespace support from provider v5.29.0).

## Signature / Usage

Default namespace (omit `namespace`); the `id` argument is the instance name:

```tf
resource "cloudflare_ai_search_instance" "docs" {
  account_id = var.account_id
  id         = "docs"
}
```

Custom namespace (reference the `name` of a `cloudflare_ai_search_namespace` resource so Terraform creates the namespace first):

```tf
resource "cloudflare_ai_search_namespace" "support" {
  account_id = var.account_id
  name       = "support"
}

resource "cloudflare_ai_search_instance" "docs" {
  account_id = var.account_id
  id         = "docs"
  namespace  = cloudflare_ai_search_namespace.support.name
}
```

Instance with a data source (`type` accepts `r2` or `web-crawler`):

```tf
resource "cloudflare_ai_search_instance" "internal_docs" {
  account_id      = var.account_id
  id              = "internal-docs"
  namespace       = "default"
  type            = "r2"
  source          = "my-docs-bucket"
  max_num_results = 20
}
```

Import with an ID in the format `<account_id>/<namespace>/<id>` (use `default` for the default namespace):

```sh
terraform import cloudflare_ai_search_instance.docs <account_id>/support/docs
```

```tf
import {
  to = cloudflare_ai_search_instance.docs
  id = "${var.account_id}/default/docs"
}
```

Data sources (set `namespace` on both; use `default` for the default namespace):

```tf
data "cloudflare_ai_search_instance" "docs" {
  account_id = var.account_id
  namespace  = "support"
  id         = "docs"
}
```

```tf
data "cloudflare_ai_search_instances" "support" {
  account_id = var.account_id
  namespace  = "support"
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `account_id` | string | — | Required. Replacing it replaces the instance. |
| `id` | string | — | Required. The instance name. Replacing it replaces the instance. |
| `namespace` | string | `default` | Namespace of the instance. Changing it replaces the instance. |
| `type` | string | — | `r2` or `web-crawler`. Changing it replaces the instance. |
| `source` | string | — | Data source location (R2 bucket name or website domain). |
| `max_num_results` | number | — | Example argument shown in the source. |

## Notes

- An instance without a data source uses built-in storage; upload documents with the Items API.
- Computed values: AI Search fills in some fields when you create an instance (for example the models such as `aisearch_model` and `embedding_model`, `chunk_size`, and `token_id`). Terraform treats these as computed; if you omit them, Terraform keeps the current value instead of planning a change.
- Replacing an instance permanently removes all its indexed data, including embeddings, chunks, and files uploaded to built-in storage. Changing `id`, `account_id`, `namespace`, or `type` replaces the instance; review `terraform plan` output for `must be replaced` before you apply.
- The official Terraform page documents `type` as `r2` or `web-crawler`; the D1 data source (beta, see data-source-d1.md) is not listed there.
- Source: https://developers.cloudflare.com/ai-search/api/instances/terraform/ (pin 34d908a / fetched 2026-11-14)

## Related

- [Namespaces with Terraform](./namespaces-terraform.md)
- [REST API: instances, jobs, items](./rest-api-instances-items.md)
- [Namespaces](./namespaces.md)
- [Data sources](./data-sources.md)
