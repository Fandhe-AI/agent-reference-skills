---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/
---

# Namespace public endpoints

A namespace can expose one public endpoint that searches several of its instances and merges the results.

## Signature / Usage

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/<NAMESPACE>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": {
      "enabled": true,
      "instances_allowed": ["docs", "blog", "support"]
    }
  }'
```

Search a subset:

```bash
curl https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  --header "Content-Type: application/json" \
  --data '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ],
    "ai_search_options": {
      "instance_ids": ["docs", "support"]
    }
  }'
```

Disable:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/<NAMESPACE>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "public_endpoint_params": null
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `instances_allowed` | string[] | `[]` | Up to 10 existing instances in the namespace; empty means nothing is searchable. |
| `ai_search_options.instance_ids` | string[] | whole allowlist | Narrow a request; every value must be allowlisted. |

Errors: `7097` unknown instance (400), `7099` concurrent modification (409, retry), `60012` malformed `instance_ids` (400), `60013` no searchable instance (404, identical for unknown, outside allowlist, or empty), `60014` unsupported path (404), `60015` body not a JSON object (400).

## Notes

- Same paths and settings as an instance endpoint (custom domains, Access, rate limits).
- `public_endpoint_params` is replaced in full on every update; omitting `instances_allowed` resets it to empty and every request then returns `404`.
- Deleting or moving an instance removes it from the allowlist. Enabling a namespace endpoint does not change instance endpoints.
- Disabling with `null` keeps the identifier so the URL is reused.

## Related

- [Namespaces](./namespaces.md)
- [Public endpoint settings](./public-endpoint-settings.md)
- [Custom domains and Cloudflare Access](./custom-domains-and-access.md)
