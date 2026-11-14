---
source: https://developers.cloudflare.com/ai-search/api/namespaces/terraform/
---

# Namespaces with Terraform

Create, update, import, and read AI Search namespaces as code with the Cloudflare Terraform provider.

## Signature / Usage

Use the `cloudflare_ai_search_namespace` resource (to create instances in a namespace you manage with Terraform, use provider v5.29.0 or later):

```tf
resource "cloudflare_ai_search_namespace" "support" {
  account_id  = var.account_id
  name        = "support"
  description = "Customer support content"
}
```

Create a namespace with an instance (the reference makes Terraform create the namespace before the instance, and destroy the instance before the namespace):

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

Import an existing namespace with an ID in the format `<account_id>/<name>`:

```sh
terraform import cloudflare_ai_search_namespace.support <account_id>/support
```

```tf
import {
  to = cloudflare_ai_search_namespace.support
  id = "${var.account_id}/support"
}
```

Data sources:

```tf
data "cloudflare_ai_search_namespace" "support" {
  account_id = var.account_id
  name       = "support"
}
```

```tf
data "cloudflare_ai_search_namespaces" "all" {
  account_id = var.account_id
}
```

## Options / Props

Resource arguments:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `account_id` | string | — | Required. Your Cloudflare account ID. |
| `name` | string | — | Required. 1 to 28 lowercase letters, digits, and hyphens; must start and end with a letter or digit. |
| `description` | string | — | Optional. Up to 256 characters. |
| `public_endpoint_params` | object | — | Optional. Namespace public endpoint configuration (see namespace-public-endpoints.md). |

Resource attributes: `id` (the namespace name, same as `name`), `created_at` (RFC 3339 timestamp), `public_endpoint_id` (identifier of the namespace public endpoint, if one exists).

Data sources: `cloudflare_ai_search_namespace` reads one namespace by `name` or by a `filter` object with `search` (for example `filter = { search = "support" }`). `cloudflare_ai_search_namespaces` lists namespaces in an account; optional `search` returns only namespaces whose name or description contains a string, `max_items` limits the result count, and the namespaces are returned in `result`.

## Notes

- Changing `name` or `account_id` replaces the namespace (Terraform deletes the old one and creates a new one). Changing `description` or `public_endpoint_params` updates in place.
- A namespace that still contains instances cannot be deleted: AI Search rejects it. If an instance in the namespace is not managed in the same configuration, or does not reference the namespace resource, `terraform destroy` fails until you move or delete that instance.
- Source: https://developers.cloudflare.com/ai-search/api/namespaces/terraform/ (pin 34d908a / fetched 2026-11-14)
- Provider docs: https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs

## Related

- [Instances with Terraform](./instances-terraform.md)
- [Namespaces REST API](./namespaces-rest-api.md)
- [Namespaces](./namespaces.md)
