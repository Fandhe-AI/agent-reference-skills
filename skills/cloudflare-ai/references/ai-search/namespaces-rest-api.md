---
source: https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/
---

# Namespaces REST API

Create, list, get, update, delete, and move instances between AI Search namespaces over HTTP.

## Signature / Usage

Create a namespace (all requests need an API token with Account > AI Search:Edit and AI Search:Run, sent as `Authorization: Bearer <API_TOKEN>`):

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "support",
    "description": "Customer support content"
  }'
```

List namespaces:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces?per_page=50" \
  -H "Authorization: Bearer <API_TOKEN>"
```

Update a namespace:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/support" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Support articles and FAQs"
  }'
```

Move an instance to another namespace with a `PATCH` request on the instance in its current namespace:

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/docs" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "new_namespace": "support"
  }'
```

Delete an empty namespace (destructive):

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/support" \
  -H "Authorization: Bearer <API_TOKEN>"
```

## Options / Props

Paths: `/accounts/{account_id}/ai-search/namespaces` (list and create) and `/accounts/{account_id}/ai-search/namespaces/{name}` (single namespace).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Create | `POST` | — | Create a namespace. |
| List | `GET` | — | List namespaces. |
| Get | `GET` | — | Get a namespace by name. |
| Update | `PUT` | — | Update the description or public endpoint. |
| Delete | `DELETE` | — | Delete an empty namespace. |
| Move instance | `PATCH` | — | Move an instance to a different namespace (`new_namespace` in the body). |

Request body fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | — | Create only, required. 1 to 28 lowercase letters, digits, and hyphens; must start and end with a letter or digit. Cannot be renamed. |
| `description` | string | — | Optional on create and update. Up to 256 characters; `null` clears it. |
| `public_endpoint_params` | object | — | Optional on create and update. Namespace public endpoint configuration (see namespace-public-endpoints.md). `null` removes it. |

List query parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | `1` | Page number. |
| `per_page` | number | `20` | Namespaces per page, maximum `100`. |
| `search` | string | — | Namespaces whose name or description contains this string; case-insensitive. |

## Notes

- On update, fields you omit keep their current value. You cannot change the description of the `default` namespace, but you can configure its public endpoint.
- An account can have up to 100 namespaces; creating more returns error `7062` (`max_namespaces_reached`).
- A namespace must be empty before it is deleted: `7066` (`namespace_not_empty`) if it still contains instances (instances still being deleted do not block the request). The `default` namespace cannot be deleted: `7065` (`cannot_modify_default_namespace`).
- The target namespace of a move cannot already contain an instance with the same name.
- To search across several instances in a namespace, see Multi-Instance Search and Multi-Instance Chat Completions in the API reference (https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/).
- Namespace error codes: error-codes.md (official anchor https://developers.cloudflare.com/ai-search/troubleshooting/api-error-codes/#namespaces).
- Source: https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/ (pin 34d908a / fetched 2026-11-14)

## Related

- [Namespaces](./namespaces.md)
- [Namespaces with Terraform](./namespaces-terraform.md)
- [REST API: instances, jobs, items](./rest-api-instances-items.md)
- [Namespace public endpoints](./namespace-public-endpoints.md)
- [Error codes](./error-codes.md)
