---
source: https://developers.cloudflare.com/ai-search/api/instances/rest-api/, https://developers.cloudflare.com/ai-search/api/items/rest-api/
---

# REST API: instances, jobs, and items

Manage instances, sync jobs, and items over HTTP. All paths are scoped to a namespace (use `default` unless you created one). Full specification: https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/

## Signature / Usage

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-instance"
  }'
```

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>/jobs" \
  -H "Authorization: Bearer <API_TOKEN>"
```

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>/items?key=docs/readme.md" \
  -H "Authorization: Bearer <API_TOKEN>"
```

## Options / Props

Instances (`/accounts/{account_id}/ai-search/namespaces/{namespace}/instances/{id}`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Create | `POST` | — | Create a new instance. |
| List | `GET` | — | List instances. |
| Get | `GET` | — | Get an instance by ID. |
| Update | `PUT` | — | Update configuration. |
| Delete | `DELETE` | — | Delete an instance. |
| Stats | `GET` | — | Indexing statistics. |

Jobs (`.../jobs`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Create | `POST` | — | Trigger a sync job. |
| List | `GET` | — | List jobs. |
| Get | `GET` | — | Job details. |
| Logs | `GET` | — | Job logs. |

Items (`.../items`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Upload | `POST` | — | Upload a document (`-F "file=@..."`). |
| List | `GET` | — | List items; `key` query parameter finds an exact object key. |
| Get | `GET` | — | Item info by ID. |
| Delete | `DELETE` | — | Delete an item. |
| Download | `GET` | — | Download the original file. |

## Notes

- Auth: API token with AI Search:Edit and AI Search:Run, sent as `Authorization: Bearer <API_TOKEN>`. Keep the token in an environment variable or secret store, never in source control.
- Keys are unique per data source; combine `key` with `source` (e.g. `source=builtin`) to disambiguate.
- Items upload to built-in storage; content download is unavailable for external-source items (error `7059`).
- Creating an instance accepts `type` `r2`, `web-crawler`, or `d1` (see data-source-d1.md); `source` cannot be changed after creation.
- Namespaces themselves (create, list, update, delete, move an instance) are managed with the namespaces REST API (namespaces-rest-api.md) or Terraform (instances-terraform.md, namespaces-terraform.md).
- `public_endpoint_params` on `PUT` is replaced in full on each update (see custom-domains-and-access.md).

## Related

- [Get started: REST API](./get-started-rest-api.md)
- [REST API: search and chat](./rest-api-search.md)
- [Instance methods](./instance-methods.md)
- [Namespaces REST API](./namespaces-rest-api.md)
- [Instances with Terraform](./instances-terraform.md)
