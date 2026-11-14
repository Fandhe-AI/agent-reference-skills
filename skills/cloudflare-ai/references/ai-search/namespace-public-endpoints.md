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

Search the allowlist (every request searches all allowlisted instances and merges the results):

```bash
curl https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  --header "Content-Type: application/json" \
  --data '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
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
| `ai_search_options.instance_ids` | — | — | Not supported on the namespace endpoint: if present, the endpoint replaces it with the full allowlist. You cannot narrow a request to a subset. |

Errors: `7097` unknown instance (400), `7099` concurrent modification (409, retry), `60013` allowlist is empty, so no instance is searchable (404), `60014` unsupported path (404), `60015` body not a JSON object (400; an empty body is treated as an empty JSON object).

## Notes

- Same paths and settings as an instance endpoint (custom domains, Access, rate limits).
- `public_endpoint_params` is replaced in full on every update; omitting `instances_allowed` resets it to empty and every request then returns `404`.
- Deleting or moving an instance removes it from the allowlist. Enabling a namespace endpoint does not change instance endpoints.
- Disabling with `null` keeps the identifier so the URL is reused.
- To search a different set of instances, update `instances_allowed`, or query the instances from a Workers binding or the REST API (see search.md and samples/search-multiple-instances.md).
- Migration (2026-11-03 pin to 2026-11-14 pin): per-request narrowing with `ai_search_options.instance_ids` and error `60012` were removed; `60013` now only means an empty allowlist.
- Source: https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/ (pin 34d908a / fetched 2026-11-14)

## Related

- [Namespaces](./namespaces.md)
- [Public endpoint settings](./public-endpoint-settings.md)
- [Custom domains and Cloudflare Access](./custom-domains-and-access.md)
